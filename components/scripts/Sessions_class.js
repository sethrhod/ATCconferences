import Session from "./Session_class.js";

export default class Sessions {
  constructor(data, all_speakers, feedback) {
    this.data = data;
    // map the sessions array to a new array of Session objects
    this.sessions = this.getSessions(all_speakers);
    this.start_times = new Set(data.sessions.map((x) => x.startsAt));
    this.end_times = new Set(data.sessions.map((x) => x.endsAt));
    this.rooms = new Set(data.sessions.map((x) => x.room));
    this.all_speakers = all_speakers;
    this.feedback = this.feedback;
    this.matchFeedback(feedback);
  }

  // a method that maps the sessions array to a new array of Session objects

  getSessions(all_speakers) {
    {
      var sessions = [];
      this.data.sessions.forEach((x) => {
        var session = new Session(x, all_speakers);
        sessions.push(session);
      });
      return sessions;
    }
  }

// a method that maps the feedback to the corresponding session

  matchFeedback(feedback) {
    this.sessions.forEach((session) => {
      if (!feedback) {
        return;
      }
      var matching_feedback = feedback.find((x) => x.sessionid === session.id);
      if (matching_feedback) {
        session.feedback = matching_feedback;
      }
    });
  }
}
