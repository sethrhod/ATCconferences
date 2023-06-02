import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeedbackForm from './FeedbackForm';
import SessionizeContext from '../SessionizeContext';

export default function Feedback(props) {

  const {uUID} = useContext(SessionizeContext);
  const {customData} = useContext(SessionizeContext);
  const {event} = useContext(SessionizeContext);
  
  const [editView, setEditView] = React.useState(false);

  useEffect(() => {
    setEditView(false);
  }, [props.refreshing]);

  const deleteFeedback = async (sessionID, feedbackText) => {
    fetch(customData.DevelopersAssociationofGeorgiaAPI + uUID, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionid: sessionID,
        feedback: feedbackText,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // remove feedback from session object to update list without refreshing
  const handlePress = () => {
    deleteFeedback(props.session.feedback.sessionid, props.session.feedback.feedback);
    props.session.feedback = undefined;
    setEditView(!editView);
  };

  const DeleteSwipeableRef = React.useRef(null);

  const Delete = () => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          margin: 10,
          borderRadius: 10,
          marginBottom: 20,
          marginTop: 0,
        }}
        onPress={() => handlePress()}>
        <Text style={{marginRight: 10}}>Delete</Text>
        <Icon name="trash" size={20} />
      </TouchableOpacity>
    );
  };

  // only render if feedback is not null
  if (props.session.feedback !== undefined) {
    if (editView === true) {
      return (
        <FeedbackForm
          session={props.session}
          setEditView={setEditView}
          feedbackText={props.session.feedback.feedback}
          SwipeableRef={props.SwipeableRef}
          sectionListRef={props.sectionListRef}
          itemIndex={props.itemIndex}
          sectionIndex={props.sectionIndex}
          setSections={props.setSections}
          onRefresh={props.onRefresh}
          request="PUT"
        />
      );
    } else {
      return (
        <Swipeable
          ref={DeleteSwipeableRef}
          renderLeftActions={() => <Delete />}
          overshootLeft={false}
          leftThreshold={100}
          friction={2}
          overshootFriction={8}>
          <View style={[styles.feedback, {backgroundColor: event.colors.primary}]}>
            <TouchableOpacity onPress={() => setEditView(!editView)}>
              <Text style={{color: event.colors.text}}>
                {props.session.feedback.feedback}
              </Text>
            </TouchableOpacity>
          </View>
        </Swipeable>
      );
    }
  }
  return null;
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: 0,
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
