import React, {useContext} from 'react';
import {View, Text, Modal, Pressable, ScrollView, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SessionizeContext from '../SessionizeContext';

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
              style={{width: 50, height: 50}}
              source={{uri: speaker.profilePicture}}
            />
            <Text style={{color: event.colors.text}}>{speaker.fullName}</Text>
          </View>
        ))}
        <Text style={{color: event.colors.text}}>{props.session.title}</Text>
        <Text style={{color: event.colors.text}}>{props.session.room}</Text>
        <Text style={{color: event.colors.text}}>{props.session.time}</Text>
        <Text style={{color: event.colors.text}}>
          {props.session.description}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}>
      <ScrollView
        style={{
          flex: 1,
          borderRadius: 10,
          backgroundColor: event.colors.primary,
          margin: 10,
          padding: 10,
        }}>
        <CloseButton />
        <SessionInfo />
      </ScrollView>
    </Modal>
  );
}
