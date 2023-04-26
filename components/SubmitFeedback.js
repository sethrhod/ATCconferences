import React, {useContext} from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import SessionizeContext from '../SessionizeContext.js';
import Session from './Session.js';
import SessionWithFeedback from './SessionWithFeedback.js';
import FeedbackForm from './FeedbackForm.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';

export default function SubmitFeedbackModal() {
  const CustomData = require('../custom-data.json');

  const [selectedSession, setSelectedSession] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const {sessions} = useContext(SessionizeContext);

  const {colors} = useTheme();

  const handlePress = item => {
    setModalVisible(true);
    setSelectedSession(item);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={sessions.sessions}
        keyExtractor={item => item.id}
        style={{width: '100%'}}
        ListHeaderComponent={
          <Text style={{textAlign: 'center', fontSize: 30, color: colors.text}}>
            Sessions
          </Text>
        }
        renderItem={({item}) => (
          <Pressable onPress={() => handlePress(item)}>
            <Session session={item} />
          </Pressable>
        )}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setSelectedSession(null);
        }}>
        <SafeAreaView
          style={[styles.container, {backgroundColor: colors.background}]}>
          <View style={styles.session}>
            <SessionWithFeedback session={selectedSession} />
          </View>
          <FeedbackForm
            request={"POST"}
            selectedSession={selectedSession}
            setSelectedSession={setSelectedSession}
          />
          <TouchableOpacity
            style={{
              backgroundColor: colors.card,
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text
              style={{
                color: colors.text,
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  session: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
});
