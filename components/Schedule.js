import React, {useContext, useEffect} from 'react';
import {
  SectionList,
  View,
  Button,
  RefreshControl,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import SessionizeContext from './context/SessionizeContext';
import SpeakerContext from './context/SpeakerContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionInfo from './SessionInfo';
import BookmarkButton from './BookmarkButton';
import ScheduleSectionList from './ScheduleSectionList';
import SpeakerWithSessions from './SpeakerWithSessions';
import loadBookmarks from './scripts/loadBookmarks';
import constructSectionListData from './scripts/constructSectionListData';
import Sessions from './scripts/Sessions_class';

export default function Schedule(props) {
  const {event, sessions, appearance} = useContext(SessionizeContext);

  const [selectedSpeaker, setSelectedSpeaker] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [bookmarksList, setBookmarksList] = React.useState([]);
  const [updateSchedule, setUpdateSchedule] = React.useState(false);
  const [selectedSession, setSelectedSession] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const getBookmarks = async () => {
        return await loadBookmarks(event, sessions);
      };
      getBookmarks()
        .then(list => {
          setBookmarksList(list);
          const bookmarkSessions = findBookmarkSessions(sessions, list);
          const data = constructSectionListData(bookmarkSessions, list);
          const sortedData = sortData(data);
          setData(sortedData);
        })
        .catch(err => console.log(err));
    }, [updateSchedule]),
  );

  const sortData = data => {
    const sorted = [];

    data.map(item => {
      if (item.data.length === 0) {
        return;
      } else {
        sorted.push(item);
      }
    });
    return sorted;
  };

  const findBookmarkSessions = (sessions, bookmarks) => {
    let bookmarkSessions = [];
    sessions.sessions.forEach(session => {
      if (bookmarks.includes(session.id)) {
        bookmarkSessions.push(session);
      }
    });
    const newSessionsObject = new Sessions(
      sessions.data,
      sessions.all_speakers,
      sessions.feedback,
    );
    newSessionsObject.sessions = bookmarkSessions;
    return newSessionsObject;
  };

  const clearAllBookmarks = async () => {
    try {
      await AsyncStorage.setItem(event.id, JSON.stringify([]));
      console.log('cleared');
    } catch (e) {
      // clear error
      console.log('clear error');
    } finally {
      setUpdateSchedule(!updateSchedule);
    }
  };

  // a function that clears all asyncstorage data
  const clearAll = async () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to clear all bookmarks?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Clear All',
          onPress: () => clearAllBookmarks(),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const ClearAllButton = () => {
    return (
      <Pressable
        style={[
          styles.clear_all,
          {backgroundColor: event.colors[appearance].background},
        ]}
        onPress={clearAll}>
        <Text
          style={[
            styles.clear_all_text,
            {color: event.colors[appearance].text},
          ]}>
          Clear All
        </Text>
      </Pressable>
    );
  };

  const ConditionalRender = props => {
    return bookmarksList.length === 0 ? (
      <View
        style={[
          styles.no_sessions_container,
          {backgroundColor: event.colors[appearance].background},
        ]}>
        <Text
          style={[styles.noSessions, {color: event.colors[appearance].text}]}>
          No sessions added
        </Text>
        <Text style={[styles.addSome, {color: event.colors[appearance].text}]}>
          Go to the Sessions page and add some!
        </Text>
      </View>
    ) : (
      <ScheduleSectionList
        navigation={props.navigation}
        data={data}
        updateSchedule={updateSchedule}
        setUpdateSchedule={setUpdateSchedule}
      />
    );
  };

  const headerRight = () => {
    const [bookmarked, setBookmarked] = React.useState(false);

    useEffect(() => {
      const getBookmarks = async () => {
        return await loadBookmarks(event, sessions);
      };
      getBookmarks().then(bookmarksList => {
        // find if session is bookmarked
        const bookmarked = bookmarksList.find(
          bookmark => bookmark === selectedSession.id,
        );
        if (bookmarked) {
          setBookmarked(true);
        } else {
          setBookmarked(false);
        }
      });
    }, [updateSchedule]);

    return (
      <BookmarkButton
        session={selectedSession}
        bookmarked={bookmarked}
        setBookmarked={setBookmarked}
        updateSchedule={updateSchedule}
        setUpdateSchedule={setUpdateSchedule}
      />
    );
  };

  const value = {
    selectedSpeaker,
    selectedSession,
    setSelectedSession,
    setSelectedSpeaker,
  };

  const Stack = createNativeStackNavigator();

  return (
    <SpeakerContext.Provider value={value}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Schedule"
            component={ConditionalRender}
            options={{
              headerTitle: 'Schedule',
              headerRight: () => <ClearAllButton />,
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
          <Stack.Screen
            name="SessionInfo"
            component={SessionInfo}
            options={{
              headerTitle: 'Session Info',
              headerRight: () => headerRight(),
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
