import React, {useContext} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from '../SessionizeContext';
import Times from './Times';

export default function SessionModal(props) {
  const {event} = useContext(SessionizeContext);

  const CloseButton = () => {
    return (
      <Pressable
        style={{
          margin: 10,
        }}
        onPress={() => props.setModalVisible(false)}>
        <Icon name="times" color={event.colors.secondary} size={40} />
      </Pressable>
    );
  };

  const SessionInfo = () => {
    return (
      <View>
        {props.session.speakers.map((speaker, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={styles.profilePicture}
              source={{uri: speaker.profilePicture}}
            />
            <Text style={[styles.fullName, {color: event.colors.text}]}>
              {speaker.fullName}
            </Text>
          </View>
        ))}
        <View
          style={[styles.title_box, {borderBottomColor: event.colors.text}]}>
          <Text style={[styles.title, {color: event.colors.text}]}>
            {props.session.title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Text
            style={[
              styles.room,
              {
                color: event.colors.text,
                backgroundColor: event.colors.accent,
              },
            ]}>
            {props.session.room}
          </Text>
          <View style={[styles.times_box, {backgroundColor: event.colors.accent}]}>
            <Times starts={props.session.startsAt} ends={props.session.endsAt} />
          </View>
        </View>
        <View
          style={[
            styles.description_box,
            {
              borderBottomColor: event.colors.text,
            },
          ]}>
          <Text style={[styles.description, {color: event.colors.text}]}>
            {props.session.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}>
      <ScrollView
        style={[styles.container, {backgroundColor: event.colors.primary}]}>
        <CloseButton />
        <SessionInfo />
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
  },
  profilePicture: {
    width: 75,
    height: 75,
    borderRadius: 50,
    margin: 10,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  title: {
    fontSize: 20,
    margin: 10,
  },
  title_box: {
    borderBottomWidth: 1,
  },
  room: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
    marginTop: 5,
  },
  times_box: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 5,
    marginLeft: 10,
  },
  description: {
    fontSize: 15,
    margin: 10,
  },
  description_box: {
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});
