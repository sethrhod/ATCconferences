import React from 'react';
import {Text, View, Image, Pressable, FlatList, StyleSheet} from 'react-native';
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
    <View
      style={styles.speakerInfo}>
      <SpeakerInfo
        speaker={selectedSpeaker}
        event={event}
        appearance={appearance}
    />
      <FlatList
        data={findCorrelatedSessions}
        renderItem={({item: session, index}) =>
        <Session
          session={session}
          key={index}
          starts={session.startsAt}
          ends={session.endsAt}
        />
        }
        keyExtractor={item => item.id}
        style={styles.flat_list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  speakerInfo: {
    flex: 1,
    marginTop: 20,
  },
  flat_list: {
    flex: 1,
    marginTop: 20,
    width: '100%'
  }
});