import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  X, 
  BookOpen, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Shield,
  Percent,
  ArrowUpDown,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  PlayCircle
} from 'lucide-react';

interface EducationCenterProps {
  onClose: () => void;
}

const lessons = [
  {
    id: 1,
    title: 'What Are Bonds?',
    icon: BookOpen,
    duration: '3 min read',
    difficulty: 'Beginner',
    color: 'blue',
  },
  {
    id: 2,
    title: 'How Bonds Work',
    icon: DollarSign,
    duration: '4 min read',
    difficulty: 'Beginner',
    color: 'green',
  },
  {
    id: 3,
    title: 'Understanding Yields & Rates',
    icon: Percent,
    duration: '5 min read',
    difficulty: 'Intermediate',
    color: 'purple',
  },
  {
    id: 4,
    title: 'Interest Rates vs Bond Prices',
    icon: ArrowUpDown,
    duration: '6 min read',
    difficulty: 'Intermediate',
    color: 'amber',
  },
  {
    id: 5,
    title: 'When to Buy & Sell Bonds',
    icon: Calendar,
    duration: '4 min read',
    difficulty: 'Intermediate',
    color: 'indigo',
  },
  {
    id: 6,
    title: 'Tax Benefits in Nigeria',
    icon: Shield,
    duration: '3 min read',
    difficulty: 'Beginner',
    color: 'emerald',
  },
];

export function EducationCenter({ onClose }: EducationCenterProps) {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const getLessonContent = (lessonId: number) => {
    switch (lessonId) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-3">What Are Bonds? 🎓</h3>
              <p className="text-gray-700 mb-4">
                Think of a bond as a loan you give to the government or a company. When you buy a bond, you're 
                lending your money for a fixed period, and in return, they promise to:
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-900 text-sm">
                    <strong>Pay you regular interest</strong> (called "coupon payments") - usually every 6 months
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-900 text-sm">
                    <strong>Return your full investment</strong> when the bond "matures" (reaches its end date)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-gray-900 mb-2">Simple Example:</h4>
              <p className="text-gray-700 text-sm mb-3">
                You buy a ₦100,000 Nigerian Government Bond with:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#008753]">•</span>
                  <span className="text-gray-700"><strong>14% Coupon Rate:</strong> You earn ₦14,000 per year</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#008753]">•</span>
                  <span className="text-gray-700"><strong>5 Year Maturity:</strong> You get your ₦100,000 back in 2029</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#008753]">•</span>
                  <span className="text-gray-700"><strong>Semi-annual Payments:</strong> You receive ₦7,000 every 6 months</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-[#008753]/10 rounded-lg">
                <p className="text-[#008753]">
                  <strong>Total earnings over 5 years:</strong> ₦70,000 in interest + ₦100,000 back = ₦170,000
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 mb-2">Why Do Governments Issue Bonds?</h4>
              <p className="text-gray-700 text-sm">
                The Nigerian government issues bonds to raise money for important projects like building roads, 
                schools, and hospitals. Instead of taking a massive loan from one bank, they borrow small amounts 
                from many Nigerians like you!
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-3">How Bonds Work 🔧</h3>
              <p className="text-gray-700 mb-4">
                Understanding the key parts of a bond helps you make smart investment decisions.
              </p>
            </div>

            <div className="space-y-4">
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <DollarSign size={24} className="text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-gray-900 mb-1">Face Value (Par Value)</h4>
                      <p className="text-gray-700 text-sm">
                        This is the amount you'll get back when the bond matures. If you buy a ₦50,000 bond, 
                        you'll get exactly ₦50,000 back at maturity, regardless of what you paid for it.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Percent size={24} className="text-purple-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-gray-900 mb-1">Coupon Rate</h4>
                      <p className="text-gray-700 text-sm">
                        The interest rate you'll earn on the face value. A 15% coupon on a ₦100,000 bond 
                        means you earn ₦15,000 every year, split into two payments of ₦7,500 each.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Calendar size={24} className="text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-gray-900 mb-1">Maturity Date</h4>
                      <p className="text-gray-700 text-sm">
                        The day the bond expires and you get your money back. Nigerian government bonds 
                        typically mature in 3, 5, 7, 10, or even 20+ years.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Clock size={24} className="text-amber-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-gray-900 mb-1">Payment Frequency</h4>
                      <p className="text-gray-700 text-sm">
                        Most Nigerian government bonds pay semi-annually (twice a year). So if your annual 
                        interest is ₦20,000, you'll receive ₦10,000 every 6 months.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-green-900 mb-2">The Bond Lifecycle:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">1</div>
                  <span className="text-green-900">You buy the bond at ₦50,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">2</div>
                  <span className="text-green-900">You receive ₦3,500 every 6 months (14% annual rate)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">3</div>
                  <span className="text-green-900">After 5 years, you've earned ₦35,000 in interest</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">4</div>
                  <span className="text-green-900">On maturity, you get your ₦50,000 back</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-3">Understanding Yields & Rates 📊</h3>
              <p className="text-gray-700 mb-4">
                There are different types of "rates" when talking about bonds. Let's break them down in simple terms.
              </p>
            </div>

            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <h4 className="text-purple-900 mb-2">Coupon Rate vs Yield - What's the Difference?</h4>
                <p className="text-purple-800 text-sm">
                  Think of <strong>coupon rate</strong> as what's printed on the bond - it never changes. 
                  The <strong>yield</strong> is what you actually earn based on what you paid.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <h4 className="text-gray-900 mb-2">1. Coupon Rate (Fixed)</h4>
                <p className="text-gray-700 text-sm mb-2">
                  This is the interest rate promised by the bond issuer. It's based on the face value and NEVER changes.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <p className="text-gray-700">
                    <strong>Example:</strong> A ₦100,000 bond with a 15% coupon pays ₦15,000/year forever, 
                    no matter what happens in the market.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-gray-900 mb-2">2. Current Yield (What You Actually Earn)</h4>
                <p className="text-gray-700 text-sm mb-2">
                  This shows your return based on what you actually paid for the bond.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
                  <p className="text-gray-700">
                    <strong>Formula:</strong> Current Yield = (Annual Coupon Payment ÷ Price You Paid) × 100
                  </p>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <p className="text-gray-700 mb-2"><strong>Example 1:</strong></p>
                    <p className="text-gray-600">
                      You buy a bond for ₦100,000 (face value) with 15% coupon<br />
                      Current Yield = (₦15,000 ÷ ₦100,000) × 100 = <strong className="text-[#008753]">15%</strong>
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <p className="text-gray-700 mb-2"><strong>Example 2:</strong></p>
                    <p className="text-gray-600">
                      You buy the same bond on P2P for ₦95,000 (discount!)<br />
                      Current Yield = (₦15,000 ÷ ₦95,000) × 100 = <strong className="text-[#008753]">15.8%</strong> 🎉
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-gray-900 mb-2">3. Yield to Maturity (YTM) - The Full Picture</h4>
                <p className="text-gray-700 text-sm mb-2">
                  This is the total return you'll earn if you hold the bond until it matures. It considers:
                </p>
                <ul className="space-y-1 text-sm mb-3">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-gray-700">All coupon payments you'll receive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-gray-700">Any gain or loss from buying below/above face value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-gray-700">The time remaining until maturity</span>
                  </li>
                </ul>
                <div className="bg-purple-50 p-3 rounded-lg text-sm">
                  <p className="text-purple-900 mb-2"><strong>Simple Rule:</strong></p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-purple-800">Buy below face value → YTM is higher than coupon rate 📈</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-purple-800">Buy at face value → YTM equals coupon rate ➡️</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-purple-800">Buy above face value → YTM is lower than coupon rate 📉</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-3">Interest Rates vs Bond Prices ⚖️</h3>
              <p className="text-gray-700 mb-4">
                This is the most important relationship to understand! Bond prices and interest rates move in 
                OPPOSITE directions. Let's see why.
              </p>
            </div>

            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <ArrowUpDown size={24} className="text-amber-600" />
                  <h4 className="text-amber-900">The Inverse Relationship</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} className="text-red-600" />
                    <span className="text-amber-800 text-sm">
                      <strong>Interest Rates Rise</strong> → Bond Prices Fall
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown size={20} className="text-green-600" />
                    <span className="text-amber-800 text-sm">
                      <strong>Interest Rates Fall</strong> → Bond Prices Rise
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h4 className="text-gray-900 mb-3">Why Does This Happen? 🤔</h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div>
                  <p className="text-gray-900 mb-2"><strong>Scenario 1: Interest Rates Rise</strong></p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <strong>Today:</strong> You bought a bond paying 14% when that was the market rate.
                    </p>
                    <p className="text-gray-700">
                      <strong>Tomorrow:</strong> CBN raises rates and NEW bonds now pay 16%.
                    </p>
                    <p className="text-gray-700">
                      <strong>Problem:</strong> Why would anyone buy your old 14% bond at full price when they 
                      can get a new 16% bond?
                    </p>
                    <div className="bg-red-50 border-l-4 border-red-600 p-3 mt-2">
                      <p className="text-red-900 text-sm">
                        <strong>Result:</strong> Your bond's market price drops to around ₦87,500 (from ₦100,000) 
                        so the yield becomes competitive with new 16% bonds.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-900 mb-2"><strong>Scenario 2: Interest Rates Fall</strong></p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <strong>Today:</strong> You own a bond paying 14%.
                    </p>
                    <p className="text-gray-700">
                      <strong>Tomorrow:</strong> CBN cuts rates and NEW bonds only pay 12%.
                    </p>
                    <p className="text-gray-700">
                      <strong>Advantage:</strong> Your 14% bond is now more valuable than new 12% bonds!
                    </p>
                    <div className="bg-green-50 border-l-4 border-green-600 p-3 mt-2">
                      <p className="text-green-900 text-sm">
                        <strong>Result:</strong> Your bond's market price rises to around ₦116,700 because 
                        investors will pay a premium for that higher 14% coupon.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 mb-3">Real-World Example: Nigeria 2023-2024 🇳🇬</h4>
              <div className="bg-blue-50 p-4 rounded-lg space-y-3 text-sm">
                <p className="text-blue-900">
                  <strong>2023:</strong> CBN kept raising interest rates to fight inflation (went from ~13% to 18%).
                </p>
                <div className="flex items-start gap-2">
                  <TrendingDown size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-800">
                    Old bonds (issued at 12-14%) lost value in the secondary market because new bonds offered 16-18%.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-800">
                    <strong>If you held until maturity:</strong> You still got all your money back - no loss!
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-800">
                    <strong>Smart move:</strong> Buy high-yield bonds now before rates potentially drop in the future.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h4 className="text-green-900 mb-2">Key Takeaway 💡</h4>
                <p className="text-green-800 text-sm">
                  Bond price changes only matter if you sell before maturity. If you hold until maturity, 
                  you always get the face value back plus all coupon payments - interest rate changes don't 
                  affect you!
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-3">When to Buy & Sell Bonds 📅</h3>
              <p className="text-gray-700 mb-4">
                Timing can make a big difference in your returns. Here's what you need to know.
              </p>
            </div>

            <div>
              <h4 className="text-gray-900 mb-3">Best Times to BUY Bonds:</h4>
              <div className="space-y-3">
                <Card className="border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <TrendingUp size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h5 className="text-gray-900 mb-1">When Interest Rates Are High</h5>
                        <p className="text-gray-700 text-sm mb-2">
                          Lock in high coupon rates before the CBN potentially cuts rates in the future.
                        </p>
                        <div className="bg-green-50 p-2 rounded text-xs text-green-800">
                          <strong>Example:</strong> If rates are at 18% now but expected to drop to 14%, buying now 
                          means you earn 18% for the entire bond term.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <DollarSign size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h5 className="text-gray-900 mb-1">When You Have Lump Sum Cash</h5>
                        <p className="text-gray-700 text-sm mb-2">
                          Got a bonus, sold property, or received inheritance? Bonds provide safe, steady income.
                        </p>
                        <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                          <strong>Tip:</strong> Consider a bond ladder - buy bonds with different maturity dates 
                          so you have money coming back at regular intervals.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Shield size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h5 className="text-gray-900 mb-1">When You Want Safety Over Growth</h5>
                        <p className="text-gray-700 text-sm mb-2">
                          Approaching retirement or need guaranteed income? Bonds are more stable than stocks.
                        </p>
                        <div className="bg-purple-50 p-2 rounded text-xs text-purple-800">
                          <strong>Safety Level:</strong> Nigerian Government Bonds are backed by the Federal Government 
                          - one of the safest investments available.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 mb-3">Best Times to SELL Bonds (Before Maturity):</h4>
              <div className="space-y-3">
                <Card className="border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <TrendingUp size={20} className="text-amber-600" />
                      </div>
                      <div>
                        <h5 className="text-gray-900 mb-1">When Your Bond Price Has Increased</h5>
                        <p className="text-gray-700 text-sm mb-2">
                          If interest rates dropped after you bought, your bond is worth more in the market.
                        </p>
                        <div className="bg-amber-50 p-2 rounded text-xs text-amber-800">
                          <strong>Example:</strong> You bought at ₦100,000, rates dropped, now someone will pay you 
                          ₦110,000 on P2P. That's ₦10,000 instant profit + you keep all coupon payments received!
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <AlertCircle size={20} className="text-red-600" />
                      </div>
                      <div>
                        <h5 className="text-gray-900 mb-1">When You Need Emergency Cash</h5>
                        <p className="text-gray-700 text-sm mb-2">
                          Life happens. The P2P exchange lets you sell bonds quickly if you need money urgently.
                        </p>
                        <div className="bg-red-50 p-2 rounded text-xs text-red-800">
                          <strong>Note:</strong> You might have to sell at a discount (below face value) if interest 
                          rates have risen since you bought.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <ArrowUpDown size={20} className="text-indigo-600" />
                      </div>
                      <div>
                        <h5 className="text-gray-900 mb-1">When You Want to Reinvest at Higher Rates</h5>
                        <p className="text-gray-700 text-sm mb-2">
                          If new bonds offer significantly higher rates, it might make sense to sell and reinvest.
                        </p>
                        <div className="bg-indigo-50 p-2 rounded text-xs text-indigo-800">
                          <strong>Calculate First:</strong> Make sure the higher rate on new bonds compensates for 
                          any loss from selling your current bond below face value.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h4 className="text-green-900 mb-2">Pro Tip: The "Buy and Hold" Strategy 🎯</h4>
                <p className="text-green-800 text-sm">
                  For most people, the best strategy is to buy bonds and hold them until maturity. This way:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800">You don't worry about price fluctuations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800">You receive all scheduled coupon payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800">You get your full investment back at maturity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-3">Tax Benefits in Nigeria 🇳🇬</h3>
              <p className="text-gray-700 mb-4">
                One of the BIGGEST advantages of Nigerian government bonds - your coupon payments are completely tax-free!
              </p>
            </div>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={32} className="text-green-600" />
                  <div>
                    <h4 className="text-green-900">100% Tax-Free Coupon Income</h4>
                    <Badge className="bg-green-600 mt-1">Guaranteed by Law</Badge>
                  </div>
                </div>
                <p className="text-green-800 text-sm">
                  Under the Income Tax Act, all interest (coupon) payments from Federal Government of Nigeria 
                  bonds are exempt from income tax. This is a permanent benefit, not a temporary incentive.
                </p>
              </CardContent>
            </Card>

            <div>
              <h4 className="text-gray-900 mb-3">What This Means for You:</h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div>
                  <p className="text-gray-900 mb-2"><strong>Comparison: Bond vs Savings Account</strong></p>
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="border-green-200">
                      <CardContent className="p-3">
                        <p className="text-xs text-gray-600 mb-1">Government Bond (14%)</p>
                        <p className="text-lg text-green-600">₦140,000</p>
                        <p className="text-xs text-gray-600 mt-1">Annual income on ₦1M</p>
                        <Badge className="mt-2 bg-green-600 text-xs">Tax Free ✓</Badge>
                      </CardContent>
                    </Card>
                    <Card className="border-red-200">
                      <CardContent className="p-3">
                        <p className="text-xs text-gray-600 mb-1">Savings Account (10%)</p>
                        <p className="text-lg text-gray-600">₦100,000</p>
                        <p className="text-xs text-red-600 mt-1">-₦10,000 tax (10%)</p>
                        <p className="text-sm text-red-600 mt-1"><strong>= ₦90,000</strong></p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-3 p-3 bg-green-100 rounded-lg">
                    <p className="text-green-900 text-sm">
                      <strong>Result:</strong> You earn ₦50,000 more with the bond (₦140k vs ₦90k) - that's 56% more income!
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-900 mb-2"><strong>Comparison: Bond vs Fixed Deposit</strong></p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-gray-700">Fixed Deposit (12% rate)</span>
                      <span className="text-gray-900">₦120,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-red-700">Withholding Tax (10%)</span>
                      <span className="text-red-600">-₦12,000</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
                      <span className="text-gray-700"><strong>You Actually Get:</strong></span>
                      <span className="text-gray-900"><strong>₦108,000</strong></span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-100 rounded mt-3">
                      <span className="text-green-700"><strong>Bond (14% tax-free):</strong></span>
                      <span className="text-green-600"><strong>₦140,000</strong></span>
                    </div>
                    <div className="p-2 bg-green-50 rounded text-center">
                      <p className="text-green-900"><strong>Extra earnings: ₦32,000 per year!</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 mb-3">Additional Benefits:</h4>
              <div className="space-y-3">
                <Card className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-blue-600 flex-shrink-0" />
                      <div>
                        <h5 className="text-gray-900 mb-1">No Tax Filing Hassle</h5>
                        <p className="text-gray-700 text-sm">
                          Since bond income is tax-exempt, you don't need to report it in your annual tax returns. 
                          Simpler paperwork for you!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-purple-600 flex-shrink-0" />
                      <div>
                        <h5 className="text-gray-900 mb-1">Perfect for High Earners</h5>
                        <p className="text-gray-700 text-sm">
                          If you're in a high tax bracket (24%), the tax savings are even more significant. 
                          Every naira of bond income goes straight to your pocket.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-amber-600 flex-shrink-0" />
                      <div>
                        <h5 className="text-gray-900 mb-1">Tax Statements Available</h5>
                        <p className="text-gray-700 text-sm">
                          We provide official tax statements showing your tax-free income for your records and 
                          peace of mind. Access them anytime in the Tax Center.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h4 className="text-green-900 mb-2">Bottom Line 💰</h4>
                <p className="text-green-800 text-sm">
                  The tax exemption makes Nigerian government bonds one of the most attractive investments for 
                  income-focused investors. A 14% tax-free return is equivalent to earning 16-18% on a taxable 
                  investment - that's powerful!
                </p>
              </CardContent>
            </Card>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-900 text-sm">
                <strong>Important Note:</strong> While coupon payments are tax-free, capital gains from selling 
                bonds on the P2P exchange may be subject to capital gains tax. However, if you hold until maturity, 
                you enjoy 100% tax-free returns on your investment.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
        <div className="bg-white w-full sm:max-w-3xl sm:mx-4 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedLesson(null)}
              >
                ← Back
              </Button>
              <div>
                <h2 className="text-gray-900">{lesson?.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{lesson?.difficulty}</Badge>
                  <span className="text-gray-500 text-xs">{lesson?.duration}</span>
                </div>
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
          <div className="p-6">
            {getLessonContent(selectedLesson)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-3xl sm:mx-4 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="bg-[#008753]/10 p-2 rounded-lg">
              <BookOpen size={24} className="text-[#008753]" />
            </div>
            <div>
              <h2 className="text-gray-900">Education Center</h2>
              <p className="text-gray-600 text-sm">Learn everything about bonds</p>
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
          {/* Welcome Card */}
          <Card className="bg-gradient-to-br from-[#008753] to-[#006d42] text-white border-0">
            <CardContent className="p-4">
              <h3 className="text-white mb-2">Welcome to Bond School! 🎓</h3>
              <p className="text-white/90 text-sm">
                Whether you're brand new to investing or want to understand bonds better, we've broken down 
                everything into simple, easy-to-understand lessons. Start anywhere, learn at your own pace!
              </p>
            </CardContent>
          </Card>

          {/* Lessons */}
          <div className="space-y-3">
            {lessons.map((lesson) => {
              const Icon = lesson.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600 border-blue-200',
                green: 'bg-green-50 text-green-600 border-green-200',
                purple: 'bg-purple-50 text-purple-600 border-purple-200',
                amber: 'bg-amber-50 text-amber-600 border-amber-200',
                indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
                emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
              };

              return (
                <Card
                  key={lesson.id}
                  className="cursor-pointer hover:shadow-md transition-all border-gray-200"
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${colorClasses[lesson.color as keyof typeof colorClasses]}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{lesson.title}</h4>
                        <div className="flex items-center gap-3 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {lesson.difficulty}
                          </Badge>
                          <span className="text-gray-500 text-xs flex items-center gap-1">
                            <Clock size={12} />
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <PlayCircle size={32} className="text-blue-600 mx-auto mb-2" />
              <h4 className="text-blue-900 mb-1">Ready to Start Investing?</h4>
              <p className="text-blue-700 text-sm mb-3">
                Apply what you've learned and start building your bond portfolio today!
              </p>
              <Button 
                className="bg-[#008753] hover:bg-[#006d42]"
                onClick={onClose}
              >
                Browse Available Bonds
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
