
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  district?: string;
}

const WeatherCard = ({ district }: WeatherCardProps) => {
  // Generate mock weather data based on district
  const generateWeatherData = (districtName?: string) => {
    const temp = Math.floor(Math.random() * 15) + 20; // 20-35°C
    const humidity = Math.floor(Math.random() * 40) + 40; // 40-80%
    const windSpeed = Math.floor(Math.random() * 20) + 5; // 5-25 km/h
    const feelsLike = temp + Math.floor(Math.random() * 6) - 3; // ±3°C from actual temp
    
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
    const emojis = ['☀️', '⛅', '☁️', '🌦️'];
    const randomIndex = Math.floor(Math.random() * conditions.length);
    
    return {
      temperature: temp,
      condition: conditions[randomIndex],
      emoji: emojis[randomIndex],
      humidity,
      windSpeed,
      feelsLike
    };
  };

  const weather = generateWeatherData(district);

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Today's Weather
          {district && <span className="text-sm font-normal">in {district}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{weather.temperature}°C</div>
            <div className="text-blue-100 text-sm">{weather.condition}</div>
          </div>
          <div className="text-6xl opacity-80">{weather.emoji}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 text-center pt-2 border-t border-blue-400">
          <div className="flex flex-col items-center">
            <Droplets className="w-4 h-4 mb-1" />
            <span className="text-xs text-blue-100">Humidity</span>
            <span className="text-sm font-medium">{weather.humidity}%</span>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="w-4 h-4 mb-1" />
            <span className="text-xs text-blue-100">Wind</span>
            <span className="text-sm font-medium">{weather.windSpeed} km/h</span>
          </div>
          <div className="flex flex-col items-center">
            <Thermometer className="w-4 h-4 mb-1" />
            <span className="text-xs text-blue-100">Feels like</span>
            <span className="text-sm font-medium">{weather.feelsLike}°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
