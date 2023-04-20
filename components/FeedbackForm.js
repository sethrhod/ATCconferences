import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomData from '../custom-data.json';
import { useTheme } from '@react-navigation/native';

export default function FeedbackForm(props) {

  const { colors } = useTheme();

  const [text, setText] = React.useState(props.feedbackText ? props.feedbackText : "");

  const submitFeedback = async (sessionID, text) => {
    const value = await AsyncStorage.getItem('@uuid')
    fetch(CustomData.flaskURL + value, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionid: sessionID,
        feedback: text
      })
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .finally(() => {
        Alert.alert("Feedback Submitted");
        props.setSelectedSession(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
  <View style={{
    flex: 3,
    width: "100%",
    alignItems: "center",
  }}>
    <Text style={{ fontSize: 30, marginTop: 30, color: colors.text }}>Feedback</Text>
    <TextInput
      style={{ width: '80%', borderWidth: 1, backgroundColor: 'white' }}
      onChangeText={(text) => setText(text)}
      multiline={true}
      value={text}
      placeholder="Feedback"
    />
    <Pressable onPress={() => submitFeedback(props.selectedSession.id, text)}>
      <Text style={{ color: colors.text }}>Submit</Text>
    </Pressable>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});