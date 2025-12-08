import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, ShoppingCart, PiggyBank, Fingerprint, Eye, EyeOff, Home, BarChart3, User } from 'lucide-react';

export function MobileView() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'portfolio' | 'profile'>('home');

  const bondHoldings = [
    { name: 'FGN 2027', value: 102500, change: 2.5, coupon: 12.5 },
    { name: 'FGN 2030', value: 148500, change: -1.0, coupon: 13.2 },
    { name: 'FGN 2025', value: 50500, change: 1.0, coupon: 10.5 },
  ];

  const totalValue = bondHoldings.reduce((sum, bond) => sum + bond.value, 0);

  return (
    <div className="flex items-center justify-center p-4 bg-slate-100 min-h-[calc(100vh-73px)]">
      <div className="w-full max-w-[400px]">
        <div className="mb-4 text-center">
          <p className="text-sm text-slate-600">Mobile App Preview</p>
        </div>

        {/* Mobile Frame */}
        <div className="bg-slate-900 rounded-[3rem] p-3 shadow-2xl">
          <div className="bg-white rounded-[2.5rem] overflow-hidden">
            {/* Status Bar */}
            <div className="bg-gradient-to-r from-[#008753] to-[#00a864] px-6 pt-3 pb-2">
              <div className="flex items-center justify-between text-white text-xs mb-1">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="size-4 bg-white/20 rounded-sm" />
                  <div className="size-4 bg-white/20 rounded-sm" />
                  <div className="size-4 bg-white/20 rounded-sm" />
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="h-[700px] overflow-y-auto bg-slate-50">
              {activeTab === 'home' && (
                <div className="p-4 space-y-4">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#008753] to-[#00a864] rounded-2xl p-4 text-white -mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white/80 text-sm">Total Portfolio</p>
                        <div className="flex items-center gap-2 mt-1">
                          {showBalance ? (
                            <h2 className="text-white">₦{totalValue.toLocaleString()}</h2>
                          ) : (
                            <h2 className="text-white">••••••</h2>
                          )}
                          <button onClick={() => setShowBalance(!showBalance)}>
                            {showBalance ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="size-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Fingerprint className="size-5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        className="bg-white text-[#008753] hover:bg-white/90 gap-2"
                      >
                        <ShoppingCart className="size-4" />
                        Buy
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/30 text-white hover:bg-white/10 gap-2"
                      >
                        <PiggyBank className="size-4" />
                        Stake
                      </Button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <Card>
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-slate-500 mb-1">Bonds</p>
                        <p className="text-[#008753]">3</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-slate-500 mb-1">Avg Yield</p>
                        <p className="text-[#008753]">12.5%</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-slate-500 mb-1">Gain</p>
                        <p className="text-emerald-600">+3.5%</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Holdings */}
                  <div>
                    <h3 className="mb-3">Your Holdings</h3>
                    <div className="space-y-2">
                      {bondHoldings.map((bond, index) => (
                        <Card key={index}>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="size-10 bg-gradient-to-br from-[#008753] to-[#00a864] rounded-lg" />
                                <div>
                                  <p className="text-sm text-slate-900">{bond.name}</p>
                                  <p className="text-xs text-slate-500">{bond.coupon}% Coupon</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm">₦{bond.value.toLocaleString()}</p>
                                <p className={`text-xs flex items-center gap-1 justify-end ${
                                  bond.change >= 0 ? 'text-emerald-600' : 'text-red-600'
                                }`}>
                                  {bond.change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                                  {bond.change >= 0 ? '+' : ''}{bond.change}%
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant="secondary" className="text-xs">Tax-Free</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Card className="cursor-pointer hover:border-[#008753] transition-colors">
                        <CardContent className="p-4 text-center">
                          <div className="size-12 bg-[#008753]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <ShoppingCart className="size-5 text-[#008753]" />
                          </div>
                          <p className="text-sm">Browse Bonds</p>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer hover:border-[#008753] transition-colors">
                        <CardContent className="p-4 text-center">
                          <div className="size-12 bg-[#008753]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <PiggyBank className="size-5 text-[#008753]" />
                          </div>
                          <p className="text-sm">Stake Bonds</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div className="p-4 space-y-4">
                  <h2 className="text-[#008753]">Portfolio</h2>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <p className="text-sm text-slate-500 mb-1">Total Value</p>
                        <h2 className="text-[#008753]">₦{totalValue.toLocaleString()}</h2>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#008753] to-[#00a864]" style={{ width: '75%' }} />
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
                        <div>
                          <p className="text-slate-500">Invested</p>
                          <p className="text-[#008753]">₦300K</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Returns</p>
                          <p className="text-emerald-600">₦11.5K</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Gain</p>
                          <p className="text-emerald-600">+3.8%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div>
                    <h3 className="mb-3">Holdings Breakdown</h3>
                    {bondHoldings.map((bond, index) => (
                      <Card key={index} className="mb-2">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">{bond.name}</p>
                              <p className="text-xs text-slate-500">{bond.coupon}% Coupon</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">₦{bond.value.toLocaleString()}</p>
                              <p className={`text-xs ${bond.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                {bond.change >= 0 ? '+' : ''}{bond.change}%
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="p-4 space-y-4">
                  <div className="text-center mb-6">
                    <div className="size-20 bg-gradient-to-br from-[#008753] to-[#00a864] rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl">
                      JO
                    </div>
                    <h2 className="text-[#008753]">John Okafor</h2>
                    <p className="text-sm text-slate-500">john@example.com</p>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">BVN Status</span>
                          <Badge variant="secondary" className="bg-[#008753] text-white">Verified</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">KYC Status</span>
                          <Badge variant="secondary" className="bg-[#008753] text-white">Approved</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Account ID</span>
                          <span className="text-slate-900 font-mono text-xs">BTN-742d...f0bEb</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-3">
                      <div className="size-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Fingerprint className="size-4 text-[#008753]" />
                      </div>
                      Biometric Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3">
                      <div className="size-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="size-4 text-[#008753]" />
                      </div>
                      Transaction History
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="bg-white border-t border-slate-200 px-6 py-3">
              <div className="flex items-center justify-around">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`flex flex-col items-center gap-1 ${
                    activeTab === 'home' ? 'text-[#008753]' : 'text-slate-400'
                  }`}
                >
                  <Home className="size-5" />
                  <span className="text-xs">Home</span>
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`flex flex-col items-center gap-1 ${
                    activeTab === 'portfolio' ? 'text-[#008753]' : 'text-slate-400'
                  }`}
                >
                  <BarChart3 className="size-5" />
                  <span className="text-xs">Portfolio</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex flex-col items-center gap-1 ${
                    activeTab === 'profile' ? 'text-[#008753]' : 'text-slate-400'
                  }`}
                >
                  <User className="size-5" />
                  <span className="text-xs">Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}