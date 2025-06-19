
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, IndianRupee, Edit } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
}

interface ActiveCropsPageProps {
  user: any;
  onBack: () => void;
}

const ActiveCropsPage = ({ user, onBack }: ActiveCropsPageProps) => {
  const { t } = useLanguage();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [newCrop, setNewCrop] = useState({
    name: '',
    startDate: '',
    acres: 0
  });
  const [newExpense, setNewExpense] = useState({
    amount: 0,
    paymentMethod: 'Cash' as 'Cash' | 'UPI',
    notes: ''
  });

  const statusOptions = [
    t('land_preparation'),
    t('sowing'),
    t('growing'),
    t('ready_to_harvest'),
    t('harvested')
  ];

  const handleAddCrop = () => {
    if (newCrop.name && newCrop.startDate && newCrop.acres > 0) {
      const crop: Crop = {
        id: Date.now().toString(),
        name: newCrop.name,
        startDate: newCrop.startDate,
        acres: newCrop.acres,
        status: t('land_preparation'),
        expenses: []
      };
      setCrops([...crops, crop]);
      setNewCrop({ name: '', startDate: '', acres: 0 });
      setShowAddCrop(false);
    }
  };

  const handleAddExpense = () => {
    if (newExpense.amount > 0 && selectedCrop) {
      const expense: Expense = {
        id: Date.now().toString(),
        amount: newExpense.amount,
        paymentMethod: newExpense.paymentMethod,
        notes: newExpense.notes,
        date: new Date().toISOString().split('T')[0]
      };
      
      setCrops(crops.map(crop => 
        crop.id === selectedCrop 
          ? { ...crop, expenses: [...crop.expenses, expense] }
          : crop
      ));
      
      setNewExpense({ amount: 0, paymentMethod: 'Cash', notes: '' });
      setShowAddExpense(false);
      setSelectedCrop('');
    }
  };

  const updateCropStatus = (cropId: string, newStatus: string) => {
    setCrops(crops.map(crop => 
      crop.id === cropId ? { ...crop, status: newStatus } : crop
    ));
  };

  const getTotalExpenses = (crop: Crop) => {
    return crop.expenses.reduce((total, expense) => total + expense.amount, 0);
  };

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
              <h1 className="text-xl font-bold text-primary">{t('active_crops')}</h1>
            </div>
            <Dialog open={showAddCrop} onOpenChange={setShowAddCrop}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('add_crop')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('add_crop')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>{t('crop_name')}</Label>
                    <Input
                      value={newCrop.name}
                      onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                      placeholder="Enter crop name"
                    />
                  </div>
                  <div>
                    <Label>{t('start_date')}</Label>
                    <Input
                      type="date"
                      value={newCrop.startDate}
                      onChange={(e) => setNewCrop({...newCrop, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>{t('acres')}</Label>
                    <Input
                      type="number"
                      value={newCrop.acres}
                      onChange={(e) => setNewCrop({...newCrop, acres: Number(e.target.value)})}
                      placeholder="Enter acres"
                    />
                  </div>
                  <Button onClick={handleAddCrop} className="w-full bg-primary hover:bg-green-700">
                    {t('add')}
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
              <p className="text-gray-600 mb-4">{t('no_crops_message')}</p>
              <Button 
                onClick={() => setShowAddCrop(true)}
                className="bg-primary hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('add_crop')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {crops.map((crop) => (
              <Card key={crop.id} className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center justify-between">
                    <span>{crop.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCrop(crop.id);
                        setShowAddExpense(true);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      {t('add_expense')}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Started:</span>
                      <div className="font-medium">{crop.startDate}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Acres:</span>
                      <div className="font-medium">{crop.acres}</div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-gray-600">{t('current_status')}</Label>
                    <Select 
                      value={crop.status} 
                      onValueChange={(value) => updateCropStatus(crop.id, value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{t('total_expenses')}</span>
                      <div className="flex items-center gap-1 font-bold text-gray-900">
                        <IndianRupee className="w-4 h-4" />
                        {getTotalExpenses(crop).toLocaleString()}
                      </div>
                    </div>
                    
                    {crop.expenses.length > 0 && (
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {crop.expenses.map((expense) => (
                          <div key={expense.id} className="text-xs bg-gray-50 p-2 rounded">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">₹{expense.amount}</span>
                              <span className="text-gray-500">{expense.paymentMethod}</span>
                            </div>
                            {expense.notes && (
                              <div className="text-gray-600 mt-1">{expense.notes}</div>
                            )}
                            <div className="text-gray-500">{expense.date}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('add_new_expense')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{t('expense_amount')}</Label>
                <Input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <Label>{t('payment_method')}</Label>
                <Select 
                  value={newExpense.paymentMethod} 
                  onValueChange={(value: 'Cash' | 'UPI') => setNewExpense({...newExpense, paymentMethod: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">{t('cash')}</SelectItem>
                    <SelectItem value="UPI">{t('upi')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t('notes')}</Label>
                <Textarea
                  value={newExpense.notes}
                  onChange={(e) => setNewExpense({...newExpense, notes: e.target.value})}
                  placeholder="Add notes (optional)"
                />
              </div>
              <Button onClick={handleAddExpense} className="w-full bg-primary hover:bg-green-700">
                {t('add')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ActiveCropsPage;
