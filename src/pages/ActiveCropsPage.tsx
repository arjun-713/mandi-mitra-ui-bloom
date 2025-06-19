
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, IndianRupee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import CropDetailsPage from './CropDetailsPage';

interface Expense {
  id: string;
  amount: number;
  paymentMethod: 'Cash' | 'UPI';
  notes: string;
  date: string;
}

interface Crop {
  id: string;
  name: string;
  startDate: string;
  acres: number;
  status: string;
  expenses: Expense[];
  totalExpenses: number;
}

interface ActiveCropsPageProps {
  user: any;
  onBack: () => void;
  onUpdateUserCrops: (crops: Crop[]) => void;
}

const ActiveCropsPage = ({ user, onBack, onUpdateUserCrops }: ActiveCropsPageProps) => {
  const { t } = useLanguage();
  const [crops, setCrops] = useState<Crop[]>(user?.activeCrops || []);
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [newCrop, setNewCrop] = useState({
    name: '',
    startDate: '',
    acres: ''
  });
  const [cropSearchTerm, setCropSearchTerm] = useState('');

  const availableCrops = [
    'Apple', 'Banana', 'Banana - Green', 'Beetroot', 'Bengal Gram(Gram)(Whole)', 'Betal Leaves',
    'Bhindi(Ladies Finger)', 'Bitter gourd', 'Bottle gourd', 'Brinjal', 'Cabbage', 'Capsicum',
    'Carrot', 'Cauliflower', 'Coconut', 'Coffee', 'Coriander(Leaves)', 'Cucumbar(Kheera)',
    'Drumstick', 'Dry Chillies', 'French Beans (Frasbean)', 'Garlic', 'Ginger(Green)', 'Grapes',
    'Green Chilli', 'Jack Fruit', 'Lemon', 'Maize', 'Mango', 'Mango (Raw-Ripe)', 'Onion',
    'Paddy(Dhan)(Common)', 'Papaya', 'Pineapple', 'Potato', 'Pumpkin', 'Ragi (Finger Millet)',
    'Rice', 'Rose(Loose)', 'Spinach', 'Sunflower', 'Tender Coconut', 'Tomato', 'Water Melon', 'Wheat'
  ];

  const filteredCrops = availableCrops.filter(crop =>
    crop.toLowerCase().includes(cropSearchTerm.toLowerCase())
  );

  const handleAddCrop = () => {
    if (newCrop.name && newCrop.startDate && newCrop.acres && parseFloat(newCrop.acres) > 0) {
      const crop: Crop = {
        id: Date.now().toString(),
        name: newCrop.name,
        startDate: newCrop.startDate,
        acres: parseFloat(newCrop.acres),
        status: 'Land Preparation',
        expenses: [],
        totalExpenses: 0
      };
      
      const updatedCrops = [...crops, crop];
      setCrops(updatedCrops);
      onUpdateUserCrops(updatedCrops);
      
      setNewCrop({ name: '', startDate: '', acres: '' });
      setCropSearchTerm('');
      setShowAddCrop(false);
    }
  };

  const handleUpdateCrop = (updatedCrop: Crop) => {
    const updatedCrops = crops.map(crop => 
      crop.id === updatedCrop.id ? updatedCrop : crop
    );
    setCrops(updatedCrops);
    onUpdateUserCrops(updatedCrops);
  };

  const handleBackFromDetails = () => {
    setSelectedCrop(null);
  };

  if (selectedCrop) {
    return (
      <CropDetailsPage
        crop={selectedCrop}
        onBack={handleBackFromDetails}
        onUpdateCrop={handleUpdateCrop}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-primary">Active Crops</h1>
            </div>
            <Dialog open={showAddCrop} onOpenChange={setShowAddCrop}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Crop
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Crop</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Crop Name</Label>
                    <div className="relative">
                      <Input
                        value={cropSearchTerm || newCrop.name}
                        onChange={(e) => {
                          setCropSearchTerm(e.target.value);
                          setNewCrop({...newCrop, name: e.target.value});
                        }}
                        placeholder="Search or type crop name"
                      />
                      {cropSearchTerm && filteredCrops.length > 0 && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                          {filteredCrops.slice(0, 5).map((crop) => (
                            <div
                              key={crop}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setNewCrop({...newCrop, name: crop});
                                setCropSearchTerm('');
                              }}
                            >
                              {crop}
                            </div>     
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={newCrop.startDate}
                      onChange={(e) => setNewCrop({...newCrop, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Acres</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={newCrop.acres}
                      onChange={(e) => setNewCrop({...newCrop, acres: e.target.value})}
                      placeholder="Enter acres (e.g., 2.5)"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <Button onClick={handleAddCrop} className="w-full bg-primary hover:bg-green-700">
                    Add Crop
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {crops.length === 0 ? (
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-4">No crops added yet</p>
              <Button 
                onClick={() => setShowAddCrop(true)}
                className="bg-primary hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Now
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {crops.map((crop) => (
              <Card 
                key={crop.id} 
                className="bg-white shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCrop(crop)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
                    <Select 
                      value={crop.status} 
                      onValueChange={(value) => {
                        const updatedCrop = { ...crop, status: value };
                        handleUpdateCrop(updatedCrop);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Land Preparation">Land Preparation</SelectItem>
                        <SelectItem value="Sowing">Sowing</SelectItem>
                        <SelectItem value="Growing">Growing</SelectItem>
                        <SelectItem value="Ready to Harvest">Ready to Harvest</SelectItem>
                        <SelectItem value="Harvested">Harvested</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="block">Started:</span>
                      <span className="font-medium text-gray-900">{crop.startDate}</span>
                    </div>
                    <div>
                      <span className="block">Acres:</span>
                      <span className="font-medium text-gray-900">{crop.acres}</span>
                    </div>
                    <div>
                      <span className="block">Total Expenses:</span>
                      <div className="flex items-center gap-1 font-medium text-gray-900">
                        <IndianRupee className="w-3 h-3" />
                        <span>₹{(crop.totalExpenses || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveCropsPage;
