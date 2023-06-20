import React, {useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionizeContext from '../SessionizeContext';

export default function FeedbackForm(props) {

  const {event} = useContext(SessionizeContext);
  const {customData} = useContext(SessionizeContext);
  const {appearance} = useContext(SessionizeContext);

  const [text, setText] = React.useState(
    props.feedbackText ? props.feedbackText : '',
  );

  const submitFeedback = async (sessionID, text) => {
    const value = await AsyncStorage.getItem('@uuid');
    fetch(customData.DevelopersAssociationofGeorgiaAPI + value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionid: sessionID,
        feedback: text,
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

  const editFeedback = async (sessionID, text) => {
    const value = await AsyncStorage.getItem('@uuid');
    fetch(customData.flaskURL + value, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionid: sessionID,
        feedback: text,
        original_feedback: props.feedbackText,
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

  const inputRef = React.useRef();

  useEffect(() => {
    props.sectionListRef.current.scrollToLocation({
      itemIndex: props.itemIndex,
      sectionIndex: props.sectionIndex,
      viewPosition: 0,
      viewOffset: -50,
    });
  }, []);

  const handleBlur = () => {
    if (text !== '') {
      // add feedback to session object to update list without refreshing
      props.session.feedback = {
        feedback: text,
        sessionid: props.session.id,
        userid: props.uuid,
      };
      if (props.request === 'POST') {
        submitFeedback(props.session.id, text);
        props.SwipeableRef.current.close();
      } else if (props.request === 'PUT') {
        editFeedback(props.session.id, text);
      }
    }
    props.setFeedbackEntryVisible ? props.setFeedbackEntryVisible(false) : null;
    props.setEditView ? props.setEditView(false) : null;
  };

  return (
    <View
      style={[styles.feedback_input, {backgroundColor: event.colors[appearance].primary}]}>
      <TextInput
        onChangeText={text => setText(text)}
        multiline={true}
        onBlur={() => handleBlur()}
        value={text}
        autoFocus={true}
        placeholder="Feedback"
        placeholderTextColor={event.colors[appearance].secondary}
        cursorColor={event.colors[appearance].secondary}
        ref={inputRef}
        style={{
          color: event.colors[appearance].text,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedback_input: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
});
