
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketSearch from '@/components/MarketSearch';
import PriceAlerts from '@/components/PriceAlerts';
import CropPriceCard from '@/components/CropPriceCard';
import PricePrediction from '@/components/PricePrediction';
import { AgmarknetService } from '@/services/agmarknetService';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedMarketPageProps {
  onBack: () => void;
}

interface Crop {
  id: string;
  name: string;
  variety?: string;
  currentPrice: number;
  priceChange: number;
  mandiName: string;
  region: string;
  cropType: string;
  lastUpdated: string;
  trend: 'up' | 'down';
  isInWatchlist: boolean;
}

const EnhancedMarketPage = ({ onBack }: EnhancedMarketPageProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState('');

  // Get user location from localStorage
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUserLocation(`${userData.district}, ${userData.state}`);
    }
  }, []);

  // Fetch real market data from AGMARKNET
  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      try {
        console.log('Fetching real market data from AGMARKNET...');
        const marketData = await AgmarknetService.getMarketData();
        console.log('Market data received:', marketData);
        
        // Filter markets based on user location if available
        let filteredData = marketData;
        if (userLocation) {
          const userState = userLocation.split(',')[1]?.trim();
          if (userState) {
            filteredData = marketData.filter(item => 
              item.region.toLowerCase().includes(userState.toLowerCase()) ||
              marketData.indexOf(item) < 10 // Keep first 10 if no location matches
            );
          }
        }
        
        const formattedCrops: Crop[] = filteredData.map(item => ({
          id: item.id,
          name: item.name,
          variety: item.variety,
          currentPrice: item.currentPrice,
          priceChange: item.priceChange,
          mandiName: item.mandiName,
          region: item.region,
          cropType: item.cropType,
          lastUpdated: item.lastUpdated,
          trend: item.trend,
          isInWatchlist: false
        }));
        
        setCrops(formattedCrops);
        console.log('Crops data set:', formattedCrops);
      } catch (error) {
        console.error('Error fetching market data:', error);
        // Fallback to mock data if API fails
        setCrops([
          {
            id: '1',
            name: 'Wheat',
            variety: 'Durum',
            currentPrice: 2380,
            priceChange: 150,
            mandiName: 'Local Mandi',
            region: userLocation || 'Karnataka',
            cropType: 'cereals',
            lastUpdated: '2 hours ago',
            trend: 'up',
            isInWatchlist: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [userLocation]);

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleToggleWatchlist = (cropId: string) => {
    setCrops(prev => prev.map(crop => 
      crop.id === cropId ? { ...crop, isInWatchlist: !crop.isInWatchlist } : crop
    ));
  };

  const handlePredictPrice = (cropId: string) => {
    console.log(`Predicting price for crop ${cropId}`);
  };

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.some(filter => 
        crop.region.toLowerCase().includes(filter) ||
        crop.cropType.includes(filter) ||
        filter === 'all'
      );
    return matchesSearch && matchesFilters;
  });

  // Extract unique crop names and markets for prediction
  const availableCrops = [...new Set(crops.map(crop => crop.name))];
  const availableMarkets = [...new Set(crops.map(crop => crop.mandiName))];

  return (
    <div className="min-h-screen bg-gray-50 font-inter pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-sm border-b z-40">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">Market Analysis</h1>
          </div>
          
          {userLocation && (
            <p className="text-sm text-gray-600 mb-4">
              Showing markets near: {userLocation}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <Tabs defaultValue="predict" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predict">Predict Price</TabsTrigger>
            <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
            <TabsTrigger value="current">Current Prices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="predict" className="space-y-4">
            <PricePrediction 
              availableCrops={availableCrops}
              availableMarkets={availableMarkets}
            />
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-4">
            <PriceAlerts />
          </TabsContent>
          
          <TabsContent value="current" className="space-y-4">
            <MarketSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedFilters={selectedFilters}
              onFilterToggle={handleFilterToggle}
            />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Current Prices {userLocation && `(Near ${userLocation})`}
                </h2>
                <span className="text-sm text-gray-600">
                  {filteredCrops.length} crops found
                </span>
              </div>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                filteredCrops.map((crop) => (
                  <CropPriceCard
                    key={crop.id}
                    crop={crop}
                    onToggleWatchlist={handleToggleWatchlist}
                    onPredictPrice={handlePredictPrice}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedMarketPage;
