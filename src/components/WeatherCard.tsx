
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { WeatherService } from '@/services/weatherService';

interface WeatherCardProps {
  district?: string;
}

const WeatherCard = ({ district }: WeatherCardProps) => {
  const { t } = useLanguage();
  const [weather, setWeather] = useState({
    temperature: 0,
    condition: '',
    humidity: 0,
    windSpeed: 0,
    feelsLike: 0,
    forecast: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await WeatherService.getCurrentWeather(district || 'Bangalore');
        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [district]);

  const getWeatherEmoji = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) return '☀️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('rain')) return '🌦️';
    if (conditionLower.includes('storm')) return '⛈️';
    return '⛅';
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-blue-400 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-blue-400 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-blue-400 rounded w-1/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          {t('todays_weather')}
          {district && <span className="text-sm font-normal">in {district}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{weather.temperature}°C</div>
            <div className="text-blue-100 text-sm capitalize">{weather.condition}</div>
          </div>
          <div className="text-6xl opacity-80">{getWeatherEmoji(weather.condition)}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 text-center pt-2 border-t border-blue-400">
          <div className="flex flex-col items-center">
            <Droplets className="w-4 h-4 mb-1" />
            <span className="text-xs text-blue-100">{t('humidity')}</span>
            <span className="text-sm font-medium">{weather.humidity}%</span>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="w-4 h-4 mb-1" />
            <span className="text-xs text-blue-100">{t('wind')}</span>
            <span className="text-sm font-medium">{weather.windSpeed} km/h</span>
          </div>
          <div className="flex flex-col items-center">
            <Thermometer className="w-4 h-4 mb-1" />
            <span className="text-xs text-blue-100">{t('feels_like')}</span>
            <span className="text-sm font-medium">{weather.feelsLike}°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
