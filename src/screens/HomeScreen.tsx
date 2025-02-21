import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'; // Add Alert import
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/styles';
import WeatherInfo from '../components/WeatherInfo';
import { getWeatherByCity, getWeatherByCoordinates, WeatherData } from '../services/weatherService';

const HomeScreen: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred.');
      }
    }
    setLoading(false);
  };

  const fetchWeatherByLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await getWeatherByCoordinates(latitude, longitude);
          setWeather(data);
        } catch (error: unknown) {
          if (error instanceof Error) {
            Alert.alert('Error', error.message);
          } else {
            Alert.alert('Error', 'An unknown error occurred.');
          }
        }
        setLoading(false);
      },
      (error) => {
        Alert.alert('Error', 'Location permission is required.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.locationButton} onPress={fetchWeatherByLocation}>
        <Icon name="location-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Use Current Location</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 10 }} />}

      <WeatherInfo weather={weather} />
    </View>
  );
};

export default HomeScreen;
