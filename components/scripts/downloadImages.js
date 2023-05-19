import RNFS from 'react-native-fs';

export default async function downloadImages(events) {
  for (const event of events) {
    const fileDir = `${RNFS.DocumentDirectoryPath}/${event.logo}`;

    try {
      const image = await RNFS.readFile("../../assets/" + event.logo, 'base64');
      await RNFS.writeFile(fileDir, image, 'base64');
      console.log(`Image saved successfully: ${fileDir}`);
    } catch (error) {
      console.log(`Error saving image: ${error}`);
    }
  }
}
