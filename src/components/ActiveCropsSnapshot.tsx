
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, IndianRupee } from 'lucide-react';

const ActiveCropsSnapshot = () => {
  const activeCrops = [
    {
      name: 'Wheat',
      stage: 'Flowering',
      expense: '₹15,000',
      daysLeft: 45
    },
    {
      name: 'Tomato',
      stage: 'Harvesting',
      expense: '₹8,500',
      daysLeft: 7
    }
  ];

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900">
          <Sprout className="w-5 h-5 text-green-600" />
          Active Crops
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
              <span>{crop.daysLeft} days left</span>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-gray-200">
          <div className="text-sm text-gray-600">Total Investment</div>
          <div className="text-lg font-bold text-gray-900">₹23,500</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveCropsSnapshot;
