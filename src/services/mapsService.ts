
// Google Maps API service
// You'll need to provide your Google Maps API key

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface Mandi {
  id: string;
  name: string;
  address: string;
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export class MapsService {
  private static apiKey: string = ''; // TODO: Add your Google Maps API key

  static setApiKey(key: string) {
    this.apiKey = key;
  }

  static async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const address = await this.reverseGeocode(latitude, longitude);
            resolve({ latitude, longitude, address });
          } catch (error) {
            resolve({ 
              latitude, 
              longitude, 
              address: 'Unknown location'
            });
          }
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }

  static async reverseGeocode(lat: number, lng: number): Promise<string> {
    if (!this.apiKey) {
      return 'Location not available';
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`
      );
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      
      return 'Unknown location';
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      return 'Location not available';
    }
  }

  static async findNearbyMandis(userLocation: Location): Promise<Mandi[]> {
    // This would typically use Google Places API to find nearby mandis
    // For now, returning mock data
    return this.getMockMandis(userLocation);
  }

  static calculateDistance(
    lat1: number, 
    lon1: number, 
    lat2: number, 
    lon2: number
  ): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private static getMockMandis(userLocation: Location): Mandi[] {
    const mockMandis = [
      {
        id: '1',
        name: 'Davangere APMC',
        address: 'Davangere, Karnataka',
        coordinates: { lat: 14.4644, lng: 75.9216 }
      },
      {
        id: '2',
        name: 'KR Market',
        address: 'Bangalore, Karnataka',
        coordinates: { lat: 12.9716, lng: 77.5946 }
      },
      {
        id: '3',
        name: 'Tumkur Market',
        address: 'Tumkur, Karnataka',
        coordinates: { lat: 13.3379, lng: 77.1022 }
      }
    ];

    return mockMandis.map(mandi => ({
      ...mandi,
      distance: this.calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        mandi.coordinates.lat,
        mandi.coordinates.lng
      )
    })).sort((a, b) => a.distance - b.distance);
  }
}
