import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { InfoTooltip } from './InfoTooltip';
import { RoleSelector } from './RoleSelector';
import { useUserRole } from '../contexts/UserRoleContext';
import { User, Shield, Wallet, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, CheckCircle, UserCircle } from 'lucide-react';

interface AccountProps {
  onFeatureOpen: (feature: string) => void;
}

export function Account({ onFeatureOpen }: AccountProps) {
  const { role, roleConfig } = useUserRole();
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const userProfile = {
    name: 'Oluwaseun Adebayo',
    email: 'oluwaseun.adebayo@email.com',
    phone: '+234 803 456 7890',
    bvnVerified: true,
    kycStatus: 'Verified',
    accountBalance: 125000,
  };

  const accountSections = [
    {
      title: 'Profile Information',
      icon: User,
      items: [
        { label: 'Full Name', value: userProfile.name },
        { label: 'Email Address', value: userProfile.email },
        { label: 'Phone Number', value: userProfile.phone },
      ],
    },
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-[#008753] rounded-full flex items-center justify-center mx-auto mb-3">
          <User size={40} className="text-white" />
        </div>
        <h2 className="text-gray-900">{userProfile.name}</h2>
        <p className="text-gray-600 text-sm">{userProfile.email}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Badge className="bg-[#008753] hover:bg-[#006d42]">
            <CheckCircle size={12} className="mr-1" />
            {userProfile.kycStatus}
          </Badge>
          {userProfile.bvnVerified && (
            <Badge variant="outline" className="border-blue-600 text-blue-600">
              BVN Verified
            </Badge>
          )}
        </div>
        <Badge 
          variant="outline" 
          className={`mt-2 ${roleConfig.isRegulator ? 'border-blue-600 text-blue-600' : 'border-[#008753] text-[#008753]'}`}
        >
          {roleConfig.name}
        </Badge>
      </div>

      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCircle size={20} className="text-gray-600" />
              <div>
                <p className="text-gray-900 text-sm">Account Type</p>
                <p className="text-gray-600 text-xs mt-0.5">{roleConfig.description}</p>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowRoleSelector(true)}
            >
              Switch
            </Button>
          </div>
        </CardContent>
      </Card>

      {roleConfig.canTrade && (
        <Card className="bg-gradient-to-br from-gray-900 to-gray-700 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={20} className="text-white/80" />
              <span className="text-white/80 text-sm">Account Balance</span>
              <InfoTooltip 
                content="Available funds in your account for purchasing bonds. Withdrawals will be available after your bonds mature."
                isDark
              />
            </div>
            <p className="text-3xl mb-4">₦{userProfile.accountBalance.toLocaleString()}</p>
            <div className="flex gap-2">
              <Button 
                onClick={() => onFeatureOpen('add-funds')}
                className="flex-1 bg-white text-gray-900 hover:bg-gray-100"
              >
                Add Funds
              </Button>
              <Button 
                onClick={() => onFeatureOpen('withdraw')}
                variant="outline" 
                className="flex-1 bg-white text-gray-900 hover:bg-gray-100"
              >
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {accountSections.map((section, idx) => (
        <div key={idx} className="space-y-3">
          <h3 className="text-gray-900 flex items-center gap-2">
            <section.icon size={20} className="text-gray-600" />
            {section.title}
          </h3>
          <Card className="border-gray-200">
            <CardContent className="p-0">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 flex items-center justify-between ${
                    index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className="text-gray-600 text-sm">{item.label}</span>
                  <span className="text-gray-900 text-sm">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}

      <div className="space-y-3">
        <h3 className="text-gray-900 flex items-center gap-2">
          <Shield size={20} className="text-gray-600" />
          Security & Settings
        </h3>
        <Card className="border-gray-200">
          <CardContent className="p-0">
            <button 
              onClick={() => onFeatureOpen('payment-methods')}
              className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-gray-600" />
                <span className="text-gray-900 text-sm">Payment Methods</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button 
              onClick={() => onFeatureOpen('notifications')}
              className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-600" />
                <span className="text-gray-900 text-sm">Notifications</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button 
              onClick={() => onFeatureOpen('security-settings')}
              className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-gray-600" />
                <span className="text-gray-900 text-sm">Security Settings</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button 
              onClick={() => onFeatureOpen('help-support')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-gray-600" />
                <span className="text-gray-900 text-sm">Help & Support</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </CardContent>
        </Card>
      </div>

      <Button 
        variant="outline" 
        className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
      >
        <LogOut size={20} className="mr-2" />
        Log Out
      </Button>

      <div className="text-center text-gray-500 text-xs pb-4">
        Bond Token Nigeria v1.0.0
        <br />
        Secured with quantum-resistant cryptography
      </div>

      <RoleSelector open={showRoleSelector} onClose={() => setShowRoleSelector(false)} />
    </div>
  );
}