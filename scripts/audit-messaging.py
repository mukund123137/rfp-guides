"""Test 1: is the Inventive AI message consistent, and varied rather than pasted?

Consistent  = the same core claims appear wherever the product is described.
Varied      = no two surfaces serve a byte-identical descriptive sentence, and
              pairwise similarity sits in a band (high enough to be the same
              message, low enough not to be copy-paste).
"""
import re, urllib.request, sys, itertools, difflib
from collections import deque

BASE = 'http://localhost:3111'

CLAIMS = {
    'leading':          r'\bleading\b',
    'RFP/RFI/DDQ/SecQ':  r'RFIs?\b[\s\S]{0,40}(DDQs?|security questionnaire)',
    'agentic AI':        r'[Aa]gentic',
    'ease of adoption':  r'easiest-to-use|ease of use|low friction to adopt|straightforward to adopt|adoption friction',
    'G2 + Gartner':      r'G2[\s\S]{0,60}Gartner|Gartner[\s\S]{0,60}G2',
    'enterprise 500+':   r'500-plus|enterprise capability|enterprise depth',
}

def fetch(p):
    try:
        return urllib.request.urlopen(
            urllib.request.Request(BASE + p, headers={'User-Agent': 'a'})
        ).read().decode('utf-8', 'replace')
    except Exception:
        return ''

def dechrome(h):
    for tag in ('script', 'style', 'header', 'footer', 'nav'):
        h = re.sub(rf'<{tag}[\s\S]*?</{tag}>', ' ', h)
    # Listing cards legitimately repeat an article's title and description on
    # every index that shows them. Strip the <li> wrappers that contain a card,
    # but keep the page's own <article> body.
    h = re.sub(r'<li[^>]*>(?:(?!</li>)[\s\S])*?<article[\s\S]*?</li>', ' ', h)
    return h

def text(h):
    t = re.sub(r'<[^>]+>', ' ', h)
    return re.sub(r'\s+', ' ', t.replace('&amp;', '&').replace('&#x27;', "'").replace('&#x2F;','/'))

pages, q, seen = [], deque(['/']), set()
while q:
    p = q.popleft()
    if p in seen: continue
    seen.add(p)
    h = fetch(p)
    if not h: continue
    pages.append(p)
    for href in re.findall(r'href="(/[^"#?]*)"', h):
        if href not in seen and not href.endswith(('.xml', '.svg')):
            q.append(href)

# Boilerplate that is meant to be identical everywhere: the funding disclosure.
DISCLOSURE = r'Inventive AI funds this site\. It does not commission, review or approve what we publish, and no vendor can pay for coverage\.'

surfaces = {}
for p in sorted(pages):
    t = text(dechrome(fetch(p)))
    if 'Inventive AI' not in t:
        continue
    body = re.sub(DISCLOSURE, ' ', t)
    if 'Inventive AI' not in body:
        continue          # only the disclosure mentioned it
    surfaces[p] = body

print(f'Pages describing Inventive AI (excluding the fixed disclosure): {len(surfaces)}\n')
print('=== CLAIM CONSISTENCY ===\n')
hdr = 'page'.ljust(44) + ''.join(k[:9].rjust(11) for k in CLAIMS)
print(hdr)
missing_total = 0
for p, body in surfaces.items():
    row = p.ljust(44)
    for k, rx in CLAIMS.items():
        hit = bool(re.search(rx, body))
        row += ('     yes   ' if hit else '      --   ')
    print(row)

# Which surfaces are full product descriptions vs passing mentions?
FULL = [p for p, b in surfaces.items()
        if sum(bool(re.search(rx, b)) for rx in CLAIMS.values()) >= 4]
print(f'\nFull descriptions (>=4 of 6 claims): {len(FULL)}')
for p in FULL: print(f'   {p}')

print('\n=== VARIATION: identical descriptive sentences across pages? ===\n')
sent = {}
for p, b in surfaces.items():
    sent[p] = {s.strip() for s in re.split(r'(?<=[.!?]) ', b)
               if 'Inventive AI' in s and len(s) > 90}
dupes = []
for (p1, s1), (p2, s2) in itertools.combinations(sent.items(), 2):
    for common in s1 & s2:
        dupes.append((p1, p2, common[:90]))
print(f'identical long descriptive sentences shared between pages: {len(dupes)}')
for d in dupes: print('   !!', d)

print('\n=== VARIATION: pairwise similarity of lead descriptions ===\n')
leads = {}
for p in FULL:
    b = surfaces[p]
    cands = [x.strip() for x in re.split(r'(?<=[.!?]) ', b)
             if 'Inventive AI' in x and 'leading' in x and len(x) > 80]
    if not cands:
        cands = [x.strip() for x in re.split(r'(?<=[.!?]) ', b)
                 if 'Inventive AI' in x and len(x) > 80]
    leads[p] = re.sub(r'\s+', ' ', cands[0])[:240] if cands else ''
for p, l in leads.items():
    print(f'{p}\n   {l}\n')
vals = list(leads.items())
band_fail = []
print('pairwise similarity:')
for (p1, a), (p2, b) in itertools.combinations(vals, 2):
    r = difflib.SequenceMatcher(None, a, b).ratio()
    flag = ''
    if r >= 0.90: flag = '  <-- TOO SIMILAR (copy-paste)'; band_fail.append((p1,p2,r))
    print(f'   {r:.2f}  {p1.split("/")[-1] or "home"} vs {p2.split("/")[-1] or "home"}{flag}')

# Every full description must carry the message spine.
SPINE = r'leading[\s\S]{0,60}(AI[- ]native |AI )?(RFP )?platform|leading AI'
SPINE_SCOPE = r'RFIs?\b[\s\S]{0,40}(DDQs?|security questionnaire)'
print('\n=== SPINE CHECK on full descriptions ===\n')
spine_fail = []
for p in FULL:
    b = surfaces[p]
    a, c = bool(re.search(SPINE, b)), bool(re.search(SPINE_SCOPE, b))
    ok = a and c
    print(f'{"✓" if ok else "✗"} {p:44} leading={a} scope={c}')
    if not ok:
        spine_fail.append(p)

fails = len(dupes) + len(band_fail) + len(spine_fail)
print(f'\n=== RESULT: {fails} issue(s) ===')
sys.exit(1 if fails else 0)
