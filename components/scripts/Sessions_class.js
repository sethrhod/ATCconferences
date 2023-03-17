import Session from "./Session_class.js";

export default class Sessions {
  constructor(data, all_speakers) {
    this.data = data;
    // map the sessions array to a new array of Session objects
    this.sessions = this.getSessions(all_speakers);
    this.start_times = new Set(data.sessions.map((x) => x.startsAt));
    this.end_times = new Set(data.sessions.map((x) => x.endsAt));
    this.rooms = new Set(data.sessions.map((x) => x.room));
  }

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
}
