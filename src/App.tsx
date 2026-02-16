import { useState } from 'react';
import { Tabs, TabsContent } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Dashboard } from './components/Dashboard';
import { BuyBonds } from './components/BuyBonds';
import { Account } from './components/Account';
import { BoostEarnings } from './components/BoostEarnings';
import { P2PExchange } from './components/P2PExchange';
import { TaxCenter } from './components/TaxCenter';
import { EducationCenter } from './components/EducationCenter';
import { RegulatoryDashboard } from './components/RegulatoryDashboard';
import { RegistrationPage } from './components/RegistrationPage';
import { UserRoleProvider, useUserRole } from './contexts/UserRoleContext';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  User, 
  CreditCard, 
  BellRing, 
  Smartphone, 
  ShieldCheck, 
  ChevronRight, 
  Copy, 
  MessageCircle, 
  Headphones, 
  Landmark,
  Key,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './components/ui/dialog';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [securityView, setSecurityView] = useState<'main' | 'change-pin'>('main');
  const { roleConfig } = useUserRole();

  const handleFeatureOpen = (feature: string) => {
    setActiveFeature(feature);
    setSecurityView('main'); 
  };
  
  const handleFeatureClose = () => setActiveFeature(null);

  if (!isRegistered) {
    return <RegistrationPage onComplete={() => setIsRegistered(true)} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ...(roleConfig.canTrade ? [{ id: 'buy-bonds', label: 'Buy Bonds', icon: ShoppingCart }] : []),
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div className="app-shell">
      <div className="app-layout">
        <aside className="app-sidebar">
          <div className="app-brand">
            <div className="app-brand-mark" />
            <div>
              <p className="app-brand-title font-display">Bond Token Nigeria</p>
              <p className="app-brand-sub">Tokenized sovereign bonds</p>
            </div>
          </div>

          <div>
            <p className="app-sidebar-label">Navigation</p>
            <nav className="app-sidebar-nav">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`app-sidebar-link ${activeTab === item.id ? 'is-active' : ''}`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="app-sidebar-footer">
            <Badge className="bg-[#008753]/10 text-[#008753] border border-[#008753]/20">
              {roleConfig.name}
            </Badge>
            <p className="text-gray-600 text-xs">
              CBN and SEC aligned onboarding
            </p>
          </div>
        </aside>

        <div className="app-main">
          <header className="app-header">
            <div className="app-header-inner">
              <div>
                <h1 className="app-title font-display">Bond Token Nigeria</h1>
                <p className="app-subtitle">
                  Invest in Nigerian Government Bonds
                </p>
              </div>
              <div className="app-header-actions">
                <Badge className="bg-[#008753]/10 text-[#008753] border border-[#008753]/20">
                  {roleConfig.name}
                </Badge>
                <div className="app-stat">
                  <span className="app-stat-label">Yield range</span>
                  <span className="app-stat-value">11 - 16%</span>
                </div>
              </div>
            </div>
          </header>

          <main className="app-content">
            <div className="app-content-inner">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="dashboard" className="mt-0">
                  {roleConfig.isRegulator ? <RegulatoryDashboard onFeatureOpen={handleFeatureOpen} /> : <Dashboard onFeatureOpen={handleFeatureOpen} />}
                </TabsContent>
                <TabsContent value="buy-bonds" className="mt-0"><BuyBonds /></TabsContent>
                <TabsContent value="account" className="mt-0"><Account onFeatureOpen={handleFeatureOpen} /></TabsContent>
              </Tabs>
            </div>

            {activeFeature === 'boost-earnings' && <BoostEarnings onClose={handleFeatureClose} />}
            {activeFeature === 'p2p-exchange' && <P2PExchange onClose={handleFeatureClose} />}
            {activeFeature === 'tax-center' && <TaxCenter onClose={handleFeatureClose} />}
            {activeFeature === 'education-center' && <EducationCenter onClose={handleFeatureClose} />}

            
            <Dialog 
              open={!!activeFeature && ['add-funds', 'withdraw', 'payment-methods', 'notifications', 'security-settings', 'help-support'].includes(activeFeature)} 
              onOpenChange={(open) => !open && handleFeatureClose()}
            >
              <DialogContent className="max-w-md mx-4">
                <DialogHeader>
                  <DialogTitle className="capitalize flex items-center gap-2">
                    {securityView === 'change-pin' && (
                      <button onClick={() => setSecurityView('main')} className="hover:bg-slate-100 p-1 rounded-full mr-1">
                        <ArrowLeft size={16} />
                      </button>
                    )}
                    {securityView === 'change-pin' ? 'Change PIN' : activeFeature?.replace('-', ' ')}
                  </DialogTitle>
                  <DialogDescription>
                    {activeFeature === 'add-funds' && 'Transfer funds to your virtual wallet'}
                    {activeFeature === 'withdraw' && 'Withdraw funds to your bank account'}
                    {activeFeature === 'payment-methods' && 'Manage your linked cards and accounts'}
                    {activeFeature === 'notifications' && 'Your recent alerts and updates'}
                    {activeFeature === 'security-settings' && 'Manage your account security'}
                    {activeFeature === 'help-support' && 'Get help with your account'}
                  </DialogDescription>
                </DialogHeader>

                <div className="py-2">
                  {/* add funds  */}
                  {activeFeature === 'add-funds' && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <p className="text-xs text-slate-500 font-bold mb-2 uppercase">Virtual Account Details</p>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-2xl font-mono text-slate-900">9023485122</span>
                          <Copy size={18} className="text-[#008753] cursor-pointer" />
                        </div>
                        <p className="text-sm text-slate-600">Wema Bank • BTN-Olayimika</p>
                      </div>
                      <div className="flex gap-2 text-xs text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <p>Transfers are processed instantly.</p>
                      </div>
                    </div>
                  )}

                  {/* withdraw */}
                  {activeFeature === 'withdraw' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount to Withdraw</Label>
                        <Input 
                          id="amount"
                          type="number" 
                          placeholder="₦ 0.00" 
                          className="text-lg"
                        />
                        <p className="text-xs text-slate-500 text-right">Available: ₦125,000.00</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex gap-3">
                        <Landmark className="text-slate-500 shrink-0" size={20} />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Stanbic IBTC Bank</p>
                          <p className="text-xs text-slate-500">Oluwaseun Adebayo • ****8902</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* payment */}
                  {activeFeature === 'payment-methods' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-[#008753] bg-[#008753]/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-[#008753]" size={20} />
                          <div>
                            <p className="text-sm font-medium text-slate-900">Visa • 4242</p>
                            <p className="text-xs text-slate-500">Expires 12/26</p>
                          </div>
                        </div>
                        <Badge className="bg-[#008753]">Primary</Badge>
                      </div>
                      <Button variant="outline" className="w-full border-dashed">
                        + Add New Payment Method
                      </Button>
                    </div>
                  )}

                  {/* noti */}
                  {activeFeature === 'notifications' && (
                    <div className="space-y-2">
                      {[
                        { t: 'Coupon Received', d: '₦24,500 interest paid', h: '2h ago' },
                        { t: 'Price Alert', d: 'FGN 2027 is up 0.4%', h: '5h ago' },
                        { t: 'Security Alert', d: 'New login detected', h: '1d ago' }
                      ].map((n, i) => (
                        <div key={i} className="flex gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                          <div className="size-8 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                            <BellRing size={16} className="text-[#008753]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium text-slate-900">{n.t}</p>
                              <span className="text-[10px] text-slate-400">{n.h}</span>
                            </div>
                            <p className="text-xs text-slate-500">{n.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* sec settings  */}
                  {activeFeature === 'security-settings' && (
                    <div className="space-y-2">
                      {securityView === 'main' ? (
                        <>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Smartphone size={18} className="text-slate-500" />
                              <div>
                                <p className="text-sm font-medium">Biometric Login</p>
                                <p className="text-xs text-slate-500">Face ID / Fingerprint</p>
                              </div>
                            </div>
                            <Badge className="bg-emerald-600">Enabled</Badge>
                          </div>
                          
                          <button 
                            onClick={() => setSecurityView('change-pin')}
                            className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <ShieldCheck size={18} className="text-slate-500" />
                              <div>
                                <p className="text-sm font-medium">Transaction PIN</p>
                                <p className="text-xs text-slate-500">Change 4-digit PIN</p>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-slate-400" />
                          </button>

                          <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors text-left">
                            <div className="flex items-center gap-3">
                              <Key size={18} className="text-slate-500" />
                              <div>
                                <p className="text-sm font-medium">Password</p>
                                <p className="text-xs text-slate-500">Last updated 3mo ago</p>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-slate-400" />
                          </button>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Current PIN</Label>
                            <Input type="password" placeholder="••••" className="text-center text-lg tracking-widest" maxLength={4} />
                          </div>
                          <div className="space-y-2">
                            <Label>New PIN</Label>
                            <Input type="password" placeholder="••••" className="text-center text-lg tracking-widest" maxLength={4} />
                          </div>
                          <Button className="w-full bg-[#008753] hover:bg-[#006d42]" onClick={() => setSecurityView('main')}>Update PIN</Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* help */}
                  {activeFeature === 'help-support' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <button className="p-4 border rounded-lg hover:border-[#008753] hover:bg-[#008753]/5 transition-colors text-center">
                          <div className="mx-auto mb-2 bg-green-50 w-10 h-10 rounded-full flex items-center justify-center">
                            <MessageCircle className="text-[#008753]" size={20} />
                          </div>
                          <p className="text-xs font-bold text-slate-900">Live Chat</p>
                        </button>
                        <button className="p-4 border rounded-lg hover:border-[#008753] hover:bg-[#008753]/5 transition-colors text-center">
                          <div className="mx-auto mb-2 bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center">
                            <Headphones className="text-blue-600" size={20} />
                          </div>
                          <p className="text-xs font-bold text-slate-900">Call Support</p>
                        </button>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg text-center">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Support ID</p>
                        <p className="text-white font-mono text-sm">BTN-8821-XP</p>
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  {(activeFeature === 'add-funds' || activeFeature === 'withdraw') && (
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" className="flex-1" onClick={handleFeatureClose}>Cancel</Button>
                      {activeFeature === 'add-funds' ? (
                        <Button className="flex-1 bg-[#008753] hover:bg-[#006d42]" onClick={handleFeatureClose}>Sent</Button>
                      ) : (
                        <Button className="flex-1 bg-[#008753] hover:bg-[#006d42]" onClick={handleFeatureClose}>Confirm</Button>
                      )}
                    </div>
                  )}
                  {['payment-methods', 'notifications', 'help-support'].includes(activeFeature) && (
                    <Button className="w-full" variant="outline" onClick={handleFeatureClose}>Close</Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>

      <nav className="app-bottom-nav md:hidden">
        <div className="app-bottom-nav-inner">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center gap-1 px-4 py-2 ${activeTab === item.id ? 'text-[#008753]' : 'text-gray-400'}`}>
              <item.icon size={24} />
              <span className="text-[10px] uppercase font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <UserRoleProvider>
      <AppContent />
    </UserRoleProvider>
  );
}