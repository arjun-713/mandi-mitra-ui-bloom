
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateSalesStatementPDF } from '@/utils/pdfGenerator';

interface HistoryPageProps {
  onBack: () => void;
}

const HistoryPage = ({ onBack }: HistoryPageProps) => {
  const { t } = useLanguage();
  const [cropHistory, setCropHistory] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Load user data
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUserData(JSON.parse(currentUser));
    }

    // Load crop history from localStorage
    const savedHistory = localStorage.getItem('cropSalesHistory');
    if (savedHistory) {
      setCropHistory(JSON.parse(savedHistory));
    } else {
      // Default history data
      setCropHistory([
        {
          id: '1',
          cropName: 'Tomato',
          dateSold: '2024-05-15',
          quantitySold: 100,
          pricePerQuintal: 2200,
          totalEarnings: 220000,
          expenses: {
            fertilizer: 15000,
            labor: 25000,
            pesticide: 8000,
            transport: 3000,
            seeds: 5000,
            other: 4000
          },
          netProfitLoss: 160000,
          profitMargin: 72.7
        },
        {
          id: '2',
          cropName: 'Rice',
          dateSold: '2024-04-10',
          quantitySold: 200,
          pricePerQuintal: 1850,
          totalEarnings: 370000,
          expenses: {
            fertilizer: 25000,
            labor: 40000,
            pesticide: 12000,
            transport: 5000,
            seeds: 8000,
            other: 10000
          },
          netProfitLoss: 270000,
          profitMargin: 73.0
        }
      ]);
    }
  }, []);

  const totalEarnings = cropHistory.reduce((sum, crop) => sum + crop.totalEarnings, 0);
  const totalExpenses = cropHistory.reduce((sum, crop) => sum + Object.values(crop.expenses).reduce((a: number, b: number) => a + b, 0), 0);
  const netProfitLoss = totalEarnings - totalExpenses;

  const handleDownloadPDF = (crop: any) => {
    generateSalesStatementPDF(crop, userData);
  };

  const handleDownloadAllPDF = () => {
    // Generate combined PDF for all crops
    const combinedData = {
      crops: cropHistory,
      totalEarnings,
      totalExpenses,
      netProfitLoss,
      dateSold: new Date().toLocaleDateString()
    };
    
    // For now, generate individual PDFs for each crop
    cropHistory.forEach((crop, index) => {
      setTimeout(() => {
        generateSalesStatementPDF(crop, userData);
      }, index *  1000); // Delay each PDF generation
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-sm border-b z-40">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">{t('history')}</h1>
          </div>
          
          {/* Financial Summary */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-lg font-bold text-green-600">₹{totalEarnings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Expenses</p>
                  <p className="text-lg font-bold text-red-600">₹{totalExpenses.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Net Profit</p>
                  <p className={`text-lg font-bold ${netProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{netProfitLoss.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* History Cards */}
      <div className="px-4 py-6 space-y-4">
        {cropHistory.map((crop) => (
          <Card key={crop.id} className="bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{crop.cropName}</CardTitle>
                  <p className="text-sm text-gray-600">Sold on {new Date(crop.dateSold).toLocaleDateString()}</p>
                </div>
                <Badge 
                  variant={crop.netProfitLoss >= 0 ? "default" : "destructive"}
                  className={crop.netProfitLoss >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                >
                  {crop.netProfitLoss >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {crop.profitMargin.toFixed(1)}% {crop.netProfitLoss >= 0 ? 'Profit' : 'Loss'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Quantity Sold</p>
                  <p className="font-semibold">{crop.quantitySold} quintals</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price per Quintal</p>
                  <p className="font-semibold">₹{crop.pricePerQuintal}</p>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Earnings</span>
                  <span className="font-semibold text-green-600">₹{crop.totalEarnings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Expenses</span>
                  <span className="font-semibold text-red-600">
                    ₹{Object.values(crop.expenses).reduce((a: number, b: number) => a + b, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Net Profit/Loss</span>
                  <span className={crop.netProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                    ₹{crop.netProfitLoss.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <details className="text-sm">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-800">Expense Breakdown</summary>
                <div className="mt-2 space-y-1 pl-4">
                  {Object.entries(crop.expenses).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key}:</span>
                      <span>₹{(value as number).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </details>
              
              <div className="pt-3 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleDownloadPDF(crop)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Statement (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {cropHistory.length > 1 && (
          <Button 
            variant="default" 
            className="w-full"
            onClick={handleDownloadAllPDF}
          >
            <Download className="w-4 h-4 mr-2" />
            Download All Statements (PDF)
          </Button>
        )}
        
        {cropHistory.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-600">No sales history found.</p>
            <p className="text-sm text-gray-500 mt-2">Sell some crops to see your history here!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
