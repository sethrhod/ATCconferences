import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeedbackForm from './FeedbackForm';
import SessionizeContext from './context/SessionizeContext';

export default function Feedback(props) {
  const {uUID, event, appearance, customData} = useContext(SessionizeContext);

  const DeleteSwipeableRef = React.useRef(null);

  useEffect(() => {
    if (DeleteSwipeableRef.current) {
      DeleteSwipeableRef.current.close();
    }
  }, [props.refreshing]);

  const deleteFeedback = async (sessionID, feedbackText) => {
    fetch(customData.DevelopersAssociationofGeorgiaAPI + uUID, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionid: sessionID,
        feedback: feedbackText,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // remove feedback from session object to update list without refreshing
  const handlePress = () => {
    deleteFeedback(
      props.session.feedback.sessionid,
      props.session.feedback.feedback,
    );
    props.session.feedback = undefined;
    props.setEditView(!props.editView);
  };

  const Delete = () => {
    return (
      <TouchableOpacity
        style={[
          styles.feedback_delete,
          {backgroundColor: event.colors[appearance].accent},
        ]}
        onPress={() => handlePress()}>
        <Text
          style={[
            styles.feedback_text,
            {color: event.colors[appearance].text},
          ]}>
          Delete
        </Text>
        <View style={styles.delete_icon}>
          <Icon
            name="trash"
            size={20}
            color={event.colors[appearance].primary}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // only render if feedback is not undefined
  if (props.session.feedback && props.editView) {
    return (
      <FeedbackForm
        session={props.session}
        feedbackText={props.session.feedback.feedback}
        SwipeableRef={props.SwipeableRef}
        feedbackEntryVisible={props.feedbackEntryVisible}
        setFeedbackEntryVisible={props.setFeedbackEntryVisible}
        sectionListRef={props.sectionListRef}
        itemIndex={props.itemIndex}
        sectionIndex={props.sectionIndex}
        onRefresh={props.onRefresh}
        setEditView={props.setEditView}
        request="PUT"
      />
    );
  } else if (props.feedbackEntryVisible) {
    return (
      <FeedbackForm
        session={props.session}
        feedbackEntryVisible={props.feedbackEntryVisible}
        setFeedbackEntryVisible={props.setFeedbackEntryVisible}
        SwipeableRef={props.SwipeableRef}
        sectionListRef={props.sectionListRef}
        itemIndex={props.itemIndex}
        sectionIndex={props.sectionIndex}
        onRefresh={props.onRefresh}
        request="POST"
      />
    );
  } else if (props.session.feedback && !props.editView) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <Swipeable
          ref={DeleteSwipeableRef}
          renderLeftActions={() => Delete()}
          renderRightActions={() => Delete()}
          overshootLeft={false}
          overshootRight={false}
          rightThreshold={100}
          leftThreshold={100}
          friction={2}
          overshootFriction={8}>
          <View
            style={[
              styles.feedback,
              {backgroundColor: event.colors[appearance].primary},
            ]}>
            <TouchableOpacity onPress={() => props.setEditView(!props.editView)}>
              <Text style={[styles.feedback_text, {color: event.colors[appearance].text}]}>
                {props.session.feedback.feedback}
              </Text>
            </TouchableOpacity>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeblock_text: {
    padding: 10,
    fontSize: 10,
  },
  timeblock: {
    alignItems: 'flex-start',
    maxHeight: 40,
    justifyContent: 'center',
  },
  session: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  feedback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    marginTop: 0,
    marginBottom: 15,
    borderRadius: 10,
  },
  feedback_delete: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 0,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
  delete_icon: {
    marginLeft: 10,
  },
  feedback_text: {
    textAlign: 'center',
    fontSize: 15,
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header_left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
  },
  header_right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: 'black',
    borderLeftWidth: 1,
  },
  header_text: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: -30,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dropdown_button: {
    backgroundColor: 'white',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  dropdown_text: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_icon: {
    flex: 0.1,
    textAlign: 'center',
  },
});
