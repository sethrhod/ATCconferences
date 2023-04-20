import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  SectionList,
  RefreshControl,
  Modal,
} from 'react-native';
import SessionizeContext from '../SessionizeContext.js';
import SubmitFeedbackModal from './SubmitFeedback.js';
import SessionWithFeedback from './SessionWithFeedback.js';
import FeedbackForm from './FeedbackForm.js';
import constructSectionListData from './scripts/constructFeedbackSectionListData.js';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export default function Feedback() {
  const CustomData = require('../custom-data.json');

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getFeedback();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [feedback, setFeedback] = React.useState([]);

  const {colors} = useTheme();

  const {sessions} = useContext(SessionizeContext);

  const sectionListRef = React.useRef(null);

  const FeedbackItem = props => {
    const [dropdown, setDropdown] = React.useState(false);

    const toggleDropdown = () => {
      setDropdown(!dropdown);
    };

    const textRef = React.useRef(null);

    var textBoxDimensions = textRef.current ? textRef.current.measure() : null;

    return (
      <View
        style={[
          styles.feedback,
          textBoxDimensions && {height: textBoxDimensions.height + 20},
          {backgroundColor: colors.secondary},
        ]}>
        <Text ref={textRef} style={styles.feedback_text}>
          {props.session.feedback.feedback}
        </Text>
        <Icon
          name="ellipsis-h"
          size={20}
          color="black"
          onPress={() => toggleDropdown()}
        />
        {dropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdown_button}
              onPress={() => props.editFeedback()}>
              <Text style={styles.dropdown_text}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdown_button}
              onPress={() => props.deleteFeedback(props.session)}>
              <Text style={styles.dropdown_text}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdown_button}
              onPress={() => toggleDropdown()}>
              <Text style={styles.dropdown_text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const getFeedback = async () => {
    const value = await AsyncStorage.getItem('@uuid');
    try {
      const response = await fetch(CustomData.flaskURL + value, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setFeedback(json);
    } catch (error) {
      console.error(error);
    }
  };

  const createUUID = async () => {
    const newUUID = uuid.v4();
    await AsyncStorage.setItem('@uuid', newUUID);
  };

  const checkUUIDstorage = async () => {
    const value = await AsyncStorage.getItem('@uuid');
    if (value == null) {
      await createUUID();
    }
  };

  useEffect(() => {
    const getUUID = async () => {
      const value = await AsyncStorage.getItem('@uuid');
      try {
        await checkUUIDstorage();
        await getFeedback();
      } catch (e) {
        // saving error
      }
    };
    getUUID();
  }, []);

  const [feedbackView, setFeedbackView] = React.useState(true);

  const header = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.header_left,
            {backgroundColor: feedbackView ? colors.tertiary : '#395680'},
          ]}
          onPress={() => setFeedbackView(true)}>
          <Text style={[styles.header_text, {color: colors.text}]}>
            My Feedback
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.header_right,
            {backgroundColor: feedbackView ? '#395680' : colors.tertiary},
          ]}
          onPress={() => setFeedbackView(false)}>
          <Text style={[styles.header_text, {color: colors.text}]}>
            Submit Feedback
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const myFeedback = () => {
    if (feedback.length === 0) {
      return (
        <View
          style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.tertiary,
          }}>
          <Text style={{color: colors.text}}>No Feedback submitted yet!</Text>
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <SectionList
            sections={constructSectionListData(sessions, feedback)}
            ref={sectionListRef}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={{marginBottom: 30}}>
                <SessionWithFeedback session={item} />
                {feedback.map((feedback, index) => {

                  const [modalVisible, setModalVisible] = React.useState(false);
                  const [feedbackText, setFeedbackText] = React.useState('');

                  const editFeedback = () => {
                    setModalVisible(true);
                    setFeedbackText(feedback.feedback);
                  };

                  const deleteFeedback = async session => {
                    const value = await AsyncStorage.getItem('@uuid');
                    try {
                      const response = await fetch(
                        CustomData.flaskURL + value + '/' + session.id,
                        {
                          method: 'DELETE',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                        },
                      );
                      const json = await response.json();
                      setFeedback(json);
                    } catch (error) {
                      console.error(error);
                    }
                  };

                  if (feedback.sessionid === item.id) {
                    return (
                      <View>
                        <FeedbackItem key={index} session={item} editFeedback={editFeedback} deleteFeedback={deleteFeedback} />
                        <Modal
                          animationType="slide"
                          visible={modalVisible}
                          style={{backgroundColor: colors.tertiary}}
                          onRequestClose={() => {
                            props.setModalVisible(!props.modalVisible);
                          }}>
                            <SessionWithFeedback session={item} />
                            <FeedbackForm selectedSession={item} feedbackText={feedbackText} />
                            <TouchableOpacity
                              style={styles.modal_button}
                              onPress={() => {
                                setModalVisible(!modalVisible);
                              }}>
                              <Text style={styles.modal_button_text}>Close</Text>
                            </TouchableOpacity>
                        </Modal>
                      </View>
                    );
                  }
                })}
              </View>
            )}
            renderSectionHeader={({section: {title}}) => (
              <View
                style={[styles.timeblock, {backgroundColor: colors.tertiary}]}>
                <Text style={[styles.timeblock_text, {color: colors.text}]}>
                  {title}
                </Text>
              </View>
            )}
          />
        </SafeAreaView>
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.tertiary}]}>
      {header()}
      {feedbackView ? myFeedback() : <SubmitFeedbackModal />}
    </SafeAreaView>
  );
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
  modal_button: {
    backgroundColor: 'white',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});
