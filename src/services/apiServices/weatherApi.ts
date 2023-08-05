import axios from 'axios';

const API_KEY = '1ef47472140e1be85a3d9313547ab506';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const UNITS = 'metric';

export const fetchWeather = async (city:string) => {
  
    const url = `${BASE_URL}weather?q=${city}&appid=${API_KEY}`
     
        const response = await axios.get(url);
        return response.data;
    
      }