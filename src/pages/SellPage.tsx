
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, IndianRupee, Package, Truck, Camera, AlertTriangle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const SellPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    expectedPrice: '',
    harvestDate: '',
    transportRange: '',
    riskAssessment: false
  });

  const availableCrops = [
    'Apple', 'Banana', 'Beetroot', 'Bengal Gram', 'Brinjal', 'Cabbage', 'Carrot', 
    'Cauliflower', 'Cotton', 'Garlic', 'Ginger', 'Grapes', 'Green Chilli', 'Lemon', 
    'Maize', 'Mango', 'Onion', 'Potato', 'Rice', 'Tomato', 'Wheat'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.cropName || !formData.quantity || !formData.expectedPrice || !formData.harvestDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate successful submission
    toast({
      title: "Listing Posted Successfully!",
      description: "Your crop listing has been posted. Buyers will contact you soon.",
    });

    // Reset form
    setFormData({
      cropName: '',
      quantity: '',
      expectedPrice: '',
      harvestDate: '',
      transportRange: '',
      riskAssessment: false
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter pb-20">
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Sell Your Crop</h1>
          <p className="text-sm text-gray-600 mt-1">Post your harvest for buyers to find</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Create Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Crop Name */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Package className="w-4 h-4 text-primary" />
                  Crop Name *
                </Label>
                <Select value={formData.cropName} onValueChange={(value) => handleInputChange('cropName', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCrops.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Choose the crop you want to sell</p>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Package className="w-4 h-4 text-primary" />
                  Quantity (Quintals) *
                </Label>
                <Input
                  type="number"
                  step="0.5"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="e.g., 10.5"
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">Enter quantity in quintals (100kg = 1 quintal)</p>
              </div>

              {/* Expected Price */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <IndianRupee className="w-4 h-4 text-primary" />
                  Expected Price (₹ per quintal) *
                </Label>
                <Input
                  type="number"
                  value={formData.expectedPrice}
                  onChange={(e) => handleInputChange('expectedPrice', e.target.value)}
                  placeholder="e.g., 2100"
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">Set your expected selling price per quintal</p>
              </div>

              {/* Harvest Date */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4 text-primary" />
                  Harvest Date *
                </Label>
                <Input
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">When was this crop harvested?</p>
              </div>

              {/* Transport Range */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Truck className="w-4 h-4 text-primary" />
                  Transport Range (km)
                </Label>
                <Input
                  type="number"
                  value={formData.transportRange}
                  onChange={(e) => handleInputChange('transportRange', e.target.value)}
                  placeholder="e.g., 50"
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">Maximum distance you can transport (optional)</p>
              </div>

              {/* Upload Image */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Camera className="w-4 h-4 text-primary" />
                  Crop Image (Optional)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload crop image</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    Storage Risk Assessment
                  </Label>
                  <Switch
                    checked={formData.riskAssessment}
                    onCheckedChange={(checked) => handleInputChange('riskAssessment', checked)}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Enable if your crop has higher storage risk (perishable items)
                </p>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary hover:bg-green-700 text-lg py-6">
                Post Listing
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellPage;
