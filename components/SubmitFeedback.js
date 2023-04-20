import React, { useContext } from "react";
import { Pressable, SafeAreaView, Text, View, FlatList, TextInput, StyleSheet, Alert } from "react-native";
import SessionizeContext from "../SessionizeContext.js";
import Session from "./Session.js";
import SessionWithFeedback from "./SessionWithFeedback.js";
import FeedbackForm from "./FeedbackForm.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "@react-navigation/native";

export default function SubmitFeedbackModal() {

  const CustomData = require('../custom-data.json');

  const [selectedSession, setSelectedSession] = React.useState(null);

  const { sessions } = useContext(SessionizeContext);

  const { colors } = useTheme();

  /* conditional render that renders the feedback submission view for the selected session */
  return selectedSession ? (
      <SafeAreaView style={[styles.container, { margin: 30 }]}>
        <SessionWithFeedback session={selectedSession} />
        <FeedbackForm selectedSession={selectedSession} setSelectedSession={setSelectedSession} />
      </SafeAreaView>
    ) : (
      // if no session is selected, render the list of sessions
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <FlatList
          data={sessions.sessions}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
          ListHeaderComponent={<Text style={{ textAlign: 'center', fontSize: 30, color: colors.text }}>Sessions</Text>}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelectedSession(item)}>
              <Session session={item} />
            </Pressable>
          )}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  feedback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  feedback_text: {
    fontSize: 10,
  },

});