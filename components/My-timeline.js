import React, { useContext } from "react";
import { SectionList, View, Button, RefreshControl, SafeAreaView } from "react-native";
import { StyleSheet, Text } from "react-native";
import SessionizeContext from "../SessionizeContext.js";
import getNewTime from "./scripts/getNewTime.js"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Session from "./Session.js";
import { useTheme } from "@react-navigation/native";
import Moment from "react-moment";

export default function MyTimeline() {

  const { colors } = useTheme();
  const { bookmarks } = useContext(SessionizeContext);
  const { setBookmarks } = useContext(SessionizeContext);
  const { sessions } = useContext(SessionizeContext);

  const sectionListRef = React.useRef(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // a function that costructs a list of session data thats compatible with the SectionList component
  const constructSectionListData = (bookmarks) => {
    // create an empty array to store the data
    let data = [];
    // loop through the sessions
    sessions.start_times.forEach((time) => {
      // create an empty object to store the data
      let obj = {};
      // set the title of the object to the start time of the session and add to the same hour sessions
      obj.title = <Moment element={Text} format="h:mm A">{time}</Moment>;
      // set the data of the object to the sessions that start at the same time
      obj.data = bookmarks.filter((bookmark) => bookmark.startsAt === time);

      if (obj.data.length > 0) {
        // change the bookmarked state of the session to true
        obj.data.forEach((session) => {
          session.bookmarked = true;
        });
        // push the object to the data array
        data.push(obj);
      }
    });
    // return the data array
    return data;
  };

  // a function that clears all asyncstorage data
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setBookmarks([]);
      console.log("cleared");
    } catch (e) {
      // clear error
      console.log("clear error");
    }
  };

  const conditionalRender =
    bookmarks.length === 0 ? (
      <View style={{ flex: 0.8, justifyContent: "center" }}>
        <Text style={{ color: colors.text, fontSize: 40, textAlign: "center" }}>
          No Sessions Added
        </Text>
      </View>
    ) : (
      <SafeAreaView style={styles.container}>
        <Button title="Clear My Timeline" onPress={() => clearAll()} />

        <SectionList
          sections={constructSectionListData(bookmarks)}
          ref={sectionListRef}
          style={{ height: "100%", flex: 1, margin: 10 }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 50 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.list_item}>
              <Session
                session={item}
                starts={item.startsAt}
                ends={item.endsAt}
              />
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={[styles.timeblock, {backgroundColor: colors.tertiary}]}>
              <Text style={[styles.timeblock_text, {color: colors.text}]}>{title}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    );

  return conditionalRender;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeblock_text: {
    padding: 10,
    fontSize: 20,
  },
  timeblock: {
    alignItems: "center",
    maxHeight: 60,
    margin: 10,
    justifyContent: "center",
    borderRadius: 10,
  }
});
