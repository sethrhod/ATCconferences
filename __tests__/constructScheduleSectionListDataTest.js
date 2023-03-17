import constructSectionListData from "../components/scripts/constructScheduleSectionListData";

data = [
  {
    "groupId": null,
    "groupName": "All",
    "sessions": [
      {
        "questionAnswers": [],
        "id": "b5d96beb-0c81-491a-86ee-ed98f061b524",
        "title": "Check-in",
        "description": null,
        "startsAt": "2023-03-25T07:45:00",
        "endsAt": "2023-03-25T08:45:00",
        "isServiceSession": true,
        "isPlenumSession": true,
        "speakers": [],
        "categories": [],
        "roomId": 32505,
        "room": "Building Q Lobby",
        "liveUrl": null,
        "recordingUrl": null
      },
      {
        "questionAnswers": [],
        "id": "443291",
        "title": "Success in a Chaotic IT World: Tips for New and Seasoned Pros",
        "description": "Get ready for a wild ride through the world of IT! In this keynote, we'll explore the often chaotic and always evolving world of technology, and provide tips and tricks for success, no matter where you are in your IT journey. Whether you're just starting out or you've been in the game for years, you'll discover the importance of staying on top of the latest developments in on-premises, hybrid cloud, and multi-cloud environments.\r\n\r\nWe'll delve into the key components of each environment, what skills you can carry over into each one and throw in a little dash of flavour with essential soft skills to achieve optimal results. We'll also discuss “the challenges” that come with managing these complex systems, such as scaling, monitoring, and troubleshooting, and offer practical advice for overcoming these hurdles.\r\n\r\nThis talk is designed to be both informative and entertaining, so we'll mix in plenty of humor and real-world examples to keep things interesting. By the end of the session, you'll have a solid understanding of the key elements of successful IT, and you'll be equipped with practical tips and resources to help you navigate your own IT journey with confidence. So buckle up, grab a coffee (or beer), and get ready to laugh your way to IT success!",
        "startsAt": "2023-03-25T08:45:00",
        "endsAt": "2023-03-25T09:45:00",
        "isServiceSession": false,
        "isPlenumSession": true,
        "speakers": [
          {
            "id": "d7fdc162-8d66-4dad-9568-8fab55851814",
            "name": "Rick Claus"
          }
        ],
        "categories": [],
        "roomId": 32504,
        "room": "Auditorium 202",
        "liveUrl": null,
        "recordingUrl": null
      }
    ]
  }
]

const sessions = {
  "data" : data,
  "sessions" : data[0].sessions,
  "start_times" : data[0].sessions.map((session) => session.startsAt),
  "end_times" : data[0].sessions.map((session) => session.endsAt),
  "rooms" : data[0].sessions.map((session) => session.room)
}
const bookmarks = [];
const Check_in = data[0].sessions[0];
const Success_in_a_Chaotic_IT_World = data[0].sessions[1];

describe("constructScheduleSectionListData", () => {
  it("should return the correct data", () => {
    expect(constructSectionListData(sessions, bookmarks)).toEqual([
      {
        title: "7:45 AM",
        data: [Check_in]
      },
      {
        title: "8:45 AM",
        data: [Success_in_a_Chaotic_IT_World]
      }
    ]);
  });
});
