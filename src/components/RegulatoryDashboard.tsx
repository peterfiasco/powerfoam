import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { InfoTooltip } from './InfoTooltip';
import { useUserRole } from '../contexts/UserRoleContext';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  AlertCircle,
  CheckCircle,
  Eye,
  Download,
  BarChart3,
  Shield,
  FileText,
  Building2
} from 'lucide-react';

interface RegulatoryDashboardProps {
  onFeatureOpen: (feature: string) => void;
}

export function RegulatoryDashboard({ onFeatureOpen }: RegulatoryDashboardProps) {
  const { role, roleConfig } = useUserRole();

  // Market Overview Stats
  const marketStats = {
    totalIssuance: 125400000000,
    activeInvestors: 45267,
    tradingVolume24h: 8750000000,
    averageYield: 14.85,
    totalTransactions: 12456,
    complianceRate: 98.7,
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'Primary Issue',
      entity: 'Federal Government',
      amount: 50000000000,
      bond: 'FGN 2035',
      date: '2024-11-25',
      status: 'Settled',
    },
    {
      id: 2,
      type: 'Secondary Trade',
      entity: 'Institutional Investor A',
      amount: 2500000000,
      bond: 'FGN 2034',
      date: '2024-11-24',
      status: 'Pending Settlement',
    },
    {
      id: 3,
      type: 'Secondary Trade',
      entity: 'Family Office B',
      amount: 1200000000,
      bond: 'FGN 2032',
      date: '2024-11-24',
      status: 'Settled',
    },
  ];

  const complianceAlerts = [
    {
      id: 1,
      level: 'info',
      message: 'Quarterly reporting deadline in 5 days',
      date: '2024-11-28',
    },
    {
      id: 2,
      level: 'warning',
      message: '3 entities pending KYC verification',
      date: '2024-11-27',
    },
  ];

  const topParticipants = [
    { name: 'Institutional Investor A', holdings: 15000000000, trades: 145 },
    { name: 'Fund Company B', holdings: 12500000000, trades: 98 },
    { name: 'Family Office C', holdings: 8300000000, trades: 67 },
    { name: 'Stockbroker D', holdings: 6700000000, trades: 234 },
  ];

  // Role-specific content
  const getRoleSpecificCards = () => {
    switch (role) {
      case 'sec':
        return (
          <>
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={20} className="text-blue-600" />
                  <h4 className="text-gray-900">Market Oversight</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-600 text-xs">Compliance Rate</p>
                    <p className="text-blue-900 text-xl">{marketStats.complianceRate}%</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-600 text-xs">Active Licenses</p>
                    <p className="text-blue-900 text-xl">234</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );
      case 'cbn':
        return (
          <>
            <Card className="border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Activity size={20} className="text-green-600" />
                  <h4 className="text-gray-900">Monetary Policy Impact</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-600 text-xs">Avg. Yield</p>
                    <p className="text-green-900 text-xl">{marketStats.averageYield}%</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-600 text-xs">Liquidity Index</p>
                    <p className="text-green-900 text-xl">8.4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );
      case 'firs':
        return (
          <>
            <Card className="border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FileText size={20} className="text-purple-600" />
                  <h4 className="text-gray-900">Tax Compliance</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-purple-600 text-xs">Total Exemptions</p>
                    <p className="text-purple-900 text-xl">₦8.5B</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-purple-600 text-xs">Verified Accounts</p>
                    <p className="text-purple-900 text-xl">45,267</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );
      case 'cscs':
        return (
          <>
            <Card className="border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 size={20} className="text-amber-600" />
                  <h4 className="text-gray-900">Settlement Tracking</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-amber-600 text-xs">Pending Settlement</p>
                    <p className="text-amber-900 text-xl">12</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-amber-600 text-xs">Settlement Rate</p>
                    <p className="text-amber-900 text-xl">99.8%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Eye size={24} />
          <h2 className="text-white">{roleConfig.name}</h2>
        </div>
        <p className="text-blue-100 text-sm">{roleConfig.description}</p>
        {role === 'cscs' && (
          <Badge className="bg-white/20 text-white mt-2">View-Only Access</Badge>
        )}
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-gray-600" />
              <span className="text-gray-600 text-xs">Total Issuance</span>
            </div>
            <p className="text-gray-900 text-xl">₦{(marketStats.totalIssuance / 1000000000).toFixed(1)}B</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-gray-600" />
              <span className="text-gray-600 text-xs">Active Investors</span>
            </div>
            <p className="text-gray-900 text-xl">{marketStats.activeInvestors.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-gray-600" />
              <span className="text-gray-600 text-xs">24h Volume</span>
            </div>
            <p className="text-gray-900 text-xl">₦{(marketStats.tradingVolume24h / 1000000000).toFixed(1)}B</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} className="text-gray-600" />
              <span className="text-gray-600 text-xs">Transactions</span>
            </div>
            <p className="text-gray-900 text-xl">{marketStats.totalTransactions.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Role-Specific Cards */}
      {getRoleSpecificCards()}

      {/* Compliance Alerts */}
      {role !== 'cscs' && (
        <div className="space-y-3">
          <h3 className="text-gray-900">Compliance & Alerts</h3>
          {complianceAlerts.map((alert) => (
            <Card key={alert.id} className={`${
              alert.level === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-blue-200 bg-blue-50'
            }`}>
              <CardContent className="p-4 flex items-start gap-3">
                {alert.level === 'warning' ? (
                  <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`text-sm ${
                    alert.level === 'warning' ? 'text-amber-900' : 'text-blue-900'
                  }`}>
                    {alert.message}
                  </p>
                  <p className={`text-xs mt-1 ${
                    alert.level === 'warning' ? 'text-amber-600' : 'text-blue-600'
                  }`}>
                    {new Date(alert.date).toLocaleDateString('en-NG')}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Top Participants */}
      <div className="space-y-3">
        <h3 className="text-gray-900">Top Market Participants</h3>
        <Card className="border-gray-200">
          <CardContent className="p-0">
            {topParticipants.map((participant, index) => (
              <div
                key={index}
                className={`p-4 flex items-center justify-between ${
                  index !== topParticipants.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div>
                  <p className="text-gray-900 text-sm">{participant.name}</p>
                  <p className="text-gray-600 text-xs mt-1">
                    {participant.trades} trades
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 text-sm">₦{(participant.holdings / 1000000000).toFixed(1)}B</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-3">
        <h3 className="text-gray-900">Recent Market Activity</h3>
        {recentTransactions.map((transaction) => (
          <Card key={transaction.id} className="border-gray-200">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {transaction.type}
                    </Badge>
                    <Badge className={`text-xs ${
                      transaction.status === 'Settled' 
                        ? 'bg-green-600' 
                        : 'bg-amber-600'
                    }`}>
                      {transaction.status}
                    </Badge>
                  </div>
                  <p className="text-gray-900 text-sm mt-2">{transaction.entity}</p>
                  <p className="text-gray-600 text-xs">
                    {transaction.bond} • {new Date(transaction.date).toLocaleDateString('en-NG')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">₦{(transaction.amount / 1000000000).toFixed(1)}B</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      {role !== 'cscs' && (
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-[#008753] hover:bg-[#006d42]">
            <BarChart3 size={18} className="mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" className="border-gray-300">
            <Download size={18} className="mr-2" />
            Export Data
          </Button>
        </div>
      )}

      {role === 'cscs' && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4 text-center">
            <Eye size={24} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">View-Only Access</p>
            <p className="text-gray-500 text-xs mt-1">
              Contact administrator for additional permissions
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
