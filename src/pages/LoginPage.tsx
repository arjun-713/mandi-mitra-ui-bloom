
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const LoginPage = ({ onLogin, onSignup }: LoginPageProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

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
        alert('Invalid phone number or password');
      }
    } else {
      // Create new user
      const users = JSON.parse(localStorage.getItem('mandiMitraUsers') || '[]');
      const existingUser = users.find((u: any) => u.phoneNumber === phoneNumber);
      
      if (existingUser) {
        alert('Account already exists with this phone number');
      } else {
        const newUser = { phoneNumber, password, isNewUser: true };
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
          <p className="text-gray-600">Smart Farming Platform</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-green-700">
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
