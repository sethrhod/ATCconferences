import React from "react";

const SessionizeContext = React.createContext({
  speakers: null,
  sessions: null,
  bookmarks: [],
  setSpeakers: () => {},
  setSessions: () => {},
  setBookmarks: () => {},
});

export default SessionizeContext;
