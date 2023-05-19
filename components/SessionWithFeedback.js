import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import getNewTime from "./scripts/getNewTime.js";

export default function SessionWithFeedback(props) {

  const {event} = useContext(SessionizeContext);

  return (
    <View style={[styles.session, { backgroundColor: event.colors.foreground }]}>
      <View style={styles.session_left}>
        <Text style={styles.session_time}>
          {getNewTime(props.session.startsAt)}-{" "}
          {getNewTime(props.session.endsAt)}
        </Text>
        <Text style={styles.session_title}>{props.session.title}</Text>
        <View style={[styles.session_right]}>
          <View style={styles.session_speaker_container}>
            {props.session.speakers.map((speaker, index) => {
              return (
                <View key={index} style={styles.session_speaker_container}>
                  <Image
                    key={index}
                    style={styles.logo}
                    source={{ uri: speaker.profilePicture }}
                  />
                  <Text style={styles.session_speaker}>
                    {speaker.fullName}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.session_room}>{props.session.room}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  session: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  session_left: {
    flex: 1,
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  session_right: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  session_time: {
    fontSize: 10,
    fontWeight: "bold",
  },
  session_title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  session_speaker: {
    fontSize: 10,
  },
  session_speaker_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  session_room: {
    fontSize: 10,
  },
  logo: {
    width: 25,
    height: 25,
    borderRadius: 35,
    margin: 5,
  }
});