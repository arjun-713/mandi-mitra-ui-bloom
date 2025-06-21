import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Camera, Plus, MapPin } from 'lucide-react';
import { CropSelector, LocationSelector } from '@/components';

interface SellFormProps {
  onSubmit: (formData: any) => void;
}

const SellForm = ({ onSubmit }: SellFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    cropName: '',
    variety: '',
    quantity: '',
    expectedPrice: '',
    harvestDate: '',
    state: '',
    district: '',
    market: '',
    transportRange: 50,
    description: '',
    images: [] as File[],
    contactPreference: 'both'
  });

  const cropOptions = [
    { category: 'Cereals', crops: ['Wheat', 'Rice', 'Maize', 'Barley'] },
    { category: 'Vegetables', crops: ['Tomato', 'Onion', 'Potato', 'Cabbage'] },
    { category: 'Fruits', crops: ['Mango', 'Banana', 'Grapes', 'Pomegranate'] },
    { category: 'Cash Crops', crops: ['Cotton', 'Sugarcane', 'Tobacco'] }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (formData.images.length + files.length <= 5) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Crop Details</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Select Crop</label>
              <CropSelector
                selectedCrop={formData.cropName}
                onCropChange={(crop) => setFormData(prev => ({ ...prev, cropName: crop }))}
                placeholder="Type to search crops..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Variety/Grade</label>
              <Input
                placeholder="e.g., A Grade, Premium, Organic"
                value={formData.variety}
                onChange={(e) => setFormData(prev => ({ ...prev, variety: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quantity (quintals)</label>
              <Input
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pricing & Timeline</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Expected Price (₹/quintal)</label>
              <Input
                type="number"
                placeholder="Enter expected price"
                value={formData.expectedPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, expectedPrice: e.target.value }))}
              />
              <p className="text-sm text-gray-600 mt-1">Market rate today: ₹2,340 (reference)</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Harvest Date</label>
              <Input
                type="date"
                value={formData.harvestDate}
                onChange={(e) => setFormData(prev => ({ ...prev, harvestDate: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Transportation Range (km)</label>
              <Input
                type="range"
                min="0"
                max="200"
                value={formData.transportRange}
                onChange={(e) => setFormData(prev => ({ ...prev, transportRange: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>0 km</span>
                <span>{formData.transportRange} km</span>
                <span>200 km</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Location & Media</h3>
            
            <LocationSelector
              selectedState={formData.state}
              selectedDistrict={formData.district}
              selectedMarket={formData.market}
              onStateChange={(state) => setFormData(prev => ({ ...prev, state }))}
              onDistrictChange={(district) => setFormData(prev => ({ ...prev, district }))}
              onMarketChange={(market) => setFormData(prev => ({ ...prev, market }))}
              showMarket={true}
            />

            <div>
              <label className="block text-sm font-medium mb-2">Upload Photos (up to 5)</label>
              <div className="grid grid-cols-3 gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-600">Image {index + 1}</span>
                  </div>
                ))}
                {formData.images.length < 5 && (
                  <label className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
                    <Camera className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600">Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <Textarea
                placeholder="Any special conditions, organic certification, etc."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Create Crop Listing
          <span className="text-sm font-normal">
            Step {currentStep} of 3
          </span>
        </CardTitle>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderStep()}
        
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={
                (currentStep === 1 && !formData.cropName) ||
                (currentStep === 2 && (!formData.expectedPrice || !formData.harvestDate))
              }
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Post Listing
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SellForm;
