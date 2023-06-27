import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useContext, memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from './context/SessionizeContext';
import SpeakerContext from './context/SpeakerContext';
import SpeakerInfo from './SpeakerInfo';
import SpeakerWithSessions from './SpeakerWithSessions';

export default function Speakers() {
  const { event } = useContext(SessionizeContext);

  const { speakers } = useContext(SessionizeContext);

  const { appearance } = useContext(SessionizeContext);

  const [selectedSpeaker, setSelectedSpeaker] = React.useState(null);

  const SpeakersList = ({ navigation }) => {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: event.colors[appearance].background },
        ]}>
        <SafeAreaView style={styles.item_container}>
          <FlatList
            data={speakers}
            renderItem={({ item }) => (
              <SpeakerInfo speaker={item} navigation={navigation} event={event} appearance={appearance} />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{ alignItems: 'stretch' }}
            style={{ width: '100%' }}
          />
        </SafeAreaView>
      </View>
    );
  };

  const value = {
    selectedSpeaker,
    setSelectedSpeaker,
  }

  const Stack = createNativeStackNavigator();


  return (
    <SpeakerContext.Provider value={value}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="SpeakersList" component={SpeakersList}
            options={{
              headerTitle: 'Speakers',
              headerStyle: {
                backgroundColor: event.colors[appearance].background,
              },
              headerTitleStyle: {
                color: event.colors[appearance].text,
              },
              headerTintColor: event.colors[appearance].text,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="SpeakerWithSessions"
            component={SpeakerWithSessions}
            options={{
              headerTitle: 'Speaker',
              headerStyle: {
                backgroundColor: event.colors[appearance].background,
              },
              headerTitleStyle: {
                color: event.colors[appearance].text,
              },
              headerTintColor: event.colors[appearance].text,
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SpeakerContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_container: {
    flex: 1,
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    width: '90%',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 17,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  bio: {
    fontSize: 12,
  },
  logo: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
});
