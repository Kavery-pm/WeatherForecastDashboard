export type WeatherData = {
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
      clouds:number
     
    }[];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
    name: string;
    dt:number;
  }
  
  export interface ForecastItem {
    date: string;
    temperature: number;
    humidity: number;
   dt_txt:string;
  description: string;
  weather: {
    description: string;
    icon: string; 
  }[];
  }
  