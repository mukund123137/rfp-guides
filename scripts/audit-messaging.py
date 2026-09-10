"""Is the Inventive AI message consistent, accurate and varied across the site?

Five checks:
  1. SPINE      — every full description carries the core positioning.
  2. CLAIMS     — coverage of the five supporting claims, per surface.
  3. FACTS      — the numbers agree everywhere they appear (a rating quoted two
                  different ways is worse than not quoting it at all).
  4. VARIATION  — no two pages serve an identical descriptive sentence, and no
                  pair is near-identical.
  5. STALE      — no superseded framing survives anywhere.

Consistency is measured by claim overlap, not string similarity: similarity
punishes sentences of different length that carry identical claims, so it is
used only to catch copy-paste at the high end.
"""
import difflib
import itertools
import re
import sys
import os
import urllib.request
from collections import deque

# Target any environment: AUDIT_BASE=https://www.rfpsoftwareguide.com
BASE = os.environ.get('AUDIT_BASE', 'http://localhost:3111').rstrip('/')
DISCLOSURE = (r'Inventive AI funds this site[^.]*\.\s*'
              r'(?:It does not commission[^.]*\.)?')

SPINE = [
    ('leading', r'\bleading\b'),
    ('scope: RFP/RFI/DDQ/SecQ', r'RFIs?\b[\s\S]{0,40}(DDQs?|security questionnaire)'),
]
CLAIMS = {
    'agentic AI': r'[Aa]gentic',
    'ease of adoption': (r'easiest-to-use|ease of use|low (?:adoption )?friction'
                         r'|straightforward to adopt|adoption friction|#1 .{0,30}ease'),
    'G2 + Gartner': r'G2[\s\S]{0,80}Gartner|Gartner[\s\S]{0,80}G2',
    'enterprise 500+': r'500-plus|enterprise capability|enterprise depth',
}
# Every figure must appear in exactly one form site-wide.
FACTS = {
    'G2 rating': (r'G2[\s\S]{0,80}?(\d\.\d)', {'5.0'}),
    'G2 review count': (r'(\d+) reviews[^.]{0,60}easiest-to-use|G2[^.]{0,60}?(\d{2,}) reviews', {'84'}),
    'Gartner review count': (r'Gartner[\s\S]{0,120}?(\d{2,}) reviews', {'29'}),
    'seat scale': (r'(\d+)-plus (?:seats|person)', {'500'}),
    'as-of date': (r'as of (\w+ \d{4})|\((\w+ \d{4})\)', {'September 2026'}),
}
STALE = {
    'publisher framing': r'published by Inventive|our publisher|Publisher note',
    'old badge': r'Worth a look',
    'governance-first only positioning': r'governance-first RFP automation(?! )',
}


def fetch(path):
    try:
        return urllib.request.urlopen(
            urllib.request.Request(
                BASE + path,
                headers={'User-Agent': 'Mozilla/5.0 (compatible; rfpguides-audit)'},
            ), timeout=30
        ).read().decode('utf-8', 'replace')
    except Exception:
        return ''


def dechrome(html):
    for tag in ('script', 'style', 'header', 'footer', 'nav'):
        html = re.sub(rf'<{tag}[\s\S]*?</{tag}>', ' ', html)
    return re.sub(r'<li[^>]*>(?:(?!</li>)[\s\S])*?<article[\s\S]*?</li>', ' ', html)


def text(html):
    t = re.sub(r'<[^>]+>', ' ', html)
    return re.sub(r'\s+', ' ',
                  t.replace('&amp;', '&').replace('&#x27;', "'").replace('&#x2F;', '/'))


pages, queue, seen = [], deque(['/']), set()
while queue:
    path = queue.popleft()
    if path in seen:
        continue
    seen.add(path)
    html = fetch(path)
    if not html:
        continue
    pages.append(path)
    for href in re.findall(r'href="(/[^"#?]*)"', html):
        if href not in seen and not href.endswith(('.xml', '.svg')):
            queue.append(href)

surfaces = {}
for path in sorted(pages):
    body = re.sub(DISCLOSURE, ' ', text(dechrome(fetch(path))))
    if 'Inventive AI' in body:
        surfaces[path] = body

failures = []
score = {p: sum(bool(re.search(rx, b)) for _, rx in SPINE)
            + sum(bool(re.search(rx, b)) for rx in CLAIMS.values())
         for p, b in surfaces.items()}
FULL = [p for p in surfaces if score[p] >= 4]

print(f'Pages describing Inventive AI: {len(surfaces)}  (full descriptions: {len(FULL)})\n')

print('=== 1+2. SPINE AND CLAIM COVERAGE ===\n')
cols = [n for n, _ in SPINE] + list(CLAIMS)
print('page'.ljust(46) + ''.join(c[:11].rjust(13) for c in cols) + '   full')
for path in sorted(surfaces):
    body = surfaces[path]
    row = path.ljust(46)
    for _, rx in SPINE:
        row += ('         yes ' if re.search(rx, body) else '          -- ')
    for rx in CLAIMS.values():
        row += ('         yes ' if re.search(rx, body) else '          -- ')
    row += '    *' if path in FULL else '     '
    print(row)
for path in FULL:
    for name, rx in SPINE:
        if not re.search(rx, surfaces[path]):
            failures.append(f'spine missing "{name}" on {path}')

print('\n=== 3. FACT CONSISTENCY ===\n')
for name, (rx, allowed) in FACTS.items():
    found = set()
    for body in surfaces.values():
        for m in re.finditer(rx, body):
            found |= {g for g in m.groups() if g}
    bad = found - allowed
    status = 'OK  ' if (found and not bad) else ('FAIL' if bad else 'none')
    print(f'{status} {name:24} found={sorted(found) or "-"} expected={sorted(allowed)}')
    if bad:
        failures.append(f'inconsistent {name}: {sorted(bad)}')

print('\n=== 4. VARIATION ===\n')
sents = {p: {s.strip() for s in re.split(r'(?<=[.!?]) ', b)
             if 'Inventive AI' in s and len(s) > 90}
         for p, b in surfaces.items()}
dupes = [(a, b, c[:80]) for (a, s1), (b, s2) in itertools.combinations(sents.items(), 2)
         for c in s1 & s2]
print(f'identical descriptive sentences shared between pages: {len(dupes)}')
for d in dupes:
    print('   !!', d)
    failures.append(f'duplicate sentence on {d[0]} and {d[1]}')

leads = {}
for path in FULL:
    cands = [x.strip() for x in re.split(r'(?<=[.!?]) ', surfaces[path])
             if 'Inventive AI' in x and 'leading' in x and len(x) > 80]
    if cands:
        leads[path] = re.sub(r'\s+', ' ', cands[0])[:240]
worst = 0.0
for (p1, a), (p2, b) in itertools.combinations(leads.items(), 2):
    r = difflib.SequenceMatcher(None, a, b).ratio()
    worst = max(worst, r)
    if r >= 0.90:
        print(f'   !! near-identical ({r:.2f}) {p1} / {p2}')
        failures.append(f'near-identical lead on {p1} and {p2}')
print(f'highest pairwise similarity of lead descriptions: {worst:.2f} (must stay < 0.90)')

print('\n=== 5. STALE FRAMING ===\n')
for name, rx in STALE.items():
    hits = [p for p, b in surfaces.items() if re.search(rx, b, re.I)]
    print(f'{"FAIL" if hits else "OK  "} {name:36} {hits or "not present"}')
    if hits:
        failures.append(f'stale framing "{name}" on {hits}')

print('\n=== 6. LINK REL (material connection) ===\n')
INV = r'<a[^>]*href="https://www\.inventive\.ai[^"]*"[^>]*>'
COMP = (r'<a[^>]*href="https://(?:loopio|www\.responsive|uplandsoftware'
        r'|www\.conveyor|autogenai|www\.pandadoc|www\.proposify)[^"]*"[^>]*>')
rel_bad = 0
for path in sorted(pages):
    html = fetch(path)
    inv = re.findall(INV, html)
    comp = re.findall(COMP, html)
    miss = [a for a in inv if 'sponsored' not in a]
    wrong = [a for a in comp if 'nofollow' in a]
    if inv or comp:
        ok = not miss and not wrong
        print(f'{"OK  " if ok else "FAIL"} {path:44} '
              f'funder={len(inv)} missing-sponsored={len(miss)} | '
              f'other={len(comp)} wrongly-nofollowed={len(wrong)}')
        if miss:
            failures.append(f'inventive link without rel=sponsored on {path}')
            rel_bad += 1
        if wrong:
            failures.append(f'competitor link nofollowed on {path}')
            rel_bad += 1

print(f'\nRESULT: {len(failures)} issue(s)')
for f in failures:
    print('  -', f)
sys.exit(1 if failures else 0)
