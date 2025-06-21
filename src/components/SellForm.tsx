
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Camera, Plus, MapPin, X } from 'lucide-react';
import CropSelector from '@/components/CropSelector';
import LocationSelector from '@/components/LocationSelector';

interface SellFormProps {
  onSubmit: (formData: any) => void;
  activeCrops?: Array<{name: string, quantity: number}>;
}

const SellForm = ({ onSubmit, activeCrops = [] }: SellFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [useActiveCrop, setUseActiveCrop] = useState(false);
  const [selectedActiveCrop, setSelectedActiveCrop] = useState('');
  const [imagePreview, setImagePreview] = useState<string[]>([]);
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (formData.images.length + files.length <= 5) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
      
      // Create preview URLs
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreview(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
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
            
            {activeCrops.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    id="useActiveCrop"
                    checked={useActiveCrop}
                    onChange={(e) => setUseActiveCrop(e.target.checked)}
                  />
                  <label htmlFor="useActiveCrop" className="text-sm font-medium">
                    Sell from my active crops
                  </label>
                </div>
                
                {useActiveCrop && (
                  <select
                    className="w-full p-2 border rounded-md"
                    value={selectedActiveCrop}
                    onChange={(e) => {
                      setSelectedActiveCrop(e.target.value);
                      const crop = activeCrops.find(c => c.name === e.target.value);
                      if (crop) {
                        setFormData(prev => ({
                          ...prev,
                          cropName: crop.name,
                          quantity: crop.quantity.toString()
                        }));
                      }
                    }}
                  >
                    <option value="">Select active crop</option>
                    {activeCrops.map((crop, index) => (
                      <option key={index} value={crop.name}>
                        {crop.name} ({crop.quantity} quintals available)
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {!useActiveCrop && (
              <div>
                <label className="block text-sm font-medium mb-2">Select Crop</label>
                <CropSelector
                  selectedCrop={formData.cropName}
                  onCropChange={(crop) => setFormData(prev => ({ ...prev, cropName: crop }))}
                  placeholder="Type to search crops..."
                />
              </div>
            )}

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
                disabled={useActiveCrop}
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
                {imagePreview.map((preview, index) => (
                  <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      <X className="w-3 h-3" />
                    </button>
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
