import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, SectionList, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import MemoizedSession from './Session.js';
import SessionizeContext from './context/SessionizeContext';


const SessionSectionList = (props) => {
  const sectionListRef = useRef(null);
  const {
    event,
    appearance,
  } = useContext(SessionizeContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: event.colors[appearance].background },
      ]}>
      <SectionList
        sections={props.data}
        ref={sectionListRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.section_list}
        keyExtractor={(item, index) => item + index}
        contentContainerStyle={{ paddingBottom: 30, padding: 5 }}
        renderItem={({ item, index, section }) => (
          <MemoizedSession
            session={item}
            starts={item.startsAt}
            ends={item.endsAt}
            // starts={getNewTime(item.startsAt)}
            // ends={getNewTime(item.endsAt)}
            itemIndex={index}
            sectionIndex={section.index}
            sectionListRef={sectionListRef}
            refreshing={refreshing}
            onRefresh={onRefresh}
            navigation={props.navigation}
          />
        )}
        renderSectionHeader={({ section: { title, index } }) => (
          <View
            style={[
              styles.timeblock,
              { backgroundColor: event.colors[appearance].background },
            ]}
            key={index}>
            <Text
              style={[
                styles.timeblock_text,
                { color: event.colors[appearance].text },
              ]}>
              {title}
            </Text>
          </View>
        )}
      />
      {/* <View style={styles.time_scroll_container}>
          <TimeScroll
            sectionListData={sections}
            sectionListRef={sectionListRef}
            scrollToTime={scrollToTime}
          />
        </View> */}
    </SafeAreaView>
  )
}

export default SessionSectionList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeblock_text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeblock: {
    margin: 10,
  },
  noSessions: {
    textAlign: 'center',
    fontSize: 20,
  },
  addSome: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
  },
  no_sessions_container: {
    flex: 1,
    justifyContent: 'center',
  },
  section_list: {
    height: '100%',
    flex: 1,
  },
  timeblock_text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeblock: {
    flex: 1,
    padding: 15,
  },
  session: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  times: {
    textAlign: 'center',
    fontSize: 12,
  },
  time_scroll_container: {
    borderRadius: 30,
    maxWidth: 30,
    margin: 10,
    marginLeft: 0,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 5,
  },
  noSessionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSessionsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section_list: {
    height: '100%',
    flex: 1,
  },
  clear_all: {
    padding: 10,
  },
  clear_all_text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
