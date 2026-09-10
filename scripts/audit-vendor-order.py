"""Is Inventive AI always positioned first where it appears with other RFP tools?

Four independent measures, because a single one hides regressions:
  A. First-occurrence order in the visible body of every page.
  B. Order inside every structural list, table and definition list (2+ vendors).
  C. Order inside JSON-LD — FAQ answers and ItemLists are what AI answer
     engines and rich results read, and they can drift from the visible copy.
  D. Order inside the RSS feed.

Site chrome (header/nav/footer) and listing cards are excluded: they repeat
site-wide and would otherwise mask the real content order. The trailing funding
disclosure is excluded from A — it is a footnote, not a placement.
"""
import json
import re
import sys
import os
import urllib.request
from collections import deque

# Target any environment: AUDIT_BASE=https://www.rfpsoftwareguide.com
BASE = os.environ.get('AUDIT_BASE', 'http://localhost:3111').rstrip('/')
VENDORS = ['Inventive AI', 'AutogenAI', 'Conveyor', 'Loopio', 'Qvidian',
           'Responsive', 'PandaDoc', 'Proposify']
TARGET = 'Inventive AI'
DISCLOSURE = r'Inventive AI funds this site[^.]*\.'


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
    # Listing cards repeat an article's title/description on every index.
    return re.sub(r'<li[^>]*>(?:(?!</li>)[\s\S])*?<article[\s\S]*?</li>', ' ', html)


def text(html):
    t = re.sub(r'<[^>]+>', ' ', html)
    return re.sub(r'\s+', ' ',
                  t.replace('&amp;', '&').replace('&#x27;', "'").replace('&#x2F;', '/'))


def order_in(blob):
    """Vendor names by first appearance, de-duplicated."""
    hits = sorted((blob.find(v), v) for v in VENDORS if v in blob)
    return [v for _, v in hits]


def check(label, blob, failures, results):
    names = order_in(blob)
    if len(names) < 2 or TARGET not in names:
        return
    idx = names.index(TARGET) + 1
    results.append((idx == 1, label, idx, len(names), names))
    if idx != 1:
        failures.append((label, names))


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

failures, results = [], []

# ---- A. visible body order --------------------------------------------------
for path in sorted(pages):
    body = re.sub(DISCLOSURE, ' ', text(dechrome(fetch(path))))
    check(f'A body   {path}', body, failures, results)

# ---- B. lists, tables, definition lists ------------------------------------
for path in sorted(pages):
    body = dechrome(fetch(path))
    for m in re.finditer(r'<(ol|ul|table|dl)\b[\s\S]*?</\1>', body):
        check(f'B <{m.group(1)}>  {path}', text(m.group(0)), failures, results)

# ---- C. JSON-LD -------------------------------------------------------------
def walk(node, out):
    if isinstance(node, dict):
        for v in node.values():
            walk(v, out)
    elif isinstance(node, list):
        for v in node:
            walk(v, out)
    elif isinstance(node, str):
        out.append(node)

for path in sorted(pages):
    html = fetch(path)
    for block in re.findall(
            r'type="application/ld\+json">(.*?)</script>', html, re.S):
        try:
            data = json.loads(block.replace('\\u003c', '<'))
        except Exception:
            continue
        strings = []
        walk(data, strings)
        joined = ' '.join(strings)
        joined = re.sub(DISCLOSURE, ' ', joined)
        check(f'C json-ld {path}', joined, failures, results)

# ---- D. RSS -----------------------------------------------------------------
rss = fetch('/rss.xml')
if rss:
    check('D rss.xml', text(rss), failures, results)

for ok, label, idx, total, names in results:
    print(f'{"OK  " if ok else "FAIL"} {label:56} #{idx} of {total}')
    if not ok:
        print(f'       {names}')

print(f'\nchecked {len(results)} vendor co-occurrences across {len(pages)} pages')
print(f'RESULT: {len(failures)} violation(s)')
sys.exit(1 if failures else 0)
