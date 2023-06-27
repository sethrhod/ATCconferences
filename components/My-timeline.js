import React, {useContext} from 'react';
import {
  SectionList,
  View,
  Button,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import SessionizeContext from './context/SessionizeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Session from './Session.js';
import format_time from './scripts/formatTime.js';

export default function MyTimeline() {
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

  const sectionListRef = React.useRef(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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

  const conditionalRender =
    bookmarks.length === 0 ? (
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
          Go to the Schedule page and add some!
        </Text>
      </View>
    ) : (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: event.colors[appearance].background},
        ]}>
        <Button
          color={event.colors[appearance].primary}
          title="Clear My Timeline"
          onPress={() => clearAll()}
        />

        <SectionList
          sections={constructSectionListData(bookmarks)}
          ref={sectionListRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{height: '100%', flex: 1, margin: 10, marginRight: 0}}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 50}}
          renderItem={({item, index, section}) => (
            <Session
              session={item}
              key={index}
              starts={item.startsAt}
              ends={item.endsAt}
              // starts={getNewTime(item.startsAt)}
              // ends={getNewTime(item.endsAt)}
              itemIndex={index}
              sectionIndex={section.index}
              sectionListRef={sectionListRef}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
          renderSectionHeader={({section: {title, index}}) => (
            <View style={styles.timeblock} key={index}>
              <Text
                style={[
                  styles.timeblock_text,
                  {color: event.colors[appearance].text},
                ]}>
                {title}
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    );

  return conditionalRender;
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
});
