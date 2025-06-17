
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
    { id: 'market', label: t('market_tab'), icon: '📈' },
    { id: 'sell', label: t('sell'), icon: '💰' },
    { id: 'history', label: t('history'), icon: '📜' },
    { id: 'settings', label: t('settings'), icon: '⚙️' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`h-full flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === tab.id 
                ? 'text-white bg-primary' 
                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
