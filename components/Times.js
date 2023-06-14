import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SessionizeContext from '../SessionizeContext';
import format_time from './scripts/formatTime';

export default function Times(props) {
  const {event} = useContext(SessionizeContext);

  const {appearance} = useContext(SessionizeContext);

  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={[styles.start_time, {color: event.colors[appearance].text}]}>
          {format_time(props.starts)}
      </Text>
      <Text
        style={[
          styles.dash_time,
          {color: event.colors[appearance].text},
        ]}>
        {' '}
        -{' '}
      </Text>
      <Text style={[styles.end_time, {color: event.colors[appearance].text}]}>
        {format_time(props.ends)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  start_time: {
    fontSize: 10,
    fontWeight: 'bold',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dash_time: {
    fontSize: 10,
    fontWeight: 'bold',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  end_time: {
    fontSize: 10,
    fontWeight: 'bold',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
