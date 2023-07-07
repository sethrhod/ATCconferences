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
import React, {useContext, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SessionizeContext from './context/SessionizeContext';
import EventToRenderContext from './context/EventToRenderContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CodeOfConduct from './CodeofConduct';

export default function Overview(props) {
  const {event, appearance} = useContext(SessionizeContext);
  const {setEventToRender} = useContext(EventToRenderContext);

  const eventDate = new Date(event.date);

  // a on press function that will open the registration page in a browser
  const handlePress = () => {
    Linking.openURL(event.registration);
  };

  const HomePage = (props) => {
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
            style={[styles.date, {
              color: event.colors[appearance].text,
            }]}>
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
          <Pressable style={styles.button} onPress={() => props.navigation.navigate("Code of Conduct")}>
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
  };

  const headerRightChangeEvent = () => {
    return (
      <Pressable
        onPress={() => setEventToRender(null)}
        style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome5
          name="exchange-alt"
          size={20}
          color={event.colors[appearance].text}
          marginLeft={10}
        />
        <Text style={{ color: event.colors[appearance].text, fontSize: 20, marginLeft: 10 }}>Event</Text>
      </Pressable>
    );
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Overview" component={HomePage} options={{
          headerRight: () => headerRightChangeEvent(),
          headerStyle: {
            backgroundColor: event.colors[appearance].background,
          },
          headerTitleStyle: {
            color: event.colors[appearance].text,
          },
          headerTintColor: event.colors[appearance].text,
          headerShadowVisible: false
        }} />
        <Stack.Screen name="Code of Conduct" component={CodeOfConduct} options={{
          headerRight: () => headerRightChangeEvent(),
          headerStyle: {
            backgroundColor: event.colors[appearance].background,
          },
          headerTitleStyle: {
            color: event.colors[appearance].text,
          },
          headerTintColor: event.colors[appearance].text,
          headerShadowVisible: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
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
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    fontWeight: '600',
    margin: 10,
  },
  midcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  image: {
    flex: 1,
    width: windowWidth,
  },
});
