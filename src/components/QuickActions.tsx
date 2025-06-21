
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, Receipt, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuickActionsProps {
  onAddCrop: () => void;
  onPredictPrice: () => void;
  onAddExpense: () => void;
  onSellCrop: () => void;
}

const QuickActions = ({ onAddCrop, onPredictPrice, onAddExpense, onSellCrop }: QuickActionsProps) => {
  const { t } = useLanguage();
  
  const actions = [
    {
      icon: Plus,
      label: t('add_crop'),
      color: 'bg-primary hover:bg-green-700',
      textColor: 'text-white',
      onClick: onAddCrop
    },
    {
      icon: TrendingUp,
      label: t('predict_price'),
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white',
      onClick: onPredictPrice
    },
    {
      icon: Receipt,
      label: t('add_expense'),
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-white',
      onClick: () => {
        // Navigate to active crops page instead of history
        onAddCrop();
      }
    },
    {
      icon: ShoppingCart,
      label: t('sell_crop'),
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white',
      onClick: onSellCrop
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('quick_actions')}</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={index}
              className={`${action.color} ${action.textColor} h-20 flex flex-col items-center justify-center gap-2 rounded-xl shadow-sm`}
              onClick={action.onClick}
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
