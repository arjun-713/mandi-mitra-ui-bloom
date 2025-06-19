
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sprout, IndianRupee, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ActiveCropsSnapshotProps {
  userCrops?: any[];
  onAddCrop?: () => void;
}

const ActiveCropsSnapshot = ({ userCrops = [], onAddCrop }: ActiveCropsSnapshotProps) => {
  const { t } = useLanguage();
  
  if (userCrops.length === 0) {
    return (
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <Sprout className="w-5 h-5 text-green-600" />
            {t('active_crops')}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-gray-600 mb-4">No crops added yet</p>
          <Button 
            onClick={onAddCrop}
            className="bg-primary hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Now
          </Button>
        </CardContent>
      </Card>
    );
  }

  const activeCrops = userCrops.slice(0, 2);
  const totalInvestment = activeCrops.reduce((total, crop) => total + (crop.totalExpenses || 0), 0);

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
                {crop.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                <span>₹{(crop.totalExpenses || 0).toLocaleString()}</span>
              </div>
              <span>{crop.acres} acres</span>
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
