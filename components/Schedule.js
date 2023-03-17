import {
  StyleSheet,
  Text,
  View,
  SectionList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import SessionizeContext from "../SessionizeContext.js";
import Session from "./Session.js";
import TimeScroll from "./TimeScroll.js";
import constructSectionListData from "./scripts/constructScheduleSectionListData.js";
import getNewTime from "./scripts/getNewTime.js";
import { useTheme } from "@react-navigation/native";

export default function Schedule() {

  const { colors } = useTheme();

  const sectionListRef = React.useRef(null);

  const { sessions } = useContext(SessionizeContext);
  const { bookmarks } = useContext(SessionizeContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={constructSectionListData(sessions, bookmarks)}
        ref={sectionListRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ height: "100%", flex: 1, margin: 10, marginRight: 0 }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item, index }) => (
          <Session
            session={item}
            starts={item.startsAt}
            ends={item.endsAt}
            // starts={getNewTime(item.startsAt)}
            // ends={getNewTime(item.endsAt)}
            key={index}
          />
        )}
        renderSectionHeader={({ section: { title }, index }) => (
          <View style={[styles.timeblock, {backgroundColor: colors.tertiary}]} key={index}>
            <Text style={[styles.timeblock_text, {color: colors.text}]}>{title}</Text>
          </View>
        )}
      />
      <View style={styles.time_scroll_container}>
        <TimeScroll
          sectionListData={constructSectionListData(sessions, bookmarks)}
          sectionListRef={sectionListRef}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
  },
  session: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    margin: 10,
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
    elevation: 5
  },
});
