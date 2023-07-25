import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from './context/SessionizeContext';
import BookmarkButton from './BookmarkButton';

export default function LeftSwipeActions(props) {
  const {event, appearance} = React.useContext(SessionizeContext);
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

  const handlePress = () => {
    const scroll = async () => {
      {
        if (props.sectionListRef)
          props.sectionListRef.current.scrollToLocation({
            animated: true,
            itemIndex: props.itemIndex,
            sectionIndex: props.sectionIndex,
            viewOffset: 0,
            viewPosition: 0,
          });
      }
    };
    if (props.session.feedback) {
      scroll().then(() => {
        props.setEditView(true);
      });
    } else {
      scroll().then(() => {
        props.setFeedbackEntryVisible(true);
      });
    }
  };
    

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: event.colors[appearance].primary},
      ]}
      ref={leftSwipeBoxRef}
      onLayout={event => {
        if (event.nativeEvent.layout.height !== undefined) {
          setFontSize(event.nativeEvent.layout.height / 12);
          setIconsize(event.nativeEvent.layout.height / 4);
        }
      }}>
      <View
        style={[
          styles.Pressable,
          {borderColor: event.colors[appearance].background},
        ]}>
        <Text style={[styles.left_swipe_titles, {fontSize: checkFontValue()}]}>
          {props.bookmarked ? 'Remove from Schedule' : 'Add to Schedule'}
        </Text>
        <BookmarkButton
          session={props.session}
          size={iconsize}
          swipeableRef={props.swipeableRef}
          bookmarked={props.bookmarked}
          setBookmarked={props.setBookmarked}
          bookmarksChanged={props.bookmarksChanged}
          setBookmarksChanged={props.setBookmarksChanged}
          updateSchedule={props.updateSchedule}
          setUpdateSchedule={props.setUpdateSchedule}
        />
      </View>
      <Pressable
        style={[
          styles.Pressable,
          {borderColor: event.colors[appearance].background},
        ]}
        onPress={() => handlePress()}>
        <Text style={[styles.left_swipe_titles, {fontSize: checkFontValue()}]}>
          {props.session.feedback ? 'Edit Feedback' : 'Leave Feedback'}
        </Text>
        <Icon name="plus-square" size={iconsize} solid />
      </Pressable>
      <Pressable
        style={[
          styles.Pressable,
          {borderColor: event.colors[appearance].background},
        ]}
        onPress={() => {
          props.setSelectedSession(props.session);
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
  container: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 5,
  },
  left_swipe_titles: {
    fontWeight: '600',
    textAlign: 'center',
    margin: 5,
  },
  Pressable: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
