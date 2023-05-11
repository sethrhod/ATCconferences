import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomData from '../custom-data.json';
import {useTheme} from '@react-navigation/native';

export default function FeedbackForm(props) {
  const {colors} = useTheme();

  const [text, setText] = React.useState(
    props.feedbackText ? props.feedbackText : '',
  );

  const submitFeedback = async (sessionID, text) => {
    const value = await AsyncStorage.getItem('@uuid');
    fetch(CustomData.flaskURL + value, {
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
    fetch(CustomData.flaskURL + value, {
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

  const [ignoreBlur, setIgnoreBlur] = React.useState(false);

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
      style={[styles.feedback_input, {backgroundColor: colors.tertiary}]}>
      <TextInput
        onChangeText={text => setText(text)}
        multiline={true}
        onBlur={() => handleBlur()}
        value={text}
        autoFocus={true}
        placeholder="Feedback"
        placeholderTextColor={colors.secondary}
        cursorColor={colors.text}
        ref={inputRef}
        style={{
          color: colors.text,
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
    marginBottom: 20,
    marginTop: 0,
  }
});
