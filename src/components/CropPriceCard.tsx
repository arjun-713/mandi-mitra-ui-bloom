
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface CropPriceCardProps {
  crop: {
    id: string;
    name: string;
    variety?: string;
    currentPrice: number;
    priceChange: number;
    mandiName: string;
    lastUpdated: string;
    trend: 'up' | 'down';
    isInWatchlist: boolean;
  };
  onToggleWatchlist: (cropId: string) => void;
  onPredictPrice: (cropId: string) => void;
}

const CropPriceCard = ({ crop, onToggleWatchlist, onPredictPrice }: CropPriceCardProps) => {
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
              {crop.variety && (
                <span className="text-sm text-gray-500">({crop.variety})</span>
              )}
            </div>
            <p className="text-sm text-gray-600">{crop.mandiName}</p>
            <p className="text-xs text-gray-500">Updated {crop.lastUpdated}</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleWatchlist(crop.id)}
            className={`${crop.isInWatchlist ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
          >
            <Star className={`w-5 h-5 ${crop.isInWatchlist ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-2xl font-bold text-gray-900">₹{crop.currentPrice.toLocaleString()}</div>
            <div className="text-sm text-gray-600">per quintal</div>
          </div>
          
          <div className={`flex items-center gap-1 ${
            crop.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {crop.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-bold">
              {crop.priceChange >= 0 ? '+' : ''}₹{Math.abs(crop.priceChange)}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onPredictPrice(crop.id)}
          >
            Predict Future Price
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropPriceCard;
