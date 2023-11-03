## How the app works
 - When first opening the app, a request is made to the /events route of the feedback api that returns a list of available events to download.
 - These events are zipped bundles that include the event's correlating photos and a json file containing all of the event's unique properties which are then used to populate the remaining screens of the app.
 - When the user selects an event to download, that zip file is then unzipped and downloaded onto the user's device and saved in the devices Documents directory using the RNFS React Native module.
 - The landing page is then refreshed and the list item that was selected the uses the event json data to populate basic info.
 - The rest of the app is a template that uses the event json data to populate the remaining screens.
 - When the rest
