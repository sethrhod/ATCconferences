import Speaker from "./Speaker_class";
import fetchSessions from "./fetchSessions";

export default function fetchAllData(setSessions, setSpeakers, uuid) {
  const CustomData = require("../../custom-data.json");

  fetch(CustomData.speakersURL)
    .then(response => response.json())
    .then(data => {
      let all_speakers = [];
      data.map(speaker => {
        let classinstance = new Speaker(speaker);
        all_speakers.push(classinstance);
      });
      setSpeakers(all_speakers);
      fetchSessions(all_speakers, setSessions, uuid);
    });
}
