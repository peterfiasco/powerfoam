import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Clock, TrendingUp, Shield, Gavel, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const activeAuctions = [
  {
    id: '1',
    name: 'FGN 2029 Bond',
    issueDate: '2025-11-20',
    maturityDate: '2029-11-20',
    couponRate: 13.5,
    minBid: 10000,
    maxBid: 10000000,
    currentYield: 13.2,
    timeLeft: '2h 15m',
    status: 'active',
    totalOffered: 50000000000,
    totalBids: 35000000000,
  },
  {
    id: '2',
    name: 'FGN 2032 Bond',
    issueDate: '2025-11-22',
    maturityDate: '2032-11-22',
    couponRate: 14.0,
    minBid: 10000,
    maxBid: 10000000,
    currentYield: 13.8,
    timeLeft: '1d 5h',
    status: 'active',
    totalOffered: 75000000000,
    totalBids: 42000000000,
  },
  {
    id: '3',
    name: 'FGN 2026 Bond',
    issueDate: '2025-11-18',
    maturityDate: '2026-11-18',
    couponRate: 11.5,
    minBid: 10000,
    maxBid: 10000000,
    currentYield: 11.2,
    timeLeft: 'Closing soon',
    status: 'closing',
    totalOffered: 30000000000,
    totalBids: 28500000000,
  },
];

const yieldCurveData = [
  { tenure: '1Y', yield: 10.5 },
  { tenure: '2Y', yield: 11.2 },
  { tenure: '3Y', yield: 11.8 },
  { tenure: '5Y', yield: 12.5 },
  { tenure: '7Y', yield: 13.0 },
  { tenure: '10Y', yield: 13.5 },
  { tenure: '15Y', yield: 14.0 },
  { tenure: '20Y', yield: 14.2 },
];

export function PrimaryMarket() {
  const [selectedAuction, setSelectedAuction] = useState(activeAuctions[0]);
  const [bidAmount, setBidAmount] = useState('');
  const [bidRate, setBidRate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlaceBid = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setBidAmount('');
      setBidRate('');
    }, 3000);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[#008753] mb-2">Primary Market</h2>
        <p className="text-slate-600">
          Participate in live FGN bond auctions directly from the Central Bank
        </p>
      </div>

      {/* Yield Curve */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Yield Curve</CardTitle>
          <CardDescription>Current market yields across different tenures</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={yieldCurveData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="tenure" className="text-xs" />
              <YAxis className="text-xs" unit="%" />
              <Tooltip 
                formatter={(value: number) => `${value}%`}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="yield" 
                stroke="#008753" 
                strokeWidth={3}
                dot={{ fill: '#008753', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Auctions</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Auction List */}
            <div className="lg:col-span-2 space-y-4">
              {activeAuctions.map((auction) => (
                <Card 
                  key={auction.id}
                  className={`cursor-pointer transition-all ${
                    selectedAuction.id === auction.id 
                      ? 'ring-2 ring-[#008753] border-[#008753]' 
                      : 'hover:border-[#008753]/50'
                  }`}
                  onClick={() => setSelectedAuction(auction)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[#008753]">{auction.name}</h3>
                          <Badge 
                            variant={auction.status === 'closing' ? 'destructive' : 'secondary'}
                            className={auction.status === 'active' ? 'bg-[#008753] text-white' : ''}
                          >
                            {auction.status === 'closing' ? 'Closing Soon' : 'Active'}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500">
                          Maturity: {new Date(auction.maturityDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Clock className="size-4" />
                        <span>{auction.timeLeft}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-slate-500">Coupon Rate</p>
                        <p className="text-[#008753]">{auction.couponRate}%</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Current Yield</p>
                        <p className="text-[#008753]">{auction.currentYield}%</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Min. Bid</p>
                        <p>₦{auction.minBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Subscription</p>
                        <p>{((auction.totalBids / auction.totalOffered) * 100).toFixed(0)}%</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Shield className="size-3 text-[#008753]" />
                        <span>Tax-free coupon payments • Backed by FGN</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bid Placement */}
            <Card className="lg:sticky lg:top-24 h-fit">
              <CardHeader>
                <CardTitle>Place Bid</CardTitle>
                <CardDescription>{selectedAuction.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {showSuccess ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="inline-flex items-center justify-center size-16 bg-[#008753]/10 rounded-full">
                      <CheckCircle2 className="size-8 text-[#008753]" />
                    </div>
                    <div>
                      <p className="text-[#008753]">Bid Placed Successfully!</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Your bid is being processed
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="bidAmount">Bid Amount (₦)</Label>
                      <Input
                        id="bidAmount"
                        type="number"
                        placeholder={`Min: ₦${selectedAuction.minBid.toLocaleString()}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                      <p className="text-xs text-slate-500">
                        Range: ₦{selectedAuction.minBid.toLocaleString()} - ₦{(selectedAuction.maxBid / 1000000).toFixed(0)}M
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bidRate">Desired Yield (%)</Label>
                      <Input
                        id="bidRate"
                        type="number"
                        step="0.1"
                        placeholder={`Current: ${selectedAuction.currentYield}%`}
                        value={bidRate}
                        onChange={(e) => setBidRate(e.target.value)}
                      />
                      <p className="text-xs text-slate-500">
                        Lower yield = higher price, better chance of allocation
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Coupon Rate:</span>
                        <span className="text-[#008753]">{selectedAuction.couponRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Maturity:</span>
                        <span>{new Date(selectedAuction.maturityDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tax Status:</span>
                        <Badge variant="secondary" className="gap-1">
                          <Shield className="size-3" />
                          Tax-Free
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex gap-2">
                        <Gavel className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-blue-900">
                          <p className="mb-1">Competitive Bidding</p>
                          <p className="text-blue-700">
                            Allocation based on yield. Lower yields get priority.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-[#008753] hover:bg-[#006d42]"
                      onClick={handlePlaceBid}
                      disabled={!bidAmount || !bidRate}
                    >
                      <Gavel className="mr-2 size-4" />
                      Place Bid
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'FGN 2035 Bond', date: '2025-11-25', coupon: 14.5, amount: '₦100B' },
              { name: 'FGN 2028 Bond', date: '2025-11-27', coupon: 12.8, amount: '₦75B' },
              { name: 'FGN 2031 Bond', date: '2025-12-02', coupon: 13.5, amount: '₦50B' },
            ].map((bond, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[#008753] mb-1">{bond.name}</h3>
                      <p className="text-sm text-slate-500">
                        Auction: {new Date(bond.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-500">Coupon Rate</p>
                      <p className="text-[#008753]">{bond.coupon}%</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Offer Size</p>
                      <p>{bond.amount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
