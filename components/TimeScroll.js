import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SessionizeContext from '../SessionizeContext';

export default function TimeScroll(props) {

  const {event, appearance} = React.useContext(SessionizeContext);
  
  return props.sectionListData.map((time, index) => (
      <TouchableOpacity
      onPress={() => props.scrollToTime(index)}
      >
        <Text style={[styles.time, {color: event.colors[appearance].text}]}>
          {time.title}
        </Text>
      </TouchableOpacity>
  ));
}

const styles = StyleSheet.create({
  time: {
    fontSize: 10,
    fontWeight: 'bold',
  }
});
