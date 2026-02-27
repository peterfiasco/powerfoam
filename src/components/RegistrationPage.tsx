import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  User, 
  Mail, 
  Lock, 
  Gift, 
  ChevronDown, 
  ShieldCheck,
  PieChart,
  ArrowRight
} from 'lucide-react';

interface RegistrationPageProps {
  onComplete: () => void;
}

export function RegistrationPage({ onComplete }: RegistrationPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onComplete(); 
    }, 1500);
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
                Create a BVN-verified account to invest, track coupons, and trade sovereign notes with a clear compliance trail.
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
            </div>

            <div className="registration-panel">
              <h3 className="font-display">Platform Benefits</h3>
              <div className="registration-list">
                <div className="registration-list-item">
                  <ShieldCheck size={20} className="text-[#008753]" />
                  <div>
                    <p className="text-gray-900 text-sm font-medium">Bank-grade security</p>
                    <p className="text-gray-600 text-xs">AES-256 encryption</p>
                  </div>
                </div>
                <div className="registration-list-item">
                  <PieChart size={20} className="text-[#008753]" />
                  <div>
                    <p className="text-gray-900 text-sm font-medium">Instant Settlements</p>
                    <p className="text-gray-600 text-xs">Trade on the secondary market with zero delays</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="registration-form reveal reveal-delay-2">
            <div className="registration-panel !p-8">
              <div>
                <h2 className="font-display text-2xl">Create Account</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Enter your login details to get started.
                </p>
              </div>

              <div className="space-y-6 mt-6">
                <div className="flex items-center border-b border-gray-200 pb-2 focus-within:border-[#008753] transition-colors">
                  <User className="text-[#008753] mr-3 size-5" />
                  <input type="text" placeholder="Username" className="w-full outline-none bg-transparent text-gray-900 placeholder:text-gray-400" />
                </div>
                <div className="flex items-center border-b border-gray-200 pb-2 focus-within:border-[#008753] transition-colors">
                  <Mail className="text-[#008753] mr-3 size-5" />
                  <input type="email" placeholder="Email Address" className="w-full outline-none bg-transparent text-gray-900 placeholder:text-gray-400" />
                </div>
                <div className="flex items-center border-b border-gray-200 pb-2 focus-within:border-[#008753] transition-colors">
                  <div className="flex items-center gap-1 mr-3 border-r border-gray-200 pr-2">
                    <span className="text-lg">🇳🇬</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                  <input type="tel" placeholder="Phone Number" className="w-full outline-none bg-transparent text-gray-900 placeholder:text-gray-400" />
                </div>
                <div className="flex items-center border-b border-gray-200 pb-2 focus-within:border-[#008753] transition-colors">
                  <Lock className="text-[#008753] mr-3 size-5" />
                  <input type="password" placeholder="Password" className="w-full outline-none bg-transparent text-gray-900 placeholder:text-gray-400" />
                </div>
                <div className="flex items-center border-b border-gray-200 pb-2 focus-within:border-[#008753] transition-colors">
                  <Lock className="text-[#008753] mr-3 size-5" />
                  <input type="password" placeholder="Confirm Password" className="w-full outline-none bg-transparent text-gray-900 placeholder:text-gray-400" />
                </div>
                <div className="flex items-center border-b border-gray-200 pb-2 focus-within:border-[#008753] transition-colors">
                  <Gift className="text-[#008753] mr-3 size-5" />
                  <input type="text" placeholder="Referral code (Optional)" className="w-full outline-none bg-transparent text-gray-900 placeholder:text-gray-400" />
                </div>
              </div>

              <div className="form-actions mt-8">
                
                <Button 
                  className="w-full bg-[#008753] hover:bg-[#006d42] text-white h-12 rounded-lg font-medium shadow-md transition-all disabled:opacity-80 disabled:text-white" 
                  onClick={handleSignUp} 
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Sign up'}
                  {!isLoading && <ArrowRight className="ml-2 size-4 text-white" />}
                </Button>
                <p className="text-center text-[10px] text-gray-500 mt-3 px-4 leading-relaxed">
                  By clicking Sign Up you agree to Bond Token's <span className="text-[#008753] cursor-pointer">Terms & Conditions</span>
                </p>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Got an account? <span className="text-[#008753] font-medium cursor-pointer">Sign in</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}