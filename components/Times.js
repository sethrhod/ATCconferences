import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Moment from 'react-moment';
import SessionizeContext from '../SessionizeContext';

export default function Times(props) {
  const {event} = useContext(SessionizeContext);

  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <Moment
        element={Text}
        format="h:mm A"
        style={[
          styles.start_time,
          {color: event.colors.text, backgroundColor: event.colors.accent},
        ]}>
        {props.starts}
      </Moment>
      <Text
        style={[
          styles.dash_time,
          {color: event.colors.text, backgroundColor: event.colors.accent},
        ]}>
        {' '}
        -{' '}
      </Text>
      <Moment
        element={Text}
        format="h:mm A"
        style={[
          styles.end_time,
          {color: event.colors.text, backgroundColor: event.colors.accent},
        ]}>
        {props.ends}
      </Moment>
    </View>
  );
}

const styles = StyleSheet.create({
  start_time: {
    fontSize: 10,
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  dash_time: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  end_time: {
    fontSize: 10,
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
