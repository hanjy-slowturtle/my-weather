import React from 'react';
import Loading from './Loading';
import * as Location from 'expo-location';
import { Alert, Platform } from 'react-native';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = '241051bf13976dd3ddf8b8d9f247255e';

export default class extends React.Component {
  state = {
    isLoading: true
  };

  render() {
    const { isLoading, temp, condition } = this.state;
    return (
      isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />
    );
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    try {
      const { latitude, longitude } = await this.getLocation();
      const {
        data: {
          main: { temp },
          weather
        }
      } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`);
      this.setState({
        isLoading: false,
        temp,
        condition: weather[0].main
      });
    } catch(error) {
      console.log(error);
      myAlert("Can't find you", 'So Sad');
    }
  };
  getLocation = async () => {
    await Location.requestPermissionsAsync();
    const { coords: { latitude, longitude} } = await Location.getCurrentPositionAsync();
    console.log(latitude, longitude);
    return {
      latitude,
      longitude
    };
  };
}

function myAlert(title, message) {
  if(Platform.OS === 'web') {
    alert(title + '\n' + message);
  } else {
    Alert.alert(title, message);
  }
}