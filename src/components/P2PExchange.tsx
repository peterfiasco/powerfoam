import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { InfoTooltip } from './InfoTooltip';
import { X, RefreshCw, TrendingUp, TrendingDown, User } from 'lucide-react';

interface P2PExchangeProps {
  onClose: () => void;
}

export function P2PExchange({ onClose }: P2PExchangeProps) {
  const [activeTab, setActiveTab] = useState('buy');

  const listings = [
    {
      id: 1,
      seller: 'Adewale K.',
      bondName: 'FGN 2034 Bond',
      amount: 500000,
      price: 485000,
      discount: 3.0,
      couponRate: 14.55,
      maturity: '2034-03-28',
      rating: 4.8,
      trades: 23,
    },
    {
      id: 2,
      seller: 'Ngozi O.',
      bondName: 'FGN 2032 Bond',
      amount: 750000,
      price: 735000,
      discount: 2.0,
      couponRate: 16.25,
      maturity: '2032-04-28',
      rating: 5.0,
      trades: 47,
    },
    {
      id: 3,
      seller: 'Ibrahim M.',
      bondName: 'FGN 2029 Bond',
      amount: 300000,
      price: 291000,
      discount: 3.0,
      couponRate: 13.98,
      maturity: '2029-02-27',
      rating: 4.9,
      trades: 35,
    },
  ];

  const myListings = [
    {
      id: 1,
      bondName: 'FGN 2034 Bond',
      amount: 250000,
      price: 242500,
      discount: 3.0,
      views: 12,
      offers: 2,
      status: 'Active',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-2xl sm:mx-4 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 p-2 rounded-lg">
              <RefreshCw size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Peer to Peer Exchange</h2>
              <p className="text-gray-600 text-sm">Trade bonds with other investors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="buy">Buy Bonds</TabsTrigger>
              <TabsTrigger value="sell">Sell Bonds</TabsTrigger>
              <TabsTrigger value="my-listings">My Listings</TabsTrigger>
            </TabsList>

            {/* Buy Tab */}
            <TabsContent value="buy" className="space-y-4 mt-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <TrendingDown size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-blue-900">Buy Below Face Value</h4>
                      <p className="text-blue-700 text-sm mt-1">
                        Purchase bonds from other investors at discounted prices and enjoy the full coupon payments.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {listings.map((listing) => (
                <Card key={listing.id} className="border-gray-200">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-gray-900">{listing.bondName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <User size={14} className="text-gray-400" />
                            <span className="text-gray-600 text-sm">{listing.seller}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            ⭐ {listing.rating} ({listing.trades} trades)
                          </Badge>
                        </div>
                      </div>
                      <Badge className="bg-green-600 hover:bg-green-700">
                        {listing.discount}% Off
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600 text-xs">Face Value</p>
                        <p className="text-gray-900">₦{listing.amount.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600 text-xs">Your Price</p>
                        <p className="text-[#008753]">₦{listing.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 text-xs flex items-center gap-1">
                          Coupon Rate
                          <InfoTooltip content="Annual interest rate you'll receive on the face value" />
                        </p>
                        <p className="text-gray-900">{listing.couponRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Maturity Date</p>
                        <p className="text-gray-900">{new Date(listing.maturity).toLocaleDateString('en-NG')}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 text-sm">Instant Savings</span>
                        <span className="text-green-600">₦{(listing.amount - listing.price).toLocaleString()}</span>
                      </div>
                      <Button className="w-full bg-[#008753] hover:bg-[#006d42]">
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Sell Tab */}
            <TabsContent value="sell" className="space-y-4 mt-4">
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <TrendingUp size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-amber-900">Sell Before Maturity</h4>
                      <p className="text-amber-700 text-sm mt-1">
                        Need cash before your bond matures? List your bonds for sale and get paid quickly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label>Select Bond to Sell</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
                      <option>FGN 2034 Bond - ₦1,000,000</option>
                      <option>FGN 2029 Bond - ₦800,000</option>
                      <option>FGN 2032 Bond - ₦700,000</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="sell-amount">Amount to Sell (₦)</Label>
                    <Input 
                      id="sell-amount"
                      type="number" 
                      placeholder="Enter amount"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="discount">Discount Percentage</Label>
                    <Input 
                      id="discount"
                      type="number" 
                      placeholder="e.g., 3.0"
                      className="mt-1"
                      step="0.1"
                    />
                    <p className="text-gray-600 text-xs mt-1">
                      Typical discounts range from 2-5% for quick sales
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Face Value</span>
                      <span className="text-gray-900">₦500,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount (3%)</span>
                      <span className="text-red-600">-₦15,000</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-900">You'll Receive</span>
                      <span className="text-[#008753]">₦485,000</span>
                    </div>
                  </div>

                  <Button className="w-full bg-[#008753] hover:bg-[#006d42]">
                    Create Listing
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Listings Tab */}
            <TabsContent value="my-listings" className="space-y-4 mt-4">
              {myListings.length > 0 ? (
                myListings.map((listing) => (
                  <Card key={listing.id} className="border-gray-200">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-gray-900">{listing.bondName}</h4>
                          <Badge className="bg-[#008753] hover:bg-[#006d42] mt-1">
                            {listing.status}
                          </Badge>
                        </div>
                        <Badge variant="outline">
                          {listing.discount}% Discount
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-600 text-xs">Listed Amount</p>
                          <p className="text-gray-900">₦{listing.amount.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-600 text-xs">Selling Price</p>
                          <p className="text-[#008753]">₦{listing.price.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                        <span className="text-gray-600">{listing.views} views</span>
                        <span className="text-gray-600">{listing.offers} offers</span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Edit
                        </Button>
                        <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-gray-200">
                  <CardContent className="p-8 text-center">
                    <RefreshCw size={48} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No active listings</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Create a listing to sell your bonds
                    </p>
                    <Button 
                      className="mt-4 bg-[#008753] hover:bg-[#006d42]"
                      onClick={() => setActiveTab('sell')}
                    >
                      Create Listing
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
