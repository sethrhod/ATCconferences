import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FeedbackForm from './FeedbackForm';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SessionModal(props) {
  const {colors} = useTheme();

  const CloseButton = () => {
    return (
      <Pressable
        style={{
          margin: 10,
        }}
        onPress={() => props.setModalVisible(false)}>
        <Icon name="times" color={colors.secondary} size={40} />
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
            <Text style={{color: colors.text}}>{speaker.fullName}</Text>
          </View>
        ))}
        <Text style={{color: colors.text}}>{props.session.title}</Text>
        <Text style={{color: colors.text}}>{props.session.room}</Text>
        <Text style={{color: colors.text}}>{props.session.time}</Text>
        <Text style={{color: colors.text}}>{props.session.description}</Text>
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
          backgroundColor: colors.background,
          margin: 10,
          padding: 10,
        }}>
        <CloseButton />
        <SessionInfo />
      </ScrollView>
    </Modal>
  );
}
