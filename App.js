import React from 'react';
import Loading from './Loading';
import * as Location from 'expo-location';
import { Alert, Platform } from 'react-native';
import axios from 'axios';

const API_KEY = '241051bf13976dd3ddf8b8d9f247255e';

export default class extends React.Component {
  state = {
    isLoading: true
  };

  render() {
    const { isLoading } = this.state;
    return (
      isLoading ? <Loading /> : null
    );
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude} } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false });
    } catch(error) {
      console.log(error);
      myAlert("Can't find you", 'So Sad');
    }
  }
  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`);
    console.log(data);
    return data;
  }
}

function myAlert(title, message) {
  if(Platform.OS === 'web') {
    alert(title + '\n' + message);
  } else {
    Alert.alert(title, message);
  }
}