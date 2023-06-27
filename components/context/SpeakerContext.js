import React from "react";

const SpeakerContext = React.createContext({
  selectedSpeaker: null,
  setSelectedSpeaker: () => {},
});

export default SpeakerContext;