
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LocationService } from '@/services/locationService';

interface LocationSelectorProps {
  selectedState?: string;
  selectedDistrict?: string;
  selectedMarket?: string;
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
  onMarketChange?: (market: string) => void;
  showMarket?: boolean;
  className?: string;
}

const LocationSelector = ({
  selectedState,
  selectedDistrict,
  selectedMarket,
  onStateChange,
  onDistrictChange,
  onMarketChange,
  showMarket = true,
  className
}: LocationSelectorProps) => {
  const [states] = useState(LocationService.getStates());
  const [districts, setDistricts] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);

  useEffect(() => {
    if (selectedState) {
      const newDistricts = LocationService.getDistrictsByState(selectedState);
      setDistricts(newDistricts);
      setMarkets([]);
    } else {
      setDistricts([]);
      setMarkets([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      const newMarkets = LocationService.getMarketsByDistrict(selectedState, selectedDistrict);
      setMarkets(newMarkets);
    } else {
      setMarkets([]);
    }
  }, [selectedState, selectedDistrict]);

  const handleStateChange = (state: string) => {
    onStateChange(state);
    onDistrictChange('');
    if (onMarketChange) onMarketChange('');
  };

  const handleDistrictChange = (district: string) => {
    onDistrictChange(district);
    if (onMarketChange) onMarketChange('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium mb-2">State</label>
        <Select value={selectedState} onValueChange={handleStateChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {states.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">District</label>
        <Select 
          value={selectedDistrict} 
          onValueChange={handleDistrictChange}
          disabled={!selectedState}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            {districts.map(district => (
              <SelectItem key={district} value={district}>{district}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showMarket && onMarketChange && (
        <div>
          <label className="block text-sm font-medium mb-2">Market</label>
          <Select 
            value={selectedMarket} 
            onValueChange={onMarketChange}
            disabled={!selectedDistrict}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Market" />
            </SelectTrigger>
            <SelectContent>
              {markets.map(market => (
                <SelectItem key={market} value={market}>{market}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
