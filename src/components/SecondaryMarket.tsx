import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowUpDown, TrendingUp, TrendingDown, Zap, CheckCircle2, Shield, Clock } from 'lucide-react';

const orderBook = {
  bids: [
    { price: 102.50, amount: 50000, total: 51250 },
    { price: 102.25, amount: 100000, total: 102250 },
    { price: 102.00, amount: 75000, total: 76500 },
    { price: 101.75, amount: 125000, taotal: 127187 },
    { price: 101.50, amount: 200000, total: 203000 },
  ],
  asks: [
    { price: 102.75, amount: 75000, total: 77062 },
    { price: 103.00, amount: 100000, total: 103000 },
    { price: 103.25, amount: 50000, total: 51625 },
    { price: 103.50, amount: 150000, total: 155250 },
    { price: 103.75, amount: 100000, total: 103750 },
  ],
};

const availableBonds = [
  {
    id: '1',
    name: 'FGN 2027 Bond',
    couponRate: 12.5,
    maturity: '2027-03-15',
    currentPrice: 102.50,
    change: 0.5,
    volume: 2300000000,
    lastYield: 11.8,
    spread: 0.25,
  },
  {
    id: '2',
    name: 'FGN 2030 Bond',
    couponRate: 13.2,
    maturity: '2030-06-20',
    currentPrice: 99.00,
    change: -0.3,
    volume: 1800000000,
    lastYield: 13.5,
    spread: 0.20,
  },
  {
    id: '3',
    name: 'FGN 2025 Bond',
    couponRate: 10.5,
    maturity: '2025-12-10',
    currentPrice: 101.00,
    change: 0.2,
    volume: 950000000,
    lastYield: 9.8,
    spread: 0.15,
  },
  {
    id: '4',
    name: 'FGN 2028 Bond',
    couponRate: 12.0,
    maturity: '2028-09-15',
    currentPrice: 103.20,
    change: 1.2,
    volume: 1500000000,
    lastYield: 11.2,
    spread: 0.30,
  },
];

const recentTrades = [
  { time: '10:34:22', bond: 'FGN 2027', price: 102.50, amount: 50000, type: 'buy' },
  { time: '10:33:15', bond: 'FGN 2030', price: 99.00, amount: 100000, type: 'sell' },
  { time: '10:32:45', bond: 'FGN 2028', price: 103.20, amount: 75000, type: 'buy' },
  { time: '10:31:30', bond: 'FGN 2025', price: 101.00, amount: 25000, type: 'buy' },
  { time: '10:30:12', bond: 'FGN 2027', price: 102.25, amount: 150000, type: 'sell' },
];

export function SecondaryMarket() {
  const [selectedBond, setSelectedBond] = useState(availableBonds[0]);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [orderAmount, setOrderAmount] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlaceOrder = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setOrderAmount('');
      setOrderPrice('');
    }, 3000);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[#008753] mb-2">Secondary Market</h2>
        <p className="text-slate-600">
          Trade bonds peer-to-peer with instant settlement
        </p>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>24h Volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#008753]">₦6.5B</div>
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <TrendingUp className="size-4" />
              <span>+15.3%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#008753]">1,234</div>
            <div className="text-sm text-slate-600">Live trades</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Settlement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#008753]">3.2s</div>
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <Zap className="size-3" />
              <span>Instant</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Success Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-[#008753]">99.8%</div>
            <div className="text-sm text-slate-600">This month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Bonds */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Bonds</CardTitle>
              <CardDescription>Active bonds in the secondary market</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableBonds.map((bond) => (
                  <div
                    key={bond.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedBond.id === bond.id
                        ? 'border-[#008753] bg-[#008753]/5'
                        : 'border-slate-200 hover:border-[#008753]/50'
                    }`}
                    onClick={() => setSelectedBond(bond)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[#008753]">{bond.name}</h3>
                        <Badge variant="secondary" className="gap-1">
                          <Shield className="size-3" />
                          Tax-Free
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-[#008753]">{bond.currentPrice}</p>
                        <p className={`text-xs flex items-center gap-1 justify-end ${
                          bond.change >= 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {bond.change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                          {bond.change >= 0 ? '+' : ''}{bond.change}%
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div>
                        <p className="text-slate-500">Coupon</p>
                        <p>{bond.couponRate}%</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Yield</p>
                        <p>{bond.lastYield}%</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Spread</p>
                        <p>{bond.spread}%</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Volume</p>
                        <p>₦{(bond.volume / 1000000000).toFixed(1)}B</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Book */}
          <Card>
            <CardHeader>
              <CardTitle>Order Book - {selectedBond.name}</CardTitle>
              <CardDescription>Live bids and asks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {/* Bids */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="size-3 bg-emerald-500 rounded-full" />
                    <span className="text-sm">Bids</span>
                  </div>
                  <div className="space-y-1">
                    {orderBook.bids.map((bid, index) => (
                      <div key={index} className="flex justify-between text-sm bg-emerald-50 rounded px-2 py-1">
                        <span className="text-emerald-700">{bid.price}</span>
                        <span className="text-slate-600">₦{(bid.amount / 1000).toFixed(0)}K</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Asks */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="size-3 bg-red-500 rounded-full" />
                    <span className="text-sm">Asks</span>
                  </div>
                  <div className="space-y-1">
                    {orderBook.asks.map((ask, index) => (
                      <div key={index} className="flex justify-between text-sm bg-red-50 rounded px-2 py-1">
                        <span className="text-red-700">{ask.price}</span>
                        <span className="text-slate-600">₦{(ask.amount / 1000).toFixed(0)}K</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Spread:</span>
                  <span className="text-[#008753]">{selectedBond.spread}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
              <CardDescription>{selectedBond.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="inline-flex items-center justify-center size-16 bg-[#008753]/10 rounded-full">
                    <CheckCircle2 className="size-8 text-[#008753]" />
                  </div>
                  <div>
                    <p className="text-[#008753]">Order Placed!</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Settlement in ~3 seconds
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Tabs value={orderType} onValueChange={(v) => setOrderType(v as 'buy' | 'sell')}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="buy">Buy</TabsTrigger>
                      <TabsTrigger value="sell">Sell</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder={selectedBond.currentPrice.toString()}
                      value={orderPrice}
                      onChange={(e) => setOrderPrice(e.target.value)}
                    />
                    <p className="text-xs text-slate-500">
                      Market price: {selectedBond.currentPrice}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Min: ₦10,000"
                      value={orderAmount}
                      onChange={(e) => setOrderAmount(e.target.value)}
                    />
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Coupon Rate:</span>
                      <span className="text-[#008753]">{selectedBond.couponRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Current Yield:</span>
                      <span className="text-[#008753]">{selectedBond.lastYield}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Maturity:</span>
                      <span>{new Date(selectedBond.maturity).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex gap-2">
                      <Zap className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-900">
                        <p className="mb-1">Instant Settlement</p>
                        <p className="text-blue-700">
                          Digital settlement in ~3 seconds after matching
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`w-full ${
                      orderType === 'buy'
                        ? 'bg-[#008753] hover:bg-[#006d42]'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                    onClick={handlePlaceOrder}
                    disabled={!orderAmount || !orderPrice}
                  >
                    <ArrowUpDown className="mr-2 size-4" />
                    {orderType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
              <CardDescription>Last 5 transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentTrades.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between text-sm border-b border-slate-100 pb-2 last:border-0">
                    <div>
                      <p className="text-slate-900">{trade.bond}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="size-3" />
                        {trade.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={trade.type === 'buy' ? 'text-emerald-600' : 'text-red-600'}>
                        {trade.price}
                      </p>
                      <p className="text-xs text-slate-500">
                        ₦{(trade.amount / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}