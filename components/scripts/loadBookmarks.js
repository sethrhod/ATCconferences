import AsyncStorage from '@react-native-async-storage/async-storage';

async function loadBookmarks(event) {

  const getData = async key => {
    try {
      const Json = await AsyncStorage.getItem(key);
      return Json;
    } catch (err) {
      console.log(err);
    }
  };

  const bookmarkedSessions = await getData(event.id);
  const bookmarks = JSON.parse(bookmarkedSessions);

  if (!bookmarkedSessions) {
    return [];
  } else {
    return bookmarks;
  }
}

export default loadBookmarks;
