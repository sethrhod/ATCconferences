import Speaker from './Speaker_class';
import fetchSessions from './fetchSessions';

export default function fetchAllData(
  event,
  customData,
  setSessions,
  setSpeakers,
  uuid,
) {
  fetch(event.speakerAPI)
    .then(response => response.json())
    .then(data => {
      let all_speakers = [];
      data.map(speaker => {
        let classinstance = new Speaker(speaker);
        all_speakers.push(classinstance);
      });
      setSpeakers(all_speakers);
      fetchSessions(event, customData, all_speakers, setSessions, uuid);
    });
}
