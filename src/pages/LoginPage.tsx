
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import LocationSelector from '@/components/LocationSelector';

interface LoginPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const LoginPage = ({ onLogin, onSignup }: LoginPageProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('mandiMitraUsers') || '[]');
      const user = users.find((u: any) => u.phoneNumber === phoneNumber && u.password === password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin();
      } else {
        alert(t('invalid_credentials'));
      }
    } else {
      // Create new user
      if (!name || !state || !district) {
        alert('Please fill in all required fields');
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('mandiMitraUsers') || '[]');
      const existingUser = users.find((u: any) => u.phoneNumber === phoneNumber);
      
      if (existingUser) {
        alert(t('account_exists'));
      } else {
        const newUser = { 
          phoneNumber, 
          password, 
          name,
          state,
          district,
          isNewUser: true 
        };
        users.push(newUser);
        localStorage.setItem('mandiMitraUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        onSignup();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">🌾</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">MandiMitra</CardTitle>
          <p className="text-gray-600">{t('smart_farming_platform')}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">{t('phone_number')}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('enter_password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Location</Label>
                <LocationSelector
                  selectedState={state}
                  selectedDistrict={district}
                  onStateChange={setState}
                  onDistrictChange={setDistrict}
                  showMarket={false}
                />
              </div>
            )}
            
            <Button type="submit" className="w-full bg-primary hover:bg-green-700 font-semibold">
              {isLogin ? t('login') : t('create_account')}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline text-sm font-medium"
              >
                {isLogin ? t('no_account_signup') : t('have_account_login')}
              </button>
            </div>
          </form>
          
          <div className="pt-4 border-t border-gray-200">
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              {t('change_language')}
            </Label>
            <LanguageSelector />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
