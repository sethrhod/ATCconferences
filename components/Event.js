import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Overview from './Overview';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import Schedule from './Schedule';
import MyTimeline from './My-timeline';
import CodeOfConduct from './Code-of-Conduct';
import SessionizeContext from '../SessionizeContext.js';
import fetchAllData from './scripts/fetchAllData';
import FilterList from './FilterList';

export default function Event(props) {
  const Drawer = createDrawerNavigator();

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
    {name: 'My Timeline', value: false},
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

  const headerRight = () => {
    return (
      <FilterList
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
    );
  };

  const renderSchedule = () => {
    if (filterOptions[0].value) {
      return MyTimeline;
    } else {
      return Schedule;
    }
  };

  const ResetEvent = () => {
    useEffect(() => {
      props.setEvent(null);
    }, []);
  };

  // only shows app home page if bookmarks are done loading from db
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{color: event.colors.text}}>Loading...</Text>
      </View>
    );
  }

  return (
    <SessionizeContext.Provider value={value}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: event.colors.background,
            },
            headerTitleStyle: {
              color: event.colors.text,
            },
            drawerStyle: {
              backgroundColor: event.colors.background,
            },
            drawerInactiveTintColor: event.colors.text,
            headerTintColor: event.colors.text,
            drawerActiveBackgroundColor: event.colors.primary,
            drawerActiveTintColor: event.colors.text,
            headerShadowVisible: false,
          }}>
          <Drawer.Screen name="Overview" component={Overview} />
          <Drawer.Screen name="Speakers" component={Speakers} />
          <Drawer.Screen name="Sponsors" component={Sponsors} />
          <Drawer.Screen
            name="Schedule"
            component={renderSchedule()}
            options={{headerRight: () => headerRight()}}
          />
          <Drawer.Screen name="Change Event" component={ResetEvent} />
          <Drawer.Screen name="Code of Conduct" component={CodeOfConduct} />
        </Drawer.Navigator>
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
});
