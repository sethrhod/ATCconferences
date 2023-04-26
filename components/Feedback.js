import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function Feedback(props) {

  const {colors} = useTheme();

  {/* if feedback exists, show feedback */}

  return props.session.feedback ? (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
        }}>
          <Text style={{color: colors.text}}>{props.session.feedback.feedback}</Text>
      </View>
    ) : (null);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeblock_text: {
    padding: 10,
    fontSize: 10,
  },
  timeblock: {
    alignItems: 'flex-start',
    maxHeight: 40,
    justifyContent: 'center',
  },
  session: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  feedback_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  feedback: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  feedback_text: {
    flex: 1,
    fontSize: 10,
    color: 'black',
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header_left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
  },
  header_right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: 'black',
    borderLeftWidth: 1,
  },
  header_text: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: -30,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dropdown_button: {
    backgroundColor: 'white',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  dropdown_text: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_icon: {
    flex: 0.1,
    textAlign: 'center',
  },
});
