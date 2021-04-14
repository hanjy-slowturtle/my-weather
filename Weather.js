import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const weatherOptions = {
    Clear: {
        iconName: 'weather-sunset',
        gradient: ['#4da0b0', '#d39d38']
    }
};

export default function Weather({ temp, condition }) {
    const weatherOption = weatherOptions[condition] || {
        iconName: 'weather-hail',
        gradient: ['red', 'blue']
    };

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
            <View style={styles.halfContainer}></View>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    temp: {
        fontSize: 42,
        color: 'white'
    },
    halfContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});