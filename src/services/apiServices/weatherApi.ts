import axios from 'axios';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
console.log(import.meta.env.VITE_REACT_APP_API_KEY);

async function apiRequest(url:string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error:any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export const fetchWeather = async (city:string) => {
  const url = `${BASE_URL}weather?q=${city}&appid=${API_KEY}`;
  return apiRequest(url);
}

export const fetchForecast = async (city:string) => {
  const url = `${BASE_URL}forecast?q=${city}&appid=${API_KEY}`;
  return apiRequest(url);
}

export async function  fetchWeatherByCoordinates(latitude:number, longitude:number) {
  const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  return apiRequest(url);
}