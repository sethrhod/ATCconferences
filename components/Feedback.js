import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  RefreshControl,
  Image,
} from "react-native";
import constructSectionListData from "./scripts/constructFeedbackSectionListData";
import SessionizeContext from "../SessionizeContext.js";
import { useTheme } from "@react-navigation/native";
import getNewTime from "./scripts/getNewTime";

export default function Feedback() {
  const { colors } = useTheme();

  const sectionListRef = React.useRef(null);

  const { sessions } = useContext(SessionizeContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [feedback, setFeedback] = React.useState([
    // {
    //   sessionId: "443291",
    //   rating: 5,
    //   comment: "This was a great session!",
    // },
    // {
    //   sessionId: "443291",
    //   rating: 5,
    //   comment: "This was a great session!",
    // },
    // {
    //   sessionId: "443291",
    //   rating: 5,
    //   comment: "This was a great session!",
    // },
    // {
    //   sessionId: "412749",
    //   rating: 4,
    //   comment: "This was a great session!",
    // },
    // {
    //   sessionId: "439171",
    //   rating: 3,
    //   comment: "This was a great session!",
    // },
    // {
    //   sessionId: "439171",
    //   rating: 3,
    //   comment: "This was a great session!",
    // },
    // {
    //   sessionId: "437437",
    //   rating: 2,
    //   comment: "This was a great session!",
    // },
    // {
    //   sessionId: "437437",
    //   rating: 2,
    //   comment: "This was a great session!",
    // },
  ]);

  // useEffect(() => {
  //   fetch(flaskURL + uuid ), {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: uuid
  //     })
  //   }
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setFeedback(json);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const Session = (props) => {
    return (
      <View style={[styles.session, { backgroundColor: colors.primary }]}>
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

  const FeedbackItem = (props) => {
    return (
      <View style={[styles.feedback, { backgroundColor: colors.secondary }]}>
        <Text style={styles.feedback_text}>
          Rating: {props.session.feedback.rating}
        </Text>
        <Text style={styles.feedback_text}>
          {props.session.feedback.comment}
        </Text>
      </View>
    );
  };

  if (feedback.length === 0) {
    return (
      <View style={{ flex: 0.8, justifyContent: "center" }}>
        <Text style={[styles.noFeedback, {color : colors.text}]}>
          No Feedback submitted yet!
        </Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={constructSectionListData(sessions, feedback)}
          ref={sectionListRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Session session={item} />
              {feedback.map((feedback, index) => {
                if (feedback.sessionId === item.id) {
                  return <FeedbackItem key={index} session={item} />;
                }
              })}
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View
              style={[styles.timeblock, { backgroundColor: colors.tertiary }]}
            >
              <Text style={[styles.timeblock_text, { color: colors.text }]}>
                {title}
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  timeblock_text: {
    padding: 10,
    fontSize: 10,
  },
  timeblock: {
    alignItems: "flex-start",
    maxHeight: 40,
    justifyContent: "center",
  },
  session: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  times: {
    textAlign: "center",
    fontSize: 12,
  },
  time_scroll: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  time_scroll_container: {
    borderRadius: 30,
    maxWidth: 30,
    margin: 10,
    marginLeft: 0,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  time_scroll_text: {
    fontSize: 10,
    textAlign: "center",
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
    width: 30,
    height: 30,
    borderRadius: 30,
    margin: 5,
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
  noFeedback: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});
