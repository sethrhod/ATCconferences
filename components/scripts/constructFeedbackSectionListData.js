import getNewTime from "./getNewTime";

// a function that costructs a list of session data thats compatible with the SectionList component
const constructSectionListData = (sessions, feedback) => {
  // create an empty array to store the data
  let data = [];

  let sessionsWithFeedback = [];

  sessions.sessions.forEach((session) => {
    feedback.forEach((feedback) => {
      // if feedback session id matches session id, push the session to the sessionsWithFeedback array if it doesn't already exist
      if (session.id === feedback.sessionid) {
        if (!sessionsWithFeedback.includes(session)) {
          sessionsWithFeedback.push(session);
        }
      }
    });
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
    // add appropraite feedback to the session
    obj.data.forEach((session) => {
      feedback.forEach((feedback) => {
        if (session.id === feedback.sessionid) {
          session.feedback = feedback;
        }
      });
    });
    if (obj.data.length > 0) {
      // push the object to the data array
      data.push(obj);
    }
  });
  // return the data array
  return data;
};

export default constructSectionListData;