import React, {useContext, useEffect, useRef} from 'react';
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
import SessionizeContext from '../SessionizeContext';
import FeedbackForm from './FeedbackForm';
import Feedback from './Feedback';
import Times from './Times';

export default function SessionModal(props) {
  const {event} = useContext(SessionizeContext);
  const {appearance} = useContext(SessionizeContext);

  const [feedbackEntryVisible, setFeedbackEntryVisible] = React.useState(false);

  const CloseButton = () => {
    const handlePress = () => {
      props.setModalVisible(false);
      setFeedbackEntryVisible(false);
    };

    return (
      <Pressable
        style={{
          margin: 10,
        }}
        onPress={() => handlePress()}>
        <Icon name="times" color={event.colors[appearance].primary} size={40} />
      </Pressable>
    );
  };

  const SessionInfo = () => {
    return (
      <View>
        {props.session.speakers.map((speaker, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={styles.profilePicture}
              source={{uri: speaker.profilePicture}}
            />
            <Text style={[styles.fullName, {color: "white"}]}>
              {speaker.fullName}
            </Text>
          </View>
        ))}
          <Text style={[styles.title, {color: "white"}]}>
            {props.session.title}
          </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Text
            style={[
              styles.room,
              {
                color: event.colors[appearance].text,
                backgroundColor: event.colors[appearance].accent,
              },
            ]}>
            {props.session.room}
          </Text>
          <View style={[styles.times_box, {backgroundColor: event.colors[appearance].accent}]}>
            <Times starts={props.session.startsAt} ends={props.session.endsAt} />
          </View>
        </View>
        <View
          style={[
            styles.description_box,
            {
              borderBottomColor: "white",
            },
          ]}>
          <Text style={[styles.description, {color: "white"}]}>
            {props.session.description}
          </Text>
        </View>
      </View>
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
      if (scrollViewRef.current)
        {scrollViewRef.current.scrollToEnd()}
    };
    scrollToEnd();
  }, [marginBottom]);

  const handlePress = () => {
    setFeedbackEntryVisible(!feedbackEntryVisible);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}>
      <View style={[styles.container, {backgroundColor: event.colors[appearance].secondary}]}>
        <CloseButton />
        <ScrollView 
          style={styles.scroll_view}
          ref={scrollViewRef}>
          <SessionInfo />
          <View style={[styles.feedback_entry, {marginBottom: marginBottom}]}>
          <Pressable
              style={styles.feedback_button}
              onPress={() => handlePress()}>
              <Text style={[styles.feedback_button_text, {color: "white"}]}>
                Leave Feedback
              </Text>
              <Icon name="plus-square" size={30} color={"white"} />
          </Pressable>
          {feedbackEntryVisible ? (
            <View style={styles.feedback}>
              <FeedbackForm
                session={props.session}
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
              session={props.session}
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
  },
  profilePicture: {
    width: 75,
    height: 75,
    borderRadius: 50,
    margin: 10,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  title: {
    fontSize: 20,
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
    fontSize: 15,
    margin: 20,
  },
  description_box: {
    marginBottom: 20,
  },
  scroll_view: {
    flex: 0.70,
  },
  feedback_entry: {
    flex: 0.30,
    padding: 10,
  },
  feedback_button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedback_button_text: {
    marginRight: 10
  },
  feedback: {
    flex: 1
  }
});
