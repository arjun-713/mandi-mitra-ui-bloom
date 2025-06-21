
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SellForm from '@/components/SellForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface SellPageProps {
  onBack: () => void;
}

const SellPage = ({ onBack }: SellPageProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting crop listing:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create sale record for history
      const saleRecord = {
        id: Date.now().toString(),
        cropName: formData.cropName,
        dateSold: new Date().toISOString().split('T')[0],
        quantitySold: parseInt(formData.quantity),
        pricePerQuintal: parseInt(formData.expectedPrice),
        totalEarnings: parseInt(formData.quantity) * parseInt(formData.expectedPrice),
        expenses: {
          fertilizer: 0,
          labor: 0,
          pesticide: 0,
          transport: 0,
          seeds: 0,
          other: 0
        },
        netProfitLoss: parseInt(formData.quantity) * parseInt(formData.expectedPrice),
        profitMargin: 100 // Will be calculated properly when expenses are added
      };
      
      // Save to localStorage
      const existingHistory = localStorage.getItem('cropSalesHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.unshift(saleRecord); // Add to beginning of array
      localStorage.setItem('cropSalesHistory', JSON.stringify(history));
      
      toast({
        title: "Success!",
        description: "Crop listing created and added to your sales history.",
      });
      
      onBack();
    } catch (error) {
      console.error('Error creating listing:', error);
      toast({
        title: "Error",
        description: "Error creating listing. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-sm border-b z-40">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">Sell Your Crop</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <SellForm onSubmit={handleFormSubmit} />
        
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Creating your listing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellPage;
