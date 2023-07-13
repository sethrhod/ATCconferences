import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useEffect, useContext, memo } from 'react';
import SessionizeContext from './context/SessionizeContext';
import Feedback from './Feedback';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeedbackForm from './FeedbackForm';
import LeftSwipeActionsMemo from './LeftSwipeActions';
import Times from './Times';

export default function Session(props) {
  const { event, appearance, setSelectedSession } = useContext(SessionizeContext);

  const [imageMounted, setImageMounted] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(() => {
    if (props.bookmarks) {
      return props.bookmarks.includes(props.session.id);
    } else {
      return false;
    }
  });

  const speakers = props.session.speakers.map((speaker, index) => (
    <View style={styles.speaker_box} key={index}>
      <Image
        key={index}
        style={styles.logo}
        source={{ uri: speaker.profilePicture }}
        onLayout={() => setImageMounted(true)}
      />
      <Text style={[styles.name, { color: event.colors[appearance].text }]}>
        {speaker.fullName}
      </Text>
    </View>
  ));

  const SwipeableRef = React.useRef(null);

  // close swipeable ref when component renders or refreshes
  useEffect(() => {
    setFeedbackEntryVisible(false);

    if (SwipeableRef.current) {
      SwipeableRef.current.close();
    }
  }, [props.refreshing]);

  const [feedbackEntryVisible, setFeedbackEntryVisible] = React.useState(false);

  const LeftSwipeAction = () => {
    return (
      <LeftSwipeActionsMemo
        session={props.session}
        setFeedbackEntryVisible={setFeedbackEntryVisible}
        feedbackEntryVisible={feedbackEntryVisible}
        imageMounted={imageMounted}
        navigation={props.navigation}
        swipeableRef={SwipeableRef}
        bookmarked={bookmarked}
        setBookmarked={setBookmarked}
      />
    );
  };

  const times = () => props.starts ? <View
    style={[
      styles.bottom_text,
      {
        color: event.colors[appearance].text,
        backgroundColor: event.colors[appearance].accent,
      },
    ]}>
    <Times starts={props.starts} ends={props.ends} />
  </View> : null

  const rooms = () => <Text
    style={[
      styles.bottom_text,
      {
        color: event.colors[appearance].text,
        backgroundColor: event.colors[appearance].accent,
      },
    ]}>
    {props.session.room ? props.session.room : 'TBD'}
  </Text>;

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <Swipeable
          renderLeftActions={() => LeftSwipeAction()}
          renderRightActions={() => LeftSwipeAction()}
          leftThreshold={50}
          rightThreshold={50}
          overshootLeft={false}
          overshootRight={false}
          friction={2}
          overshootFriction={2}
          ref={SwipeableRef}>
          <Pressable
            style={[
              styles.session,
              {
                backgroundColor: bookmarked
                  ? event.colors[appearance].accent
                  : event.colors[appearance].card,
              },
            ]}
            onPress={() => {
              setSelectedSession(props.session);
              props.navigation.navigate('SessionInfo');

              if (SwipeableRef.current) {
                SwipeableRef.current.close();
              }
            }}
            onLongPress={() => {
              if (SwipeableRef.current) {
                SwipeableRef.current.openRight();
              }
            }}>
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
                  style={[
                    styles.title,
                    {width: 300, color: event.colors[appearance].text},
                  ]}>
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
                    {times()}

                    {/* // session room */}
                    {rooms()}
                  </View>
                ) : (
                  // main-event session room
                  <View style={styles.main_event_session}>
                    {/* // session time */}
                    {times()}

                    {/* // session room */}
                    {rooms()}
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        </Swipeable>
      </GestureHandlerRootView>
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
    margin: 5,
    marginTop: 0,
  },
  session: {
    flex: 1,
    minHeight: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingLeft: 10,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 2,
    shadowRadius: 5,
  },
  session_info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  main_event_session: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
  },
  bottom_text: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
  },
  speaker_box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 0,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  }
});
