import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { InfoTooltip } from './InfoTooltip';
import { X, FileText, Download, Calendar, CheckCircle, Loader2 } from 'lucide-react';

interface TaxCenterProps {
  onClose: () => void;
}

export function TaxCenter({ onClose }: TaxCenterProps) {
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const taxStatements = [
    {
      id: 1,
      year: 2024,
      period: 'Full Year',
      totalCoupons: 147600,
      bondCount: 3,
      status: 'Available',
      date: '2024-12-31',
    },
    {
      id: 2,
      year: 2024,
      period: 'H1 2024',
      totalCoupons: 73800,
      bondCount: 3,
      status: 'Available',
      date: '2024-06-30',
    },
    {
      id: 3,
      year: 2023,
      period: 'Full Year',
      totalCoupons: 98400,
      bondCount: 2,
      status: 'Available',
      date: '2023-12-31',
    },
  ];

  const upcomingPayments = [
    {
      id: 1,
      bondName: 'FGN 2034 Bond',
      amount: 24500,
      date: '2024-01-15',
    },
    {
      id: 2,
      bondName: 'FGN 2032 Bond',
      amount: 28700,
      date: '2024-01-25',
    },
    {
      id: 3,
      bondName: 'FGN 2029 Bond',
      amount: 18600,
      date: '2024-02-22',
    },
  ];

  const handleDownload = (id: number, period: string, year: number) => {
    setDownloadingId(id);

    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob(
        [`Bond Token Nigeria - Tax Statement\nPeriod: ${period} ${year}\nStatus: Tax Exempt\n\nThis document confirms that all coupon payments received are exempt from Personal Income Tax.`], 
        {type: 'text/plain'}
      );
      element.href = URL.createObjectURL(file);
      element.download = `Tax_Statement_${year}_${period.replace(' ', '_')}.txt`;
      document.body.appendChild(element); 
      element.click();
      
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-2xl sm:mx-4 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-purple-50 p-2 rounded-lg">
              <FileText size={24} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Tax Center</h2>
              <p className="text-gray-600 text-sm">Tax-free coupon statements</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-green-900">Tax-Free Investment Income</h4>
                  <p className="text-green-700 text-sm mt-1">
                    All coupon payments from Federal Government of Nigeria bonds are exempt from income tax under the Income Tax Act.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4">
              <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                2024 Tax Year Summary
                <InfoTooltip content="Total tax-free coupon income received in the current tax year" />
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#008753]/10 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Total Coupons Received</p>
                  <p className="text-[#008753] text-2xl mt-1">₦147,600</p>
                  <p className="text-gray-600 text-xs mt-1">Tax-free income</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Active Bonds</p>
                  <p className="text-blue-600 text-2xl mt-1">3</p>
                  <p className="text-gray-600 text-xs mt-1">Generating income</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="text-gray-900 flex items-center gap-2">
              <Calendar size={20} className="text-gray-600" />
              Upcoming Coupon Payments
            </h3>
            {upcomingPayments.map((payment) => (
              <Card key={payment.id} className="border-gray-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900 text-sm">{payment.bondName}</h4>
                    <p className="text-gray-600 text-xs mt-1">
                      Due: {new Date(payment.date).toLocaleDateString('en-NG', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#008753]">₦{payment.amount.toLocaleString()}</p>
                    <Badge variant="outline" className="border-green-600 text-green-600 text-xs mt-1">
                      Tax Free
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-gray-900 flex items-center gap-2">
              <FileText size={20} className="text-gray-600" />
              Tax Statements
            </h3>
            {taxStatements.map((statement) => (
              <Card key={statement.id} className="border-gray-200">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-gray-900">{statement.period} {statement.year}</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {statement.bondCount} bonds • ₦{statement.totalCoupons.toLocaleString()} total
                      </p>
                    </div>
                    <Badge className="bg-[#008753] hover:bg-[#006d42]">
                      {statement.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-gray-600 text-sm">
                      Generated: {new Date(statement.date).toLocaleDateString('en-NG')}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[#008753] text-[#008753] hover:bg-[#008753]/10"
                      onClick={() => handleDownload(statement.id, statement.period, statement.year)}
                      disabled={downloadingId === statement.id}
                    >
                      {downloadingId === statement.id ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download size={16} className="mr-2" />
                          Download PDF
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="text-blue-900 mb-2">About Tax Statements</h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>Statements are generated automatically at the end of each tax year</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>All coupon payments are tax-exempt under Nigerian law</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>Keep these statements for your financial records</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>Contact support if you need statements for specific periods</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}