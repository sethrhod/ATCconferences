import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Overview from "./components/Overview";
import Speakers from "./components/Speakers";
import Sponsors from "./components/Sponsors";
import Schedule from "./components/Schedule";
import MyTimeline from "./components/My-timeline";
// import Feedback from "./components/Feedback";
import CodeOfConduct from "./components/Code-of-Conduct";
import Speaker from "./components/scripts/Speaker_class.js";
import Sessions from "./components/scripts/Sessions_class.js";
import SessionizeContext from "./SessionizeContext.js";

export default function App() {
  const Drawer = createDrawerNavigator();

  const CustomData = require("./custom-data.json");

  //speaker objects
  const [speakers, setSpeakers] = useState(null);
  //session objects containing assigned speaker objects
  const [sessions, setSessions] = useState(null);
  //list of session objects to appear in the users timeline
  const [bookmarks, setBookmarks] = useState([]);
  //boolean for whether the id's have been retrived from the db or not
  const [isLoading, setIsLoading] = useState(true);

  // // refresh the app when the bookmarks change
  // const [refresh, setRefresh] = useState(false);
  // useEffect(() => {
  //   setRefresh(!refresh);
  // }, [bookmarks]);

  // context value
  const value = {
    speakers,
    sessions,
    bookmarks,
    setSpeakers,
    setSessions,
    setBookmarks,
  };

  // fetching speakers, creating objects from those speakers, then passing them in to the fetchsessions function that creates session objects with the proper speakers objects
  useEffect(() => {
    fetch(CustomData.speakersURL)
      .then((response) => response.json())
      .then((data) => {
        let all_speakers = [];
        data.map((speaker) => {
          let classinstance = new Speaker(speaker);
          all_speakers.push(classinstance);
        });
        setSpeakers(all_speakers);
        fetchSessions(all_speakers);
      });
  }, []);

  const fetchSessions = (all_speakers) => {
    fetch(CustomData.sessionsURL)
      .then((response) => response.json())
      .then((data) => {
        let classinstance = new Sessions(data[0], all_speakers);
        setSessions(classinstance);
      });
  };

  // load bookmarked sessions from db using asyncstorage when sesssions is not null
  useEffect(() => {
    if (sessions === null) {
      return;
    } else {
      load();
    }
  }, [sessions]);

  const load = async() => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      // loops through all values and adds them to the bookmarks array
      return keys.map((session_id) => {
        const id = sessions.sessions.find(
          (session) => session.id === session_id
        );
        setBookmarks((bookmarks) => [...bookmarks, id]);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // checks if sessions is null, if it is then it returns
    if (sessions === null) {
      return;
    } else {
      // loops through all bookmarks and saves them to the db
      bookmarks.map((session) => {
        AsyncStorage.setItem(session.id, session.id);
      });
    }
  }, [bookmarks]);

  // only shows app home page if bookmarks are done loading from db
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SessionizeContext.Provider value={value}>
      <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator screenOptions={{ headerTintColor: MyTheme.colors.primary }}>
          <Drawer.Screen name="Overview" component={Overview} />
          <Drawer.Screen name="Speakers" component={Speakers} />
          <Drawer.Screen name="Sponsors" component={Sponsors} />
          <Drawer.Screen name="Schedule" component={Schedule} />
          <Drawer.Screen name="My Timeline" component={MyTimeline} />
          {/* <Drawer.Screen name="Feedback" component={Feedback} /> */}
          <Drawer.Screen name="Code of Conduct" component={CodeOfConduct} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SessionizeContext.Provider>
  );
}

const MyTheme = {
  dark: true,
  colors: {
    primary: "#DBE9EE",
    secondary: "#C4C4C4",
    tertiary: "#4A6FA5",
    background: "#166088",
    card: "#166088",
    text: "white",
    border: "#166088",
    notification: "#00FFFF",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
