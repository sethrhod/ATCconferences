import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import uuid from 'react-native-uuid';
import Overview from './Overview';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import Sessions from './Sessions';
import Schedule from './Schedule';
import SessionizeContext from './context/SessionizeContext';
import fetchAllData from './scripts/fetchAllData';
import FilterList from './FilterList';

export default function Event(props) {
  const Tab = createBottomTabNavigator();

  //speaker objects
  const [speakers, setSpeakers] = useState(null);
  //session objects containing assigned speaker objects
  const [sessions, setSessions] = useState(null);
  //list of session objects to appear in the users timeline
  const [bookmarks, setBookmarks] = useState([]);
  //boolean for whether the id's have been retrived from the db or not
  const [isLoading, setIsLoading] = useState(true);
  //uuid for the user
  const [uUID, setUUID] = useState(null);
  // list of filter options
  const [filterOptions, setFilterOptions] = useState([
    { name: 'My Timeline', value: false },
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
  const [event, setEvent] = useState(props.event);
  //custom data
  const [customData, setCustomData] = useState(props.customData);
  //phones appearance setting for dark or light mode
  const [appearance, setAppearance] = useState(props.appearance);
  // selected session for the session info view
  const [selectedSession, setSelectedSession] = useState(null);

  // // refresh the app when the bookmarks change
  // const [refresh, setRefresh] = useState(false);
  // useEffect(() => {
  //   setRefresh(!refresh);
  // }, [bookmarks]);

  // context value
  const value = {
    speakers,
    sessions,
    bookmarks,
    uUID,
    filterOptions,
    event,
    customData,
    appearance,
    selectedSession,
    setSelectedSession,
    setAppearance,
    setCustomData,
    setEvent,
    setSpeakers,
    setSessions,
    setBookmarks,
    setUUID,
    setFilterOptions,
  };

  // fetching speakers, creating objects from those speakers, then passing them in to the fetchsessions function that creates session objects with the proper speakers objects
  useEffect(() => {
    checkUUID();
  }, []);

  useEffect(() => {
    if (uUID === null) {
      return;
    } else {
      fetchAllData(event, customData, setSessions, setSpeakers, uUID);
    }
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

  // load bookmarked sessions from db using asyncstorage when sesssions is not null
  useEffect(() => {
    if (sessions === null) {
      return;
    } else {
      load();
    }
  }, [sessions]);

  const load = async () => {
    try {
      // gets all keys from db
      keys = await AsyncStorage.getAllKeys();
      // loops through all values and add them to the bookmarks array if its id doesnt match any of the keys
      keys.map(key => {
        // if key doesnt match any of the sessions ids in the bookmarks array then it adds it to the bookmarks array
        if (
          bookmarks.find(session => session.id === key) === undefined &&
          key !== '@uuid'
        ) {
          const session = sessions.sessions.find(session => session.id === key);
          setBookmarks(bookmarks => [...bookmarks, session]);
        } else {
          return;
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // checks if sessions is null, if it is then it returns
    if (sessions === null) {
      return;
    } else {
      // loops through all bookmarks and saves them to the db
      bookmarks.map(session => {
        AsyncStorage.setItem(session.id, session.id);
      });
    }
  }, [bookmarks]);

  const headerRightChangeEvent = () => {
    return (
      <Pressable
        onPress={() => {
          props.setEvent(null);
        }}
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

  // only shows app home page if bookmarks are done loading from db
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: event.colors[appearance].text }}>Loading...</Text>
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
            headerRight: () => headerRightChangeEvent(),
            // change tab bar background color and remove shadow
            tabBarStyle: {
              borderTopWidth: 0,
              backgroundColor: event.colors[appearance].background,
              height: Platform.OS === 'ios' ? 70 : 60,
              paddingTop: 5,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              paddingBottom: 10,
            },
          }}>
          <Tab.Screen
            name="Overview"
            component={Overview}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Speakers"
            component={Speakers}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="users" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Sponsors"
            component={Sponsors}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
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
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="calendar" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Schedule"
            component={Schedule}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
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
});
