
// Weather API service
// Using OpenWeatherMap API

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  forecast: string;
}

export class WeatherService {
  private static apiKey: string = '9a45fb35ef1cbbd2f6664f2997826aae';
  private static baseUrl = 'https://api.openweathermap.org/data/2.5';

  static setApiKey(key: string) {
    this.apiKey = key;
  }

  static async getCurrentWeather(city: string): Promise<WeatherData> {
    if (!this.apiKey) {
      return this.getMockWeatherData();
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        feelsLike: Math.round(data.main.feels_like),
        forecast: data.weather[0].main
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getMockWeatherData();
    }
  }

  private static getMockWeatherData(): WeatherData {
    return {
      temperature: Math.floor(Math.random() * 15) + 20,
      condition: 'Partly cloudy',
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      feelsLike: Math.floor(Math.random() * 15) + 25,
      forecast: 'Clear skies expected'
    };
  }
}
