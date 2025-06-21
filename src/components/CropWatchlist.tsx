
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CropWatchlistProps {
  userCrops?: string[];
  userMarket?: string;
  onViewAll?: () => void;
  onCropClick?: (cropName: string) => void;
}

const CropWatchlist = ({ userCrops = [], userMarket, onViewAll, onCropClick }: CropWatchlistProps) => {
  const { t } = useLanguage();

  // Generate mock price data for user's crops
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
      mandiName: userMarket || 'Local Mandi',
      trend: isPositive ? 'up' : 'down',
      isPositive
    };
  };

  const cropsToShow = userCrops.length > 0 
    ? userCrops.slice(0, 3).map(generateMockPrice)
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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{t('crop_watchlist')}</h2>
        <Button 
          variant="ghost" 
          className="text-primary text-sm"
          onClick={onViewAll}
        >
          {t('view_all')}
        </Button>
      </div>
      
      <div className="space-y-3">
        {cropsToShow.map((crop, index) => (
          <Card 
            key={index} 
            className="bg-white shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onCropClick?.(crop.name)}
          >
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

export default CropWatchlist;
