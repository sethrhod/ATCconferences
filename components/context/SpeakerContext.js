import React from "react";

const SpeakerContext = React.createContext({
  selectedSpeaker: null,
  bookmarksChanged: false,
  selectedSession: null,
  setSelectedSession: () => {},
  setBookmarksChanged: () => {},
  setSelectedSpeaker: () => {},
});

export default SpeakerContext;