import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from './context/SessionizeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loadBookmarks from './scripts/loadBookmarks';

export default function BookmarkButton(props) {
  const {event, sessions} = React.useContext(SessionizeContext);

  const addToBookmarks = async session => {
    props.setBookmarked(true);
    const bookmarks = await loadBookmarks(event, sessions);
    bookmarks.push(session.id);
    save(bookmarks)
      .then(() => {
        if (props.setBookmarksChanged) {
          props.setBookmarksChanged(!props.bookmarksChanged);
        }
        if (props.setUpdateSchedule) {
          props.setUpdateSchedule(!props.updateSchedule);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const save = async bookmarks => {
    try {
      await AsyncStorage.setItem(event.id, JSON.stringify(bookmarks));
    } catch (err) {
      alert(err);
    }
  };

  const removeFromBookmarks = async session => {
    props.setBookmarked(false);
    const bookmarks = await loadBookmarks(event, sessions);
    const filteredBookmarks = bookmarks.filter(item => item !== session.id);
    save(filteredBookmarks)
      .then(() => {
        if (props.setBookmarksChanged) {
          props.setBookmarksChanged(!props.bookmarksChanged);
        }
        if (props.setUpdateSchedule) {
          props.setUpdateSchedule(!props.updateSchedule);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleBookmark = async session => {
    // either remove or add as bookmark depending on previous state
    if (props.bookmarked == true) {
      // remove bookmark
      await removeFromBookmarks(session);
    } else if (props.bookmarked == false) {
      // add new bookmark
      await addToBookmarks(session);
    }
    if (props.swipeableRef) {
      props.swipeableRef.current.close();
    }
  };

  // check if props.session exists before returning
  if (!props.session) {
    return null;
  }

  return (
    <Pressable
      onPress={() => {
        toggleBookmark(props.session);
      }}>
      {props.bookmarked ? (
        <Icon
          name="bookmark"
          size={props.size ? props.size : 30}
          solid
          color={props.color ? props.color : null}
        />
      ) : (
        <Icon
          name="bookmark-o"
          size={props.size ? props.size : 30}
          color={props.color ? props.color : null}
        />
      )}
    </Pressable>
  );
}
