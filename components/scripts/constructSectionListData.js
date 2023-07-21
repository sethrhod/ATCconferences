import format_time from './formatTime';

// a function that costructs a list of session data thats compatible with the SectionList component
const constructSectionListData = (sessions, bookmarks) => {

  // create an empty array to store the data
  let data = [];

  // loop through the sessions
  sessions.start_times.forEach(time => {
    console.log(time);
    // create an empty object to store the data
    let obj = {};
    // set the title of the object to the start time of the session and add to the same hour sessions
    obj.title = format_time(time)
    
    // set the data of the object to the sessions that start at the same time
    obj.data = sessions.sessions.filter(session => session.startsAt == time);
    // set the index of the object to the index of the time in the start_times array
    const startTimesArray = Array.from(sessions.start_times);
    obj.index = startTimesArray.indexOf(time);
    // push the object to the data array
    data.push(obj);
  });
  // return the data array
  return data;
};

export default constructSectionListData;