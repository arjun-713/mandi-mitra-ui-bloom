
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, Settings } from 'lucide-react';
import CropWatchlist from '@/components/CropWatchlist';
import QuickActions from '@/components/QuickActions';
import WeatherCard from '@/components/WeatherCard';
import ActiveCropsSnapshot from '@/components/ActiveCropsSnapshot';
import MarketNews from '@/components/MarketNews';
import BottomNavigation from '@/components/BottomNavigation';
import FloatingChatButton from '@/components/FloatingChatButton';
import CropWatchlistPage from './CropWatchlistPage';
import ActiveCropsPage from './ActiveCropsPage';
import { useLanguage } from '@/contexts/LanguageContext';

interface IndexProps {
  user: any;
  onShowSettings: () => void;
}

const Index = ({ user, onShowSettings }: IndexProps) => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('home');
  const [userData, setUserData] = useState(user);
  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  const handleViewAllCrops = () => {
    setCurrentView('cropWatchlist');
  };

  const handleActiveCardsClick = () => {
    setCurrentView('activeCrops');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleUpdateUserCrops = (crops: any[]) => {
    const updatedUser = { ...userData, activeCrops: crops };
    setUserData(updatedUser);
    
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  if (currentView === 'cropWatchlist') {
    return <CropWatchlistPage user={userData} onBack={handleBackToHome} />;
  }

  if (currentView === 'activeCrops') {
    return (
      <ActiveCropsPage 
        user={userData} 
        onBack={handleBackToHome} 
        onUpdateUserCrops={handleUpdateUserCrops}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">MandiMitra</h1>
              <p className="text-sm text-gray-600">
                {t('welcome_back')}, {userData?.name || 'Farmer'}!
              </p>
              {userData?.district && (
                <p className="text-xs text-gray-500">
                  {userData.district}, {userData.state}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                    <span className="text-white font-semibold text-lg">🌾</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={onShowSettings} className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    {t('settings')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 px-4 space-y-6 pt-6">
        {/* Crop Watchlist */}
        <CropWatchlist 
          userCrops={userData?.crops || []} 
          userMarket={userData?.market} 
          onViewAll={handleViewAllCrops}
        />
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Weather & Active Crops Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WeatherCard district={userData?.district} />
          <div onClick={handleActiveCardsClick} className="cursor-pointer">
            <ActiveCropsSnapshot 
              userCrops={userData?.activeCrops || []} 
              onAddCrop={handleActiveCardsClick}
            />
          </div>
        </div>
        
        {/* Market News */}
        <div className="cursor-pointer">
          <MarketNews />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
};

export default Index;
