import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useContext, memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SessionizeContext from './context/SessionizeContext';
import SpeakerContext from './context/SpeakerContext';
import SpeakerInfo from './SpeakerInfo';
import SpeakerWithSessions from './SpeakerWithSessions';
import SessionInfo from './SessionInfo';
import BookmarkButton from './BookmarkButton';
import loadBookmarks from './scripts/loadBookmarks';

export default function Speakers() {
  const {event, speakers, appearance, sessions} =
    useContext(SessionizeContext);

  const [selectedSession, setSelectedSession] = React.useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = React.useState(null);
  const [bookmarksChanged, setBookmarksChanged] = React.useState(false);

  const SpeakersList = ({navigation}) => {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: event.colors[appearance].background},
        ]}>
        <SafeAreaView style={styles.item_container}>
          <FlatList
            data={speakers}
            renderItem={({item}) => (
              <SpeakerInfo
                speaker={item}
                navigation={navigation}
                event={event}
                appearance={appearance}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{alignItems: 'stretch'}}
            style={{width: '100%'}}
          />
        </SafeAreaView>
      </View>
    );
  };

  const headerRight = () => {
    const [bookmarked, setBookmarked] = React.useState(false);

    React.useEffect(() => {
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
    }, [selectedSession]);

    return (
      <BookmarkButton
        session={selectedSession}
        bookmarked={bookmarked}
        setBookmarked={setBookmarked}
        bookmarksChanged={bookmarksChanged}
        setBookmarksChanged={setBookmarksChanged}
      />
    );
  };

  const value = {
    selectedSpeaker,
    bookmarksChanged,
    selectedSession,
    setSelectedSession,
    setBookmarksChanged,
    setSelectedSpeaker,
  };

  const Stack = createNativeStackNavigator();

  return (
    <SpeakerContext.Provider value={value}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="SpeakersList"
            component={SpeakersList}
            options={{
              headerTitle: 'Speakers',
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
          <Stack.Screen
            name="SessionInfo"
            component={SessionInfo}
            options={{
              headerRight: () => headerRight(),
              headerTitle: 'Session Info',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_container: {
    flex: 1,
    width: '100%',
  },
});
