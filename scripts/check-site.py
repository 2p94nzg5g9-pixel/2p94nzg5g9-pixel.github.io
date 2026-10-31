#!/usr/bin/env python3
"""Check local static routes, fragments, assets, and page structure; no network or writes."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import sys
ROOT=Path(__file__).resolve().parents[1]
class Document(HTMLParser):
 def __init__(self):super().__init__();self.ids=set();self.duplicate_ids=[];self.links=[];self.h1=0;self.title=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='title':self.title+=1
  if 'id' in a:
   if a['id'] in self.ids:self.duplicate_ids.append(a['id'])
   self.ids.add(a['id'])
  for attr in ('href','src'):
   if attr in a:self.links.append(a[attr])
docs={};errors=[];count=0
for p in ROOT.rglob('*.html'):
 if '.git' in p.parts or '.artifacts' in p.parts:continue
 d=Document();d.feed(p.read_text());docs[p.resolve()]=d
 if d.h1!=1:errors.append(f'{p.relative_to(ROOT)}: expected one h1, got {d.h1}')
 if d.title!=1:errors.append(f'{p.relative_to(ROOT)}: expected one title, got {d.title}')
 if d.duplicate_ids:errors.append(f'{p.relative_to(ROOT)}: duplicate IDs {d.duplicate_ids}')
for p,d in docs.items():
 for link in d.links:
  u=urlsplit(urljoin('https://local.test/'+str(p.relative_to(ROOT)),link))
  if u.netloc!='local.test' or u.scheme not in ('http','https'):continue
  target=ROOT/unquote(u.path).lstrip('/')
  if target.is_dir():target=target/'index.html'
  count+=1
  if not target.is_file():errors.append(f'{p.relative_to(ROOT)}: missing {link}');continue
  if u.fragment and target.resolve() in docs and unquote(u.fragment) not in docs[target.resolve()].ids:errors.append(f'{p.relative_to(ROOT)}: missing fragment {link}')
if errors:
 print('\n'.join(errors));sys.exit(1)
print(f'PASS: {len(docs)} HTML pages, {count} internal routes/assets/fragments; one h1 and no duplicate IDs per page.')
