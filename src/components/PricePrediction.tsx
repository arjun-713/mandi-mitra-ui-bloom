
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, AlertTriangle, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PricePredictionProps {
  availableCrops: string[];
  availableMarkets: string[];
}

const PricePrediction = ({ availableCrops, availableMarkets }: PricePredictionProps) => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!selectedCrop || !selectedMarket) return;
    
    setLoading(true);
    // Simulate prediction API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock prediction data
    const currentPrice = Math.floor(Math.random() * 3000) + 1000;
    const weeklyPrices = Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      price: currentPrice + (Math.random() - 0.5) * 400
    }));
    
    const avgPredictedPrice = weeklyPrices.reduce((sum, day) => sum + day.price, 0) / 7;
    const priceChange = avgPredictedPrice - currentPrice;
    const volatility = Math.random();
    
    let confidence = 'Stable';
    let confidenceColor = 'bg-blue-100 text-blue-800';
    let confidenceIcon = Target;
    
    if (volatility > 0.7) {
      confidence = 'Risky';
      confidenceColor = 'bg-red-100 text-red-800';
      confidenceIcon = AlertTriangle;
    } else if (volatility < 0.3) {
      confidence = 'Confident';
      confidenceColor = 'bg-green-100 text-green-800';
      confidenceIcon = TrendingUp;
    }
    
    setPrediction({
      crop: selectedCrop,
      market: selectedMarket,
      currentPrice,
      weeklyPrices,
      avgPredictedPrice: Math.round(avgPredictedPrice),
      priceChange: Math.round(priceChange),
      confidence,
      confidenceColor,
      confidenceIcon,
      trend: priceChange > 0 ? 'up' : 'down'
    });
    
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Price Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Crop</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a crop" />
                </SelectTrigger>
                <SelectContent>
                  {availableCrops.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Select Market</label>
              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a market" />
                </SelectTrigger>
                <SelectContent>
                  {availableMarkets.map(market => (
                    <SelectItem key={market} value={market}>{market}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handlePredict} 
            disabled={!selectedCrop || !selectedMarket || loading}
            className="w-full"
          >
            {loading ? 'Predicting...' : 'Predict Price'}
          </Button>
        </CardContent>
      </Card>

      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Price Prediction Results</span>
              <Badge className={prediction.confidenceColor}>
                <prediction.confidenceIcon className="w-3 h-3 mr-1" />
                {prediction.confidence}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Current Price</p>
                <p className="text-2xl font-bold">₹{prediction.currentPrice}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Predicted Avg</p>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-2xl font-bold">₹{prediction.avgPredictedPrice}</p>
                  {prediction.trend === 'up' ? 
                    <TrendingUp className="w-5 h-5 text-green-600" /> : 
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  }
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Weekly Price Forecast</h4>
              <div className="grid grid-cols-7 gap-1">
                {prediction.weeklyPrices.map((day: any, index: number) => (
                  <div key={index} className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">{day.day}</p>
                    <p className="text-sm font-medium">₹{Math.round(day.price)}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`p-3 rounded-lg ${prediction.confidenceColor}`}>
              <p className="text-sm">
                <strong>Market Analysis:</strong> 
                {prediction.confidence === 'Confident' && ' Stable market conditions expected with minimal price fluctuations.'}
                {prediction.confidence === 'Stable' && ' Moderate market conditions with expected price variations.'}
                {prediction.confidence === 'Risky' && ' High volatility expected. Consider timing your sales carefully.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PricePrediction;
