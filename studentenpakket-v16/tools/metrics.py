"""Strict, local-only arithmetic for the explicitly limited course CSV contract."""
import argparse
import csv
import json
from decimal import Decimal, InvalidOperation
from pathlib import Path

class DataError(ValueError):
    pass

def number(row, key, integer=False):
    value=row.get(key)
    if value is None or not str(value).strip():
        raise DataError(f'Ontbrekend veld: {key}; onbekend is niet nul.')
    try:
        n=Decimal(str(value))
    except InvalidOperation as exc:
        raise DataError(f'Ongeldig getal in {key}.') from exc
    if not n.is_finite() or n<0 or (integer and n!=n.to_integral_value()):
        raise DataError(f'{key} moet een eindig niet-negatief '+('geheel getal' if integer else 'getal')+' zijn.')
    return n

def orders_metrics(rows):
    if not rows:raise DataError('Geen orderdata. Vul eigen brongegevens in of kies expliciet een technische test.')
    seen=set();gross=refund=cost=Decimal(0);paid=0
    for row in rows:
        oid=row.get('order_id','').strip()
        if not oid or oid in seen:raise DataError('Leeg of dubbel order_id: '+oid)
        seen.add(oid)
        amount=number(row,'bedrag_eur');c=number(row,'kost_eur');status=row.get('status')
        if status not in ('betaald','terugbetaald','open'):raise DataError('Niet-ondersteunde orderstatus: '+str(status))
        if status=='open':continue
        gross+=amount
        if status=='terugbetaald':refund+=amount
        else:cost+=c;paid+=1
    return {'bruto_eur':str(gross),'refunds_eur':str(refund),'netto_na_refunds_eur':str(gross-refund),'bekende_productkosten_eur':str(cost),'productbijdrage_voor_overige_kosten_eur':str(gross-refund-cost),'behouden_betaalde_orders':paid,'nettowinst':None,'beperking':'Volledige refunds, unieke orders, EUR. Overige kosten en cash niet vastgesteld.'}

def subscriptions_metrics(rows):
    if not rows:raise DataError('Geen abonnementsdata.')
    seen=set();result=[]
    for row in rows:
        period=row.get('id','').strip()
        if not period or period in seen:raise DataError('Lege of dubbele periode.')
        seen.add(period)
        start=number(row,'start_actief',True);new=number(row,'nieuw',True);cancel=number(row,'opgezegd',True);end=number(row,'eind_actief',True);price=number(row,'prijs_eur')
        if cancel>start:raise DataError('Opzeggingen moeten tot het begincohort behoren; gebruik een uitgebreider schema.')
        if start+new-cancel!=end:raise DataError('Eindstand sluit niet aan op start + nieuw - opgezegd.')
        if row.get('status') not in ('BEVESTIGD','TESTDATA'):raise DataError('Bevestig de bronstatus van de periode.')
        result.append({'periode':period,'actief_eind':int(end),'mrr_eur':str(end*price),'churn':str(cancel/start) if start else None,'beperking':'Uniforme maandprijs; opzeggingen uit begincohort. Geen pauzes, heractivaties of gemengde intervallen.'})
    return result

def read_csv(path):
    with path.open(newline='',encoding='utf-8-sig') as f:return list(csv.DictReader(f))

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--orders',type=Path,required=True);p.add_argument('--subscriptions',type=Path,required=True)
    p.add_argument('--data-kind',choices=['test','eigen'],required=True)
    args=p.parse_args()
    try:
        if args.data_kind=='eigen' and any('fixtures' in x.parts or 'tests' in x.parts for x in [args.orders,args.subscriptions]):raise DataError('Technische fixtures mogen niet als eigen bedrijfsdata worden gepresenteerd.')
        o=read_csv(args.orders);s=read_csv(args.subscriptions)
        if args.data_kind=='eigen' and any(r.get('status')=='TESTDATA' for r in s):raise DataError('TESTDATA is geen eigen bedrijfsdata.')
        result={'data_kind':args.data_kind,'live_account_verified':False,'orders':orders_metrics(o),'subscriptions':subscriptions_metrics(s)}
    except (DataError,OSError) as exc:p.exit(2,f'Inputcontrole: {exc}\n')
    print(json.dumps(result,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
