import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from './context/SessionizeContext';

export default function LeftSwipeActions(props) {
  const {event, appearance, setSelectedSession} = React.useContext(SessionizeContext);
  const leftSwipeBoxRef = React.useRef(null);

  const [fontSize, setFontSize] = React.useState(15);
  const [iconsize, setIconsize] = React.useState(40);

  React.useEffect(() => {
    if (leftSwipeBoxRef.current) {
      leftSwipeBoxRef.current.measure((x, y, width, height, pageX, pageY) => {
        if (height !== undefined) {
          setFontSize(height / 12);
          setIconsize(height / 4);
        }
      });
    }
  }, [props.imageMounted]);

  const checkFontValue = () => {
    if (typeof fontSize === 'number' && fontSize > 9 && fontSize < 20) {
      return fontSize;
    } else {
      return 11;
    }
  };


  return (
    <View
      style={{
        flex: 1,
        borderRadius: 5,
        flexDirection: 'row',
        backgroundColor: event.colors[appearance].primary,
        margin: 5,
        padding: 20,
      }}
      ref={leftSwipeBoxRef}
      onLayout={event => {
        if (event.nativeEvent.layout.height !== undefined) {
          setFontSize(event.nativeEvent.layout.height / 12);
          setIconsize(event.nativeEvent.layout.height / 4);
        }
      }}>
      <Pressable style={styles.Pressable} onPress={() => props.addBookmark()}>
        <Text style={[styles.left_swipe_titles, {fontSize: checkFontValue()}]}>
          Add to Schedule
        </Text>
        {props.session.bookmarked ? (
          <Icon name="bookmark" size={iconsize} solid />
        ) : (
          <Icon name="bookmark" size={iconsize} />
        )}
      </Pressable>
      <Pressable
        style={styles.Pressable}
        onPress={() => props.setFeedbackEntryVisible(!props.feedbackEntryVisible)}>
        <Text style={[styles.left_swipe_titles, {fontSize: checkFontValue()}]}>
          Add Feedback
        </Text>
        <Icon name="plus-square" size={iconsize} solid />
      </Pressable>
      <Pressable
        style={styles.Pressable}
        onPress={() => {
          setSelectedSession(props.session);
          props.navigation.navigate('SessionInfo');

          if (props.swipeableRef.current) {
            props.swipeableRef.current.close();
          }
        }}>
        <Text style={[styles.left_swipe_titles, {fontSize: checkFontValue()}]}>
          Session Info
        </Text>
        <Icon name="info-circle" size={iconsize} solid />
      </Pressable>
    </View>
  );
}

export const LeftSwipeActionsMemo = React.memo(LeftSwipeActions);

const styles = StyleSheet.create({
  left_swipe_titles: {
    flex: 1,
    fontWeight: '600',
    padding: 5,
    paddingLeft: 0,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  Pressable: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'space-between',
  },
});
