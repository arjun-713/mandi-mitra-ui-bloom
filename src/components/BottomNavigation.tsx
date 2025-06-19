
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, DollarSign, History, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const { t } = useLanguage();
  
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'sell', label: 'Sell', icon: DollarSign },
    { id: 'history', label: 'History', icon: History },
    { id: 'mandi', label: 'Mandi', icon: MapPin }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`h-full flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === tab.id 
                  ? 'text-white bg-primary' 
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <IconComponent className="w-5 h-5" />
              <span className={`text-xs font-medium ${activeTab === tab.id ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
