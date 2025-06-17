
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, Receipt, ShoppingCart } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: 'Add Crop',
      color: 'bg-primary hover:bg-green-700',
      textColor: 'text-white'
    },
    {
      icon: TrendingUp,
      label: 'Predict Price',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      icon: Receipt,
      label: 'Add Expense',
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-white'
    },
    {
      icon: ShoppingCart,
      label: 'Sell Crop',
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={index}
              className={`${action.color} ${action.textColor} h-20 flex flex-col items-center justify-center gap-2 rounded-xl shadow-sm`}
            >
              <IconComponent className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
