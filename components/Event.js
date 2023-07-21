import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import uuid from 'react-native-uuid';
import Overview from './Overview';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import Sessions from './Sessions';
import Schedule from './Schedule';
import SessionizeContext from './context/SessionizeContext';
import fetchAllData from './scripts/fetchAllData';
import TimeoutErrorMessage from './TimeoutErrorMessage';

export default function Event(props) {
  const Tab = createBottomTabNavigator();

  //speaker objects
  const [speakers, setSpeakers] = useState(null);
  //session objects containing assigned speaker objects
  const [sessions, setSessions] = useState(null);
  //boolean for whether the id's have been retrived from the db or not
  const [isLoading, setIsLoading] = useState(true);
  //uuid for the user
  const [uUID, setUUID] = useState(null);
  // list of filter options
  const [filterOptions, setFilterOptions] = useState([
    {
      name: 'Rooms',
      value: false,
      options: null,
    },
    {
      name: 'Times',
      value: false,
      options: null,
    },
  ]);
  // event to display
  const [event, setEvent] = useState(props.eventToRender);
  //custom data
  const [customData, setCustomData] = useState(props.customData);
  //phones appearance setting for dark or light mode
  const [appearance, setAppearance] = useState(props.appearance);
  // timeout error for when the fetch takes too long
  const [timeoutError, setTimeoutError] = useState(false);

  // context value
  const value = {
    speakers,
    sessions,
    uUID,
    filterOptions,
    event,
    customData,
    appearance,
    setAppearance,
    setCustomData,
    setEvent,
    setSpeakers,
    setSessions,
    setUUID,
    setFilterOptions,
  };

  // fetching speakers, creating objects from those speakers, then passing them in to the fetchsessions function that creates session objects with the proper speakers objects
  useEffect(() => {
    checkUUID();
  }, []);

  useEffect(() => {
    const asyncFetch = async () => {
      if (uUID === null) {
        return;
      } else {
        try {
          await fetchAllData(
            setTimeoutError,
            event,
            customData,
            setSessions,
            setSpeakers,
            uUID,
          );
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    asyncFetch();
  }, [uUID]);

  const checkUUID = async () => {
    // checks if uuid exists, if not then it creates one
    const value = await AsyncStorage.getItem('@uuid');
    if (value !== null) {
      setUUID(value);
      return value;
    } else {
      return createUUID();
    }
  };

  const createUUID = async () => {
    const newUUID = uuid.v4();
    setUUID(newUUID);
    await AsyncStorage.setItem('@uuid', newUUID);
    return newUUID;
  };

  if (timeoutError) {
    return (
      <View style={styles.container}>
        <TimeoutErrorMessage setTimeoutError={setTimeoutError} />
      </View>
    );
  }

  // only shows app home page if bookmarks are done loading from db
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.loading, {color: event.colors[appearance].text}]}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <SessionizeContext.Provider value={value}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: event.colors[appearance].background,
            },
            headerTitleStyle: {
              color: event.colors[appearance].text,
            },
            headerTintColor: event.colors[appearance].text,
            tabBarActiveTintColor: event.colors[appearance].primary,
            headerShadowVisible: false,
            // change tab bar background color and remove shadow
            tabBarStyle: {
              borderTopWidth: 0,
              backgroundColor: event.colors[appearance].background,
              // set height to 10% of screen height
              height: Dimensions.get('window').height * 0.1,
              paddingTop: 5,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              paddingBottom: 10,
            },
            AnimationEnabled: true,
          }}>
          <Tab.Screen
            name="Overview"
            component={Overview}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome5 name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Speakers"
            component={Speakers}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome5 name="users" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Sponsors"
            component={Sponsors}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome5
                  name="hand-holding-heart"
                  size={size}
                  color={color}
                />
              ),
              headerRight: null,
            }}
          />
          <Tab.Screen
            name="Sessions"
            component={Sessions}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome5 name="calendar" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Schedule"
            component={Schedule}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome5 name="clock" size={size} color={color} />
              ),
              headerRight: null,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SessionizeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_right_schedule: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  loading: {
    fontSize: 25,
  },
});
