
// AGMARKNET API service for crop price data
// This is a placeholder - you'll need to implement actual AGMARKNET API integration

interface CropPrice {
  cropName: string;
  variety: string;
  market: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  date: string;
}

interface MarketData {
  id: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  trend: 'up' | 'down';
  mandiName: string;
  region: string;
  cropType: string;
  lastUpdated: string;
  variety?: string;
}

export class AgmarknetService {
  private static baseUrl = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
  private static apiKey: string = ''; // TODO: Add your data.gov.in API key

  static setApiKey(key: string) {
    this.apiKey = key;
  }

  static async getCropPrices(state?: string, crop?: string): Promise<CropPrice[]> {
    if (!this.apiKey) {
      return this.getMockPrices();
    }

    try {
      let url = `${this.baseUrl}?api-key=${this.apiKey}&format=json&limit=100`;
      
      if (state) {
        url += `&filters[state]=${encodeURIComponent(state)}`;
      }
      
      if (crop) {
        url += `&filters[commodity]=${encodeURIComponent(crop)}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('AGMARKNET API request failed');
      }

      const data = await response.json();
      
      return data.records.map((record: any) => ({
        cropName: record.commodity,
        variety: record.variety,
        market: record.market,
        state: record.state,
        minPrice: parseFloat(record.min_price) || 0,
        maxPrice: parseFloat(record.max_price) || 0,
        modalPrice: parseFloat(record.modal_price) || 0,
        date: record.price_date
      }));
    } catch (error) {
      console.error('Error fetching AGMARKNET data:', error);
      return this.getMockPrices();
    }
  }

  static async getMarketData(): Promise<MarketData[]> {
    const prices = await this.getCropPrices();
    
    // Convert to our market data format
    return prices.slice(0, 10).map((price, index) => ({
      id: (index + 1).toString(),
      name: price.cropName,
      variety: price.variety,
      currentPrice: price.modalPrice,
      priceChange: Math.floor(Math.random() * 400) - 200,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      mandiName: price.market,
      region: price.state,
      cropType: this.getCropType(price.cropName),
      lastUpdated: this.getTimeAgo(price.date),
      isInWatchlist: false
    }));
  }

  private static getCropType(cropName: string): string {
    const cereals = ['wheat', 'rice', 'maize', 'barley'];
    const vegetables = ['tomato', 'onion', 'potato', 'cabbage'];
    const fruits = ['mango', 'banana', 'grapes', 'apple'];
    
    const crop = cropName.toLowerCase();
    
    if (cereals.some(c => crop.includes(c))) return 'cereals';
    if (vegetables.some(c => crop.includes(c))) return 'vegetables';
    if (fruits.some(c => crop.includes(c))) return 'fruits';
    return 'cash-crops';
  }

  private static getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  }

  private static getMockPrices(): CropPrice[] {
    return [
      {
        cropName: 'Wheat',
        variety: 'Durum',
        market: 'Davangere APMC',
        state: 'Karnataka',
        minPrice: 2200,
        maxPrice: 2500,
        modalPrice: 2380,
        date: new Date().toISOString()
      },
      {
        cropName: 'Rice',
        variety: 'Basmati',
        market: 'Tumkur Market',
        state: 'Karnataka',
        minPrice: 1700,
        maxPrice: 2000,
        modalPrice: 1850,
        date: new Date().toISOString()
      }
    ];
  }
}
