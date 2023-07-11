import React, { useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from './context/SessionizeContext';
import FeedbackForm from './FeedbackForm';
import Feedback from './Feedback';
import Times from './Times';
import SpeakerInfo from './SpeakerInfo';

export default function SessionInfo(props) {
  const { event, appearance, selectedSession } = useContext(SessionizeContext);

  const [feedbackEntryVisible, setFeedbackEntryVisible] = React.useState(false);

  const SessionInfo = () => {
    return (
      <View style={styles.session_info}>
        {selectedSession.speakers.map((speaker, index) => (
          <SpeakerInfo key={index} speaker={speaker} navigation={props.navigation} event={event} appearance={appearance} />
        ))}
        <Text style={[styles.title, { color: event.colors[appearance].text }]}>
          {selectedSession.title}
        </Text>
        <View
          style={styles.session_info_boxes}>
          <Text
            style={[
              styles.bottom_text,
              {
                color: event.colors[appearance].text,
                backgroundColor: event.colors[appearance].accent,
              },
            ]}>
            {selectedSession.room ? selectedSession.room : 'TBD'}
          </Text>
          <View
            style={[
              styles.bottom_text,
              {
                color: event.colors[appearance].text,
                backgroundColor: event.colors[appearance].accent,
              },
            ]}>
            <Times starts={selectedSession.startsAt} ends={selectedSession.endsAt} />
          </View>
        </View>
        <View
          style={[
            styles.description_box,
            {
              borderBottomColor: 'white',
            },
          ]}>
          <Text style={[styles.description, { color: event.colors[appearance].text }]}>
            {selectedSession.description}
          </Text>
        </View>
      </View>
    );
  };

  const handlePress = () => {
    setFeedbackEntryVisible(!feedbackEntryVisible);
  };

  const LeaveFeedbackButton = () => {
    return (
      <Pressable style={styles.feedback_button} onPress={() => handlePress()}>
        <Text style={[styles.feedback_button_text, { color: event.colors[appearance].text }]}>
          Leave Feedback
        </Text>
        <Icon name="plus-square" size={30} color={event.colors[appearance].text} />
      </Pressable>
    );
  };

  const scrollViewRef = useRef(null);
  const [marginBottom, setMarginBottom] = React.useState(100);

  useEffect(() => {
    if (feedbackEntryVisible) {
      const windowHeight = Dimensions.get('window').height;
      setMarginBottom(windowHeight * 0.5);
    } else {
      setMarginBottom(100);
    }
  }, [feedbackEntryVisible]);

  useEffect(() => {
    const scrollToEnd = async () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd();
      }
    };
    if (feedbackEntryVisible) {
      scrollToEnd();
    } 
  }, [marginBottom]);

  return (
    <ScrollView style={[styles.scroll_view, { backgroundColor: event.colors[appearance].background }]} ref={scrollViewRef}>
      <SessionInfo />
      <View style={[styles.feedback_entry, { marginBottom: marginBottom }]}>
        {/* conditional render for leave feedback button based on if feedback already exists or not but checks that selectedSession exists first */}
        {selectedSession.feedback === undefined ? (
          <LeaveFeedbackButton />
        ) : null}
        {feedbackEntryVisible ? (
          <View style={styles.feedback}>
            <FeedbackForm
              session={selectedSession}
              feedbackEntryVisible={feedbackEntryVisible}
              setFeedbackEntryVisible={setFeedbackEntryVisible}
              SwipeableRef={props.SwipeableRef}
              sectionListRef={props.sectionListRef}
              itemIndex={props.itemIndex}
              sectionIndex={props.sectionIndex}
              setSections={props.setSections}
              onRefresh={props.onRefresh}
              request="POST"
            />
          </View>
        ) : null}
        <View style={styles.feedback}>
          <Feedback
            session={selectedSession}
            SwipeableRef={props.SwipeableRef}
            sectionListRef={props.sectionListRef}
            itemIndex={props.itemIndex}
            sectionIndex={props.sectionIndex}
            setSections={props.setSections}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
  },
  session_info: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 75,
    height: 75,
    borderRadius: 50,
    margin: 10,
  },
  fullName: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    margin: 10,
  },
  room: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
  },
  times_box: {
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 10,
  },
  description: {
    fontSize: 17,
    letterSpacing: 0.5,
    margin: 15,
  },
  description_box: {
    flex: 0.7,
  },
  scroll_view: {
    flex: 0.7,
  },
  feedback_entry: {
    flex: 0.3,
    marginTop: 10,
  },
  feedback_button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  feedback_button_text: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  feedback: {
    flex: 1,
  },
  bottom_text: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
    margin: 10,
    marginBottom: 0,
    marginTop: 0,
  },
  session_info_boxes: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
