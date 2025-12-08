import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Calculator,
  TrendingDown,
  TrendingUp,
  Shield,
  Info,
  DollarSign,
  Target,
  PiggyBank,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

// Nigerian Personal Income Tax rates (Federal)
const calculateTax = (annualSalary: number): number => {
  const reliefs = {
    consolidatedRelief: Math.min(200000 + 0.2 * annualSalary, 0.01 * annualSalary + 200000),
  };

  const taxableIncome = Math.max(0, annualSalary - reliefs.consolidatedRelief);

  let tax = 0;
  if (taxableIncome <= 300000) {
    tax = taxableIncome * 0.07;
  } else if (taxableIncome <= 600000) {
    tax = 300000 * 0.07 + (taxableIncome - 300000) * 0.11;
  } else if (taxableIncome <= 1100000) {
    tax = 300000 * 0.07 + 300000 * 0.11 + (taxableIncome - 600000) * 0.15;
  } else if (taxableIncome <= 1600000) {
    tax = 300000 * 0.07 + 300000 * 0.11 + 500000 * 0.15 + (taxableIncome - 1100000) * 0.19;
  } else if (taxableIncome <= 3200000) {
    tax = 300000 * 0.07 + 300000 * 0.11 + 500000 * 0.15 + 500000 * 0.19 + (taxableIncome - 1600000) * 0.21;
  } else {
    tax = 300000 * 0.07 + 300000 * 0.11 + 500000 * 0.15 + 500000 * 0.19 + 1600000 * 0.21 + (taxableIncome - 3200000) * 0.24;
  }

  return Math.round(tax);
};

export function TaxOffsetCalculator() {
  const [annualSalary, setAnnualSalary] = useState('5000000');
  const [selectedState, setSelectedState] = useState('Lagos');
  const [calculatedTax, setCalculatedTax] = useState(0);
  const [targetInvestment, setTargetInvestment] = useState(0);
  const [bondInterest, setBondInterest] = useState(0);

  const averageBondYield = 12.5; // Average bond yield percentage

  useEffect(() => {
    const salary = parseFloat(annualSalary) || 0;
    const tax = calculateTax(salary);
    setCalculatedTax(tax);

    // Calculate how much you need to invest to generate interest equal to tax
    const neededInvestment = (tax / averageBondYield) * 100;
    setTargetInvestment(Math.round(neededInvestment));

    // Calculate the interest that would be earned
    const interest = (neededInvestment * averageBondYield) / 100;
    setBondInterest(Math.round(interest));
  }, [annualSalary, selectedState]);

  const chartData = [
    {
      name: 'Your Tax Bill',
      value: calculatedTax,
      color: '#ef4444',
    },
    {
      name: 'Bond Interest',
      value: bondInterest,
      color: '#008753',
    },
  ];

  const savingsPercentage = annualSalary ? ((calculatedTax / parseFloat(annualSalary)) * 100).toFixed(1) : '0';
  const investmentToSalaryRatio = annualSalary ? ((targetInvestment / parseFloat(annualSalary)) * 100).toFixed(1) : '0';

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calculator className="size-8 text-[#008753]" />
        </div>
        <h2 className="text-[#008753]">Tax Offset Calculator</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Discover how much you need to invest in tax-free government bonds to cover your annual tax liability with interest earnings
        </p>
      </div>

      {/* Info Banner */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="p-4 flex gap-3">
          <Info className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-900 mb-1">Educational Tool</p>
            <p className="text-xs text-blue-700">
              This calculator shows how tax-free bond interest can help offset your tax obligations. Bond coupon payments are exempt from income tax in Nigeria.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="size-5 text-[#008753]" />
            Your Information
          </CardTitle>
          <CardDescription>Enter your details to calculate your tax offset strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Annual Salary Input */}
            <div className="space-y-2">
              <Label htmlFor="annual-salary">Annual Salary (₦)</Label>
              <Input
                id="annual-salary"
                type="number"
                placeholder="e.g., 5,000,000"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-slate-500">
                Your total annual income before tax
              </p>
            </div>

            {/* State Selection */}
            <div className="space-y-2">
              <Label htmlFor="state">State of Residence</Label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {nigerianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                Used for tax calculation accuracy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {parseFloat(annualSalary) > 0 && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tax Liability */}
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <TrendingDown className="size-5 text-red-600" />
                  </div>
                  <Badge variant="secondary" className="bg-red-100 text-red-700">
                    Annual
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-1">Estimated Tax Liability</p>
                <h3 className="text-red-600">₦{calculatedTax.toLocaleString()}</h3>
                <p className="text-xs text-slate-500 mt-2">
                  {savingsPercentage}% of your salary
                </p>
              </CardContent>
            </Card>

            {/* Target Investment */}
            <Card className="border-[#008753] bg-gradient-to-br from-[#008753]/5 to-[#00a864]/5">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-10 bg-[#008753]/10 rounded-lg flex items-center justify-center">
                    <Target className="size-5 text-[#008753]" />
                  </div>
                  <Badge variant="secondary" className="bg-[#008753]/10 text-[#008753]">
                    Required
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-1">Target Bond Investment</p>
                <h3 className="text-[#008753]">₦{targetInvestment.toLocaleString()}</h3>
                <p className="text-xs text-slate-500 mt-2">
                  {investmentToSalaryRatio}% of your salary
                </p>
              </CardContent>
            </Card>

            {/* Bond Interest */}
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="size-5 text-emerald-600" />
                  </div>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 gap-1">
                    <Shield className="size-3" />
                    Tax-Free
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-1">Annual Bond Interest</p>
                <h3 className="text-emerald-600">₦{bondInterest.toLocaleString()}</h3>
                <p className="text-xs text-slate-500 mt-2">
                  @ {averageBondYield}% average yield
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Tax vs. Bond Interest Comparison</CardTitle>
              <CardDescription>
                Visual breakdown of how bond interest can cover your tax liability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis type="category" dataKey="name" className="text-xs" width={120} />
                  <Tooltip
                    formatter={(value: number) => `₦${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Comparison Notes */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="size-3 bg-red-500 rounded" />
                    <p className="text-sm text-slate-900">Your Annual Tax Bill</p>
                  </div>
                  <p className="text-red-600 text-xl mb-1">₦{calculatedTax.toLocaleString()}</p>
                  <p className="text-xs text-slate-600">
                    Money lost to taxes each year
                  </p>
                </div>

                <div className="bg-[#008753]/5 rounded-lg p-4 border border-[#008753]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="size-3 bg-[#008753] rounded" />
                    <p className="text-sm text-slate-900">Potential Bond Interest</p>
                  </div>
                  <p className="text-[#008753] text-xl mb-1">₦{bondInterest.toLocaleString()}</p>
                  <p className="text-xs text-slate-600">
                    Tax-free earnings from bonds
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="size-5 text-[#008753]" />
                How This Strategy Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="size-8 bg-[#008753]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#008753]">1</span>
                  </div>
                  <div>
                    <p className="text-slate-900 mb-1">Invest in Government Bonds</p>
                    <p className="text-sm text-slate-600">
                      Purchase ₦{targetInvestment.toLocaleString()} worth of Nigerian government bonds through our platform
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="size-8 bg-[#008753]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#008753]">2</span>
                  </div>
                  <div>
                    <p className="text-slate-900 mb-1">Earn Tax-Free Interest</p>
                    <p className="text-sm text-slate-600">
                      Receive approximately ₦{bondInterest.toLocaleString()} annually in coupon payments, completely tax-free
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="size-8 bg-[#008753]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#008753]">3</span>
                  </div>
                  <div>
                    <p className="text-slate-900 mb-1">Cover Your Tax Bill</p>
                    <p className="text-sm text-slate-600">
                      Use the tax-free interest earnings to offset your ₦{calculatedTax.toLocaleString()} tax liability
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="size-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="size-4 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-900 mb-1">Keep Your Principal</p>
                    <p className="text-sm text-slate-600">
                      Your ₦{targetInvestment.toLocaleString()} investment remains intact and continues earning interest year after year
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="size-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="size-6 text-purple-600" />
                </div>
                <p className="text-slate-900 mb-1">Government Backed</p>
                <p className="text-xs text-slate-600">
                  Full faith and credit of Nigerian government
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="size-6 text-orange-600" />
                </div>
                <p className="text-slate-900 mb-1">Predictable Returns</p>
                <p className="text-xs text-slate-600">
                  Fixed interest rates throughout bond tenure
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="size-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="size-6 text-green-600" />
                </div>
                <p className="text-slate-900 mb-1">No Income Tax</p>
                <p className="text-xs text-slate-600">
                  Bond interest is completely exempt from taxes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-br from-[#008753] to-[#00a864] text-white border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-white mb-2">Ready to Offset Your Taxes?</h3>
                  <p className="text-white/90">
                    Start investing in government bonds today and let your money work for you
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-white text-[#008753] hover:bg-white/90 gap-2 whitespace-nowrap"
                >
                  Invest to Cover Tax
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4 flex gap-3">
              <Info className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-900 mb-1">Important Disclaimer</p>
                <p className="text-xs text-amber-800">
                  This calculator provides estimates based on current tax rates and average bond yields. Actual results may vary. Tax laws are subject to change. This tool is for educational purposes only and does not constitute financial or tax advice. Please consult with a qualified tax professional for personalized guidance.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty State */}
      {(!annualSalary || parseFloat(annualSalary) === 0) && (
        <Card className="border-dashed border-2">
          <CardContent className="p-12 text-center">
            <Calculator className="size-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">Enter your annual salary above to calculate</p>
            <p className="text-sm text-slate-500">
              See how much you need to invest to cover your taxes with bond interest
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
