
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CropWatchlist from '@/components/CropWatchlist';
import QuickActions from '@/components/QuickActions';
import WeatherCard from '@/components/WeatherCard';
import ActiveCropsSnapshot from '@/components/ActiveCropsSnapshot';
import MarketNews from '@/components/MarketNews';
import BottomNavigation from '@/components/BottomNavigation';
import FloatingChatButton from '@/components/FloatingChatButton';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MandiMitra</h1>
              <p className="text-sm text-gray-600">Smart Farming Platform</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">🌾</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 px-4 space-y-6 pt-6">
        {/* Crop Watchlist */}
        <CropWatchlist />
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Weather & Active Crops Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WeatherCard />
          <ActiveCropsSnapshot />
        </div>
        
        {/* Market News */}
        <MarketNews />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
};

export default Index;
