
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Navigation, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface MandiPageProps {
  onBack: () => void;
}

const MandiPage = ({ onBack }: MandiPageProps) => {
  const { t } = useLanguage();
  const [selectedMandis, setSelectedMandis] = useState<string[]>([]);
  
  const nearbyMandis = [
    {
      id: '1',
      mandiName: 'Davangere APMC',
      distance: 5,
      activeBuyerCount: 45,
      buyerDemand: 'high' as const,
      topCrops: [
        { cropName: 'Cotton', currentPrice: 5600, priceChange: 150 },
        { cropName: 'Maize', currentPrice: 1850, priceChange: -50 },
        { cropName: 'Turmeric', currentPrice: 8500, priceChange: 200 }
      ],
      operatingHours: '6:00 AM - 6:00 PM'
    },
    {
      id: '2',
      mandiName: 'Harihar Market',
      distance: 15,
      activeBuyerCount: 32,
      buyerDemand: 'medium' as const,
      topCrops: [
        { cropName: 'Rice', currentPrice: 1900, priceChange: 75 },
        { cropName: 'Wheat', currentPrice: 2100, priceChange: -25 },
        { cropName: 'Groundnut', currentPrice: 4200, priceChange: 100 }
      ],
      operatingHours: '7:00 AM - 5:00 PM'
    },
    {
      id: '3',
      mandiName: 'Chitradurga APMC',
      distance: 35,
      activeBuyerCount: 28,
      buyerDemand: 'medium' as const,
      topCrops: [
        { cropName: 'Onion', currentPrice: 2800, priceChange: -200 },
        { cropName: 'Tomato', currentPrice: 3200, priceChange: 150 },
        { cropName: 'Potato', currentPrice: 1200, priceChange: 50 }
      ],
      operatingHours: '6:30 AM - 5:30 PM'
    }
  ];

  const toggleMandiSelection = (mandiId: string) => {
    setSelectedMandis(prev => {
      if (prev.includes(mandiId)) {
        return prev.filter(id => id !== mandiId);
      } else if (prev.length < 3) {
        return [...prev, mandiId];
      }
      return prev;
    });
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <h1 className="text-2xl font-bold text-primary">{t('mandi')}</h1>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Davangere, Karnataka</span>
          </div>
        </div>
      </div>

      {/* Nearby Mandis */}
      <div className="px-4 py-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Nearby Markets</h2>
          {selectedMandis.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedMandis([])}
            >
              Clear Selection
            </Button>
          )}
        </div>

        {nearbyMandis.map((mandi) => (
          <Card 
            key={mandi.id} 
            className={`bg-white shadow-sm cursor-pointer transition-all ${
              selectedMandis.includes(mandi.id) ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => toggleMandiSelection(mandi.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{mandi.mandiName}</CardTitle>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <span>{mandi.distance} km away</span>
                    <span>{mandi.operatingHours}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getDemandColor(mandi.buyerDemand)}>
                    {mandi.buyerDemand.charAt(0).toUpperCase() + mandi.buyerDemand.slice(1)} Demand
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {mandi.activeBuyerCount} buyers
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Top Crops Today</p>
                <div className="space-y-2">
                  {mandi.topCrops.map((crop, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{crop.cropName}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">₹{crop.currentPrice}</span>
                        <span className={`text-xs ${crop.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {crop.priceChange >= 0 ? '+' : ''}₹{crop.priceChange}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Comparison Section */}
        {selectedMandis.length > 1 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Price Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Cotton', 'Rice', 'Tomato'].map((crop) => (
                  <div key={crop}>
                    <p className="font-medium text-gray-700 mb-2">{crop}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedMandis.map((mandiId) => {
                        const mandi = nearbyMandis.find(m => m.id === mandiId);
                        const cropData = mandi?.topCrops.find(c => c.cropName === crop);
                        return (
                          <div key={mandiId} className="flex justify-between text-sm">
                            <span>{mandi?.mandiName}</span>
                            <span className="font-medium">
                              {cropData ? `₹${cropData.currentPrice}` : 'N/A'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MandiPage;
