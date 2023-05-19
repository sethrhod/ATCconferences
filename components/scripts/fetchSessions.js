import getFeedback from './getFeedback';
import Sessions from './Sessions_class';

export default async function fetchSessions(
  event,
  customData,
  all_speakers,
  setSessions,
  uuid,
) {
  await getFeedback(customData, uuid).then(feedback => {
    fetch(event.sessionAPI)
      .then(response => response.json())
      .then(data => {
        let classinstance = new Sessions(data[0], all_speakers, feedback);
        setSessions(classinstance);
      });
  });
}
