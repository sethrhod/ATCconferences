import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

function ConnectionErrorMessage(props) {
  return (
    <View style={styles.timeout_container}>
      <Text style={styles.timeout_text}>Error: No internet connection.</Text>
      <Text style={styles.timeout_sub_text}>
        Make sure you have an internet connection and try again.
      </Text>
      <Pressable style={styles.reload_button} onPress={() => props.setTimeoutError(false)}>
        <Text style={styles.reload_button_text}>Reload</Text>
      </Pressable>
    </View>
  );
}

export default ConnectionErrorMessage;

const styles = StyleSheet.create({
  timeout_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F5F5F5",
  },
  timeout_text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#212121",
    marginBottom: 10,
  },
  timeout_sub_text: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: "#212121",
    margin: 20,
    marginTop: 0,
  },
  reload_button: {
    backgroundColor: "#212121",
    padding: 10,
    borderRadius: 5,
  },
  reload_button_text: {
    color: "#F5F5F5",
    fontSize: 15,
    fontWeight: '600',
  },
});
