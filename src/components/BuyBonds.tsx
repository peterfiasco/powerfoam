import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { InfoTooltip } from './InfoTooltip';
import { TrendingUp, Calendar, Percent, Target } from 'lucide-react';

export function BuyBonds() {
  const [selectedBond, setSelectedBond] = useState<any>(null);
  const [purchaseAmount, setPurchaseAmount] = useState('');

  const availableBonds = [
    {
      id: 1,
      name: 'FGN 2035 Bond',
      couponRate: 15.45,
      maturity: '2035-06-28',
      minInvestment: 50000,
      yieldToMaturity: 15.89,
      rating: 'B+',
      issueDate: '2023-06-28',
      paymentFrequency: 'Semi-annually',
    },
    {
      id: 2,
      name: 'FGN 2030 Bond',
      couponRate: 13.53,
      maturity: '2030-03-21',
      minInvestment: 50000,
      yieldToMaturity: 14.12,
      rating: 'B+',
      issueDate: '2023-03-21',
      paymentFrequency: 'Semi-annually',
    },
    {
      id: 3,
      name: 'FGN 2038 Bond',
      couponRate: 16.29,
      maturity: '2038-04-28',
      minInvestment: 50000,
      yieldToMaturity: 16.75,
      rating: 'B+',
      issueDate: '2023-04-28',
      paymentFrequency: 'Semi-annually',
    },
    {
      id: 4,
      name: 'FGN 2028 Bond',
      couponRate: 12.75,
      maturity: '2028-04-27',
      minInvestment: 50000,
      yieldToMaturity: 13.22,
      rating: 'B+',
      issueDate: '2023-04-27',
      paymentFrequency: 'Semi-annually',
    },
    {
      id: 5,
      name: 'FGN 2033 Bond',
      couponRate: 14.70,
      maturity: '2033-02-23',
      minInvestment: 50000,
      yieldToMaturity: 15.18,
      rating: 'B+',
      issueDate: '2023-02-23',
      paymentFrequency: 'Semi-annually',
    },
  ];

  const handleBuyClick = (bond: any) => {
    setSelectedBond(bond);
    setPurchaseAmount('');
  };

  const handlePurchase = () => {
    // In a real app, this would process the purchase
    alert(`Purchase successful! You've invested ₦${parseInt(purchaseAmount).toLocaleString()} in ${selectedBond.name}`);
    setSelectedBond(null);
    setPurchaseAmount('');
  };

  const calculateAnnualReturn = () => {
    if (!purchaseAmount || !selectedBond) return 0;
    return (parseInt(purchaseAmount) * selectedBond.couponRate) / 100;
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Available Bonds</h2>
        <p className="text-gray-600 text-sm mt-1">
          Invest in Nigerian Government Bonds with competitive returns
        </p>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="bg-blue-100 p-2 rounded-lg h-fit">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <div>
              <h4 className="text-blue-900">Safe & Secure Investment</h4>
              <p className="text-blue-700 text-sm mt-1">
                Government bonds are backed by the Federal Republic of Nigeria and offer tax-free coupon payments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bond List */}
      <div className="space-y-3">
        {availableBonds.map((bond) => (
          <Card key={bond.id} className="border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-gray-900">{bond.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Rating: {bond.rating}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-[#008753]/10 px-3 py-1 rounded-lg">
                    <p className="text-[#008753] text-xl">{bond.couponRate}%</p>
                    <p className="text-gray-600 text-xs">Coupon Rate</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Calendar size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-xs flex items-center gap-1">
                      Maturity Date
                      <InfoTooltip content="When the bond expires and you receive your full investment back." />
                    </p>
                    <p className="text-gray-900 text-sm">
                      {new Date(bond.maturity).toLocaleDateString('en-NG')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Percent size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-xs flex items-center gap-1">
                      Yield to Maturity
                      <InfoTooltip content="The total return you'll earn if you hold the bond until maturity, including coupon payments." />
                    </p>
                    <p className="text-gray-900 text-sm">{bond.yieldToMaturity}%</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <Target size={16} className="text-gray-400" />
                <span className="text-gray-600 text-sm">
                  Minimum Investment: ₦{bond.minInvestment.toLocaleString()}
                </span>
              </div>

              <Button 
                className="w-full bg-[#008753] hover:bg-[#006d42]"
                onClick={() => handleBuyClick(bond)}
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Purchase Dialog */}
      <Dialog open={!!selectedBond} onOpenChange={() => setSelectedBond(null)}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Purchase {selectedBond?.name}</DialogTitle>
            <DialogDescription>
              Enter the amount you wish to invest in this bond
            </DialogDescription>
          </DialogHeader>

          {selectedBond && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coupon Rate</span>
                  <span className="text-gray-900">{selectedBond.couponRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Frequency</span>
                  <span className="text-gray-900">{selectedBond.paymentFrequency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Minimum Investment</span>
                  <span className="text-gray-900">₦{selectedBond.minInvestment.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="amount">Investment Amount (₦)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder={`Min. ₦${selectedBond.minInvestment.toLocaleString()}`}
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  className="mt-1"
                  min={selectedBond.minInvestment}
                  step={1000}
                />
              </div>

              {purchaseAmount && parseInt(purchaseAmount) >= selectedBond.minInvestment && (
                <div className="bg-[#008753]/10 p-4 rounded-lg space-y-2">
                  <p className="text-gray-600 text-sm">Estimated Annual Return</p>
                  <p className="text-[#008753] text-2xl">
                    ₦{calculateAnnualReturn().toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-xs">
                    Paid {selectedBond.paymentFrequency.toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSelectedBond(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-[#008753] hover:bg-[#006d42]"
              onClick={handlePurchase}
              disabled={!purchaseAmount || parseInt(purchaseAmount) < (selectedBond?.minInvestment || 0)}
            >
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
