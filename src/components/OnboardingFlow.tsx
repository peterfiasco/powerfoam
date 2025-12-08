import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Shield, User, CheckCircle2, ArrowRight, Fingerprint, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

interface OnboardingFlowProps {
  onComplete: () => void;
}

type Step = 'bvn' | 'account' | 'kyc' | 'complete';

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('bvn');
  const [bvn, setBvn] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const steps = [
    { id: 'bvn', label: 'BVN Verification', icon: Shield },
    { id: 'account', label: 'Account Setup', icon: User },
    { id: 'kyc', label: 'KYC Compliance', icon: Fingerprint },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progress = currentStep === 'complete' ? 100 : ((currentStepIndex + 1) / steps.length) * 100;

  const handleBvnVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCurrentStep('account');
    }, 2000);
  };

  const handleAccountSetup = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCurrentStep('kyc');
    }, 2000);
  };

  const handleKycComplete = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCurrentStep('complete');
    }, 2000);
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#008753]/5 via-white to-[#008753]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="size-12 bg-gradient-to-br from-[#008753] to-[#00a864] rounded-xl" />
            <h1 className="text-[#008753]">Bond Token Nigeria</h1>
          </div>
          <p className="text-slate-600">Your gateway to digital bond investment</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isComplete = index < currentStepIndex || currentStep === 'complete';
              const isCurrent = step.id === currentStep;
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`size-12 rounded-full flex items-center justify-center ${
                      isComplete
                        ? 'bg-[#008753] text-white'
                        : isCurrent
                        ? 'bg-[#008753]/20 text-[#008753]'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isComplete ? <CheckCircle2 className="size-6" /> : <Icon className="size-6" />}
                  </div>
                  <span className="text-xs text-slate-600 text-center max-w-[80px]">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* BVN Verification */}
        {currentStep === 'bvn' && (
          <Card>
            <CardHeader>
              <CardTitle>BVN Verification</CardTitle>
              <CardDescription>
                Enter your Bank Verification Number to verify your identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bvn">BVN (Bank Verification Number)</Label>
                <Input
                  id="bvn"
                  placeholder="Enter 11-digit BVN"
                  maxLength={11}
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value.replace(/\D/g, ''))}
                />
                <p className="text-xs text-slate-500">
                  Your BVN is securely encrypted and used only for identity verification
                </p>
              </div>
              <div className="bg-[#008753]/5 border border-[#008753]/20 rounded-lg p-4">
                <div className="flex gap-3">
                  <Shield className="size-5 text-[#008753] mt-0.5" />
                  <div>
                    <p className="text-sm text-[#008753]">Secure & Compliant</p>
                    <p className="text-xs text-slate-600 mt-1">
                      We comply with CBN and SEC regulations for digital asset platforms
                    </p>
                  </div>
                </div>
              </div>
              <Button
                className="w-full bg-[#008753] hover:bg-[#006d42]"
                onClick={handleBvnVerify}
                disabled={bvn.length !== 11 || isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify BVN'}
                {!isVerifying && <ArrowRight className="ml-2 size-4" />}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Account Setup */}
        {currentStep === 'account' && (
          <Card>
            <CardHeader>
              <CardTitle>Account Setup</CardTitle>
              <CardDescription>
                Set up your account with basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Okafor" defaultValue="Okafor" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+234 XXX XXX XXXX" defaultValue="+234 803 XXX XXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Fingerprint className="size-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-900">Document Verification</p>
                    <p className="text-xs text-amber-700 mt-1">
                      NIN, Driver's License, or International Passport required
                    </p>
                  </div>
                </div>
              </div>
              <Button
                className="w-full bg-[#008753] hover:bg-[#006d42]"
                onClick={handleAccountSetup}
                disabled={isVerifying}
              >
                {isVerifying ? 'Processing...' : 'Complete Account Setup'}
                {!isVerifying && <ArrowRight className="ml-2 size-4" />}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* KYC Compliance */}
        {currentStep === 'kyc' && (
          <Card>
            <CardHeader>
              <CardTitle>KYC Compliance Check</CardTitle>
              <CardDescription>
                Final step to complete your account setup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Okafor" defaultValue="Okafor" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+234 XXX XXX XXXX" defaultValue="+234 803 XXX XXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Fingerprint className="size-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-900">Document Verification</p>
                    <p className="text-xs text-amber-700 mt-1">
                      NIN, Driver's License, or International Passport required
                    </p>
                  </div>
                </div>
              </div>
              <Button
                className="w-full bg-[#008753] hover:bg-[#006d42]"
                onClick={handleKycComplete}
                disabled={isVerifying}
              >
                {isVerifying ? 'Processing...' : 'Complete KYC'}
                {!isVerifying && <ArrowRight className="ml-2 size-4" />}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Complete */}
        {currentStep === 'complete' && (
          <Card className="text-center">
            <CardContent className="pt-12 pb-8 space-y-6">
              <div className="inline-flex items-center justify-center size-20 bg-[#008753]/10 rounded-full">
                <CheckCircle2 className="size-10 text-[#008753]" />
              </div>
              <div>
                <h2 className="text-[#008753] mb-2">Welcome to Bond Token Nigeria!</h2>
                <p className="text-slate-600">
                  Your account is ready. Start investing in tokenized government bonds.
                </p>
                <Badge variant="secondary" className="mt-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 gap-1.5 px-3 py-1">
                  <Sparkles className="size-3.5" />
                  Micro-savings enabled
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-gradient-to-br from-[#008753]/10 to-[#00a864]/10 border-2 border-[#008753]/30 rounded-lg p-4">
                  <p className="text-xs text-slate-600 mb-1">Min. Investment</p>
                  <p className="text-[#008753] text-2xl">₦100</p>
                  <Badge variant="secondary" className="mt-2 bg-[#008753] text-white text-[10px] px-1.5 py-0.5">
                    START SMALL
                  </Badge>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-600 mb-1">Avg. Yield</p>
                  <p className="text-[#008753]">12.5%</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute top-1 right-1">
                    <Shield className="size-4 text-[#008753]/20" />
                  </div>
                  <p className="text-xs text-slate-600 mb-1">Tax Free</p>
                  <p className="text-[#008753]">100%</p>
                </div>
              </div>
              <Button
                className="bg-[#008753] hover:bg-[#006d42] shadow-lg shadow-[#008753]/20"
                onClick={handleComplete}
                size="lg"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}