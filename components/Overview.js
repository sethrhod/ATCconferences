import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from '../SessionizeContext';

export default function Overview(props) {

  const { event } = useContext(SessionizeContext);

  const eventDate = new Date(event.date);

  // a on press function that will open the registration page in a browser
  const onPress = () => {
    Linking.openURL(event.registration);
  };

  return (
    <View style={[styles.container, { backgroundColor: event.colors.background }]}>
      {/* Event Title and Countdown */}

      <View style={styles.topcontainer}>
        <Text style={[styles.title, { color: event.colors.text }]}>
          {event.name}
        </Text>
        <Text
          style={{ color: event.colors.text, fontSize: 15, fontWeight: '600' }}>
          {eventDate.toDateString()}
        </Text>
      </View>

      {/* Rocket */}

      <View style={styles.midcontainer}>
        <Image
          source={{ uri: 'file://' + event.unzippedPath + event.logo }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Register Button and Price Increase Text */}

      <View style={styles.bottomcontainer}>
        <Icon.Button
          name={'ticket'}
          size={30}
          backgroundColor={event.colors.background}
          color={event.colors.primary}
          onPress={() => onPress()}>
          <Text
            style={{
              color: event.colors.text,
              fontSize: 27,
              fontWeight: 'bold',
              padding: 10,
            }}>
            Register
          </Text>
        </Icon.Button>
        <View style={{ width: 270 }}>
          <Text
            style={{
              color: event.colors.text,
              fontSize: 15,
              fontWeight: '600',
              lineHeight: 16,
              textAlign: 'center',
              paddingTop: 25,
            }}>
            Price increases to $20.00 on Mar 11th. 2023.
          </Text>
        </View>
      </View>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  midcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    width: windowWidth,
  },
});
