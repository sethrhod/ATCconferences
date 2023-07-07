import {React, useContext} from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SpeakerContext from './context/SpeakerContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SpeakerInfo(props) {
  const {setSelectedSpeaker} = useContext(SpeakerContext);

  const handlePress = () => {
    setSelectedSpeaker(props.speaker);
    if (props.navigation) {
      props.navigation.navigate('SpeakerWithSessions');
    }
  };

  return (
    <Pressable
      style={[
        styles.item,
        {backgroundColor: props.event.colors[props.appearance].card},
      ]}
      onPress={() => {
        handlePress();
      }}>
      {/*profile pic*/}

      <Image style={styles.profile_pic} source={{uri: props.speaker.profilePicture}} />

      {/*Name and links*/}

      <View style={styles.middle_box}>
        <Text
          style={[
            styles.name,
            {color: props.event.colors[props.appearance].text},
          ]}>
          {props.speaker.fullName}
        </Text>
        <View
          style={styles.logos_container}>
          {props.speaker.links.map((link, index) => {
            var title = link.title;
            // an if statement to catch the company website link and change the icon to a briefcase
            {
              if (title == 'Company Website') {
                title = 'Briefcase';
              }
            }
            {
              if (title == 'Blog') {
                title = 'pencil';
              }
            }
            return (
              <View key={index} style={styles.logos}>
                <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
                  {Icon.hasIcon(title.toLowerCase()) ? (
                    <Icon
                      name={title.toLowerCase()}
                      size={20}
                      color={props.event.colors[props.appearance].text}
                      item_container
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      {/*bio*/}

      <View style={styles.right_box}>
        <Text
          style={[
            styles.bio,
            {color: props.event.colors[props.appearance].text},
          ]}>
          {props.speaker.tagLine}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  profile_pic: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  bio: {
    fontSize: 14,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  middle_box: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  logos_container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logos: {
    margin: 5,
  },
  right_box: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
