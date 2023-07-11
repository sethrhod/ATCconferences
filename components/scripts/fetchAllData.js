import Speaker from './Speaker_class';
import fetchSessions from './fetchSessions';
import fetchWithTimeout from './fetchWithTimeout';

export default async function fetchAllData(
  setTimeoutError,
  event,
  customData,
  setSessions,
  setSpeakers,
  uuid,
) {
  try {
    const response = await fetchWithTimeout(event.speakerAPI, {
      timeout: 8000,
    });

    const data = await response.json();

    let all_speakers = [];

    data.map(speaker => {
      let classinstance = new Speaker(speaker);
      all_speakers.push(classinstance);
    });

    setSpeakers(all_speakers);
    fetchSessions(event, customData, all_speakers, setSessions, uuid);
  } catch (error) {
    console.log(error.name === 'AbortError');
    setTimeoutError(true);
  }
}
