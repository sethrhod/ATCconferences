import getNewTime from "./getNewTime";

// a function that costructs a list of session data thats compatible with the SectionList component
const constructSectionListData = (sessions) => {
  // create an empty array to store the data
  let data = [];

  // create an empty array to store the sessions that have feedback
  let sessionsWithFeedback = [];

  sessions.sessions.forEach((session) => {
    if (session.feedback !== undefined) {
      sessionsWithFeedback.push(session);
    }
  });

  // loop through the sessions
  sessions.start_times.forEach((time) => {
    // create an empty object to store the data
    let obj = {};
    // if the time is in the sessionsWithFeedback array, then add it to the data array
    sessionsWithFeedback.forEach((session) => {
      if (session.startsAt == time) {
        obj.title = getNewTime(time);
      }
    });
    // set the data of the object to the sessions that start at the same time
    obj.data = sessionsWithFeedback.filter(
      (session) => session.startsAt == time
    );
    if (obj.data.length > 0) {
      // push the object to the data array
      data.push(obj);
    }
  });
  // return the data array
  return data;
};

export default constructSectionListData;