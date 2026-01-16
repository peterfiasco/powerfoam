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
import { LayoutDashboard, ShoppingCart, User } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const { roleConfig } = useUserRole();

  const handleFeatureOpen = (feature: string) => {
    setActiveFeature(feature);
  };

  const handleFeatureClose = () => {
    setActiveFeature(null);
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
                  {roleConfig.isRegulator ? (
                    <RegulatoryDashboard onFeatureOpen={handleFeatureOpen} />
                  ) : (
                    <Dashboard onFeatureOpen={handleFeatureOpen} />
                  )}
                </TabsContent>
                {roleConfig.canTrade && (
                  <TabsContent value="buy-bonds" className="mt-0">
                    <BuyBonds />
                  </TabsContent>
                )}
                <TabsContent value="account" className="mt-0">
                  <Account />
                </TabsContent>
              </Tabs>
            </div>

            {/* Feature Modals/Views */}
            {activeFeature === 'boost-earnings' && (
              <BoostEarnings onClose={handleFeatureClose} />
            )}
            {activeFeature === 'p2p-exchange' && (
              <P2PExchange onClose={handleFeatureClose} />
            )}
            {activeFeature === 'tax-center' && (
              <TaxCenter onClose={handleFeatureClose} />
            )}
            {activeFeature === 'education-center' && (
              <EducationCenter onClose={handleFeatureClose} />
            )}
          </main>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="app-bottom-nav">
        <div className="app-bottom-nav-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'text-[#008753] bg-[#008753]/10'
                    : 'text-gray-600'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
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
