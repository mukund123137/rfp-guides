"""Test 2: is Inventive AI always first where it appears with other RFP tools?

Two independent measures:
  A. First-occurrence order per page — what a reader meets first.
  B. Order inside each structural list/table containing 2+ vendors.
Site chrome (header/nav/footer) is excluded so repeated site-wide links do not
count. The trailing funding disclosure is excluded from measure A for the same
reason: it is a footnote, not a placement.
"""
import re, urllib.request, sys
from collections import deque

BASE = 'http://localhost:3111'
VENDORS = ['Inventive AI', 'AutogenAI', 'Conveyor', 'Loopio', 'Qvidian',
           'Responsive', 'PandaDoc', 'Proposify']
TARGET = 'Inventive AI'

def fetch(p):
    try:
        return urllib.request.urlopen(
            urllib.request.Request(BASE + p, headers={'User-Agent': 'a'})
        ).read().decode('utf-8', 'replace')
    except Exception:
        return ''

def dechrome(html):
    for tag in ('script', 'style', 'header', 'footer', 'nav'):
        html = re.sub(rf'<{tag}[\s\S]*?</{tag}>', ' ', html)
    return html

def text(html):
    t = re.sub(r'<[^>]+>', ' ', html)
    return re.sub(r'\s+', ' ', t.replace('&amp;', '&').replace('&#x27;', "'"))

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

fails = []

print('=== A. FIRST-OCCURRENCE ORDER PER PAGE ===\n')
for p in sorted(pages):
    body = dechrome(fetch(p))
    t = text(body)
    # Drop the funding footnote: it is a disclosure, not a vendor placement.
    t = re.sub(r'Inventive AI (funds|does not commission)[^.]*\.', ' ', t)
    t = re.sub(r'It also funds this site[^.]*\.', ' ', t)
    firsts = sorted((t.find(v), v) for v in VENDORS if t.find(v) != -1)
    names = [v for _, v in firsts]
    if len(names) < 2 or TARGET not in names:
        continue
    idx = names.index(TARGET) + 1
    ok = idx == 1
    print(f'{"✓" if ok else "✗"} {p:44} #{idx} of {len(names)}  {names}')
    if not ok:
        fails.append(('page-order', p, names))

print('\n=== B. ORDER INSIDE STRUCTURAL LISTS AND TABLES ===\n')
for p in sorted(pages):
    body = dechrome(fetch(p))
    for m in re.finditer(r'<(ol|ul|table)\b[\s\S]*?</\1>', body):
        block = m.group(0)
        # Only the outermost list; skip nested duplicates by length heuristic.
        t = text(block)
        firsts = sorted((t.find(v), v) for v in VENDORS if t.find(v) != -1)
        names = [v for _, v in firsts]
        if len(names) < 2 or TARGET not in names:
            continue
        idx = names.index(TARGET) + 1
        ok = idx == 1
        tag = m.group(1)
        print(f'{"✓" if ok else "✗"} {p:40} <{tag}> #{idx} of {len(names)}  {names}')
        if not ok:
            fails.append(('list', p, names))

print(f'\n=== RESULT: {len(fails)} violation(s) ===')
for kind, p, names in fails:
    print(f'  {kind:11} {p:44} {names}')
sys.exit(1 if fails else 0)
