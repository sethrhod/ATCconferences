import {
  StyleSheet,
  Text,
  View,
  SectionList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import SessionizeContext from '../SessionizeContext.js';
import Session from './Session.js';
import TimeScroll from './TimeScroll.js';
import constructSectionListData from './scripts/constructScheduleSectionListData.js';
import fetchSessions from './scripts/fetchSessions.js';
import {useTheme} from '@react-navigation/native';

export default function Schedule() {
  const {colors} = useTheme();

  const sectionListRef = React.useRef(null);

  const {sessions} = useContext(SessionizeContext);
  const {setSessions} = useContext(SessionizeContext);
  const {bookmarks} = useContext(SessionizeContext);
  const {uuid} = useContext(SessionizeContext);

  const [refreshing, setRefreshing] = React.useState(false);
  const [sections, setSections] = React.useState(constructSectionListData(sessions, bookmarks))

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchSessions(sessions.all_speakers, setSessions, uuid);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let newSections = constructSectionListData(sessions, bookmarks);
    setSections(newSections);
  }, [sessions]);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        ref={sectionListRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{height: '100%', flex: 1, margin: 10, marginRight: 0}}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 50}}
        renderItem={({item, index, section}) => (
          <Session
            session={item}
            starts={item.startsAt}
            ends={item.endsAt}
            // starts={getNewTime(item.startsAt)}
            // ends={getNewTime(item.endsAt)}
            itemIndex={index}
            sectionIndex={section.index}
            sectionListRef={sectionListRef}
            setSections={setSections}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
        renderSectionHeader={({section: {title, index}}) => (
          <View style={styles.timeblock} key={index}>
            <Text style={[styles.timeblock_text, {color: colors.text}]}>
              {title}
            </Text>
          </View>
        )}
      />
      <View style={styles.time_scroll_container}>
        <TimeScroll
          sectionListData={sections}
          sectionListRef={sectionListRef}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  timeblock_text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeblock: {
    margin: 10,
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
    justifyContent: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
});
