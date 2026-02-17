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
  const [paymentView, setPaymentView] = useState<'list' | 'add' | 'success'>('list');
  const [withdrawView, setWithdrawView] = useState<'form' | 'success'>('form');
  const [addFundsView, setAddFundsView] = useState<'details' | 'success'>('details');

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', holder: 'Oluwaseun Adebayo', status: 'Primary' }
  ]);

  const [newCardForm, setNewCardForm] = useState({ number: '', expiry: '', cvv: '', holder: '' });
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const { roleConfig } = useUserRole();

  const handleFeatureOpen = (feature: string) => {
    setActiveFeature(feature);
    setSecurityView('main');
    setPaymentView('list');
    setWithdrawView('form');
    setAddFundsView('details');
    setNewCardForm({ number: '', expiry: '', cvv: '', holder: '' });
    setWithdrawAmount('');
  };
  
  const handleFeatureClose = () => setActiveFeature(null);

  const handleAddCard = () => {
    setPaymentView('success');
    const last4 = newCardForm.number.length > 4 ? newCardForm.number.slice(-4) : '8899';
    const newCard = {
        id: Date.now(),
        type: 'Mastercard',
        last4: last4,
        expiry: newCardForm.expiry || '10/28',
        holder: newCardForm.holder || 'Oluwaseun Adebayo',
        status: 'Active'
    };
    setTimeout(() => {
        setPaymentMethods([...paymentMethods, newCard]);
        setPaymentView('list'); 
    }, 1500);
  };

  const handleWithdraw = () => {
    setWithdrawView('success');
  };

  const handleConfirmDeposit = () => {
    setAddFundsView('success');
  };

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
                <TabsContent value="buy-bonds" className="mt-0">
                  <BuyBonds onNavigate={setActiveTab} />
                </TabsContent>
                <TabsContent value="account" className="mt-0">
                  <Account onFeatureOpen={handleFeatureOpen} />
                </TabsContent>
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
                    {(securityView === 'change-pin' || paymentView === 'add') && (
                      <button 
                        onClick={() => {
                            if (activeFeature === 'payment-methods') setPaymentView('list');
                            else setSecurityView('main');
                        }} 
                        className="hover:bg-slate-100 p-1 rounded-full mr-1 transition-colors"
                      >
                        <ArrowLeft size={18} className="text-gray-500" />
                      </button>
                    )}
                    
                    {activeFeature === 'payment-methods' && paymentView === 'add' ? 'Add New Card' : 
                     securityView === 'change-pin' ? 'Change PIN' : 
                     activeFeature === 'withdraw' && withdrawView === 'success' ? 'Processing Withdrawal' :
                     activeFeature === 'add-funds' && addFundsView === 'success' ? 'Deposit Initiated' :
                     activeFeature?.replace('-', ' ')}
                  </DialogTitle>
                  <DialogDescription>
                    {activeFeature === 'payment-methods' && paymentView === 'add' ? 'Enter your card details securely' :
                     activeFeature === 'add-funds' ? 'Transfer funds to your virtual wallet' :
                     activeFeature === 'withdraw' ? 'Withdraw funds to your bank account' :
                     activeFeature === 'payment-methods' ? 'Manage your linked cards and accounts' :
                     activeFeature === 'notifications' ? 'Your recent alerts and updates' :
                     activeFeature === 'security-settings' ? 'Manage your account security' :
                     'Get help with your account'}
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  {activeFeature === 'add-funds' && (
                    <>
                      {addFundsView === 'details' ? (
                        <div className="space-y-4">
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <p className="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wide">Virtual Account Details</p>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-2xl font-mono text-slate-900 tracking-wider">9023485122</span>
                              <Copy size={18} className="text-[#008753] cursor-pointer hover:opacity-80 transition-opacity" />
                            </div>
                            <p className="text-sm text-slate-600 font-medium">Wema Bank • BTN-Olayimika</p>
                          </div>
                          <div className="flex gap-3 text-xs text-blue-700 bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <AlertCircle size={18} className="shrink-0" />
                            <p className="leading-relaxed">Transfers are processed instantly. Please ensure you transfer from an account bearing your registered name.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8 text-center animate-in zoom-in-95 duration-300">
                          <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} className="text-[#008753]" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">Deposit Confirmed</h3>
                          <p className="text-sm text-slate-500 mt-2">
                            Your transfer has been received. Your wallet balance has been updated.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {activeFeature === 'withdraw' && (
                    <>
                      {withdrawView === 'form' ? (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="amount" className="text-sm font-semibold">Amount to Withdraw</Label>
                            <div className="relative">
                              <span className="absolute left-4 top-3 text-slate-500 font-medium">₦</span>
                              <Input 
                                id="amount"
                                type="number" 
                                placeholder="0.00" 
                                className="pl-9 h-12 text-lg font-medium"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                              />
                            </div>
                            <p className="text-xs text-slate-500 text-right font-medium">Available: ₦125,000.00</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-4">
                            <div className="size-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shrink-0">
                              <Landmark className="text-blue-600" size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">Stanbic IBTC Bank</p>
                              <p className="text-xs text-slate-500 mt-0.5">Oluwaseun Adebayo • ****8902</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8 text-center animate-in zoom-in-95 duration-300">
                          <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} className="text-[#008753]" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">Withdrawal Initiated</h3>
                          <p className="text-sm text-slate-500 mt-2">
                            You are withdrawing <span className="font-bold text-slate-900">₦{Number(withdrawAmount).toLocaleString()}</span> to your Stanbic IBTC account.
                          </p>
                          <p className="text-xs text-slate-400 mt-4">Funds usually arrive within 15 minutes.</p>
                        </div>
                      )}
                    </>
                  )}

                  {activeFeature === 'payment-methods' && (
                    <>
                        {paymentView === 'list' && (
                            <div className="space-y-3">
                                {paymentMethods.map((card) => (
                                    <div key={card.id} className={`flex items-center justify-between p-4 border rounded-lg ${card.status === 'Primary' ? 'border-[#008753] bg-[#008753]/5' : 'border-slate-200'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-white p-2 rounded-md shadow-sm border border-slate-100">
                                              <CreditCard className={card.status === 'Primary' ? "text-[#008753]" : "text-slate-400"} size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{card.type} • {card.last4}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">Expires {card.expiry}</p>
                                            </div>
                                        </div>
                                        <Badge className={card.status === 'Primary' ? "bg-[#008753] text-white" : "bg-slate-100 text-slate-600"}>
                                            {card.status}
                                        </Badge>
                                    </div>
                                ))}
                                
                                <Button 
                                    variant="outline" 
                                    className="w-full border-dashed h-12 text-slate-600 hover:text-[#008753] hover:border-[#008753] hover:bg-green-50 transition-colors"
                                    onClick={() => setPaymentView('add')}
                                >
                                    + Add New Payment Method
                                </Button>
                            </div>
                        )}

                        {paymentView === 'add' && (
                            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold uppercase text-slate-500">Card Number</Label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                        <Input 
                                            placeholder="0000 0000 0000 0000" 
                                            className="pl-10 h-11 text-base" 
                                            value={newCardForm.number}
                                            onChange={(e) => setNewCardForm({...newCardForm, number: e.target.value})}
                                            maxLength={19}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold uppercase text-slate-500">Expiry Date</Label>
                                        <Input 
                                            placeholder="MM/YY" 
                                            className="h-11 text-base"
                                            value={newCardForm.expiry}
                                            onChange={(e) => setNewCardForm({...newCardForm, expiry: e.target.value})}
                                            maxLength={5}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold uppercase text-slate-500">CVV</Label>
                                        <Input 
                                            type="password" 
                                            placeholder="123" 
                                            className="h-11 text-base tracking-widest"
                                            maxLength={3} 
                                            value={newCardForm.cvv}
                                            onChange={(e) => setNewCardForm({...newCardForm, cvv: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold uppercase text-slate-500">Cardholder Name</Label>
                                    <Input 
                                        placeholder="e.g. Oluwaseun Adebayo" 
                                        className="h-11 text-base"
                                        value={newCardForm.holder}
                                        onChange={(e) => setNewCardForm({...newCardForm, holder: e.target.value})}
                                    />
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg flex gap-3 items-start border border-slate-100 mt-2">
                                    <ShieldCheck size={18} className="text-green-600 shrink-0" />
                                    <p className="text-xs text-slate-600 leading-relaxed">Your card details are secured with AES-256 encryption. We will charge a refundable ₦50 to verify this card.</p>
                                </div>
                            </div>
                        )}

                        {paymentView === 'success' && (
                            <div className="py-8 text-center animate-in zoom-in-95 duration-300">
                                <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 size={32} className="text-[#008753]" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Card Added Successfully</h3>
                                <p className="text-sm text-slate-500 mt-1">You can now use this card to fund your wallet.</p>
                            </div>
                        )}
                    </>
                  )}

                  {activeFeature === 'notifications' && (
                    <div className="space-y-3">
                      {[
                        { t: 'Coupon Received', d: '₦24,500 interest paid', h: '2h ago' },
                        { t: 'Price Alert', d: 'FGN 2027 is up 0.4%', h: '5h ago' },
                        { t: 'Security Alert', d: 'New login detected', h: '1d ago' }
                      ].map((n, i) => (
                        <div key={i} className="flex gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                          <div className="size-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                            <BellRing size={18} className="text-[#008753]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-sm font-bold text-slate-900">{n.t}</p>
                              <span className="text-[10px] font-semibold text-slate-400 uppercase">{n.h}</span>
                            </div>
                            <p className="text-xs text-slate-600">{n.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeFeature === 'security-settings' && (
                    <div className="space-y-3">
                      {securityView === 'main' ? (
                        <>
                          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="bg-slate-100 p-2 rounded-lg">
                                <Smartphone size={20} className="text-slate-600" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">Biometric Login</p>
                                <p className="text-xs text-slate-500 mt-0.5">Face ID / Fingerprint</p>
                              </div>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Enabled</Badge>
                          </div>
                          
                          <button 
                            onClick={() => setSecurityView('change-pin')}
                            className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-[#008753] hover:bg-[#008753]/5 transition-all text-left group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                                <ShieldCheck size={20} className="text-slate-600 group-hover:text-[#008753]" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">Transaction PIN</p>
                                <p className="text-xs text-slate-500 mt-0.5">Change 4-digit PIN</p>
                              </div>
                            </div>
                            <ChevronRight size={18} className="text-slate-400 group-hover:text-[#008753]" />
                          </button>

                          <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-[#008753] hover:bg-[#008753]/5 transition-all text-left group">
                            <div className="flex items-center gap-4">
                              <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                                <Key size={20} className="text-slate-600 group-hover:text-[#008753]" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">Password</p>
                                <p className="text-xs text-slate-500 mt-0.5">Last updated 3mo ago</p>
                              </div>
                            </div>
                            <ChevronRight size={18} className="text-slate-400 group-hover:text-[#008753]" />
                          </button>
                        </>
                      ) : (
                        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-slate-500 uppercase">Current PIN</Label>
                            <Input type="password" placeholder="••••" className="text-center text-2xl tracking-[1em] h-14" maxLength={4} />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-slate-500 uppercase">New PIN</Label>
                            <Input type="password" placeholder="••••" className="text-center text-2xl tracking-[1em] h-14" maxLength={4} />
                          </div>
                          <Button className="w-full bg-[#008753] hover:bg-[#006d42] text-white h-12 mt-2" onClick={() => setSecurityView('main')}>
                            Update PIN
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeFeature === 'help-support' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <button className="p-5 border border-slate-200 rounded-lg hover:border-[#008753] hover:bg-[#008753]/5 transition-all text-center group">
                          <div className="size-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white transition-colors">
                            <MessageCircle className="text-[#008753]" size={22} />
                          </div>
                          <p className="text-sm font-bold text-slate-900">Live Chat</p>
                        </button>
                        <button className="p-5 border border-slate-200 rounded-lg hover:border-[#008753] hover:bg-[#008753]/5 transition-all text-center group">
                          <div className="size-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white transition-colors">
                            <Headphones className="text-blue-600" size={22} />
                          </div>
                          <p className="text-sm font-bold text-slate-900">Call Support</p>
                        </button>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-lg text-white flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Support ID</p>
                          <p className="font-mono text-base font-bold">BTN-8821-XP</p>
                        </div>
                        <Copy size={18} className="text-slate-400 cursor-pointer hover:text-white transition-colors" />
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter className="mt-6">
                  {(activeFeature === 'add-funds' && addFundsView === 'details') || 
                   (activeFeature === 'withdraw' && withdrawView === 'form') || 
                   (activeFeature === 'payment-methods' && paymentView === 'add') ? (
                    <div className="flex gap-3 w-full">
                      <Button 
                        variant="outline" 
                        className="flex-1 h-11" 
                        onClick={() => {
                            if (activeFeature === 'payment-methods') setPaymentView('list');
                            else handleFeatureClose();
                        }}
                      >
                        Cancel
                      </Button>
                      
                      {activeFeature === 'payment-methods' ? (
                        <Button className="flex-1 bg-[#008753] hover:bg-[#006d42] text-white h-11" onClick={handleAddCard}>Save Card</Button>
                      ) : activeFeature === 'add-funds' ? (
                        <Button className="flex-1 bg-[#008753] hover:bg-[#006d42] text-white h-11" onClick={handleConfirmDeposit}>Confirm Deposit</Button>
                      ) : (
                        <Button className="flex-1 bg-[#008753] hover:bg-[#006d42] text-white h-11" onClick={handleWithdraw}>Confirm Withdrawal</Button>
                      )}
                    </div>
                  ) : null}
                  
                  {(['notifications', 'help-support'].includes(activeFeature) || 
                    (activeFeature === 'payment-methods' && paymentView === 'list') ||
                    (activeFeature === 'payment-methods' && paymentView === 'success') ||
                    (activeFeature === 'withdraw' && withdrawView === 'success') ||
                    (activeFeature === 'add-funds' && addFundsView === 'success')) && (
                    <Button className="w-full h-11" variant="outline" onClick={handleFeatureClose}>Close</Button>
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