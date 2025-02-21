import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/styles';
import { WeatherData } from '../services/weatherService';

interface WeatherInfoProps {
  weather: WeatherData | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  if (!weather) return null;

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>
      <Image
        style={styles.weatherIcon}
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
      />
      <Text style={styles.temperature}>{weather.main.temp}°C</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>
    </View>
  );
};

export default WeatherInfo;
