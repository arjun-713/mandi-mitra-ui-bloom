
// Google Maps API service for location and navigation

interface Location {
  lat: number;
  lng: number;
}

interface PlaceDetails {
  name: string;
  address: string;
  location: Location;
  distance?: number;
  duration?: string;
}

export class MapsService {
  private static apiKey: string = 'AIzaSyCayVGpTZqbmot3IbEnqn5psrPZNnBF14Q';
  private static baseUrl = 'https://maps.googleapis.com/maps/api';

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
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Bangalore coordinates
          resolve({ lat: 12.9716, lng: 77.5946 });
        }
      );
    });
  }

  static async searchNearbyMandis(location: Location, radius: number = 50000): Promise<PlaceDetails[]> {
    if (!this.apiKey) {
      return this.getMockMandis();
    }

    try {
      const url = `${this.baseUrl}/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&keyword=mandi+market+apmc&key=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Maps API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      return data.results.map((place: any) => ({
        name: place.name,
        address: place.vicinity || place.formatted_address || '',
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        }
      }));
    } catch (error) {
      console.error('Error fetching nearby mandis:', error);
      return this.getMockMandis();
    }
  }

  static async getDistanceMatrix(origins: Location[], destinations: Location[]): Promise<any> {
    if (!this.apiKey) {
      return null;
    }

    try {
      const originsStr = origins.map(loc => `${loc.lat},${loc.lng}`).join('|');
      const destinationsStr = destinations.map(loc => `${loc.lat},${loc.lng}`).join('|');
      
      const url = `${this.baseUrl}/distancematrix/json?origins=${originsStr}&destinations=${destinationsStr}&key=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Distance Matrix API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching distance matrix:', error);
      return null;
    }
  }

  static getDirectionsUrl(destination: Location, origin?: Location): string {
    const destStr = `${destination.lat},${destination.lng}`;
    const originStr = origin ? `${origin.lat},${origin.lng}` : 'My+Location';
    return `https://www.google.com/maps/dir/${originStr}/${destStr}`;
  }

  private static getMockMandis(): PlaceDetails[] {
    return [
      {
        name: 'Davangere APMC',
        address: 'Davangere, Karnataka',
        location: { lat: 14.4644, lng: 75.9206 },
        distance: 5,
        duration: '15 min'
      },
      {
        name: 'Harihar Market',
        address: 'Harihar, Karnataka',
        location: { lat: 14.5218, lng: 75.8022 },
        distance: 15,
        duration: '25 min'
      },
      {
        name: 'Chitradurga APMC',
        address: 'Chitradurga, Karnataka',
        location: { lat: 14.2251, lng: 76.3980 },
        distance: 35,
        duration: '45 min'
      }
    ];
  }
}
