
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const { t } = useLanguage();
  
  const tabs = [
    { id: 'home', label: t('home'), icon: '🏠' },
    { id: 'market', label: t('market'), icon: '📈' },
    { id: 'sell', label: t('sell'), icon: '💰' },
    { id: 'history', label: t('history'), icon: '📜' },
    { id: 'settings', label: t('settings'), icon: '⚙️' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={`h-full rounded-none flex flex-col items-center justify-center gap-1 ${
              activeTab === tab.id 
                ? 'text-primary bg-green-50' 
                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
