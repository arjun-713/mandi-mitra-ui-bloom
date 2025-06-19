
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, IndianRupee } from 'lucide-react';
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
  totalExpenses: number;
}

interface CropDetailsPageProps {
  crop: Crop;
  onBack: () => void;
  onUpdateCrop: (updatedCrop: Crop) => void;
}

const CropDetailsPage = ({ crop, onBack, onUpdateCrop }: CropDetailsPageProps) => {
  const { t } = useLanguage();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [currentCrop, setCurrentCrop] = useState(crop);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    paymentMethod: 'Cash' as 'Cash' | 'UPI',
    notes: ''
  });

  const statusOptions = [
    'Land Preparation',
    'Sowing',
    'Growing',
    'Ready to Harvest',
    'Harvested'
  ];

  const handleStatusChange = (newStatus: string) => {
    const updatedCrop = { ...currentCrop, status: newStatus };
    setCurrentCrop(updatedCrop);
    onUpdateCrop(updatedCrop);
  };

  const handleAddExpense = () => {
    if (newExpense.amount && parseFloat(newExpense.amount) > 0) {
      const expense: Expense = {
        id: Date.now().toString(),
        amount: parseFloat(newExpense.amount),
        paymentMethod: newExpense.paymentMethod,
        notes: newExpense.notes,
        date: new Date().toISOString().split('T')[0]
      };
      
      const updatedExpenses = [...currentCrop.expenses, expense];
      const totalExpenses = updatedExpenses.reduce((total, exp) => total + exp.amount, 0);
      
      const updatedCrop = {
        ...currentCrop,
        expenses: updatedExpenses,
        totalExpenses
      };
      
      setCurrentCrop(updatedCrop);
      onUpdateCrop(updatedCrop);
      
      setNewExpense({ amount: '', paymentMethod: 'Cash', notes: '' });
      setShowAddExpense(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary">{currentCrop.name}</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card className="bg-white shadow-sm border border-gray-200 mb-4">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600">Started:</span>
                <div className="font-medium">{currentCrop.startDate}</div>
              </div>
              <div>
                <span className="text-gray-600">Acres:</span>
                <div className="font-medium">{currentCrop.acres}</div>
              </div>
            </div>
            
            <div className="mb-4">
              <Label className="text-sm text-gray-600 mb-2 block">Current Status</Label>
              <Select 
                value={currentCrop.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
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

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                  <IndianRupee className="w-5 h-5" />
                  <span>Total Expenses: ₹{(currentCrop.totalExpenses || 0).toLocaleString()}</span>
                </div>
              </div>
              
              {currentCrop.expenses && currentCrop.expenses.length > 0 && (
                <div className="space-y-3 mb-4">
                  {currentCrop.expenses.map((expense) => (
                    <div key={expense.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">₹{expense.amount.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">{expense.paymentMethod}</span>
                      </div>
                      {expense.notes && (
                        <div className="text-sm text-gray-600 mb-1">{expense.notes}</div>
                      )}
                      <div className="text-xs text-gray-500">{expense.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={() => setShowAddExpense(true)}
          className="w-full bg-primary hover:bg-green-700 text-white py-3 text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Expense
        </Button>

        <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  placeholder="Enter amount"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div>
                <Label>Payment Method</Label>
                <Select 
                  value={newExpense.paymentMethod} 
                  onValueChange={(value: 'Cash' | 'UPI') => setNewExpense({...newExpense, paymentMethod: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Notes (Optional)</Label>
                <Textarea
                  value={newExpense.notes}
                  onChange={(e) => setNewExpense({...newExpense, notes: e.target.value})}
                  placeholder="Add notes (optional)"
                />
              </div>
              <Button onClick={handleAddExpense} className="w-full bg-primary hover:bg-green-700">
                Add Expense
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CropDetailsPage;
