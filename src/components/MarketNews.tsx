
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MarketNews = () => {
  const { t } = useLanguage();
  
  const news = [
    {
      title: t('wheat_price_surge'),
      time: t('two_hours_ago'),
      category: t('market_alert')
    },
    {
      title: t('govt_subsidy_news'),
      time: t('four_hours_ago'),
      category: t('policy_update')
    },
    {
      title: t('monsoon_forecast'),
      time: t('six_hours_ago'),
      category: t('weather_update')
    }
  ];

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900">
          <Newspaper className="w-5 h-5 text-blue-600" />
          {t('market_news')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {news.map((item, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 leading-snug mb-1">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                  <span>•</span>
                  <span className="text-blue-600">{item.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MarketNews;
