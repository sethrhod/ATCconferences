import Sessions from "../components/scripts/Sessions_class";
import Speaker from "../components/scripts/Speaker_class";

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

speaker_data = {
  "id": "2362fb2e-8b54-4c76-8e69-55558ae4fa70",
  "firstName": "Andrew",
  "lastName": "Carmichael",
  "fullName": "Andrew Carmichael",
  "bio": "Experienced hands-on IT professional, proficient in IT management, IT systems, on premise and cloud-based technologies. In-depth knowledge of Microsoft Azure Cloud Platform, Azure IaaS, Office 365, Microsoft Server and desktop software, Microsoft SQL Server, Microsoft Exchange Server, Active Directory, IIS Server and Office system components including MS Office 365 management. LAN/WAN and Wireless infrastructure design, migration, implementation and management. Experience designing/managing public, private and hybrid cloud platforms in the Microsoft Azure, AWS, Google environments.",
  "tagLine": "Andy Carmichael Senior Consultant at Improving",
  "profilePicture": "https://sessionize.com/image/a562-400o400o2-L55SmuWskPjSxY8tT3uxAY.png",
  "sessions": [
    {
      "id": 437437,
      "name": "Rise above disaster with Azure cloud technology"
    }
  ],
  "isTopSpeaker": false,
  "links": [
    {
      "title": "LinkedIn",
      "url": "https://www.linkedin.com/in/andrew-scott-carmichael/",
      "linkType": "LinkedIn"
    }
  ],
  "questionAnswers": [],
  "categories": []
}

let speaker = new Speaker(speaker_data);
let speakers = [speaker];

it("Sessions class constructor", () => {
  let sessions = new Sessions(data[0], speakers);
  expect(sessions.data).toEqual(data[0]);
  expect(sessions.sessions.length).toBe(2);
  expect(sessions.start_times).toEqual(new Set(["2023-03-25T07:45:00", "2023-03-25T08:45:00"]));
  expect(sessions.end_times).toEqual(new Set(["2023-03-25T08:45:00", "2023-03-25T09:45:00"]));
  expect(sessions.rooms).toEqual(new Set(["Building Q Lobby", "Auditorium 202"]));
});
