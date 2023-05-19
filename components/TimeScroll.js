import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SessionizeContext from '../SessionizeContext';

export default function TimeScroll(props) {

  const {event} = React.useContext(SessionizeContext);
  return props.sectionListData.map((time, index) => (
    <View style={styles.time_scroll} key={index}>
      <TouchableOpacity
        onPress={() => {
          props.sectionListRef.current.scrollToLocation({
            animated: true,
            itemIndex: 0,
            sectionIndex: index,
            viewOffset: 0,
            viewPosition: 0,
          });
        }}
      >
        <Text style={[styles.time_scroll_text, {color: event.colors.text}]}>{time.title}</Text>
      </TouchableOpacity>
    </View>
  ));
}

const styles = StyleSheet.create({
  time_scroll: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  time_scroll_text: {
    fontSize: 10,
    textAlign: "center",
  }
});
