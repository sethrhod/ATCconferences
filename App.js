import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import uuid from 'react-native-uuid';
import Overview from './components/Overview';
import Speakers from './components/Speakers';
import Sponsors from './components/Sponsors';
import Schedule from './components/Schedule';
import MyTimeline from './components/My-timeline';
import Feedback from './components/Feedback';
import CodeOfConduct from './components/Code-of-Conduct';
import SessionizeContext from './SessionizeContext.js';
import fetchAllData from './components/scripts/fetchAllData';

export default function App() {
  const Drawer = createDrawerNavigator();

  const CustomData = require('./custom-data.json');

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
  //boolean for whether the filter is open or not
  const [filter, setFilter] = useState(false);

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
    uuid,
    filter,
    setSpeakers,
    setSessions,
    setBookmarks,
    setUUID,
    setFilter,
  };

  // fetching speakers, creating objects from those speakers, then passing them in to the fetchsessions function that creates session objects with the proper speakers objects
  useEffect(() => {
    checkUUID();
  }, []);

  useEffect(() => {
    if (uUID === null) {
      return;
    } else {
      fetchAllData(setSessions, setSpeakers, uUID);
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
      // loops through all values and add them to the bookmarks array
      keys.map(key => {
        const id = sessions.sessions.find(session => session.id === key);
        if (id !== undefined) {
          setBookmarks(bookmarks => [...bookmarks, id]);
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
    <TouchableOpacity
      onPress={() => setFilter(!filter)}
      style={{marginRight: 10}}>
      <Icon
        name="filter"
        size={20}
        color={MyTheme.colors.primary}
        style={{marginRight: 10}}
      />
    </TouchableOpacity>
    );
  };

  // only shows app home page if bookmarks are done loading from db
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Loading...</Text>
      </View>
    );
  }

  return (
    <SessionizeContext.Provider value={value}>
      <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator
          screenOptions={{headerTintColor: MyTheme.colors.primary}}>
          <Drawer.Screen name="Overview" component={Overview} />
          <Drawer.Screen name="Speakers" component={Speakers} />
          <Drawer.Screen name="Sponsors" component={Sponsors} />
          <Drawer.Screen
            name="Schedule"
            component={filter ? MyTimeline : Schedule}
            options={{
              title: filter ? 'My Timeline' : 'Schedule',
              headerRight: () => headerRight(),
            }}
          />
          <Drawer.Screen name="Code of Conduct" component={CodeOfConduct} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SessionizeContext.Provider>
  );
}

const MyTheme = {
  dark: true,
  colors: {
    primary: '#DBE9EE',
    secondary: '#C4C4C4',
    tertiary: '#4A6FA5',
    background: '#166088',
    card: '#166088',
    text: 'white',
    border: '#166088',
    notification: '#00FFFF',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
