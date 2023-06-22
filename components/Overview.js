import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  Pressable,
} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SessionizeContext from '../SessionizeContext';
import CodeOfConduct from './CodeofConduct';

export default function Overview(props) {
  const {event} = useContext(SessionizeContext);
  const {appearance} = useContext(SessionizeContext);

  const [codeOfConduct, setCodeOfConduct] = React.useState(false);

  const eventDate = new Date(event.date);

  // a on press function that will open the registration page in a browser
  const handlePress = () => {
    Linking.openURL(event.registration);
  };

  // conditional rendering for the code of conduct view
  if (codeOfConduct) {
    return <CodeOfConduct setCodeOfConduct={setCodeOfConduct} />;
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: event.colors[appearance].background},
      ]}>
      {/* Event Title */}

      <View style={styles.topcontainer}>
        <Text style={[styles.title, {color: event.colors[appearance].text}]}>
          {event.name}
        </Text>
        <Text
          style={{
            color: event.colors[appearance].text,
            fontSize: 15,
            fontWeight: '600',
          }}>
          {eventDate.toDateString()}
        </Text>
      </View>

      {/* Rocket */}

      <View style={styles.midcontainer}>
        <Image
          source={{uri: 'file://' + event.unzippedPath + event.logo}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Register Button and Price Increase Text */}

      <View style={styles.bottomcontainer}>
        <Pressable style={styles.button} onPress={() => handlePress()}>
          <Icon
            name={'ticket'}
            size={25}
            color={event.colors[appearance].primary}
          />
          <Text
            style={[
              styles.button_text,
              {color: event.colors[appearance].text},
            ]}>
            Register
          </Text>
        </Pressable>
        <View style={{width: 270}}>
          <Text
            style={[styles.price_info, {color: event.colors[appearance].text}]}>
            Price increases to $20.00 on Mar 11th. 2023.
          </Text>
        </View>
        <Pressable style={styles.button} onPress={() => setCodeOfConduct(!codeOfConduct)}>
          <FontAwesome5
            name="balance-scale"
            size={23}
            color={event.colors[appearance].primary}
          />
          <Text
            style={[
              styles.button_text,
              {color: event.colors[appearance].text},
            ]}>
            Code of Conduct
          </Text>
        </Pressable>
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
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  midcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  price_info: {
    fontSize: 12,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: windowWidth,
  },
});
