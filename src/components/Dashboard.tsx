import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { InfoTooltip } from './InfoTooltip';
import { useUserRole } from '../contexts/UserRoleContext';
import { TrendingUp, Zap, RefreshCw, FileText, ArrowUpRight, ArrowDownRight, Users, Briefcase, Building2, BookOpen } from 'lucide-react';

interface DashboardProps {
  onFeatureOpen: (feature: string) => void;
}

export function Dashboard({ onFeatureOpen }: DashboardProps) {
  const { role, roleConfig } = useUserRole();
  
  // Different portfolio values based on role
  const getPortfolioData = () => {
    switch (role) {
      case 'family-office':
        return { value: 45000000, invested: 42000000, bonds: 15 };
      case 'institutional':
        return { value: 250000000, invested: 235000000, bonds: 42 };
      case 'stockbroker':
        return { value: 125000000, invested: 118000000, bonds: 28 };
      case 'fund-company':
        return { value: 380000000, invested: 360000000, bonds: 56 };
      default:
        return { value: 2850000, invested: 2500000, bonds: 3 };
    }
  };

  const portfolioData = getPortfolioData();
  const portfolioValue = portfolioData.value;
  const totalInvested = portfolioData.invested;
  const returns = portfolioValue - totalInvested;
  const returnsPercentage = ((returns / totalInvested) * 100).toFixed(2);

  const myBonds = [
    {
      id: 1,
      name: 'FGN 2034 Bond',
      amount: 1000000,
      couponRate: 14.55,
      nextPayment: '2024-01-15',
      maturity: '2034-03-28',
      currentValue: 1050000,
    },
    {
      id: 2,
      name: 'FGN 2029 Bond',
      amount: 800000,
      couponRate: 13.98,
      nextPayment: '2024-02-22',
      maturity: '2029-02-27',
      currentValue: 820000,
    },
    {
      id: 3,
      name: 'FGN 2032 Bond',
      amount: 700000,
      couponRate: 16.25,
      nextPayment: '2024-01-25',
      maturity: '2032-04-28',
      currentValue: 735000,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'purchase',
      description: 'Purchased FGN 2034 Bond',
      amount: 1000000,
      date: '2024-11-20',
    },
    {
      id: 2,
      type: 'coupon',
      description: 'Coupon payment received',
      amount: 24500,
      date: '2024-11-15',
    },
    {
      id: 3,
      type: 'boost',
      description: 'Boost earnings payment',
      amount: 12300,
      date: '2024-11-10',
    },
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Portfolio Summary */}
      <Card className="bg-gradient-to-br from-[#008753] to-[#006d42] text-white border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            Total Portfolio Value
            <InfoTooltip 
              content="The current total value of all your bond investments, including any gains or losses."
              isDark
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-3xl">₦{portfolioValue.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                {returns >= 0 ? (
                  <ArrowUpRight size={20} className="text-green-200" />
                ) : (
                  <ArrowDownRight size={20} className="text-red-200" />
                )}
                <span className={returns >= 0 ? 'text-green-200' : 'text-red-200'}>
                  ₦{Math.abs(returns).toLocaleString()} ({returnsPercentage}%)
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-white/80 text-sm">Total Invested</p>
                <p className="text-lg">₦{totalInvested.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Active Bonds</p>
                <p className="text-lg">{portfolioData.bonds}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role-Specific Info Card */}
      {(role === 'family-office' || role === 'institutional' || role === 'stockbroker' || role === 'fund-company') && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex gap-3">
              {role === 'family-office' && <Users size={20} className="text-blue-600 flex-shrink-0" />}
              {role === 'institutional' && <Building2 size={20} className="text-blue-600 flex-shrink-0" />}
              {role === 'stockbroker' && <Briefcase size={20} className="text-blue-600 flex-shrink-0" />}
              {role === 'fund-company' && <TrendingUp size={20} className="text-blue-600 flex-shrink-0" />}
              <div>
                <h4 className="text-blue-900">{roleConfig.name} Account</h4>
                <p className="text-blue-700 text-sm mt-1">
                  {role === 'family-office' && 'Managing multi-generational wealth with enhanced reporting and family portfolio tracking.'}
                  {role === 'institutional' && 'Enterprise-grade features including bulk trading and API access for institutional operations.'}
                  {role === 'stockbroker' && 'Access to trading desk, client management tools, and commission tracking for broker-dealers.'}
                  {role === 'fund-company' && 'Advanced fund management tools with AUM tracking and performance analytics.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feature Cards */}
      <div className="space-y-3">
        <h3 className="text-gray-900">Quick Actions</h3>
        
        {roleConfig.features.includes('boost-earnings') && (
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-[#008753]/20"
            onClick={() => onFeatureOpen('boost-earnings')}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="bg-[#008753]/10 p-3 rounded-lg">
                <Zap size={24} className="text-[#008753]" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Boost Earnings</h4>
                <p className="text-gray-600 text-sm">Earn premium returns on your holdings</p>
              </div>
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white">12-18% APY</Badge>
            </CardContent>
          </Card>
        )}

        {roleConfig.features.includes('p2p-exchange') && (
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-[#008753]/20"
            onClick={() => onFeatureOpen('p2p-exchange')}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <RefreshCw size={24} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Peer to Peer Exchange</h4>
                <p className="text-gray-600 text-sm">Trade bonds with other investors</p>
              </div>
            </CardContent>
          </Card>
        )}

        {roleConfig.features.includes('tax-center') && (
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-[#008753]/20"
            onClick={() => onFeatureOpen('tax-center')}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <FileText size={24} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Tax Center</h4>
                <p className="text-gray-600 text-sm">View tax-free coupon statements</p>
              </div>
              <Badge variant="outline" className="border-green-600 text-green-600">Tax Free</Badge>
            </CardContent>
          </Card>
        )}

        {/* Stockbroker specific features */}
        {role === 'stockbroker' && (
          <>
            <Card className="border-[#008753]/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <Users size={24} className="text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900">Client Management</h4>
                  <p className="text-gray-600 text-sm">Manage client portfolios and trades</p>
                </div>
                <Badge variant="outline">45 Clients</Badge>
              </CardContent>
            </Card>
            <Card className="border-[#008753]/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <TrendingUp size={24} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900">Commission Tracker</h4>
                  <p className="text-gray-600 text-sm">Track earnings and commissions</p>
                </div>
                <span className="text-emerald-600">₦2.4M</span>
              </CardContent>
            </Card>
          </>
        )}

        {/* Family Office specific features */}
        {role === 'family-office' && (
          <Card className="border-[#008753]/20">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="bg-violet-50 p-3 rounded-lg">
                <Users size={24} className="text-violet-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Family Portfolio View</h4>
                <p className="text-gray-600 text-sm">Track multi-generational investments</p>
              </div>
              <Badge variant="outline">5 Members</Badge>
            </CardContent>
          </Card>
        )}

        {/* Institutional specific features */}
        {role === 'institutional' && (
          <Card className="border-[#008753]/20">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="bg-cyan-50 p-3 rounded-lg">
                <Building2 size={24} className="text-cyan-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">Bulk Trading Portal</h4>
                <p className="text-gray-600 text-sm">Execute large-scale bond transactions</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fund Company specific features */}
        {role === 'fund-company' && (
          <Card className="border-[#008753]/20">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="bg-rose-50 p-3 rounded-lg">
                <TrendingUp size={24} className="text-rose-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">AUM Tracking</h4>
                <p className="text-gray-600 text-sm">Monitor assets under management</p>
              </div>
              <span className="text-rose-600">₦380M</span>
            </CardContent>
          </Card>
        )}

        {/* Education Center - Available to all roles */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-[#008753]/20"
          onClick={() => onFeatureOpen('education-center')}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <BookOpen size={24} className="text-indigo-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900">Education Center</h4>
              <p className="text-gray-600 text-sm">Learn about bonds and investing</p>
            </div>
            <Badge variant="outline" className="border-indigo-600 text-indigo-600">Free</Badge>
          </CardContent>
        </Card>
      </div>

      {/* My Bonds */}
      <div className="space-y-3">
        <h3 className="text-gray-900">
          {role === 'stockbroker' ? 'Client Bond Holdings' : role === 'fund-company' ? 'Fund Bond Holdings' : 'My Bonds'}
        </h3>
        {myBonds.slice(0, role === 'individual' ? 3 : 5).map((bond) => (
          <Card key={bond.id} className="border-gray-200">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-gray-900">{bond.name}</h4>
                  <p className="text-gray-600 text-sm">₦{bond.amount.toLocaleString()}</p>
                </div>
                <Badge className="bg-[#008753] hover:bg-[#006d42]">
                  {bond.couponRate}% Coupon
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    Next Payment
                    <InfoTooltip content="The date when you'll receive your next coupon (interest) payment." />
                  </p>
                  <p className="text-gray-900 text-sm">{new Date(bond.nextPayment).toLocaleDateString('en-NG')}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    Maturity Date
                    <InfoTooltip content="The date when the bond expires and you receive your principal back." />
                  </p>
                  <p className="text-gray-900 text-sm">{new Date(bond.maturity).toLocaleDateString('en-NG')}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-600 text-sm">Current Value</span>
                <span className="text-[#008753]">₦{bond.currentValue.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h3 className="text-gray-900">Recent Activity</h3>
        <Card className="border-gray-200">
          <CardContent className="p-0">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className={`p-4 flex items-center justify-between ${
                  index !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div>
                  <p className="text-gray-900 text-sm">{activity.description}</p>
                  <p className="text-gray-600 text-xs mt-1">
                    {new Date(activity.date).toLocaleDateString('en-NG')}
                  </p>
                </div>
                <p className={`${
                  activity.type === 'purchase' ? 'text-gray-900' : 'text-[#008753]'
                }`}>
                  {activity.type === 'purchase' ? '-' : '+'}₦{activity.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}