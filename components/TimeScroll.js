import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SessionizeContext from '../SessionizeContext';

export default function TimeScroll(props) {

  const {event} = React.useContext(SessionizeContext);
  return props.sectionListData.map((time, index) => (
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
        key={index}
      >
        <Text style={styles.time}>
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
