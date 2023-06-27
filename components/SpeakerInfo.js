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

      <Image style={styles.logo} source={{uri: props.speaker.profilePicture}} />

      {/*Name and links*/}

      <View style={{maxWidth: 130, alignItems: 'center'}}>
        <Text
          style={[
            styles.name,
            {color: props.event.colors[props.appearance].text},
          ]}>
          {props.speaker.fullName}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
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
              <View key={index} style={{justifyContent: 'center', padding: 5}}>
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

      <View style={{width: 120}}>
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
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  bio: {
    fontSize: 12,
    flexWrap: 'wrap',
  },
});
