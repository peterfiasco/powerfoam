import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowRight, CheckCircle2, Fingerprint, Shield, Sparkles } from 'lucide-react';

interface RegistrationPageProps {
  onComplete: () => void;
}

type BvnStatus = 'idle' | 'verifying' | 'verified';

export function RegistrationPage({ onComplete }: RegistrationPageProps) {
  const [bvn, setBvn] = useState('');
  const [bvnStatus, setBvnStatus] = useState<BvnStatus>('idle');

  const isVerifying = bvnStatus === 'verifying';
  const isVerified = bvnStatus === 'verified';

  const handleVerify = () => {
    if (bvn.length !== 11 || isVerifying || isVerified) {
      return;
    }
    setBvnStatus('verifying');
    setTimeout(() => {
      setBvnStatus('verified');
    }, 1600);
  };

  return (
    <div className="registration-shell">
      <div className="registration-ambient float-slow" />
      <div className="registration-ambient secondary float-slower" />

      <div className="registration-container">
        <header className="registration-header reveal">
          <div className="app-brand">
            <div className="app-brand-mark" />
            <div>
              <p className="app-brand-title font-display">Bond Token Nigeria</p>
              <p className="app-brand-sub">Tokenized sovereign bonds</p>
            </div>
          </div>
          <Badge className="bg-[#008753]/10 text-[#008753] border border-[#008753]/20">
            Secure onboarding
          </Badge>
        </header>

        <div className="registration-grid">
          <section className="registration-hero reveal reveal-delay-1">
            <div className="registration-panel panel-outline">
              <Badge className="bg-[#008753] text-white w-fit">
                New issuance window
              </Badge>
              <h1 className="registration-title font-display">
                Register once, access every new Nigerian bond auction.
              </h1>
              <p className="registration-lead">
                Create a BVN-verified account to invest, track coupons, and trade
                sovereign notes with a clear compliance trail.
              </p>
            </div>

            <div className="registration-metrics">
              <div className="metric-card">
                <p className="text-gray-600 text-sm">Minimum investment</p>
                <p className="metric-value font-display">NGN 10,000</p>
                <p className="text-gray-500 text-xs">Start with micro-lots</p>
              </div>
              <div className="metric-card">
                <p className="text-gray-600 text-sm">Average yield</p>
                <p className="metric-value font-display">11 - 16%</p>
                <p className="text-gray-500 text-xs">Recent auction range</p>
              </div>
              <div className="metric-card">
                <p className="text-gray-600 text-sm">Tax status</p>
                <p className="metric-value font-display">Tax-free</p>
                <p className="text-gray-500 text-xs">Federal coupon relief</p>
              </div>
            </div>

            <div className="registration-panel">
              <h3 className="font-display">What you unlock</h3>
              <div className="registration-list">
                <div className="registration-list-item">
                  <Shield size={20} className="text-[#008753]" />
                  <div>
                    <p className="text-gray-900 text-sm">BVN-aligned onboarding</p>
                    <p className="text-gray-600 text-xs">Mock verification for this demo</p>
                  </div>
                </div>
                <div className="registration-list-item">
                  <Fingerprint size={20} className="text-[#008753]" />
                  <div>
                    <p className="text-gray-900 text-sm">KYC-ready profiles</p>
                    <p className="text-gray-600 text-xs">Store identity details once</p>
                  </div>
                </div>
                <div className="registration-list-item">
                  <Sparkles size={20} className="text-[#008753]" />
                  <div>
                    <p className="text-gray-900 text-sm">Smart allocation tools</p>
                    <p className="text-gray-600 text-xs">Plan yield ladders faster</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="registration-form reveal reveal-delay-2">
            <div className="registration-panel">
              <div>
                <h2 className="font-display">Create your account</h2>
                <p className="text-gray-600 text-sm">
                  Complete the details below, then verify your BVN.
                </p>
              </div>

              <div className="form-grid two-col">
                <div className="form-field">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="Amina" />
                </div>
                <div className="form-field">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Okoye" />
                </div>
                <div className="form-field">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" placeholder="amina@email.com" />
                </div>
                <div className="form-field">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" placeholder="+234 801 000 0000" />
                </div>
              </div>

              <div className="bvn-panel">
                <div className="bvn-header">
                  <div>
                    <p className="text-gray-900 text-sm font-medium">BVN registration</p>
                    <p className="text-gray-600 text-xs">
                      Enter your 11-digit BVN to unlock trading.
                    </p>
                  </div>
                  <Badge className="bg-white text-[#008753] border border-[#008753]/20">
                    Mock check
                  </Badge>
                </div>
                <div className="form-field">
                  <Label htmlFor="bvn">BVN</Label>
                  <Input
                    id="bvn"
                    placeholder="Enter 11-digit BVN"
                    maxLength={11}
                    value={bvn}
                    onChange={(event) => setBvn(event.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <div className="bvn-status">
                  <Shield className="size-4 text-[#008753]" />
                  <span>
                    {isVerified
                      ? 'Verified and ready for onboarding.'
                      : isVerifying
                      ? 'Verifying BVN...'
                      : 'BVN is encrypted and checked after submission.'}
                  </span>
                </div>
                <Button
                  className="w-full bg-[#008753] hover:bg-[#006d42]"
                  onClick={handleVerify}
                  disabled={bvn.length !== 11 || isVerifying || isVerified}
                >
                  {isVerified ? 'BVN Verified' : isVerifying ? 'Verifying...' : 'Verify BVN'}
                  {!isVerifying && !isVerified && <ArrowRight className="ml-2 size-4" />}
                  {isVerified && <CheckCircle2 className="ml-2 size-4" />}
                </Button>
              </div>

              <div className="form-actions">
                <Button
                  className="w-full bg-[#008753] hover:bg-[#006d42] shadow-lg"
                  onClick={onComplete}
                  disabled={!isVerified}
                >
                  Continue to dashboard
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <p className="text-gray-500 text-xs">
                  BVN verification is mocked in this demo environment.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
