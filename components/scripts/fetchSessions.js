import getFeedback from "./getFeedback";
import Sessions from "./Sessions_class";

export default async function fetchSessions(all_speakers, setSessions, uuid) {
  const CustomData = require("../../custom-data.json");

  await getFeedback(uuid).then(feedback => {
    fetch(CustomData.sessionsURL)
      .then(response => response.json())
      .then(data => {
        let classinstance = new Sessions(data[0], all_speakers, feedback);
        setSessions(classinstance);
      });
  });
}
