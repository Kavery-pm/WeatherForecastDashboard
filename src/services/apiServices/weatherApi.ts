import axios from 'axios';

const API_KEY = '1ef47472140e1be85a3d9313547ab506';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';


export const fetchWeather = async (city:string) => {
  
    const url = `${BASE_URL}weather?q=${city}&appid=${API_KEY}`
     
        const response = await axios.get(url);
        return response.data;
    
      }
      export const fetchForecast = async (city:string) => {
        const url = `${BASE_URL}forecast?q=${city}&appid=${API_KEY}`
  
    
        const response = await axios.get(url);
        return response.data;
     
    };
    export async function fetchWeatherByCoordinates(latitude: number, longitude: number) {
      const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
      try {
        const response = await axios.get(url
          // `${BASE_URL}`, {
          // params: {
          //   lat: latitude,
          //   lon: longitude,
          //   appid: API_KEY, 
          //   // or 'imperial' for Fahrenheit
          // },
        // }
        );
        return response.data;
      } catch (error) {
        throw new Error('Error fetching weather data by coordinates');
      }
    }