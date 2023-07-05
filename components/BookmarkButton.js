import React from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from './context/SessionizeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookmarkButton(props) {

  const { bookmarks, setBookmarks } = React.useContext(SessionizeContext);

  // the state for the list of bookmarks

  const addToBookmarks = (session) => {
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


  const remove = async session => {
    try {
      await AsyncStorage.removeItem(String(session.id));
    } catch (err) {
      alert(err);
    }
  };


  const removeFromBookmarks = (session) => {
    session.bookmarked = false;
    var list = bookmarks.filter(bookmark => bookmark.id !== session.id);
    setBookmarks(list);
    remove(session);
  };

  const toggleBookmark = (session) => {

    // either remove or add as bookmark depending on previous state
    if (session.bookmarked == true) {
      // remove bookmark
      removeFromBookmarks(session);
    } else if (session.bookmarked == false) {
      // add new bookmark
      addToBookmarks(session);
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
      {props.session.bookmarked ? (
        <Icon name="bookmark" size={props.size ? props.size : 30} solid color={props.color ? props.color : null} />
      ) : (
        <Icon name="bookmark-o" size={props.size ? props.size : 30} color={props.color ? props.color : null} />
      )}
    </Pressable>
  );
};