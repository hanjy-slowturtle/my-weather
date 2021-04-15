import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const weatherOptions = {
    Clear: {
        iconName: 'weather-sunny',
        gradient: ['#4da0b0', '#d39d38'],
        title: 'Sunny',
        subtitle: 'Happy sunny'
    },
    Clouds: {
        iconName: 'weather-cloudy',
        gradient: ['white', 'black'],
        title: 'Cloudy',
        subtitle: 'Some grommy'
    },
    Rain: {
        iconName: 'weather-pouring',
        gradient: ['gray', 'blue'],
        title: 'Rain',
        subtitle: 'raindrop'
    }
};
const defaultWeatherOption = {
    iconName: 'weather-sunset',
    gradient: ['red', 'blue'],
    title: 'missing',
    subtitle: 'I missing you'
};

export default function Weather({ temp, condition }) {
    const weatherOption = weatherOptions[condition] || defaultWeatherOption;

    return (
        <LinearGradient
            colors={weatherOption.gradient}
            style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.halfContainer}>
                <MaterialCommunityIcons
                    name={weatherOption.iconName}
                    size={96}
                    color="white"
                />
                <Text style={styles.temp}>{temp}°C</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{weatherOption.title}</Text>
                <Text style={styles.subtitle}>{weatherOption.subtitle}</Text>
            </View>
        </LinearGradient>
    );
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf([
        'Thunderstorm',
        'Drizzle',
        'Rain',
        'Snow',
        'Atmosphere',
        'Clear',
        'Clouds',
        'Haze',
        'Mist',
        'Dust'
    ]).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    temp: {
        fontSize: 42,
        color: 'white'
    },
    halfContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 44,
        fotWeight: '300',
        marginBottom: 10,
        textAlign: 'left'
    },
    subtitle: {
        fontWeight: '600',
        color: 'white',
        fontSize: 24,
        textAlign: 'left'
    },
    textContainer: {
        alignItems: 'flex-start',
        paddingHorizontal: 40,
        justifyContent: 'center',
        flex: 1
    }
});