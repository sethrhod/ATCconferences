import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useEffect, useContext, memo} from 'react';
import SessionizeContext from './context/SessionizeContext';
import Feedback from './Feedback';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeedbackForm from './FeedbackForm';
import LeftSwipeActionsMemo from './LeftSwipeActions';
import loadBookmarks from './scripts/loadBookmarks';
import Times from './Times';

export default function Session(props) {
  const {event, appearance, sessions} =
    useContext(SessionizeContext);

  const [imageMounted, setImageMounted] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(null);
  const [feedbackEntryVisible, setFeedbackEntryVisible] = React.useState(false);
  const [editView, setEditView] = React.useState(false);
  // bookmarks boolean to signal change in bookmarks storage
  const [bookmarksChanged, setBookmarksChanged] = React.useState(false);

  useEffect(() => {
    const getBookmarks = async () => {
      return await loadBookmarks(event, sessions);
    };
    getBookmarks().then((bookmarksList) => {
      // find if session is bookmarked
      const bookmarked = bookmarksList.find(
        bookmark => bookmark === props.session.id,
      );
      if (bookmarked) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    });
  }, [bookmarksChanged, props.bookmarksChanged]);

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

  // randomize speakers
  const speakersData = () => {
    const randomSpeaker = speakers[Math.floor(Math.random() * speakers.length)];

    return (
    <View style={styles.speaker_box}>
      <Image
        style={styles.logo}
        source={{uri: randomSpeaker.profilePicture}}
        onLayout={() => setImageMounted(true)}
      />
      <Text style={[styles.name, {color: event.colors[appearance].text}]}>
        {randomSpeaker.fullName}
      </Text>
    </View>
    )
  }

  const SwipeableRef = React.useRef(null);

  // close swipeable ref when component renders or refreshes
  useEffect(() => {
    setFeedbackEntryVisible(false);

    if (SwipeableRef.current) {
      SwipeableRef.current.close();
    }
  }, [props.refreshing]);

  const LeftSwipeAction = () => {
    return (
      <LeftSwipeActionsMemo
        session={props.session}
        setFeedbackEntryVisible={setFeedbackEntryVisible}
        feedbackEntryVisible={feedbackEntryVisible}
        editView={editView}
        setEditView={setEditView}
        imageMounted={imageMounted}
        navigation={props.navigation}
        swipeableRef={SwipeableRef}
        bookmarked={bookmarked}
        setBookmarked={setBookmarked}
        bookmarksChanged={bookmarksChanged}
        setBookmarksChanged={setBookmarksChanged}
        updateSchedule={props.updateSchedule}
        setUpdateSchedule={props.setUpdateSchedule}
        sectionListRef={props.sectionListRef}
        itemIndex={props.itemIndex}
        sectionIndex={props.sectionIndex}
      />
    );
  };

  const times = () =>
    props.starts ? (
      <View
        style={[
          styles.bottom_text,
          {
            color: event.colors[appearance].text,
            backgroundColor: event.colors[appearance].accent,
          },
        ]}>
        <Times starts={props.starts} ends={props.ends} />
      </View>
    ) : null;

  const rooms = () => (
    <Text
      style={[
        styles.bottom_text,
        {
          color: event.colors[appearance].text,
          backgroundColor: event.colors[appearance].accent,
        },
      ]}>
      {props.session.room ? props.session.room : 'TBD'}
    </Text>
  );

  if (bookmarked === null) {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.session,
            {backgroundColor: event.colors[appearance].card},
          ]}></View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <Swipeable
          renderLeftActions={() => LeftSwipeAction()}
          renderRightActions={() => LeftSwipeAction()}
          leftThreshold={50}
          rightThreshold={50}
          overshootLeft={false}
          overshootRight={false}
          friction={2}
          overshootFriction={2}
          ref={SwipeableRef}>
          <Pressable
            style={[
              styles.session,
              {
                backgroundColor: bookmarked
                  ? event.colors[appearance].accent
                  : event.colors[appearance].card,
              },
            ]}
            onPress={() => {
              props.setSelectedSession(props.session);
              props.navigation.navigate('SessionInfo');

              if (SwipeableRef.current) {
                SwipeableRef.current.close();
              }
            }}
            onLongPress={() => {
              if (SwipeableRef.current) {
                SwipeableRef.current.openRight();
              }
            }}>
            <View style={styles.session_info}>
              {/* // session title */}

              <View
                style={{
                  flex: 1,
                  height: '100%',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.title,
                    {width: 300, color: event.colors[appearance].text},
                  ]}>
                  {props.session.title}
                </Text>
              </View>
              {/* // loop through speakers ids and return their profile pics */}
              {
                speakersData()
              }

              <View
                style={{
                  flex: 1,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                {/* // check if there are speakers */}
                {props.session.speakers.length > 0 ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    {/* // session time */}
                    {times()}

                    {/* // session room */}
                    {rooms()}
                  </View>
                ) : (
                  // main-event session room
                  <View style={styles.main_event_session}>
                    {/* // session time */}
                    {times()}

                    {/* // session room */}
                    {rooms()}
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        </Swipeable>
      </GestureHandlerRootView>
      <Feedback
        session={props.session}
        SwipeableRef={SwipeableRef}
        sectionListRef={props.sectionListRef}
        itemIndex={props.itemIndex}
        sectionIndex={props.sectionIndex}
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
        feedbackEntryVisible={feedbackEntryVisible}
        setFeedbackEntryVisible={setFeedbackEntryVisible}
        editView={editView}
        setEditView={setEditView}
      />
    </View>
  );
}

export const MemoizedSession = memo(Session);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginTop: 0,
  },
  session: {
    flex: 1,
    minHeight: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingLeft: 10,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 2,
    shadowRadius: 5,
  },
  session_info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  main_event_session: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
  },
  bottom_text: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
  },
  speaker_box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 0,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
});
