
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Save } from 'lucide-react';
import { WeatherService } from '@/services/weatherService';
import { AgmarknetService } from '@/services/agmarknetService';
import { MapsService } from '@/services/mapsService';

const ApiKeySettings = () => {
  const [apiKeys, setApiKeys] = useState({
    weather: '',
    agmarknet: '',
    maps: ''
  });
  const [showKeys, setShowKeys] = useState({
    weather: false,
    agmarknet: false,
    maps: false
  });

  useEffect(() => {
    // Load saved API keys from localStorage
    const savedKeys = localStorage.getItem('apiKeys');
    if (savedKeys) {
      const keys = JSON.parse(savedKeys);
      setApiKeys(keys);
      
      // Set API keys in services
      if (keys.weather) WeatherService.setApiKey(keys.weather);
      if (keys.agmarknet) AgmarknetService.setApiKey(keys.agmarknet);
      if (keys.maps) MapsService.setApiKey(keys.maps);
    }
  }, []);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
    
    // Set API keys in services
    if (apiKeys.weather) WeatherService.setApiKey(apiKeys.weather);
    if (apiKeys.agmarknet) AgmarknetService.setApiKey(apiKeys.agmarknet);
    if (apiKeys.maps) MapsService.setApiKey(apiKeys.maps);
    
    alert('API keys saved successfully!');
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
        <CardTitle>API Configuration</CardTitle>
        <p className="text-sm text-gray-600">
          Configure your API keys to enable real-time data features
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Weather API */}
        <div className="space-y-2">
          <Label htmlFor="weather-key">
            OpenWeatherMap API Key
            <span className="text-sm text-gray-500 ml-2">
              (Get from: openweathermap.org/api)
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
            Data.gov.in API Key
            <span className="text-sm text-gray-500 ml-2">
              (Get from: data.gov.in)
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
            Google Maps API Key
            <span className="text-sm text-gray-500 ml-2">
              (Get from: console.cloud.google.com)
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
            Save API Keys
          </Button>
        </div>

        <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <p className="font-medium mb-2">Note:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>API keys are stored locally in your browser</li>
            <li>Without API keys, the app will use mock data</li>
            <li>Make sure to enable required APIs in your provider dashboards</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySettings;
