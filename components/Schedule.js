import {
  StyleSheet,
  Text,
  View,
  SectionList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Moment from 'react-moment';
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
  const {filterOptions} = useContext(SessionizeContext);
  const {setFilterOptions} = useContext(SessionizeContext);

  const [refreshing, setRefreshing] = React.useState(false);
  const [sections, setSections] = React.useState(
    constructSectionListData(sessions, bookmarks),
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchSessions(sessions.all_speakers, setSessions, uuid);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    onRefresh();
  }, [filterOptions]);

  const applyFilters = newSections => {
    let rooms = [];
    let times = [];
    filterOptions.forEach(option => {
      if (option.name === 'Rooms' || option.name === 'Times') {
        option.options.forEach(subOption => {
          if (subOption.value) {
            if (option.name === 'Rooms') {
              rooms.push(subOption.name);
            } else if (option.name === 'Times') {
              times.push(subOption.name.props.children);
            }
          }
        });
      }
    });
    if (rooms.length === 0 && times.length === 0) {
      return newSections;
    }
    let filteredSections = [];
    newSections.forEach(section => {
      let filteredData = [];
      section.data.forEach(item => {
        // if rooms and times are not empty, filter by both 
        if (rooms.length > 0 && times.length > 0) {
          if (rooms.includes(item.room) && times.includes(item.startsAt)) {
            filteredData.push(item);
          }
          // if rooms is not empty, filter by rooms
        } else if (rooms.length > 0) {
          if (rooms.includes(item.room)) {
            filteredData.push(item);
          }
          // if times is not empty, filter by times
        } else if (times.length > 0) {
          if (times.includes(item.startsAt)) {
            filteredData.push(item);
          }
        }
      });
      if (filteredData.length > 0) {
        filteredSections.push({title: section.title, data: filteredData});
      }
    });
    return filteredSections;
  };

  useEffect(() => {
    let rooms = [];
    let times = [];
    // loops through all sessions and adds the rooms to the rooms array
    sessions.sessions.map(session => {
      if (!rooms.includes(session.room)) {
        rooms.push(session.room);
      }
    });
    // loops through all sessions and adds the times to the times array
    sessions.sessions.map(session => {
      if (!times.includes(session.startsAt)) {
        times.push(session.startsAt);
      }
    });
    let roomsObjects = [];
    let timesObjects = [];
    // loops through all rooms and creates an object for each room
    rooms.map(room => {
      roomsObjects.push({name: room, value: false});
    });
    // loops through all times and creates an object for each time
    times.map(time => {
      let formattedTime = (
        <Moment element={Text} format="h:mm A">
          {time}
        </Moment>
      );
      timesObjects.push({name: formattedTime, value: false});
    });
    let newFilterOptions = filterOptions;
    // sets the options for the times filter
    newFilterOptions[2].options = timesObjects;
    // sets the options for the rooms filter
    newFilterOptions[1].options = roomsObjects;
    setFilterOptions(newFilterOptions);
  }, []);

  useEffect(() => {
    let newSections = constructSectionListData(sessions, bookmarks);
    let filteredSections = applyFilters(newSections);
    setSections(filteredSections);
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
