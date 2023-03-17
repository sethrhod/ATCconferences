  // a class that takes in a speaker object from JSON and creates a new speaker object with the same properties

export default class Speaker {
  constructor(speaker) {
    this.id = speaker.id;
    this.firstName = speaker.firstName;
    this.lastName = speaker.lastName;
    this.fullName = speaker.fullName;
    this.bio = speaker.bio;
    this.tagLine = speaker.tagLine;
    this.profilePicture = speaker.profilePicture;
    this.sessions = speaker.sessions;
    this.links = speaker.links;
  }
}