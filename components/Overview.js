import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';

export default function Overview(props) {
  const {colors} = useTheme();

  const CustomData = require('../custom-data.json');

  const eventDate = new Date(CustomData.eventDate);

  // a on press function that will open the registration page in a browser
  const onPress = () => {
    Linking.openURL(CustomData.registrationURL);
  };

  return (
    <View style={styles.container}>
      {/* Event Title and Countdown */}

      <View style={styles.topcontainer}>
        <Text style={{color: colors.text, fontSize: 35, fontWeight: 'bold'}}>
          Atl Cloud Conf
        </Text>
        <Text
          style={{color: colors.text, fontSize: 15, fontWeight: 'semibold'}}>
          {eventDate.toDateString()}
        </Text>
      </View>

      {/* Rocket */}

      <View style={styles.midcontainer}>
        <Image resizeMode="center" source={require('../assets/rocket.png')} />
      </View>

      {/* Register Button and Price Increase Text */}

      <View style={styles.bottomcontainer}>
        <Icon.Button
          name={'ticket'}
          size={30}
          backgroundColor={colors.background}
          color={colors.notification}
          onPress={() => onPress()}>
          {/* <FontAwesome5 name={'ticket-alt'} size={30} color={colors.notification} /> */}
          <Text
            style={{
              color: colors.text,
              fontSize: 27,
              fontWeight: 'bold',
              padding: 10,
            }}>
            Register
          </Text>
        </Icon.Button>
        <View style={{width: 270}}>
          <Text
            style={{
              color: colors.secondary,
              fontSize: 15,
              fontWeight: 'semibold',
              lineHeight: 16,
              textAlign: 'center',
              paddingTop: 25,
            }}>
            Price increases to $20.00 on Mar 11th. 2023.
          </Text>
        </View>
      </View>
      <Image
        style={styles.image}
        source={require('../assets/bottom-image.png')}
      />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  midcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    flex: 0.28,
    width: windowWidth,
  },
});
