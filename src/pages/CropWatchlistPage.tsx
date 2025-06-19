
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CropWatchlistPageProps {
  user: any;
  onBack: () => void;
}

const CropWatchlistPage = ({ user, onBack }: CropWatchlistPageProps) => {
  const { t } = useLanguage();

  const generateMockPrice = (cropName: string) => {
    const basePrice = Math.floor(Math.random() * 3000) + 1000;
    const change = Math.floor(Math.random() * 200) - 100;
    const isPositive = change >= 0;
    const changePercent = ((change / basePrice) * 100).toFixed(1);
    
    return {
      name: cropName,
      currentPrice: `₹${basePrice.toLocaleString()}`,
      priceChange: `${isPositive ? '+' : ''}₹${Math.abs(change)}`,
      changePercent: `${isPositive ? '+' : ''}${changePercent}%`,
      mandiName: user?.market || 'Local Mandi',
      trend: isPositive ? 'up' : 'down',
      isPositive
    };
  };

  const allCrops = user?.crops?.length > 0 
    ? user.crops.map(generateMockPrice)
    : [
        {
          name: 'Wheat',
          currentPrice: '₹2,150',
          priceChange: '+₹50',
          changePercent: '+2.4%',
          mandiName: 'Delhi Mandi',
          trend: 'up',
          isPositive: true
        },
        {
          name: 'Rice',
          currentPrice: '₹3,200',
          priceChange: '-₹25',
          changePercent: '-0.8%',
          mandiName: 'Punjab Mandi',
          trend: 'down',
          isPositive: false
        },
        {
          name: 'Maize',
          currentPrice: '₹1,800',
          priceChange: '+₹75',
          changePercent: '+4.3%',
          mandiName: 'UP Mandi',
          trend: 'up',
          isPositive: true
        }
      ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary">{t('crop_watchlist')}</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-3">
        {allCrops.map((crop, index) => (
          <Card key={index} className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{crop.name}</h3>
                    {crop.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{crop.mandiName}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{crop.currentPrice}</div>
                  <div className={`text-sm font-medium ${
                    crop.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {crop.priceChange} ({crop.changePercent})
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CropWatchlistPage;
