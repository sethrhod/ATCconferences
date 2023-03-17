import Speaker from "../components/scripts/Speaker_class.js";

data = {
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

it('Speaker class constructor', () => {
  const obj = new Speaker(data);
  expect(obj.id).toBe("2362fb2e-8b54-4c76-8e69-55558ae4fa70");
  expect(obj.firstName).toBe("Andrew");
  expect(obj.lastName).toBe("Carmichael");
  expect(obj.fullName).toBe("Andrew Carmichael");
  expect(obj.bio).toBe("Experienced hands-on IT professional, proficient in IT management, IT systems, on premise and cloud-based technologies. In-depth knowledge of Microsoft Azure Cloud Platform, Azure IaaS, Office 365, Microsoft Server and desktop software, Microsoft SQL Server, Microsoft Exchange Server, Active Directory, IIS Server and Office system components including MS Office 365 management. LAN/WAN and Wireless infrastructure design, migration, implementation and management. Experience designing/managing public, private and hybrid cloud platforms in the Microsoft Azure, AWS, Google environments.");
  expect(obj.tagLine).toBe("Andy Carmichael Senior Consultant at Improving");
  expect(obj.profilePicture).toBe("https://sessionize.com/image/a562-400o400o2-L55SmuWskPjSxY8tT3uxAY.png");
  expect(obj.sessions).toEqual([
    {
      "id": 437437,
      "name": "Rise above disaster with Azure cloud technology"
    }
  ]);
  expect(obj.links).toEqual([
    {
      "title": "LinkedIn",
      "url": "https://www.linkedin.com/in/andrew-scott-carmichael/",
      "linkType": "LinkedIn"
    }
  ]);
});