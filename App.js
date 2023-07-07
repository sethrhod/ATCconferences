import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import { unzip } from 'react-native-zip-archive';
import EventToRenderContext from './components/context/EventToRenderContext';
import Event from './components/Event';
import RNFS from 'react-native-fs';

export default function App() {
  const [events, setEvents] = useState([]);
  const [eventToRender, setEventToRender] = useState(null);
  const CustomData = require('./app.json');

  useEffect(() => {
    fetch(CustomData.DevelopersAssociationofGeorgiaAPI + '/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setEvents(data);
      })
      .catch(error => console.log(error));
  }, []);

  const EventItem = props => {
    const { unzippedPath, data } = props;

    const handlePress = () => {
      data.unzippedPath = unzippedPath;
      setEventToRender(data);
    };

    const format_date = date => {
      const date_object = new Date(date);
      const month = date_object.toLocaleString('default', { month: 'long' });
      const day = date_object.getDate();
      const year = date_object.getFullYear();
      return `${month} ${day}, ${year}`;
    };

    if (data === null) {
      return (
        <View style={styles.item}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => handlePress()}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'file://' + unzippedPath + data.logo }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={{ flex: 1, flexDirection: 'column', margin: 20 }}>
              <Text style={styles.title}>{data.name}</Text>
              <Text style={styles.location}>{data.location}</Text>
            </View>
          </View>
          <View style={styles.description_box} >
            <Text style={styles.description}>{data.description}</Text>
          </View>
          <View style={styles.bottom_box_container}>
            <View style={styles.bottom_box}>
              <Text style={styles.bottom_box_text}>{format_date(data.date)}</Text>
            </View>
            <View style={styles.bottom_box}>
              <Text style={styles.bottom_box_text}>{data.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const DownloadEventItem = props => {
    const url =
      CustomData.DevelopersAssociationofGeorgiaAPI +
      'download/' +
      props.zip_path;

    const fileNameWithExtension = props.zip_path.split('/').pop();
    // Extracts "event_Atlcloudconf.zip"

    // unzip file
    const unzipFile = () => {
      const fileNameWithoutExtension = fileNameWithExtension.slice(0, -4);
      // Removes the last 4 characters (".zip")
      const zippedPath =
        RNFS.DocumentDirectoryPath + '/' + fileNameWithExtension;
      unzip(zippedPath, RNFS.DocumentDirectoryPath)
        .then(() => {
          props.setUnzipped(() => !props.unzipped);
          console.log(`unzip completed at ${props.unzippedPath}`);
        })
        .catch(error => {
          console.log('unzip error', error);
        });
    };

    // download file
    const downloadFile = () =>
      RNFS.downloadFile({
        fromUrl: url,
        toFile: RNFS.DocumentDirectoryPath + '/' + fileNameWithExtension,
      })
        .promise.then(path => {
          console.log('File saved successfully: ' + path);
        })
        .then(() => {
          // unzip file
          unzipFile();
        })
        .catch(error => {
          console.log('Error saving file: ' + error);
        });

    const handlePress = () => {
      downloadFile();
    };

    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => handlePress()}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.title}>{props.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const ListConditionalRender = props => {
    const [fileExists, setFileExists] = useState(false);
    const fileNameWithExtension = props.zip_path.split('/').pop();
    const fileNameWithoutExtension = fileNameWithExtension.slice(0, -4);
    const unzippedPath =
      RNFS.DocumentDirectoryPath + '/' + fileNameWithoutExtension;
    const [unzipped, setUnzipped] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
      const checkFileExists = async () => {
        const exists = await RNFS.exists(unzippedPath);
        if (exists) {
          console.log(unzippedPath + ' exists');
          setFileExists(true);
        } else {
          console.log(unzippedPath + ' does not exist');
          setFileExists(false);
        }
      };
      checkFileExists();
    }, [unzipped]);

    useEffect(() => {
      if (fileExists) {
        const openFirstJsonFileInDirectory = async () => {
          try {
            const files = await RNFS.readDir(unzippedPath);

            // Filter for JSON files
            const jsonFiles = files.filter(file =>
              file.name.toLowerCase().endsWith('.json'),
            );

            if (jsonFiles.length > 0) {
              const firstJsonFilePath = jsonFiles[0].path;

              // Read the JSON file content
              const fileContent = await RNFS.readFile(firstJsonFilePath);

              // Parse the JSON content
              const jsonData = JSON.parse(fileContent);

              // Handle the jsonData as needed
              console.log(jsonData);
              setData(jsonData);
            } else {
              console.log('No JSON files found in the directory.');
            }
          } catch (error) {
            console.log('Error occurred while reading the directory:', error);
          }
        };
        openFirstJsonFileInDirectory();
      }
    }, [fileExists, unzipped]);

    if (fileExists) {
      return <EventItem unzippedPath={unzippedPath} data={data} />;
    } else {
      return (
        <DownloadEventItem
          zip_path={props.zip_path}
          name={props.name}
          date={props.date}
          unzipped={unzipped}
          setUnzipped={setUnzipped}
          unzippedPath={unzippedPath}
        />
      );
    }
  };

  if (eventToRender) {
    return (
      <EventToRenderContext.Provider value={{ setEventToRender }}>
        <Event
          eventToRender={eventToRender}
          setEventToRender={setEventToRender}
          customData={CustomData}
          appearance={Appearance.getColorScheme()}
        />
      </EventToRenderContext.Provider>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events.events}
        style={{ flex: 0.8 }}
        ListHeaderComponent={
          <View
            style={styles.header_container}>
            <Text style={styles.header}>Hello 👋</Text>
            <Text style={styles.subheader}>
              Which event would you like to view?
            </Text>
          </View>
        }
        ListHeaderComponentStyle={{ marginTop: 30 }}
        renderItem={({ item }) => (
          <ListConditionalRender
            zip_path={item.zip_path}
            name={item.name}
            date={item.date}
          />
        )}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

const colors =
  Appearance.getColorScheme() === 'dark'
    ? {
      background: '#121212',
      card: '#2c2c2c',
      text: '#F4F4F5',
      accent: '#4D4D56',
    }
    : {
      background: '#FFFFFF',
      card: '#C9C9CF',
      text: '#000000',
      accent: '#C9C9CF',
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  header: {
    color: colors.text,
    fontSize: 30,
    fontWeight: 'bold',
  },
  header_container: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 20,
  },
  subheader: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
  },
  item: {
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: -1,
      height: 2,
    },
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    color: colors.text,
  },
  location: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    flexWrap: 'wrap',
    textAlign: 'left',
    color: colors.text,
  },
  bottom_box: {
    flex: 1,
    margin: 5,
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 5,
  },
  bottom_box_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  bottom_box_text: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
  },
  description_box: {
    flex: 1,
    margin: 5,
    backgroundColor: colors.accent,
    borderRadius: 10,
    padding: 5,
  },
  description: {
    fontSize: 12,
    letterSpacing: 0.5,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'left',
    margin: 5,
    color: colors.text,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});