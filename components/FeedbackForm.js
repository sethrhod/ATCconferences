import React, {useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionizeContext from './context/SessionizeContext';

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
    fetch(customData.DevelopersAssociationofGeorgiaAPI + value, {
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
      } else if (props.request === 'PUT') {
        editFeedback(props.session.id, text);
      }
    }
    props.SwipeableRef ? props.SwipeableRef.current.close() : null;
    props.setFeedbackEntryVisible ? props.setFeedbackEntryVisible(false) : null;
    props.setEditView ? props.setEditView(false) : null;
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.feedback,
          {backgroundColor: event.colors[appearance].primary},
        ]}>
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
          style={[
            styles.feedback_text,
            {
              color: event.colors[appearance].text,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  feedback_text: {
    textAlign: 'center',
    fontSize: 15,
  },
});
