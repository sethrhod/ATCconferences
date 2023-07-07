import React, {useContext} from 'react';
import {
  SectionList,
  View,
  Button,
  RefreshControl,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SessionizeContext from './context/SessionizeContext';
import SpeakerContext from './context/SpeakerContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MemoizedSession from './Session.js';
import format_time from './scripts/formatTime.js';
import SessionInfo from './SessionInfo';
import SessionSectionList from './SessionSectionList';
import SpeakerWithSessions from './SpeakerWithSessions';

export default function Schedule(props) {
  const {
    customData,
    event,
    uUID,
    setSessions,
    bookmarks,
    setBookmarks,
    sessions,
    appearance,
  } = useContext(SessionizeContext);

  const [selectedSpeaker, setSelectedSpeaker] = React.useState(null);

  // a function that costructs a list of session data thats compatible with the SectionList component
  const constructSectionListData = bookmarks => {
    // create an empty array to store the data
    let data = [];
    // loop through the sessions
    sessions.start_times.forEach(time => {
      // create an empty object to store the data
      let obj = {};
      // set the title of the object to the start time of the session and add to the same hour sessions
      obj.title = format_time(time);
      // set the data of the object to the sessions that start at the same time
      obj.data = bookmarks.filter(bookmark => bookmark.startsAt === time);

      if (obj.data.length > 0) {
        // change the bookmarked state of the session to true
        obj.data.forEach(session => {
          session.bookmarked = true;
        });
        // push the object to the data array
        data.push(obj);
      }
    });
    // return the data array
    return data;
  };

  // a function that clears all asyncstorage data
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setBookmarks([]);
      console.log('cleared');
    } catch (e) {
      // clear error
      console.log('clear error');
    }
  };

  const ClearAllButton = () => {
    return (
      <Pressable
      style={[
        styles.clear_all,
        { backgroundColor: event.colors[appearance].background },
      ]}
      onPress={clearAll}>
      <Text
        style={[
          styles.clear_all_text,
          { color: event.colors[appearance].text },
        ]}>
        Clear All
      </Text>
    </Pressable>
    );
  };

  const ConditionalRender = (props) => {
    return (
      bookmarks.length === 0 ? (
        <View
          style={[
            styles.no_sessions_container,
            { backgroundColor: event.colors[appearance].background },
          ]}>
          <Text
            style={[styles.noSessions, { color: event.colors[appearance].text }]}>
            No sessions added
          </Text>
          <Text style={[styles.addSome, { color: event.colors[appearance].text }]}>
            Go to the Sessions page and add some!
          </Text>
        </View>
      ) : (
        <SessionSectionList
          navigation={props.navigation}
          data={constructSectionListData(bookmarks)}
        />
      )
    );
  }

  const value = {
    selectedSpeaker,
    setSelectedSpeaker,
  }

  const Stack = createNativeStackNavigator();

  return (
    <SpeakerContext.Provider value={value}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="Schedule" component={ConditionalRender} options={{
            headerTitle: "Schedule",
            headerRight: () => <ClearAllButton />,
            headerStyle: {
              backgroundColor: event.colors[appearance].background,
            },
            headerTitleStyle: {
              color: event.colors[appearance].text,
            },
            headerTintColor: event.colors[appearance].text,
            headerShadowVisible: false,
          }} />
          <Stack.Screen name="SessionInfo" component={SessionInfo} options={{
            headerTitle: "Session Info",
            headerStyle: {
              backgroundColor: event.colors[appearance].background,
            },
            headerTitleStyle: {
              color: event.colors[appearance].text,
            },
            headerTintColor: event.colors[appearance].text,
            headerShadowVisible: false,
          }} />
          <Stack.Screen
            name="SpeakerWithSessions"
            component={SpeakerWithSessions}
            options={{
              headerTitle: 'Speaker',
              headerStyle: {
                backgroundColor: event.colors[appearance].background,
              },
              headerTitleStyle: {
                color: event.colors[appearance].text,
              },
              headerTintColor: event.colors[appearance].text,
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SpeakerContext.Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeblock_text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeblock: {
    margin: 10,
  },
  noSessions: {
    textAlign: 'center',
    fontSize: 20,
  },
  addSome: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
  },
  no_sessions_container: {
    flex: 1,
    justifyContent: 'center',
  },
  section_list: {
    height: '100%',
    flex: 1,
  },
  timeblock_text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeblock: {
    flex: 1,
    padding: 15,
  },
  session: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  times: {
    textAlign: 'center',
    fontSize: 12,
  },
  time_scroll_container: {
    borderRadius: 30,
    maxWidth: 30,
    margin: 10,
    marginLeft: 0,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 5,
  },
  noSessionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSessionsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section_list: {
    height: '100%',
    flex: 1,
  },
  clear_all: {
    padding: 10,
  },
  clear_all_text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
