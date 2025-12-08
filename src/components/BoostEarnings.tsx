import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { InfoTooltip } from './InfoTooltip';
import { X, Zap, TrendingUp, Lock, Shield } from 'lucide-react';

interface BoostEarningsProps {
  onClose: () => void;
}

export function BoostEarnings({ onClose }: BoostEarningsProps) {
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [depositAmount, setDepositAmount] = useState('');

  const programs = [
    {
      id: 1,
      name: 'Emerald Reserve',
      apy: '12-14%',
      minDeposit: 100000,
      lockPeriod: '30 days',
      riskLevel: 'Low',
      description: 'Conservative premium return program with stable yields',
      benefits: ['Daily compound interest', 'Flexible withdrawal after 30 days', 'Low risk profile'],
    },
    {
      id: 2,
      name: 'Sovereign Yield Pool',
      apy: '15-18%',
      minDeposit: 250000,
      lockPeriod: '90 days',
      riskLevel: 'Medium',
      description: 'Advanced premium return program for higher yields',
      benefits: ['Daily compound interest', 'Priority customer support', 'Performance bonuses'],
    },
    {
      id: 3,
      name: 'Elite Growth Vault',
      apy: '16-20%',
      minDeposit: 500000,
      lockPeriod: '180 days',
      riskLevel: 'Medium',
      description: 'Premium tier program with maximum return potential',
      benefits: ['Daily compound interest', 'Dedicated account manager', 'Premium rewards program'],
    },
  ];

  const handleDeposit = () => {
    alert(`Successfully deposited ₦${parseInt(depositAmount).toLocaleString()} into ${selectedProgram.name}`);
    setSelectedProgram(null);
    setDepositAmount('');
    onClose();
  };

  const calculateEstimatedEarnings = () => {
    if (!depositAmount || !selectedProgram) return 0;
    const amount = parseInt(depositAmount);
    const avgAPY = parseFloat(selectedProgram.apy.split('-')[1]) / 100;
    return Math.round(amount * avgAPY);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-2xl sm:mx-4 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#008753]/10 p-2 rounded-lg">
              <Zap size={24} className="text-[#008753]" />
            </div>
            <div>
              <h2 className="text-gray-900">Boost Earnings</h2>
              <p className="text-gray-600 text-sm">Premium Return Programs</p>
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
        <div className="p-4 space-y-4">
          {/* Info Banner */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <TrendingUp size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-900">Earn More on Your Holdings</h4>
                  <p className="text-amber-700 text-sm mt-1">
                    Our Premium Return Programs allow you to earn additional returns on your bond investments through strategic portfolio optimization.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Programs */}
          <div className="space-y-3">
            {programs.map((program) => (
              <Card key={program.id} className="border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-gray-900">{program.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">{program.description}</p>
                    </div>
                    <div className="bg-[#008753]/10 px-3 py-1 rounded-lg text-center">
                      <p className="text-[#008753] text-xl">{program.apy}</p>
                      <p className="text-gray-600 text-xs">APY</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-gray-600 text-xs flex items-center gap-1">
                        Min. Deposit
                        <InfoTooltip content="Minimum amount required to join this program" />
                      </p>
                      <p className="text-gray-900 text-sm">₦{program.minDeposit.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-gray-600 text-xs flex items-center gap-1">
                        Lock Period
                        <InfoTooltip content="Minimum time before you can withdraw your funds" />
                      </p>
                      <p className="text-gray-900 text-sm">{program.lockPeriod}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-gray-600 text-xs">Risk Level</p>
                      <Badge 
                        variant="outline" 
                        className={`text-xs mt-1 ${
                          program.riskLevel === 'Low' 
                            ? 'border-green-600 text-green-600' 
                            : 'border-amber-600 text-amber-600'
                        }`}
                      >
                        {program.riskLevel}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 text-sm mb-2">Benefits:</p>
                    <ul className="space-y-1">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
                          <Shield size={14} className="text-[#008753] flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="w-full bg-[#008753] hover:bg-[#006d42]"
                    onClick={() => setSelectedProgram(program)}
                  >
                    Join Program
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Lock size={20} className="text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-900">Secured & Protected</h4>
                  <p className="text-blue-700 text-sm mt-1">
                    All programs use advanced security protocols and are designed to optimize returns while maintaining the safety of your investment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Deposit Dialog */}
      <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Join {selectedProgram?.name}</DialogTitle>
            <DialogDescription>
              Enter the amount you wish to deposit into this program
            </DialogDescription>
          </DialogHeader>

          {selectedProgram && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expected APY</span>
                  <span className="text-[#008753]">{selectedProgram.apy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Lock Period</span>
                  <span className="text-gray-900">{selectedProgram.lockPeriod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Minimum Deposit</span>
                  <span className="text-gray-900">₦{selectedProgram.minDeposit.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="deposit-amount">Deposit Amount (₦)</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder={`Min. ₦${selectedProgram.minDeposit.toLocaleString()}`}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="mt-1"
                  min={selectedProgram.minDeposit}
                  step={10000}
                />
              </div>

              {depositAmount && parseInt(depositAmount) >= selectedProgram.minDeposit && (
                <div className="bg-[#008753]/10 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Estimated Annual Earnings</p>
                  <p className="text-[#008753] text-2xl mt-1">
                    ₦{calculateEstimatedEarnings().toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">Based on maximum APY</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSelectedProgram(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-[#008753] hover:bg-[#006d42]"
              onClick={handleDeposit}
              disabled={!depositAmount || parseInt(depositAmount) < (selectedProgram?.minDeposit || 0)}
            >
              Confirm Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
