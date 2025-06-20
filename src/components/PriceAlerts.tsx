
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const PriceAlerts = () => {
  const alerts = [
    {
      type: 'jump',
      crop: 'Onion',
      change: '+₹400',
      period: '24hrs',
      icon: TrendingUp,
      color: 'text-red-600'
    },
    {
      type: 'trending',
      crop: 'Cotton',
      change: '+15%',
      period: 'this week',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      type: 'drop',
      crop: 'Tomato',
      change: '-₹200',
      period: 'Good to buy',
      icon: TrendingDown,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Price Alerts</h3>
      {alerts.map((alert, index) => {
        const IconComponent = alert.icon;
        return (
          <Card key={index} className="bg-gray-50 border-l-4 border-l-primary">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <IconComponent className={`w-4 h-4 ${alert.color}`} />
                <div className="flex-1">
                  <span className="font-medium">{alert.crop}</span>
                  <span className={`ml-2 font-bold ${alert.color}`}>{alert.change}</span>
                  <span className="text-sm text-gray-600 ml-2">({alert.period})</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PriceAlerts;
