import AsyncStorage from '@react-native-async-storage/async-storage';

async function loadBookmarks(event, sessions) {

  const getData = async key => {
    try {
      const Json = await AsyncStorage.getItem(key);
      return Json != null ? Json : null;
    } catch (err) {
      console.log(err);
    }
  };

  const bookmarkedSessions = await getData(event.id);

  var bookmarks = [];

  try {
    const bookmarkedSessionsJSON = JSON.parse(bookmarkedSessions);
    bookmarkedSessionsJSON.map(sessionID => {
      sessions.sessions.map(session => {
        if (sessionID == session.id) {
          bookmarks.push(sessionID);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
  return bookmarks;
}

export default loadBookmarks;
