
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceAlertsProps {
  userLocation?: string;
}

const PriceAlerts = ({ userLocation = 'Davangere Market' }: PriceAlertsProps) => {
  const alerts = [
    {
      type: 'increase',
      crop: 'Onion',
      change: '+₹400',
      period: 'Increasing',
      icon: TrendingUp,
      color: 'text-green-600',
      status: 'Good to Sell'
    },
    {
      type: 'increase',
      crop: 'Cotton',
      change: '+₹250',
      period: 'Increasing',
      icon: TrendingUp,
      color: 'text-green-600',
      status: 'Good to Sell'
    },
    {
      type: 'decrease',
      crop: 'Tomato',
      change: '-₹200',
      period: 'Decreasing',
      icon: TrendingDown,
      color: 'text-red-600',
      status: 'Hold Stock'
    }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Price Alerts at {userLocation}</h3>
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
                  <span className={`text-sm ml-2 ${alert.color}`}>({alert.period})</span>
                  <div className="text-xs text-gray-600 mt-1">{alert.status}</div>
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
