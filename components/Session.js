import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useEffect, useContext, memo} from 'react';
import SessionizeContext from '../SessionizeContext';
import Feedback from './Feedback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SessionModal from './SessionInfoModal';
import FeedbackForm from './FeedbackForm';
import LeftSwipeActionsMemo from './LeftSwipeActions';
import Times from './Times';

export default function Session(props) {
  const {event} = useContext(SessionizeContext);
  const {appearance} = useContext(SessionizeContext);

  // the state for the list of bookmarks
  const {bookmarks} = useContext(SessionizeContext);
  const {setBookmarks} = useContext(SessionizeContext);

  const [imageMounted, setImageMounted] = React.useState(false);

  const speakers = props.session.speakers.map((speaker, index) => (
    <View style={styles.speaker_box} key={index}>
      <Image
        key={index}
        style={styles.logo}
        source={{uri: speaker.profilePicture}}
        onLayout={() => setImageMounted(true)}
      />
      <Text style={[styles.name, {color: event.colors[appearance].text}]}>
        {speaker.fullName}
      </Text>
    </View>
  ));

  const SwipeableRef = React.useRef(null);

  const addBookmark = () => {
    // either remove or add as bookmark depending on previous state
    if (props.session.bookmarked == true) {
      // remove bookmark
      removeFromBookmarks(props.session);
    } else if (props.session.bookmarked == false) {
      // add new bookmark
      addToBookmarks(props.session);
    }
    // close swipe after 100 ms
    setTimeout(() => {
      if (SwipeableRef.current) {
        SwipeableRef.current.close();
      }
    }, 100);
  };

  const removeFromBookmarks = session => {
    session.bookmarked = false;
    var list = bookmarks.filter(bookmark => bookmark.id !== session.id);
    setBookmarks(list);
    remove(session);
  };

  const remove = async session => {
    try {
      await AsyncStorage.removeItem(String(session.id));
    } catch (err) {
      alert(err);
    }
  };

  const addToBookmarks = session => {
    // add session to list if it doesn't already exist
    session.bookmarked = true;
    var list = [];
    bookmarks.forEach(bookmark => list.push(bookmark));
    if (!list.some(bookmark => bookmark.id === session.id)) {
      list.push(session);
    }
    setBookmarks(list);
    save(session);
  };

  const save = async session => {
    try {
      await AsyncStorage.setItem(String(session.id), JSON.stringify(session));
    } catch (err) {
      alert(err);
    }
  };

  // close swipeable ref when component renders or refreshes
  useEffect(() => {
    setFeedbackEntryVisible(false);

    if (SwipeableRef.current) {
      SwipeableRef.current.close();
    }
  }, [props.refreshing]);

  const [modalVisible, setModalVisible] = React.useState(false);

  const [feedbackEntryVisible, setFeedbackEntryVisible] = React.useState(false);

  const LeftSwipeAction = () => {
    return (
      <LeftSwipeActionsMemo
        addBookmark={addBookmark}
        session={props.session}
        setFeedbackEntryVisible={setFeedbackEntryVisible}
        feedbackEntryVisible={feedbackEntryVisible}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        imageMounted={imageMounted}
      />
    );
  };

  var bg = props.session.bookmarked ? event.colors[appearance].accent : event.colors[appearance].card;

  return (
    <View style={styles.container}>
      <Swipeable
        renderLeftActions={() => LeftSwipeAction()}
        overshootLeft={false}
        leftThreshold={100}
        friction={2}
        overshootFriction={8}
        ref={SwipeableRef}>
        <Pressable
          style={[styles.session, { backgroundColor: bg }]}
          onPress={() => {
            setModalVisible(true);

            if (SwipeableRef.current) {
              SwipeableRef.current.close();
            }
          }}
          // on press in darken the background
          onPressIn={() => {
            bg = event.colors[appearance].accent;
          }}>

          {/* drag icon */}
          <View style={styles.icon}>
            <Icon name='drag-indicator' size={30} color={event.colors[appearance].text} />
          </View>

          <View style={styles.session_info}>
          {/* // session title */}

          <View
            style={{
              flex: 1,
              height: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[styles.title, { width: 300, color: event.colors[appearance].text }]}>
              {props.session.title}
            </Text>
          </View>
          {/* // loop through speakers ids and return their profile pics */}
          {speakers}

          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            {/* // check if there are speakers */}
            {props.session.speakers.length > 0 ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {/* // session time */}
                <View style={[styles.session_time, { backgroundColor: event.colors[appearance].accent }]}>
                  <Times starts={props.starts} ends={props.ends} />
                </View>

                {/* // session room */}
                <Text
                  style={[
                    styles.speaker_room,
                    {
                      color: event.colors[appearance].text,
                      backgroundColor: event.colors[appearance].accent,
                    },
                  ]}>
                  {props.session.room}
                </Text>
              </View>
            ) : (
              // main-event session room
              <View style={styles.main_event_session}>
                <View style={[styles.session_time, { backgroundColor: event.colors[appearance].accent }]}>
                  <Times starts={props.starts} ends={props.ends} />
                </View>
                <Text
                  style={[
                    styles.speaker_room,
                    {
                      color: event.colors[appearance].text,
                      backgroundColor: event.colors[appearance].accent,
                    },
                  ]}>
                  {props.session.room}
                </Text>
              </View>
            )}
          </View>
          </View>
        </Pressable>
      </Swipeable>
      <SessionModal
        session={props.session}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        SwipeableRef={SwipeableRef}
        sectionListRef={props.sectionListRef}
        itemIndex={props.itemIndex}
        sectionIndex={props.sectionIndex}
        setSections={props.setSections}
        onRefresh={props.onRefresh}
      />
      {feedbackEntryVisible ? (
        <FeedbackForm
          session={props.session}
          feedbackEntryVisible={feedbackEntryVisible}
          setFeedbackEntryVisible={setFeedbackEntryVisible}
          SwipeableRef={SwipeableRef}
          sectionListRef={props.sectionListRef}
          itemIndex={props.itemIndex}
          sectionIndex={props.sectionIndex}
          setSections={props.setSections}
          onRefresh={props.onRefresh}
          request="POST"
        />
      ) : null}
      <Feedback
        session={props.session}
        SwipeableRef={SwipeableRef}
        sectionListRef={props.sectionListRef}
        itemIndex={props.itemIndex}
        sectionIndex={props.sectionIndex}
        setSections={props.setSections}
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
      />
    </View>
  );
}

export const MemoizedSession = memo(Session);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  session: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  session_info: {
    flex: 1,
    alignItems: 'flex-start',
  },
  main_event_session: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'left',
    fontSize: 15,
    margin: 5,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
  },
  speaker_room: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
  },
  session_time: {
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  speaker_box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 35,
    margin: 5,
  },
  icon: {
    margin: 5,
    marginRight: 0,
  },
  time_scroll: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
