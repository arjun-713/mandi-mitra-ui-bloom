
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Save, CheckCircle } from 'lucide-react';
import { WeatherService } from '@/services/weatherService';
import { AgmarknetService } from '@/services/agmarknetService';
import { MapsService } from '@/services/mapsService';

const ApiKeySettings = () => {
  const [apiKeys, setApiKeys] = useState({
    weather: '9a45fb35ef1cbbd2f6664f2997826aae',
    agmarknet: '579b464db66ec23bdd000001669abbd155a24e6460d408bbd43f6bd5',
    maps: 'AIzaSyCayVGpTZqbmot3IbEnqn5psrPZNnBF14Q'
  });
  const [showKeys, setShowKeys] = useState({
    weather: false,
    agmarknet: false,
    maps: false
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Set API keys in services on component mount
    WeatherService.setApiKey(apiKeys.weather);
    AgmarknetService.setApiKey(apiKeys.agmarknet);
    MapsService.setApiKey(apiKeys.maps);
    
    // Load saved API keys from localStorage if they exist
    const savedKeys = localStorage.getItem('apiKeys');
    if (savedKeys) {
      const keys = JSON.parse(savedKeys);
      setApiKeys(prevKeys => ({ ...prevKeys, ...keys }));
    }
  }, []);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
    
    // Set API keys in services
    WeatherService.setApiKey(apiKeys.weather);
    AgmarknetService.setApiKey(apiKeys.agmarknet);
    MapsService.setApiKey(apiKeys.maps);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleShowKey = (keyType: keyof typeof showKeys) => {
    setShowKeys(prev => ({
      ...prev,
      [keyType]: !prev[keyType]
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          API Configuration
          {saved && <CheckCircle className="w-5 h-5 text-green-600" />}
        </CardTitle>
        <p className="text-sm text-gray-600">
          API keys are configured and ready for real-time data
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Weather API */}
        <div className="space-y-2">
          <Label htmlFor="weather-key">
            OpenWeatherMap API Key ✅
            <span className="text-sm text-green-600 ml-2">
              (Configured)
            </span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="weather-key"
              type={showKeys.weather ? 'text' : 'password'}
              placeholder="Enter your OpenWeatherMap API key"
              value={apiKeys.weather}
              onChange={(e) => setApiKeys(prev => ({ ...prev, weather: e.target.value }))}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleShowKey('weather')}
            >
              {showKeys.weather ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* AGMARKNET API */}
        <div className="space-y-2">
          <Label htmlFor="agmarknet-key">
            Data.gov.in API Key ✅
            <span className="text-sm text-green-600 ml-2">
              (Configured)
            </span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="agmarknet-key"
              type={showKeys.agmarknet ? 'text' : 'password'}
              placeholder="Enter your Data.gov.in API key"
              value={apiKeys.agmarknet}
              onChange={(e) => setApiKeys(prev => ({ ...prev, agmarknet: e.target.value }))}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleShowKey('agmarknet')}
            >
              {showKeys.agmarknet ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Google Maps API */}
        <div className="space-y-2">
          <Label htmlFor="maps-key">
            Google Maps API Key ✅
            <span className="text-sm text-green-600 ml-2">
              (Configured)
            </span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="maps-key"
              type={showKeys.maps ? 'text' : 'password'}
              placeholder="Enter your Google Maps API key"
              value={apiKeys.maps}
              onChange={(e) => setApiKeys(prev => ({ ...prev, maps: e.target.value }))}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleShowKey('maps')}
            >
              {showKeys.maps ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {saved ? 'Saved Successfully!' : 'Save API Keys'}
          </Button>
        </div>

        <div className="text-sm text-gray-600 bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="font-medium mb-2 text-green-800">✅ All APIs Configured:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Weather data will be fetched from OpenWeatherMap</li>
            <li>Crop prices will be fetched from AGMARKNET via Data.gov.in</li>
            <li>Maps and navigation powered by Google Maps</li>
            <li>Real-time data is now active across the app</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySettings;
