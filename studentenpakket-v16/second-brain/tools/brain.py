"""Explicit local teaching fixture. No network, models, shell or third-party packages."""
import argparse,json,re
from pathlib import Path

def ident(x):
 if not isinstance(x,str) or not re.fullmatch(r'[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}',x):raise ValueError('Gebruik een eenvoudige ID')
 return x

def read(vault):
 p=Path(vault)/'records.json'
 return json.loads(p.read_text()) if p.exists() else []

def ingest(vault,incoming):
 rows=read(vault); byid={r['id']:r for r in rows};added=[];duplicate=[]
 for r in incoming:
  for k in ['id','project','key']:ident(r[k])
  if r['status'] not in ['confirmed','idea']:raise ValueError('Onbekende bronstatus')
  for k in ['value','date','source']:
   if not isinstance(r[k],str) or not r[k]:raise ValueError('Bronveld ontbreekt')
  for old in r.get('supersedes',[]):
   ident(old)
   if old not in byid or byid[old]['project']!=r['project'] or byid[old]['key']!=r['key']:raise ValueError('Vervanging moet binnen hetzelfde project en onderwerp vallen')
   if r['status']!='confirmed':raise ValueError('Alleen bevestigd besluit vervangt bron')
  if r['id'] in byid:
   if r!=byid[r['id']]:raise ValueError('Bron-ID bestaat met andere inhoud; maak een nieuwe bronversie')
   duplicate.append(r['id']);continue
  rows.append(r);byid[r['id']]=r;added.append(r['id'])
 v=Path(vault);v.mkdir(parents=True,exist_ok=True)
 p=v/'records.json';tmp=v/'records.tmp';tmp.write_text(json.dumps(rows,ensure_ascii=False,indent=2));tmp.replace(p)
 return dict(added=added,duplicates=duplicate,count=len(rows))

def query(vault,project,key):
 ident(project);ident(key)
 rows=[r for r in read(vault) if r['project']==project and r['key']==key]
 superseded={s for r in rows if r['status']=='confirmed' for s in r.get('supersedes',[])}
 current=[r for r in rows if r['status']=='confirmed' and r['id'] not in superseded]
 conflict=len({r['value'] for r in current})>1
 return dict(project=project,key=key,status='CONFLICT' if conflict else 'FOUND' if current else 'NOT_FOUND',value=current[0]['value'] if current and not conflict else None,sources=current,history=[r for r in rows if r not in current])

def main():
 a=argparse.ArgumentParser();s=a.add_subparsers(dest='action',required=True)
 p=s.add_parser('ingest');p.add_argument('--vault',required=True);p.add_argument('--input',required=True)
 p=s.add_parser('query');p.add_argument('--vault',required=True);p.add_argument('--project',required=True);p.add_argument('--key',required=True)
 x=a.parse_args();print(json.dumps(ingest(x.vault,json.loads(Path(x.input).read_text())) if x.action=='ingest' else query(x.vault,x.project,x.key),ensure_ascii=False,indent=2))
if __name__=='__main__':main()
