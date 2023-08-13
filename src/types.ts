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
    clouds: {
        all: number;
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
    dt: number;
    dt_txt: string;
    temperature: number;
    humidity: number;
    main: {
      temp_max: number;
      temp_min: number;
     humidity: number;
     feels_like: number;
     pressure: number
    };
    weather: {
      description: string;
  
    }[];
  
  }
  