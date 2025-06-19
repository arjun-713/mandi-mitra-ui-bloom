
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, TrendingUp, TrendingDown, Plus, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Crop {
  id: string;
  name: string;
  currentPrice: number;
  trend: 'up' | 'down';
  expectedValue: number;
  mandi: string;
  region: string;
  type: string;
  inWatchlist: boolean;
}

const MarketPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: '1',
      name: 'Wheat',
      currentPrice: 2100,
      trend: 'up',
      expectedValue: 2250,
      mandi: 'Delhi Mandi',
      region: 'Delhi',
      type: 'Cereals',
      inWatchlist: false
    },
    {
      id: '2',
      name: 'Rice',
      currentPrice: 1850,
      trend: 'down',
      expectedValue: 1750,
      mandi: 'Mumbai Mandi',
      region: 'Maharashtra',
      type: 'Cereals',
      inWatchlist: true
    },
    {
      id: '3',
      name: 'Tomato',
      currentPrice: 3200,
      trend: 'up',
      expectedValue: 3500,
      mandi: 'Bangalore Mandi',
      region: 'Karnataka',
      type: 'Vegetables',
      inWatchlist: false
    },
    {
      id: '4',
      name: 'Onion',
      currentPrice: 2800,
      trend: 'down',
      expectedValue: 2600,
      mandi: 'Pune Mandi',
      region: 'Maharashtra',
      type: 'Vegetables',
      inWatchlist: false
    },
    {
      id: '5',
      name: 'Potato',
      currentPrice: 1200,
      trend: 'up',
      expectedValue: 1400,
      mandi: 'Delhi Mandi',
      region: 'Delhi',
      type: 'Vegetables',
      inWatchlist: true
    },
    {
      id: '6',
      name: 'Cotton',
      currentPrice: 5600,
      trend: 'up',
      expectedValue: 5800,
      mandi: 'Ahmedabad Mandi',
      region: 'Gujarat',
      type: 'Cash Crops',
      inWatchlist: false
    }
  ]);

  const filters = [
    { id: 'all', label: 'All Regions' },
    { id: 'delhi', label: 'Delhi' },
    { id: 'maharashtra', label: 'Maharashtra' },
    { id: 'karnataka', label: 'Karnataka' },
    { id: 'gujarat', label: 'Gujarat' }
  ];

  const cropTypes = [
    { id: 'cereals', label: 'Cereals' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'cash-crops', label: 'Cash Crops' }
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const toggleWatchlist = (cropId: string) => {
    setCrops(prev => prev.map(crop => 
      crop.id === cropId ? { ...crop, inWatchlist: !crop.inWatchlist } : crop
    ));
  };

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.includes(crop.region.toLowerCase()) ||
      selectedFilters.includes(crop.type.toLowerCase().replace(' ', '-'));
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-inter pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white shadow-sm border-b z-40">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-primary mb-4">Market Prices</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {filters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedFilters.includes(filter.id) ? 'bg-primary hover:bg-green-700' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => toggleFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {cropTypes.map((type) => (
                <Badge
                  key={type.id}
                  variant={selectedFilters.includes(type.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedFilters.includes(type.id) ? 'bg-primary hover:bg-green-700' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => toggleFilter(type.id)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Crops List */}
      <div className="px-4 py-6 space-y-4">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
                  <p className="text-sm text-gray-600">{crop.mandi}</p>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleWatchlist(crop.id)}
                  className={`${crop.inWatchlist ? 'text-primary' : 'text-gray-400'} hover:bg-gray-100`}
                >
                  {crop.inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Current Price</span>
                  <div className="text-xl font-bold text-gray-900">₹{crop.currentPrice}</div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-600">Prediction</span>
                  <div className={`flex items-center gap-1 ${
                    crop.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {crop.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="font-bold">₹{crop.expectedValue}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{crop.region}</span>
                  <Badge variant="outline" className="text-xs">
                    {crop.type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketPage;
