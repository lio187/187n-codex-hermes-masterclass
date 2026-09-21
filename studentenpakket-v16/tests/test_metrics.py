import unittest
from decimal import Decimal
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'tools'))
from metrics import orders_metrics, subscriptions_metrics, DataError

def order(**kw):
    return dict({'order_id':'TEST-001','bedrag_eur':'20','kost_eur':'6','status':'betaald'},**kw)
def period(**kw):
    return dict({'id':'TECH-01','start_actief':'10','nieuw':'3','opgezegd':'1','eind_actief':'12','prijs_eur':'5','status':'TESTDATA'},**kw)
class MetricsTests(unittest.TestCase):
    def test_refund_and_open_not_profit(self):
        r=orders_metrics([order(),order(order_id='TEST-002',bedrag_eur='10',kost_eur='3',status='terugbetaald'),order(order_id='TEST-003',status='open')])
        self.assertEqual(Decimal(r['bruto_eur']),30);self.assertEqual(Decimal(r['refunds_eur']),10)
        self.assertEqual(Decimal(r['productbijdrage_voor_overige_kosten_eur']),14);self.assertIsNone(r['nettowinst'])
    def test_no_rows_is_not_zero(self):
        for fn in (orders_metrics,subscriptions_metrics):
            with self.assertRaises(DataError):fn([])
    def test_duplicate_order(self):
        with self.assertRaises(DataError):orders_metrics([order(),order()])
    def test_missing_cost(self):
        with self.assertRaises(DataError):orders_metrics([order(kost_eur='')])
    def test_partial_refund_requires_new_schema(self):
        with self.assertRaises(DataError):orders_metrics([order(status='gedeeltelijke_refund')])
    def test_bad_numbers(self):
        for value in ('NaN','Infinity','-1','abc'):
            with self.subTest(value=value),self.assertRaises(DataError):orders_metrics([order(bedrag_eur=value)])
    def test_subscription_math(self):
        r=subscriptions_metrics([period()])[0]
        self.assertEqual(r['actief_eind'],12);self.assertEqual(Decimal(r['mrr_eur']),60);self.assertEqual(Decimal(r['churn']),Decimal('.1'))
    def test_zero_denominator(self):
        self.assertIsNone(subscriptions_metrics([period(start_actief='0',nieuw='1',opgezegd='0',eind_actief='1')])[0]['churn'])
    def test_bad_end(self):
        with self.assertRaises(DataError):subscriptions_metrics([period(eind_actief='99')])
    def test_fractional_count(self):
        with self.assertRaises(DataError):subscriptions_metrics([period(start_actief='10.5')])
    def test_wrong_cohort(self):
        with self.assertRaises(DataError):subscriptions_metrics([period(opgezegd='11',eind_actief='2')])
    def test_duplicate_period(self):
        with self.assertRaises(DataError):subscriptions_metrics([period(),period()])
if __name__=='__main__':unittest.main()
