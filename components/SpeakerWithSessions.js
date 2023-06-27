import React from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import SpeakerContext from './context/SpeakerContext';
import SessionizeContext from './context/SessionizeContext';
import SpeakerInfo from './SpeakerInfo';
import Session from './Session';

export default function SpeakerWithSessions() {
  const {selectedSpeaker} = React.useContext(SpeakerContext);

  const {event, appearance, sessions} = React.useContext(SessionizeContext);

  const findCorrelatedSessions = sessions.sessions.filter(session => {
    return session.speakers.find(speaker => {
      return speaker.id === selectedSpeaker.id;
    });
  });

  return (
    <SafeAreaView style={styles.speaker_sessions}>
      <FlatList
        data={findCorrelatedSessions}
        renderItem={({item: session, index}) => (
          <Session
            session={session}
            key={index}
            starts={session.startsAt}
            ends={session.endsAt}
          />
        )}
        ListHeaderComponent={
          <View>
            <View
              style={[
                styles.speakerInfo,
                {backgroundColor: event.colors[appearance].card},
              ]}>
              <SpeakerInfo
                speaker={selectedSpeaker}
                event={event}
                appearance={appearance}
              />
              <Text
                style={[styles.title, {color: event.colors[appearance].text}]}>
                Bio
              </Text>
              <Text
                style={[styles.bio, {color: event.colors[appearance].text}]}>
                {selectedSpeaker.bio}
              </Text>
            </View>
            <Text
              style={[styles.title, {color: event.colors[appearance].text}]}>
              Sessions
            </Text>
          </View>
        }
        keyExtractor={item => item.id}
        style={styles.flat_list}
        contentContainerStyle={{paddingBottom: 30}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  speakerInfo: {
    flex: 1,
    padding: 10,
    paddingBottom: 30,
  },
  speaker_sessions: {
    flex: 1,
    width: '100%',
  },
  flat_list: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  bio: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
});
