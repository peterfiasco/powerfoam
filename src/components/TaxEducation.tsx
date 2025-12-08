import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Shield,
  TrendingUp,
  Lock,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Lightbulb,
  ArrowRight,
  DollarSign,
  Users,
  Building2,
  Percent,
  Calculator,
  Info,
  Award,
  Target,
  Sparkles,
  FileCheck,
  Eye,
} from 'lucide-react';

interface TaxEducationProps {
  onNavigateToCalculator?: () => void;
}

export function TaxEducation({ onNavigateToCalculator }: TaxEducationProps) {
  const didYouKnowFacts = [
    {
      icon: Users,
      fact: 'Only about 10 million Nigerians pay personal income tax, despite having a working population of over 80 million.',
    },
    {
      icon: DollarSign,
      fact: 'FGN Bond interest payments have been tax-exempt since the 1950s to encourage national savings.',
    },
    {
      icon: TrendingUp,
      fact: 'Nigerian bonds have consistently paid out coupons on time for decades, making them one of the most reliable investments.',
    },
    {
      icon: Award,
      fact: 'Government bonds are considered "risk-free" because they\'re backed by the full faith and credit of the Federal Government.',
    },
  ];

  const taxBrackets = [
    { income: 'First ₦300,000', rate: '7%' },
    { income: 'Next ₦300,000', rate: '11%' },
    { income: 'Next ₦500,000', rate: '15%' },
    { income: 'Next ₦500,000', rate: '19%' },
    { income: 'Next ₦1,600,000', rate: '21%' },
    { income: 'Above ₦3,200,000', rate: '24%' },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-slate-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="size-8 text-[#008753]" />
        </div>
        <h1 className="text-[#008753]">Understand Your Taxes & Save</h1>
        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
          Learn how the Nigerian tax system works and discover how FGN Bonds can help you build wealth while keeping more of your money tax-free
        </p>
      </div>

      {/* Introduction to PAYE */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileCheck className="size-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-blue-900">What is PAYE?</CardTitle>
              <CardDescription className="text-blue-700">Pay As You Earn - Nigeria's Income Tax System</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-700">
            <span className="text-blue-900">PAYE (Pay As You Earn)</span> is the system used in Nigeria to collect income tax directly from your salary before you receive it. Every month, your employer deducts a portion of your salary and remits it to the relevant tax authority.
          </p>
          <p className="text-slate-700">
            The amount deducted depends on your income level, with higher earners paying a larger percentage. Understanding this system is the first step to planning your finances effectively and exploring legal ways to optimize your tax situation.
          </p>
          
          {/* Tax Brackets Visual */}
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="text-slate-900 mb-3 flex items-center gap-2">
              <Percent className="size-4 text-blue-600" />
              Nigerian Personal Income Tax Rates
            </h4>
            <div className="space-y-2">
              {taxBrackets.map((bracket, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded"
                >
                  <span className="text-sm text-slate-700">{bracket.income}</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {bracket.rate}
                  </Badge>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              *Plus consolidated relief allowance and other applicable deductions
            </p>
          </div>

          <div className="flex items-start gap-3 bg-blue-100 rounded-lg p-3">
            <Info className="size-5 text-blue-700 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-900">
              The higher your salary, the more you pay in taxes. For someone earning ₦500,000 monthly, taxes can amount to over ₦1 million annually!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What are FGN Bonds */}
        <Card className="border-[#008753]/30 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="size-12 bg-[#008753]/10 rounded-lg flex items-center justify-center mb-3">
              <Building2 className="size-6 text-[#008753]" />
            </div>
            <CardTitle className="text-[#008753]">What are FGN Bonds?</CardTitle>
            <CardDescription>Government-backed investment securities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-slate-700">
              Federal Government of Nigeria (FGN) Bonds are debt instruments issued by the Nigerian government to borrow money from citizens and investors.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-[#008753] mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  <span className="text-slate-900">100% Government Backed:</span> Your investment is secured by the Federal Government
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-[#008753] mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  <span className="text-slate-900">Fixed Returns:</span> Earn predictable interest (coupon) payments every 6 months
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-[#008753] mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  <span className="text-slate-900">Long-term Growth:</span> Bonds mature after 3-30 years, perfect for wealth building
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-[#008753] mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  <span className="text-slate-900">Tradeable:</span> Can be sold before maturity on the secondary market
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax-Free Advantage */}
        <Card className="border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="size-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
              <Shield className="size-6 text-emerald-600" />
            </div>
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              The Tax-Free Advantage
              <Badge variant="secondary" className="bg-emerald-600 text-white">
                0% Tax
              </Badge>
            </CardTitle>
            <CardDescription className="text-emerald-700">Keep 100% of your bond interest</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-white rounded-lg p-4 border-2 border-emerald-200">
              <p className="text-slate-900 mb-2">
                Unlike other investments, <span className="text-emerald-600">FGN Bond interest is completely exempt from income tax</span> under Nigerian law.
              </p>
              <p className="text-slate-700 text-sm">
                This means every naira you earn from bond coupons goes directly into your pocket - no deductions!
              </p>
            </div>

            {/* Comparison */}
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Example: ₦1,000,000 in annual interest</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-red-700 mb-1">Regular Investment</p>
                  <p className="text-red-600">₦760,000</p>
                  <p className="text-xs text-red-600 mt-1">After 24% tax</p>
                </div>
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-3">
                  <p className="text-xs text-emerald-700 mb-1">FGN Bonds</p>
                  <p className="text-emerald-600 text-xl">₦1,000,000</p>
                  <p className="text-xs text-emerald-700 mt-1 flex items-center gap-1">
                    <Sparkles className="size-3" />
                    No tax!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How Bonds Offset Tax */}
        <Card className="border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Target className="size-6 text-purple-600" />
            </div>
            <CardTitle className="text-purple-900">How Bonds Offset Your Tax</CardTitle>
            <CardDescription className="text-purple-700">Turn tax burden into wealth opportunity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-700">
              Smart investors use tax-free bond income to offset their tax obligations and meet financial goals without adding to their tax burden.
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="size-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-700">1</span>
                </div>
                <div>
                  <p className="text-slate-900 text-sm mb-1">Calculate Your Tax Bill</p>
                  <p className="text-xs text-slate-600">
                    Know how much you pay in annual income tax
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="size-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-700">2</span>
                </div>
                <div>
                  <p className="text-slate-900 text-sm mb-1">Invest in Bonds</p>
                  <p className="text-xs text-slate-600">
                    Purchase bonds that generate enough interest to cover your tax
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="size-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-700">3</span>
                </div>
                <div>
                  <p className="text-slate-900 text-sm mb-1">Earn Tax-Free Income</p>
                  <p className="text-xs text-slate-600">
                    Receive regular coupon payments with zero tax deductions
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="size-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="size-4 text-white" />
                </div>
                <div>
                  <p className="text-slate-900 text-sm mb-1">Keep Your Principal</p>
                  <p className="text-xs text-slate-600">
                    Your investment continues working for you year after year
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-purple-200 rounded-lg p-3">
              <p className="text-sm text-purple-900">
                <Lightbulb className="size-4 inline mr-1 text-purple-600" />
                <span className="text-purple-600">Smart Strategy:</span> Instead of losing money to taxes, use that same amount to buy bonds that generate tax-free income forever!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* NDPA Compliance */}
        <Card className="border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <Eye className="size-6 text-orange-600" />
            </div>
            <CardTitle className="text-orange-900">NDPA Compliance</CardTitle>
            <CardDescription className="text-orange-700">Your privacy is protected by law</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-slate-700">
              Bond Token Nigeria is fully compliant with the <span className="text-orange-600">Nigerian Data Protection Act (NDPA)</span> and committed to protecting your personal information.
            </p>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Lock className="size-4 text-orange-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  <span className="text-slate-900">Data Encryption:</span> All personal and financial data is encrypted end-to-end
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="size-4 text-orange-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  <span className="text-slate-900">Limited Collection:</span> We only collect data necessary for compliance and service delivery
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Eye className="size-4 text-orange-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  <span className="text-slate-900">Transparency:</span> You have full visibility into what data we collect and how we use it
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-orange-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  <span className="text-slate-900">User Rights:</span> You can access, modify, or delete your data at any time
                </p>
              </div>
            </div>

            <div className="bg-white border border-orange-200 rounded-lg p-3">
              <p className="text-xs text-orange-900">
                <AlertCircle className="size-3 inline mr-1" />
                Bond Token Nigeria does not share your personal information with third parties without your explicit consent, except where required by law or regulatory authorities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Did You Know Section */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="size-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="size-6 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-slate-900">Did You Know?</CardTitle>
              <CardDescription>Interesting facts about taxes and bonds in Nigeria</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {didYouKnowFacts.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-slate-200 hover:border-[#008753] transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="size-10 bg-[#008753]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="size-5 text-[#008753]" />
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {item.fact}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5 text-[#008753]" />
            Investment Income Comparison
          </CardTitle>
          <CardDescription>How FGN Bonds compare to other investment types for tax treatment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 text-slate-700">Investment Type</th>
                  <th className="text-left p-3 text-slate-700">Tax on Interest/Dividends</th>
                  <th className="text-left p-3 text-slate-700">Tax on Capital Gains</th>
                  <th className="text-left p-3 text-slate-700">Overall Tax Burden</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-slate-900">Savings Account</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-red-100 text-red-700">10% WHT</Badge>
                  </td>
                  <td className="p-3 text-slate-600">N/A</td>
                  <td className="p-3 text-slate-600">Medium</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-slate-900">Fixed Deposits</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-red-100 text-red-700">10% WHT</Badge>
                  </td>
                  <td className="p-3 text-slate-600">N/A</td>
                  <td className="p-3 text-slate-600">Medium</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-slate-900">Stock Dividends</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-red-100 text-red-700">10% WHT</Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-red-100 text-red-700">10% CGT</Badge>
                  </td>
                  <td className="p-3 text-slate-600">High</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-slate-900">Rental Income</td>
                  <td className="p-3 text-slate-600">Varies (Rental Tax)</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-red-100 text-red-700">10% CGT</Badge>
                  </td>
                  <td className="p-3 text-slate-600">High</td>
                </tr>
                <tr className="bg-emerald-50 border-2 border-emerald-200">
                  <td className="p-3 text-emerald-900">FGN Bonds</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-emerald-600 text-white gap-1">
                      <Shield className="size-3" />
                      0% Tax
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-emerald-600 text-white gap-1">
                      <Shield className="size-3" />
                      0% Tax
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary" className="bg-emerald-600 text-white">None</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            WHT = Withholding Tax | CGT = Capital Gains Tax | Interest on FGN Bonds is exempt under the Income Tax Act
          </p>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="bg-gradient-to-br from-[#008753] to-[#00a864] text-white border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="size-5" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <CheckCircle2 className="size-6 text-white mb-2" />
              <p className="text-white mb-1">Tax-Free Income</p>
              <p className="text-white/80 text-sm">
                FGN Bond interest is 100% exempt from income tax
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <CheckCircle2 className="size-6 text-white mb-2" />
              <p className="text-white mb-1">Government Guaranteed</p>
              <p className="text-white/80 text-sm">
                Your investment is backed by the Federal Government
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <CheckCircle2 className="size-6 text-white mb-2" />
              <p className="text-white mb-1">Smart Strategy</p>
              <p className="text-white/80 text-sm">
                Use bond income to offset tax burdens and build wealth
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-[#008753] bg-gradient-to-br from-[#008753]/5 to-[#00a864]/5">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-[#008753] mb-2">Ready to Calculate Your Tax Savings?</h3>
              <p className="text-slate-600">
                Use our Tax Offset Calculator to see exactly how much you need to invest to cover your annual tax bill with tax-free bond interest
              </p>
            </div>
            <Button
              size="lg"
              className="bg-[#008753] hover:bg-[#006d42] gap-2 shadow-lg whitespace-nowrap"
              onClick={onNavigateToCalculator}
            >
              <Calculator className="size-5" />
              Calculate Your Tax Savings
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4 flex gap-3">
          <AlertCircle className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-amber-900 mb-1">Important Disclaimer</p>
            <p className="text-xs text-amber-800">
              This information is provided for educational purposes only and should not be considered as financial, tax, or legal advice. Tax laws and regulations are subject to change. While FGN Bond interest is currently tax-exempt under Nigerian law, we recommend consulting with a qualified tax professional or financial advisor for personalized guidance based on your specific circumstances. Past performance is not indicative of future results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
