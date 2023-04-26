import {StyleSheet, Text, View, Image, Pressable, Modal} from 'react-native';
import React, {useEffect, useContext} from 'react';
import SessionizeContext from '../SessionizeContext';
import Feedback from './Feedback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '@react-navigation/native';
import Moment from 'react-moment';
import FeedbackForm from './FeedbackForm';

export default function Session(props) {
  const {colors} = useTheme();

  // the state for the list of bookmarks
  const {bookmarks} = useContext(SessionizeContext);
  const {setBookmarks} = useContext(SessionizeContext);

  const speakers = props.session.speakers.map((speaker, index) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      key={index}>
      <Image
        key={index}
        style={styles.logo}
        source={{uri: speaker.profilePicture}}
      />
      <Text style={[styles.name, {color: colors.card}]}>
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
          style={[styles.time, {color: colors.card}]}>
          {props.starts}
        </Moment>
        <Text style={[styles.time, {color: colors.card}]}> - </Text>
        <Moment
          element={Text}
          format="h:mm A"
          style={[styles.time, {color: colors.card}]}>
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
    session.bookmarked = true;
    var list = [];
    bookmarks.forEach(bookmark => list.push(bookmark));
    list.push(session);
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

  // close swipeable ref when component renders
  useEffect(() => {
    if (SwipeableRef.current) {
      SwipeableRef.current.close();
    }
  }, []);

  const [modalVisible, setModalVisible] = React.useState(false);

  const LeftSwipeActions = () => {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          flexDirection: 'row',
          backgroundColor: colors.secondary,
          margin: 10,
          padding: 10,
        }}>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <FeedbackForm
            session={props.session}
            setFeedback={props.setFeedback}
            setModalVisible={setModalVisible()}
            modalVisible={modalVisible}
          />
        </Modal>
        <Pressable
          style={{
            flex: 1,
            borderRadius: 10,
            backgroundColor: colors.secondary,
          }}
          onPress={() => addBookmark()}>
          <Text
            style={{
              flex: 1,
              color: colors.tertiary,
              fontWeight: '600',
              fontSize: 15,
            }}>
            Add to Timeline
          </Text>
          {props.session.bookmarked ? (
            <Icon name="bookmark" color={colors.tertiary} size={40} solid />
          ) : (
            <Icon name="bookmark" color={colors.tertiary} size={40} />
          )}
        </Pressable>
        <Pressable
          style={{
            flex: 1,
            borderRadius: 10,
            backgroundColor: colors.secondary,
          }}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text
            style={{
              flex: 1,
              color: colors.tertiary,
              fontWeight: '600',
              fontSize: 15,
            }}>
            Add Feedback
          </Text>
          {props.session.bookmarked ? (
            <Icon name="plus-square" color={colors.tertiary} size={40} solid />
          ) : (
            <Icon name="plus-square" color={colors.tertiary} size={40} />
          )}
        </Pressable>
      </View>
    );
  };

  var bg = props.session.bookmarked ? colors.secondary : colors.primary;

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
            <Text style={[styles.title, {width: 300, color: colors.card}]}>
              {props.session.title}
            </Text>
          </View>

          <Times starts={props.starts} ends={props.ends} />

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
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {/* // loop through speakers ids and return their profile pics */}
                {speakers}

                {/* // session room */}
                <Text style={[styles.speaker_room, {color: colors.card}]}>
                  {props.session.room}
                </Text>
              </View>
            ) : (
              // main-event session room
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.card}}>{props.session.room}</Text>
              </View>
            )}
          </View>
        </View>
      </Swipeable>
      <Feedback session={props.session} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  name: {
    fontSize: 12,
    textAlign: 'center',
  },
  speaker_room: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'semi-bold',
  },
  logo: {
    width: 25,
    height: 25,
    borderRadius: 35,
    margin: 5,
  },
  times: {
    textAlign: 'center',
    fontSize: 12,
  },
  time_scroll: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
