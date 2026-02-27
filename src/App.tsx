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
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './components/ui/dialog';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  
 
  const [profileModalState, setProfileModalState] = useState<'closed' | 'form' | 'success'>('closed');
  const [bvn, setBvn] = useState('');
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  
  
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
    const newCard = { id: Date.now(), type: 'Mastercard', last4: last4, expiry: newCardForm.expiry || '10/28', holder: newCardForm.holder || 'Oluwaseun Adebayo', status: 'Active' };
    setTimeout(() => {
        setPaymentMethods([...paymentMethods, newCard]);
        setPaymentView('list'); 
    }, 1500);
  };

  const handleWithdraw = () => setWithdrawView('success');
  const handleConfirmDeposit = () => setAddFundsView('success');

  
  const submitProfileCompletion = () => {
    setIsProfileLoading(true);
    setTimeout(() => {
      setIsProfileLoading(false);
      setProfileModalState('success');
    }, 1500);
  };

  
    return <RegistrationPage onComplete={() => {
      setIsRegistered(true);
      setProfileModalState('form');
    }} />;
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
                     Action required for your account.
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  
                  {activeFeature === 'add-funds' && (
                    <div className="text-center py-6">
                       <CheckCircle2 className="mx-auto text-green-600 mb-2" size={40}/>
                       <p>Funds component</p>
                    </div>
                  )}
                  
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleFeatureClose}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            
            <Dialog 
              open={profileModalState !== 'closed'} 
              onOpenChange={(open) => !open && setProfileModalState('closed')}
            >
              <DialogContent className={profileModalState === 'form' ? "max-w-2xl mx-4" : "max-w-md mx-4"}>
                {profileModalState === 'form' ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">Complete Profile</DialogTitle>
                      <DialogDescription>Please provide your legal details as they appear on your BVN to unlock trading.</DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold uppercase text-gray-500">First Name</Label>
                        <Input placeholder="John" className="h-11" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold uppercase text-gray-500">Middle Name</Label>
                        <Input placeholder="Optional" className="h-11" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold uppercase text-gray-500">Last Name</Label>
                        <Input placeholder="Doe" className="h-11" />
                      </div>
                      <div className="space-y-1.5 relative">
                        <Label className="text-xs font-semibold uppercase text-gray-500">Date of Birth</Label>
                        <Input placeholder="MM/DD/YYYY" className="h-11 pr-10" />
                        <Calendar className="absolute right-3 top-[30px] size-4 text-gray-400" />
                      </div>
                      <div className="space-y-1.5 relative">
                        <Label className="text-xs font-semibold uppercase text-gray-500">BVN</Label>
                        <Input 
                          placeholder="11-digit number" 
                          maxLength={11} 
                          className="h-11"
                          value={bvn} 
                          onChange={(e) => setBvn(e.target.value.replace(/\D/g, ''))}
                        />
                        {bvn.length === 11 && <CheckCircle2 className="absolute right-3 top-[30px] size-4 text-[#008753]" />}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold uppercase text-gray-500">CHN Number</Label>
                        <Input placeholder="Optional" className="h-11" />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg flex gap-3 mt-2 border border-blue-100">
                      <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={18} />
                      <p className="text-xs text-blue-800 font-medium">We use your BVN securely to comply with CBN KYC guidelines. Data is heavily encrypted.</p>
                    </div>

                    <DialogFooter className="mt-4">
                      <Button 
                        className="w-full sm:w-auto bg-[#008753] hover:bg-[#006d42] text-white px-8 disabled:opacity-70 disabled:text-white"
                        onClick={submitProfileCompletion}
                        disabled={isProfileLoading || bvn.length !== 11}
                      >
                        {isProfileLoading ? 'Verifying...' : 'Submit Details'}
                      </Button>
                    </DialogFooter>
                  </>
                ) : (
                  <div className="py-8 text-center animate-in zoom-in-95 duration-300">
                    <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-[#008753]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 font-display mb-2">You're All Set!</h3>
                    <p className="text-gray-500 text-sm mb-6">Your identity is verified. You can now fund your wallet and purchase bonds.</p>
                    <Button className="w-full bg-[#008753] hover:bg-[#006d42] text-white h-12" onClick={() => setProfileModalState('closed')}>
                      Start Investing
                    </Button>
                  </div>
                )}
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