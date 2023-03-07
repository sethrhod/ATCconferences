import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useContext } from "react";
import SessionizeContext from "../SessionizeContext.js";
import Session from "./Session.js";
import constructSectionListData from "./scripts/constructScheduleSectionListData.js";
import getNewTime from "./scripts/getNewTime.js";

export default function Schedule() {
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
        renderItem={({ item }) => (
          <Session
            session={item}
            starts={getNewTime(item.startsAt)}
            ends={getNewTime(item.endsAt)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.timeblock}>
            <Text style={styles.timeblock_text}>{title}</Text>
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

function TimeScroll(props) {
  return props.sectionListData.map((time, index) => (
    <View style={styles.time_scroll}>
      <TouchableOpacity
        onPress={() => {
          props.sectionListRef.current.scrollToLocation({
            animated: true,
            itemIndex: 0,
            sectionIndex: index,
            viewOffset: 0,
            viewPosition: 0,
          });
        }}
      >
        <Text style={styles.time_scroll_text}>{time.title}</Text>
      </TouchableOpacity>
    </View>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  timeblock_text: {
    padding: 10,
    color: "white",
    fontSize: 20,
  },
  timeblock: {
    backgroundColor: "#4A6FA5",
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
    backgroundColor: "black",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "rgba(255, 255, 255,0.2)",
  },
  time_scroll_text: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
});
