
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { LocationService } from '@/services/locationService';

interface CropSelectorProps {
  selectedCrop?: string;
  onCropChange: (crop: string) => void;
  placeholder?: string;
  className?: string;
}

const CropSelector = ({ 
  selectedCrop, 
  onCropChange, 
  placeholder = "Select Crop",
  className 
}: CropSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const crops = LocationService.getCrops();
  const filteredCrops = crops.filter(crop => 
    crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={className}>
      <div className="relative">
        <Input
          type="text"
          placeholder={selectedCrop || placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="cursor-pointer"
        />
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop) => (
                <div
                  key={crop}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    onCropChange(crop);
                    setSearchTerm('');
                    setIsOpen(false);
                  }}
                >
                  {crop}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">No crops found</div>
            )}
          </div>
        )}
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CropSelector;
