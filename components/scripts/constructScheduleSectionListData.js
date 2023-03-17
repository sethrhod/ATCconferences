import Moment from "react-moment";
import { Text } from "react-native";

// a function that costructs a list of session data thats compatible with the SectionList component
const constructSectionListData = (sessions, bookmarks) => {
  // create an empty array to store the data
  let data = [];

  // loop through the sessions
  sessions.start_times.forEach((time) => {
    console.log(time);
    // create an empty object to store the data
    let obj = {};
    // set the title of the object to the start time of the session and add to the same hour sessions
    obj.title = <Moment element={Text} format="h:mm A">{time}</Moment>;
    // set the data of the object to the sessions that start at the same time
    obj.data = sessions.sessions.filter(
      (session) => session.startsAt == time
    );
    obj.data.forEach((session) => {
      //check if bookmarks array is empty and if it is, set the bookmarked state to false
      if (bookmarks.length === 0) {
        session.bookmarked = false;
      } else {
        // compare ids in sessions and bookmarks array, if id exists in both, set bookmarked state of the session to true
        bookmarks.forEach((bookmark) => {
          if (session.id === bookmark.id) {
            session.bookmarked = true;
          }
        });
      }
    });
    // push the object to the data array
    data.push(obj);
  });
  // return the data array
  return data;
};

export default constructSectionListData;