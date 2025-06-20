
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

interface MarketSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedFilters: string[];
  onFilterToggle: (filterId: string) => void;
}

const MarketSearch = ({ searchTerm, onSearchChange, selectedFilters, onFilterToggle }: MarketSearchProps) => {
  const filters = [
    { id: 'all', label: 'All Regions', type: 'region' },
    { id: 'karnataka', label: 'Karnataka', type: 'region' },
    { id: 'tamil-nadu', label: 'Tamil Nadu', type: 'region' },
    { id: 'cereals', label: 'Cereals', type: 'crop' },
    { id: 'vegetables', label: 'Vegetables', type: 'crop' },
    { id: 'fruits', label: 'Fruits', type: 'crop' }
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search crops (wheat, rice, tomato...)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {filters.map((filter) => (
            <Badge
              key={filter.id}
              variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                selectedFilters.includes(filter.id) ? 'bg-primary hover:bg-green-700' : 'hover:bg-gray-100'
              }`}
              onClick={() => onFilterToggle(filter.id)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketSearch;
