import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomData from '../custom-data.json';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
      .finally(() => {
        Alert.alert('Feedback Submitted');
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
      .finally(() => {
        Alert.alert('Feedback Edited');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 30, color: colors.text}}>Feedback</Text>
      <TextInput
        style={{width: '80%', borderWidth: 1, backgroundColor: 'white'}}
        onChangeText={text => setText(text)}
        multiline={true}
        value={text}
        placeholder="Feedback"
      />
      <Pressable
        onPress={
          props.request === 'POST'
            ? () => submitFeedback(props.selectedSession.id, text)
            : () => editFeedback(props.selectedSession.id, text)
        }>
        <Text style={{color: colors.text}}>Submit</Text>
      </Pressable>
      <Pressable
        style={{
          flex: 0.1,
          borderRadius: 10,
          backgroundColor: colors.secondary,
          flexDirection: 'row',
        }}
        onPress={() => props.setModalVisible(!props.modalVisible)}>
        <Text
          style={{
            flex: 1,
            color: colors.tertiary,
            fontWeight: '600',
            fontSize: 15,
          }}>
          Close
        </Text>
        <Icon name="times" color={colors.tertiary} size={40} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
