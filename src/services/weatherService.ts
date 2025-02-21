import axios from 'axios';

const API_KEY = '82651037a399c442eaa24e202c471a84'; // Replace with your API key

export interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch weather data. Check the city name.');
  }
};

export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch weather data.');
  }
};
