
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

const WeatherCard = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Today's Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">28°C</div>
            <div className="text-blue-100 text-sm">Partly Cloudy</div>
          </div>
          <div className="text-6xl opacity-80">⛅</div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 text-center pt-2 border-t border-blue-400">
          <div className="flex flex-col items-center">
            <Droplets className="w-4 h-4 mb-1" />
            <span className="text-xs text-blue-100">Humidity</span>
            <span className="text-sm font-medium">65%</span>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="w-4 h-4 mb-1" />
            <span className="text-xs text-blue-100">Wind</span>
            <span className="text-sm font-medium">12 km/h</span>
          </div>
          <div className="flex flex-col items-center">
            <Thermometer className="w-4 h-4 mb-1" />
            <span className="text-xs text-blue-100">Feels like</span>
            <span className="text-sm font-medium">31°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
