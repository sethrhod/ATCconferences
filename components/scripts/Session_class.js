export default class Session {
  constructor(session, all_speakers) {
    this.id = session.id;
    this.title = session.title;
    this.description = session.description;
    this.startsAt = session.startsAt;
    this.endsAt = session.endsAt;
    this.room = session.room;
    this.speakers_small_object = session.speakers;
    this.speakers = this.getSpeakers(all_speakers);
    this.feedback = session.feedback;
    // the state that determines whether the session is bookmarked or not
    this.bookmarked = false;
  }

  // a method that find the matching speaker id in the all_speakers array and the speakers_small_object array and returns the corresponding speaker object from the all_speakers array
  getSpeakers(all_speakers) {
    var speakers = [];
    // checks if the session has speakers
    if (this.speakers_small_object.length === 0) {
      return speakers;
    } else {
      this.speakers_small_object.forEach((speaker) => {
        var matching_speaker = all_speakers.find(
          (x) => x.id === speaker.id
        );
        speakers.push(matching_speaker);
      });
      return speakers;
    }
  }
}
