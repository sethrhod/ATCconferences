import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useEffect, useContext} from 'react';
import SessionizeContext from '../SessionizeContext';
import Feedback from './Feedback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'react-moment';
import SessionModal from './SessionInfoModal';
import FeedbackForm from './FeedbackForm';

export default function Session(props) {
  const {event} = useContext(SessionizeContext);

  // the state for the list of bookmarks
  const {bookmarks} = useContext(SessionizeContext);
  const {setBookmarks} = useContext(SessionizeContext);

  const speakers = props.session.speakers.map((speaker, index) => (
    <View style={styles.speaker_box} key={index}>
      <Image
        key={index}
        style={styles.logo}
        source={{uri: speaker.profilePicture}}
      />
      <Text style={[styles.name, {color: event.colors.text}]}>
        {speaker.fullName}
      </Text>
    </View>
  ));

  const Times = props => {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Moment
          element={Text}
          format="h:mm A"
          style={[
            styles.start_time,
            {color: event.colors.text, backgroundColor: event.colors.accent},
          ]}>
          {props.starts}
        </Moment>
        <Text
          style={[
            styles.dash_time,
            {color: event.colors.text, backgroundColor: event.colors.accent},
          ]}>
          {' '}
          -{' '}
        </Text>
        <Moment
          element={Text}
          format="h:mm A"
          style={[
            styles.end_time,
            {color: event.colors.text, backgroundColor: event.colors.accent},
          ]}>
          {props.ends}
        </Moment>
      </View>
    );
  };

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

  const LeftSwipeActions = () => {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          flexDirection: 'row',
          backgroundColor: event.colors.primary,
          margin: 10,
          padding: 10,
        }}>
        <Pressable
          style={{
            flex: 1,
            borderRadius: 10,
          }}
          onPress={() => addBookmark()}>
          <Text style={styles.left_swipe_titles}>
            Add to Timeline
          </Text>
          {props.session.bookmarked ? (
            <Icon name="bookmark" size={40} solid />
          ) : (
            <Icon name="bookmark" size={40} />
          )}
        </Pressable>
        <Pressable
          style={{
            flex: 1,
            borderRadius: 10,
          }}
          onPress={() => setFeedbackEntryVisible(!feedbackEntryVisible)}>
          <Text style={styles.left_swipe_titles}>
            Add Feedback
          </Text>
          <Icon name="plus-square" size={40} solid />
        </Pressable>
        <Pressable
          style={{
            flex: 1,
            borderRadius: 10,
          }}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.left_swipe_titles}>
            Session Info
          </Text>
          <Icon name="info-circle" size={40} solid />
        </Pressable>
      </View>
    );
  };

  var bg = props.session.bookmarked ? event.colors.accent : event.colors.card;

  return (
    <View style={styles.container}>
      <Swipeable
        renderLeftActions={LeftSwipeActions}
        overshootLeft={false}
        leftThreshold={100}
        friction={2}
        overshootFriction={8}
        ref={SwipeableRef}>
        <View style={[styles.session, {backgroundColor: bg}]}>
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
            <Text style={[styles.title, {width: 300, color: event.colors.text}]}>
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
                }}>
                {/* // session time */}
                <Times starts={props.starts} ends={props.ends} />

                {/* // session room */}
                <Text
                  style={[
                    styles.speaker_room,
                    {
                      color: event.colors.text,
                      backgroundColor: event.colors.accent,
                    },
                  ]}>
                  {props.session.room}
                </Text>
              </View>
            ) : (
              // main-event session room
              <View style={styles.main_event_session}>
                <Times starts={props.starts} ends={props.ends} />
                <Text
                  style={[
                    styles.speaker_room,
                    {
                      color: event.colors.text,
                      backgroundColor: event.colors.accent,
                    },
                  ]}>
                  {props.session.room}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Swipeable>
      <SessionModal
        session={props.session}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  session: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
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
    fontWeight: 'semibold',
    borderRadius: 10,
    padding: 5,
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
  start_time: {
    fontSize: 10,
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  dash_time: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  end_time: {
    fontSize: 10,
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  time_scroll: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left_swipe_titles: {
    flex: 1,
    fontWeight: '600',
    fontSize: 12,
  },
});
