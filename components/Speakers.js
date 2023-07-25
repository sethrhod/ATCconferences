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
import React, {useContext, memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SessionizeContext from './context/SessionizeContext';
import SpeakerContext from './context/SpeakerContext';
import SpeakerInfo from './SpeakerInfo';
import SpeakerWithSessions from './SpeakerWithSessions';
import SessionInfo from './SessionInfo';
import BookmarkButton from './BookmarkButton';
import loadBookmarks from './scripts/loadBookmarks';

export default function Speakers() {
  const {event, appearance, sessions} =
    useContext(SessionizeContext);

  const [selectedSession, setSelectedSession] = React.useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = React.useState(null);
  const [bookmarksChanged, setBookmarksChanged] = React.useState(false);

  const speakers = [
    {
      "id": "fa6df9a5-cb9d-4f68-9c43-8a8d65f06ca0",
      "firstName": "John",
      "lastName": "Doe",
      "fullName": "John Doe",
      "bio": "I am a passionate technology enthusiast with expertise in various domains, including IoT, Cloud Computing, and AI. I love exploring new technologies and finding innovative ways to integrate them into real-world scenarios. Besides my tech interests, I enjoy spending time in nature and pursuing photography as a hobby.",
      "tagLine": "Technology Enthusiast",
      "profilePicture": "https://images.generated.photos/zV6WSoG3XIL1NVp9OAx0XWgKvh8qszvHCNXwiqLhw7s/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzYyNTU5LmpwZw.jpg",
      "sessions": [
        {
          "id": 123456,
          "name": "Introduction to Emerging Technologies"
        }
      ],
      "isTopSpeaker": true,
      "links": [
        {
          "title": "Twitter",
          "url": "https://twitter.com/johndoe",
          "linkType": "Twitter"
        },
        {
          "title": "LinkedIn",
          "url": "https://linkedin.com/in/johndoe",
          "linkType": "LinkedIn"
        },
        {
          "title": "Blog",
          "url": "https://johndoe.com/blog",
          "linkType": "Blog"
        }
      ],
      "questionAnswers": [],
      "categories": []
    },
    {
      "id": "84e42e0f-6d92-40b8-bb00-baf1a117dfdb",
      "firstName": "Alice",
      "lastName": "Smith",
      "fullName": "Alice Smith",
      "bio": "I am a seasoned software engineer with extensive experience in web application development and DevOps. I have a passion for creating scalable and secure solutions using cutting-edge technologies. Apart from coding, I enjoy playing musical instruments and volunteering for community-driven initiatives.",
      "tagLine": "Software Engineer and DevOps Enthusiast",
      "profilePicture": "https://images.generated.photos/jjlygqVfTi8x1_z6T4jNjgoG8diYBL11sFOzTnXEgkI/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzU5Mzg4LmpwZw.jpg",
      "sessions": [
        {
          "id": 789012,
          "name": "Continuous Integration and Deployment with DevOps"
        }
      ],
      "isTopSpeaker": true,
      "links": [
        {
          "title": "Twitter",
          "url": "https://twitter.com/alicesmith",
          "linkType": "Twitter"
        },
        {
          "title": "LinkedIn",
          "url": "https://linkedin.com/in/alicesmith",
          "linkType": "LinkedIn"
        }
      ],
      "questionAnswers": [],
      "categories": []
    },
    {
      "id": "b9f21b47-e0b3-4aa6-b8f5-4d0a648429be",
      "firstName": "Mark",
      "lastName": "Johnson",
      "fullName": "Mark Johnson",
      "bio": "I am an experienced cloud architect with a focus on Microsoft Azure. My expertise lies in designing and implementing scalable cloud solutions for businesses of all sizes. In my free time, I enjoy playing sports and traveling to explore new cultures and cuisines.",
      "tagLine": "Cloud Architect",
      "profilePicture": "https://images.generated.photos/70q_mGePjE763y82BloAAQXFB9x4-hwg0NagaI7CB5o/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzU5MzIxLmpwZw.jpg",
      "sessions": [
        {
          "id": 456789,
          "name": "Mastering Microsoft Azure: Best Practices for Cloud Architecture"
        }
      ],
      "isTopSpeaker": false,
      "links": [
        {
          "title": "LinkedIn",
          "url": "https://linkedin.com/in/markjohnson",
          "linkType": "LinkedIn"
        }
      ],
      "questionAnswers": [],
      "categories": []
    },
    {
      "id": "1823c810-4e66-4b0e-8df0-c09851e89f28",
      "firstName": "Emily",
      "lastName": "White",
      "fullName": "Emily White",
      "bio": "I am a tech-savvy professional with a diverse background in software development and data analytics. I am passionate about leveraging data-driven insights to solve complex business problems. When I am not coding, I enjoy painting and exploring art galleries.",
      "tagLine": "Data Analytics Enthusiast",
      "profilePicture": "https://images.generated.photos/4fp1kfVANQYqt9qs5kDjtO1Xpz1D3ufS_LShLryp4eY/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTU0NDIwLmpwZw.jpg",
      "sessions": [
        {
          "id": 234567,
          "name": "Data Science: Unraveling Hidden Patterns in Data"
        }
      ],
      "isTopSpeaker": false,
      "links": [
        {
          "title": "Twitter",
          "url": "https://twitter.com/emilywhite",
          "linkType": "Twitter"
        },
        {
          "title": "LinkedIn",
          "url": "https://linkedin.com/in/emilywhite",
          "linkType": "LinkedIn"
        },
        {
          "title": "Blog",
          "url": "https://emilywhite.com/blog",
          "linkType": "Blog"
        }
      ],
      "questionAnswers": [],
      "categories": []
    },
    {
      "id": "3e509f26-5e12-4cfb-8e57-44a3e6a4bf5d",
      "firstName": "Michael",
      "lastName": "Brown",
      "fullName": "Michael Brown",
      "bio": "I am an enthusiastic software developer with a keen interest in frontend technologies. I love creating interactive and user-friendly web applications. In my spare time, I like to engage in outdoor sports and participate in hackathons.",
      "tagLine": "Frontend Web Developer",
      "profilePicture": "https://images.generated.photos/WId2jLA4oBfGFhX0ADJQTDWM7aYksDqF3yeOjPein6g/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTcwNjM3LmpwZw.jpg",
      "sessions": [
        {
          "id": 345678,
          "name": "Building Modern Web Apps with React.js"
        }
      ],
      "isTopSpeaker": false,
      "links": [
        {
          "title": "Twitter",
          "url": "https://twitter.com/michaelbrown",
          "linkType": "Twitter"
        },
        {
          "title": "LinkedIn",
          "url": "https://linkedin.com/in/michaelbrown",
          "linkType": "LinkedIn"
        },
        {
          "title": "Portfolio",
          "url": "https://michaelbrown.dev",
          "linkType": "Portfolio"
        }
      ],
      "questionAnswers": [],
      "categories": []
    }
  ]


  const SpeakersList = ({navigation}) => {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: event.colors[appearance].background},
        ]}>
        <SafeAreaView style={styles.item_container}>
          <FlatList
            data={speakers}
            renderItem={({item}) => (
              <SpeakerInfo
                speaker={item}
                navigation={navigation}
                event={event}
                appearance={appearance}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{alignItems: 'stretch'}}
            style={{width: '100%'}}
          />
        </SafeAreaView>
      </View>
    );
  };

  const headerRight = () => {
    const [bookmarked, setBookmarked] = React.useState(false);

    React.useEffect(() => {
      const getBookmarks = async () => {
        return await loadBookmarks(event, sessions);
      };
      getBookmarks().then(bookmarksList => {
        // find if session is bookmarked
        const bookmarked = bookmarksList.find(
          bookmark => bookmark === selectedSession.id,
        );
        if (bookmarked) {
          setBookmarked(true);
        } else {
          setBookmarked(false);
        }
      });
    }, [selectedSession]);

    return (
      <BookmarkButton
        session={selectedSession}
        bookmarked={bookmarked}
        setBookmarked={setBookmarked}
        bookmarksChanged={bookmarksChanged}
        setBookmarksChanged={setBookmarksChanged}
      />
    );
  };

  const value = {
    selectedSpeaker,
    bookmarksChanged,
    selectedSession,
    setSelectedSession,
    setBookmarksChanged,
    setSelectedSpeaker,
  };

  const Stack = createNativeStackNavigator();

  return (
    <SpeakerContext.Provider value={value}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="SpeakersList"
            component={SpeakersList}
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
          <Stack.Screen
            name="SessionInfo"
            component={SessionInfo}
            options={{
              headerRight: () => headerRight(),
              headerTitle: 'Session Info',
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
});
