
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, IndianRupee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ActiveCropsSnapshotProps {
  userCrops?: string[];
}

const ActiveCropsSnapshot = ({ userCrops = [] }: ActiveCropsSnapshotProps) => {
  const { t } = useLanguage();
  
  const generateActiveCrop = (cropName: string, index: number) => {
    const stages = [t('seeding'), t('growing'), t('flowering'), t('harvesting'), t('ready')];
    const expense = Math.floor(Math.random() * 20000) + 5000;
    const daysLeft = Math.floor(Math.random() * 90) + 7;
    
    return {
      name: cropName,
      stage: stages[Math.floor(Math.random() * stages.length)],
      expense: `₹${expense.toLocaleString()}`,
      daysLeft
    };
  };

  const activeCrops = userCrops.length > 0 
    ? userCrops.slice(0, 2).map(generateActiveCrop)
    : [
        {
          name: 'Wheat',
          stage: t('flowering'),
          expense: '₹15,000',
          daysLeft: 45
        },
        {
          name: 'Tomato',
          stage: t('harvesting'),
          expense: '₹8,500',
          daysLeft: 7
        }
      ];

  const totalInvestment = activeCrops.reduce((total, crop) => {
    const amount = parseInt(crop.expense.replace(/₹|,/g, ''));
    return total + amount;
  }, 0);

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900">
          <Sprout className="w-5 h-5 text-green-600" />
          {t('active_crops')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeCrops.map((crop, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{crop.name}</h4>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {crop.stage}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                <span>{crop.expense}</span>
              </div>
              <span>{crop.daysLeft} {t('days_left')}</span>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-gray-200">
          <div className="text-sm text-gray-600">{t('total_investment')}</div>
          <div className="text-lg font-bold text-gray-900">₹{totalInvestment.toLocaleString()}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveCropsSnapshot;
