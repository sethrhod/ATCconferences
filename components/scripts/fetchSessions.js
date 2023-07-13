import getFeedback from './getFeedback';
import Sessions from './Sessions_class';
import fetchWithTimeout from './fetchWithTimeout';

export default async function fetchSessions(
  event,
  customData,
  all_speakers,
  setSessions,
  uuid,
) {
  await getFeedback(customData, uuid).then(async feedback => {
    try {
      const response = await fetchWithTimeout(event.sessionAPI, {
        timeout: 8000,
      });
      const data = await response.json()
      let classinstance = new Sessions(data[0], all_speakers, feedback);
      setSessions(classinstance);
    } catch (error) {
      console.log(error.name === 'AbortError');
      setTimeoutError(true);
    }
  });
}
