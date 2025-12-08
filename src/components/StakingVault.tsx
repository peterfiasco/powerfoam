import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Vault, 
  TrendingUp, 
  Clock, 
  Lock, 
  Unlock, 
  Plus, 
  Shield, 
  Coins,
  Calendar,
  ChevronRight,
  Info,
  Award,
  Building2,
  CheckCircle2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface StakedBond {
  id: string;
  name: string;
  amount: number;
  bondAPY: number;
  stakingAPY: number;
  totalAPY: number;
  stakedDate: string;
  lockPeriod: number;
  unlockDate: string;
  estimatedRewards: number;
  status: 'active' | 'unlocking' | 'unlocked';
}

export function StakingVault() {
  const [isStakeDialogOpen, setIsStakeDialogOpen] = useState(false);
  const [isUnstakeDialogOpen, setIsUnstakeDialogOpen] = useState(false);
  const [selectedBond, setSelectedBond] = useState<StakedBond | null>(null);

  // Mock data
  const totalStakedBalance = 2500000; // ₦2.5M
  const totalBondAPY = 12.5;
  const totalStakingAPY = 3.0;
  const totalAPY = totalBondAPY + totalStakingAPY;
  const nextPayoutHours = 12;
  const nextPayoutProgress = ((24 - nextPayoutHours) / 24) * 100;
  const estimatedNextPayout = 8542;

  const stakedBonds: StakedBond[] = [
    {
      id: '1',
      name: 'FGN 2027',
      amount: 1000000,
      bondAPY: 12.5,
      stakingAPY: 3.0,
      totalAPY: 15.5,
      stakedDate: '2024-01-15',
      lockPeriod: 90,
      unlockDate: '2024-04-15',
      estimatedRewards: 38750,
      status: 'active',
    },
    {
      id: '2',
      name: 'FGN 2029',
      amount: 800000,
      bondAPY: 13.0,
      stakingAPY: 2.8,
      totalAPY: 15.8,
      stakedDate: '2024-02-01',
      lockPeriod: 180,
      unlockDate: '2024-08-01',
      estimatedRewards: 42133,
      status: 'active',
    },
    {
      id: '3',
      name: 'FGN 2026',
      amount: 700000,
      bondAPY: 11.8,
      stakingAPY: 3.2,
      totalAPY: 15.0,
      stakedDate: '2024-03-10',
      lockPeriod: 60,
      unlockDate: '2024-05-10',
      estimatedRewards: 26250,
      status: 'active',
    },
  ];

  const handleUnstake = (bond: StakedBond) => {
    setSelectedBond(bond);
    setIsUnstakeDialogOpen(true);
  };

  const calculateDaysRemaining = (unlockDate: string) => {
    const today = new Date();
    const unlock = new Date(unlockDate);
    const diffTime = unlock.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Vault className="size-6 text-[#008753]" />
          <h2 className="text-[#008753]">Staking Vault</h2>
        </div>
        <p className="text-slate-600">
          Lock your bonds to earn additional yield rewards
        </p>
      </div>

      {/* Hero Card - Total Staked Overview */}
      <Card className="bg-gradient-to-br from-[#008753] to-[#00a864] text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/80 mb-2">Total Staked Balance</p>
              <h1 className="text-white">₦{totalStakedBalance.toLocaleString()}</h1>
            </div>
            <div className="size-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Lock className="size-6 text-white" />
            </div>
          </div>

          {/* APY Breakdown */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80">Total APY</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-white" />
                <span className="text-white text-2xl">{totalAPY}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20">
              <div>
                <p className="text-xs text-white/60 mb-1">Bond Yield</p>
                <p className="text-white">{totalBondAPY}%</p>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">Staking Bonus</p>
                <p className="text-white">+{totalStakingAPY}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reward Tracker */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5 text-[#008753]" />
              Next Payout
            </CardTitle>
            <Badge variant="secondary" className="bg-[#008753]/10 text-[#008753]">
              Tax-Free
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 mb-1">Time Remaining</p>
              <p className="text-[#008753]">{nextPayoutHours} hours</p>
            </div>
            <div className="text-right">
              <p className="text-slate-600 mb-1">Estimated Payout</p>
              <p className="text-[#008753]">₦{estimatedNextPayout.toLocaleString()}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={nextPayoutProgress} className="h-2" />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Last payout: 12 hours ago</span>
              <span>{Math.round(nextPayoutProgress)}% complete</span>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
            <Info className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-900">
              Rewards are distributed every 24 hours automatically to your account
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="size-4 text-[#008753]" />
              <p className="text-xs text-slate-600">Total Earned</p>
            </div>
            <p className="text-[#008753]">₦107,133</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="size-4 text-[#008753]" />
              <p className="text-xs text-slate-600">Active Stakes</p>
            </div>
            <p className="text-[#008753]">{stakedBonds.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-4 text-[#008753]" />
              <p className="text-xs text-slate-600">Avg APY</p>
            </div>
            <p className="text-[#008753]">{totalAPY}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="size-4 text-[#008753]" />
              <p className="text-xs text-slate-600">Avg Lock Period</p>
            </div>
            <p className="text-[#008753]">110 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Premium Return Programs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-slate-900 mb-1">Premium Return Programs</h3>
            <p className="text-sm text-slate-600">Partner institutions generating your extra yield</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Program 1 - Emerald Reserve */}
          <Card className="border-[#008753]/30 hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Building2 className="size-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 mb-1">Emerald Reserve</h4>
                    <p className="text-sm text-slate-600">Global Infrastructure Fund</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  Active
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Your allocation</span>
                  <span className="text-slate-900">₦1,200,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Bonus APY</span>
                  <span className="text-[#008753]">+3.0%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Reliability</span>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <CheckCircle2 key={i} className="size-3 text-[#008753]" />
                      ))}
                    </div>
                    <span className="text-slate-900">99.9%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="size-3" />
                  <span>Regulated & Insured</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Program 2 - Sovereign Yield Pool */}
          <Card className="border-blue-300/30 hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Award className="size-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 mb-1">Sovereign Yield Pool</h4>
                    <p className="text-sm text-slate-600">Government Securities Fund</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Active
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Your allocation</span>
                  <span className="text-slate-900">₦1,300,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Bonus APY</span>
                  <span className="text-[#008753]">+2.8%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Reliability</span>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <CheckCircle2 key={i} className="size-3 text-blue-600" />
                      ))}
                    </div>
                    <span className="text-slate-900">99.8%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="size-3" />
                  <span>Government Backed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info about programs */}
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="p-4 flex gap-3">
            <Info className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-blue-900 mb-1">About Premium Return Programs</p>
              <p className="text-xs text-blue-700">
                Your bonds are secured with trusted institutional partners who generate additional returns through strategic investments. Your principal remains 100% safe while earning enhanced yields. All programs are fully regulated and insured.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Stakes List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900">Active Stakes</h3>
          <Badge variant="secondary">{stakedBonds.length} bonds</Badge>
        </div>

        <div className="space-y-4">
          {stakedBonds.map((bond) => {
            const daysRemaining = calculateDaysRemaining(bond.unlockDate);
            const lockProgress = ((bond.lockPeriod - daysRemaining) / bond.lockPeriod) * 100;

            return (
              <Card key={bond.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Bond Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="size-10 bg-[#008753]/10 rounded-lg flex items-center justify-center">
                            <Shield className="size-5 text-[#008753]" />
                          </div>
                          <div>
                            <h4 className="text-slate-900 mb-1">{bond.name}</h4>
                            <p className="text-sm text-slate-600">
                              ₦{bond.amount.toLocaleString()} staked
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="bg-[#008753]/10 text-[#008753] hidden md:flex"
                        >
                          {bond.totalAPY}% APY
                        </Badge>
                      </div>

                      {/* APY Breakdown */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <div className="size-2 bg-blue-500 rounded-full" />
                          <span className="text-slate-600">Bond: {bond.bondAPY}%</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="size-2 bg-[#008753] rounded-full" />
                          <span className="text-slate-600">Staking: +{bond.stakingAPY}%</span>
                        </div>
                      </div>

                      {/* Lock Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Lock Period</span>
                          <span className="text-[#008753]">
                            {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Unlocked'}
                          </span>
                        </div>
                        <Progress value={lockProgress} className="h-1.5" />
                      </div>

                      {/* Rewards */}
                      <div className="bg-slate-50 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-600 mb-1">Estimated Rewards</p>
                          <p className="text-[#008753]">₦{bond.estimatedRewards.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-600 mb-1">Unlock Date</p>
                          <p className="text-slate-900">
                            {new Date(bond.unlockDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 lg:flex-none"
                      >
                        <ChevronRight className="size-4" />
                        Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnstake(bond)}
                        disabled={daysRemaining > 0}
                        className="flex-1 lg:flex-none"
                      >
                        <Unlock className="size-4" />
                        Unstake
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-20 right-4 md:hidden z-10">
        <Button
          size="lg"
          className="size-14 rounded-full shadow-lg bg-[#008753] hover:bg-[#006d42]"
          onClick={() => setIsStakeDialogOpen(true)}
        >
          <Plus className="size-6" />
        </Button>
      </div>

      {/* Bottom Action Bar (Desktop) */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Ready to stake more bonds?</p>
            <p className="text-[#008753]">Earn up to {totalAPY}% APY</p>
          </div>
          <Button
            size="lg"
            className="bg-[#008753] hover:bg-[#006d42] gap-2"
            onClick={() => setIsStakeDialogOpen(true)}
          >
            <Plus className="size-5" />
            Stake New Assets
          </Button>
        </div>
      </div>

      {/* Stake Dialog */}
      <Dialog open={isStakeDialogOpen} onOpenChange={setIsStakeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="size-5 text-[#008753]" />
              Stake Bond Assets
            </DialogTitle>
            <DialogDescription>
              Select a bond from your portfolio to start earning staking rewards
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Available Bonds Selection */}
            <div className="space-y-2">
              <Label>Available Bonds</Label>
              <div className="space-y-2">
                <Card className="cursor-pointer hover:border-[#008753] transition-colors">
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-slate-900 mb-1">FGN 2028</p>
                      <p className="text-sm text-slate-600">₦500,000 available</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-[#008753]/10 text-[#008753]">
                        14.5% APY
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Lock Period Selection */}
            <div className="space-y-2">
              <Label>Lock Period</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { days: 30, apy: 1.5 },
                  { days: 90, apy: 3.0 },
                  { days: 180, apy: 4.5 },
                ].map((option) => (
                  <Card
                    key={option.days}
                    className="cursor-pointer hover:border-[#008753] transition-colors"
                  >
                    <CardContent className="p-3 text-center">
                      <p className="text-slate-900 mb-1">{option.days} days</p>
                      <p className="text-sm text-[#008753]">+{option.apy}%</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="stake-amount">Stake Amount</Label>
              <Input
                id="stake-amount"
                type="number"
                placeholder="Enter amount"
                defaultValue="500000"
              />
              <p className="text-xs text-slate-500">
                Available: ₦500,000
              </p>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Base APY</span>
                <span className="text-slate-900">12.0%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Staking Bonus</span>
                <span className="text-[#008753]">+3.0%</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between">
                <span className="text-slate-900">Total APY</span>
                <span className="text-[#008753]">15.0%</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsStakeDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#008753] hover:bg-[#006d42]"
                onClick={() => setIsStakeDialogOpen(false)}
              >
                Confirm Stake
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unstake Dialog */}
      <Dialog open={isUnstakeDialogOpen} onOpenChange={setIsUnstakeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Unlock className="size-5 text-[#008753]" />
              Unstake Bond
            </DialogTitle>
            <DialogDescription>
              Remove your bond from the staking vault
            </DialogDescription>
          </DialogHeader>

          {selectedBond && (
            <div className="space-y-4">
              {/* Bond Details */}
              <Card className="bg-slate-50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-600">Bond</p>
                    <p className="text-slate-900">{selectedBond.name}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-600">Staked Amount</p>
                    <p className="text-slate-900">₦{selectedBond.amount.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-600">Total Earned</p>
                    <p className="text-[#008753]">
                      ₦{selectedBond.estimatedRewards.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Warning if early unstake */}
              {calculateDaysRemaining(selectedBond.unlockDate) > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                  <Info className="size-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-amber-900">
                    <p className="mb-1">Early unstaking will incur a 10% penalty</p>
                    <p className="text-amber-700">
                      Wait {calculateDaysRemaining(selectedBond.unlockDate)} more days to avoid fees
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsUnstakeDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#008753] hover:bg-[#006d42]"
                  onClick={() => setIsUnstakeDialogOpen(false)}
                >
                  Confirm Unstake
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}