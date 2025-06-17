import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const states = [
  'Andhra Pradesh',
  'Karnataka',
  'Tamil Nadu',
  'Kerala',
  'Telangana',
  'Maharashtra',
  'Uttar Pradesh',
  'Punjab',
  'Bihar',
  'West Bengal',
];

const districts = {
  'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool'],
  'Karnataka': ['Bangalore Urban', 'Mysore', 'Mangalore', 'Belgaum', 'Hubli'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Alappuzha', 'Thrissur'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut'],
  'Punjab': ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia'],
  'West Bengal': ['Kolkata', 'Darjeeling', 'Howrah', 'Durgapur', 'Siliguri'],
};

const markets = {
  'Anantapur': ['Anantapur Market', 'Dharmavaram Market'],
  'Chittoor': ['Chittoor Market', 'Tirupati Market'],
  'East Godavari': ['Rajahmundry Market', 'Kakinada Market'],
  'Guntur': ['Guntur Market', 'Narasaraopet Market'],
  'Krishna': ['Vijayawada Market', 'Machilipatnam Market'],
  'Kurnool': ['Kurnool Market', 'Nandyal Market'],
  'Bangalore Urban': ['KR Market', 'Yeshwanthpur Market'],
  'Mysore': ['Mysore Market'],
  'Mangalore': ['Mangalore Market'],
  'Belgaum': ['Belgaum Market'],
  'Hubli': ['Hubli Market'],
  'Chennai': ['Koyambedu Market', 'Chennai Market'],
  'Coimbatore': ['Coimbatore Market'],
  'Madurai': ['Madurai Market'],
  'Salem': ['Salem Market'],
  'Tiruchirappalli': ['Tiruchirappalli Market'],
  'Thiruvananthapuram': ['Thiruvananthapuram Market'],
  'Kochi': ['Kochi Market'],
  'Kozhikode': ['Kozhikode Market'],
  'Alappuzha': ['Alappuzha Market'],
  'Thrissur': ['Thrissur Market'],
  'Hyderabad': ['Hyderabad Market'],
  'Warangal': ['Warangal Market'],
  'Nizamabad': ['Nizamabad Market'],
  'Karimnagar': ['Karimnagar Market'],
  'Khammam': ['Khammam Market'],
  'Mumbai': ['Mumbai Market'],
  'Pune': ['Pune Market'],
  'Nagpur': ['Nagpur Market'],
  'Nashik': ['Nashik Market'],
  'Aurangabad': ['Aurangabad Market'],
  'Lucknow': ['Lucknow Market'],
  'Kanpur': ['Kanpur Market'],
  'Varanasi': ['Varanasi Market'],
  'Agra': ['Agra Market'],
  'Meerut': ['Meerut Market'],
  'Amritsar': ['Amritsar Market'],
  'Ludhiana': ['Ludhiana Market'],
  'Jalandhar': ['Jalandhar Market'],
  'Patiala': ['Patiala Market'],
  'Bathinda': ['Bathinda Market'],
  'Patna': ['Patna Market'],
  'Gaya': ['Gaya Market'],
  'Bhagalpur': ['Bhagalpur Market'],
  'Muzaffarpur': ['Muzaffarpur Market'],
  'Purnia': ['Purnia Market'],
  'Kolkata': ['Kolkata Market'],
  'Darjeeling': ['Darjeeling Market'],
  'Howrah': ['Howrah Market'],
  'Durgapur': ['Durgapur Market'],
  'Siliguri': ['Siliguri Market'],
};

const crops = [
  'Wheat',
  'Rice',
  'Maize',
  'Cotton',
  'Sugarcane',
  'Tomato',
  'Potato',
  'Onion',
  'Chili',
  'Banana',
];

interface SurveyPageProps {
  onComplete: (data: any) => void;
}

const SurveyPage = ({ onComplete }: SurveyPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    district: '',
    market: '',
    crops: [] as string[]
  });

  const [districtSearch, setDistrictSearch] = useState('');
  const [marketSearch, setMarketSearch] = useState('');
  const [cropSearch, setCropSearch] = useState('');
  const { t } = useLanguage();

  const filteredDistricts = formData.state
    ? districts[formData.state].filter(d =>
        d.toLowerCase().includes(districtSearch.toLowerCase())
      )
    : [];

  const filteredMarkets = formData.district
    ? markets[formData.district]?.filter(m =>
        m.toLowerCase().includes(marketSearch.toLowerCase())
      ) || []
    : [];

  const filteredCrops = crops.filter(c =>
    c.toLowerCase().includes(cropSearch.toLowerCase()) && !formData.crops.includes(c)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.state || !formData.district || !formData.market || formData.crops.length === 0) {
      alert(t('please_fill_fields'));
      return;
    }
    
    onComplete(formData);
  };

  const handleCropSelect = (crop: string) => {
    if (!formData.crops.includes(crop)) {
      setFormData(prev => ({
        ...prev,
        crops: [...prev.crops, crop]
      }));
    }
    setCropSearch('');
  };

  const removeCrop = (cropToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      crops: prev.crops.filter(crop => crop !== cropToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">{t('complete_profile')}</CardTitle>
          <p className="text-gray-600">{t('help_personalize')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">{t('name')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t('enter_name')}
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="state">{t('state')}</Label>
              <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value, district: '', market: '' }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_state')} />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.state && (
              <div>
                <Label htmlFor="district">{t('district')}</Label>
                <div className="relative">
                  <Input
                    id="district"
                    type="text"
                    placeholder={t('search_district')}
                    value={districtSearch}
                    onChange={(e) => setDistrictSearch(e.target.value)}
                  />
                  {districtSearch && filteredDistricts.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                      {filteredDistricts.slice(0, 10).map((district) => (
                        <div
                          key={district}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, district, market: '' }));
                            setDistrictSearch(district);
                          }}
                        >
                          {district}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {formData.district && (
                  <p className="text-sm text-green-600 mt-1">Selected: {formData.district}</p>
                )}
              </div>
            )}

            {formData.district && (
              <div>
                <Label htmlFor="market">{t('market')}</Label>
                <div className="relative">
                  <Input
                    id="market"
                    type="text"
                    placeholder={t('search_market')}
                    value={marketSearch}
                    onChange={(e) => setMarketSearch(e.target.value)}
                  />
                  {marketSearch && filteredMarkets.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                      {filteredMarkets.slice(0, 10).map((market) => (
                        <div
                          key={market}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, market }));
                            setMarketSearch(market);
                          }}
                        >
                          {market}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {formData.market && (
                  <p className="text-sm text-green-600 mt-1">Selected: {formData.market}</p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="crops">{t('crops')}</Label>
              <div className="relative">
                <Input
                  id="crops"
                  type="text"
                  placeholder={t('search_crops')}
                  value={cropSearch}
                  onChange={(e) => setCropSearch(e.target.value)}
                />
                {cropSearch && filteredCrops.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                    {filteredCrops.slice(0, 10).map((crop) => (
                      <div
                        key={crop}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCropSelect(crop)}
                      >
                        {crop}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {formData.crops.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Selected crops:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.crops.map((crop) => (
                      <span
                        key={crop}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {crop}
                        <button
                          type="button"
                          onClick={() => removeCrop(crop)}
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-green-700">
              {t('complete_setup')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyPage;
