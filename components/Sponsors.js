import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  Linking,
} from 'react-native';
import SessionizeContext from './context/SessionizeContext';
import Session from './Session';

export default function Sponsors() {
  const {sessions} = useContext(SessionizeContext);

  const {event} = useContext(SessionizeContext);

  const {appearance} = useContext(SessionizeContext);

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('https://atlcloudconf.com/sponsors.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => console.log('done'));
  }, []);

  const sponsoredSession = props => {
    var sponsored_sessions = [];
    props.sponsors.sessions.forEach(session => {
      // if session id matches sessions id, push
      sessions.sessions.forEach(s => {
        if (s.id == session.id) {
          sponsored_sessions.push(s);
        }
      });
    });
    return sponsored_sessions;
  };

  const SponsorsSession = props => {
    let sponsored_sessions = sponsoredSession(props);
    return (
      <View>
        {sponsored_sessions.map((session, index) => (
          <Session
            session={session}
            key={index}
            starts={session.startsAt}
            ends={session.endsAt}
          />
        ))}
      </View>
    );
  };

  const SubItem = props => (
    <View style={[styles.sub_item, {backgroundColor: event.colors[appearance].foreground}]}>
      <TouchableHighlight onPress={() => Linking.openURL(props.sponsors.url)}>
        <View style={styles.logo_container}>
          <Image style={styles.logo} source={{uri: props.sponsors.uri}} />
        </View>
      </TouchableHighlight>
      <SponsorsSession sponsors={props.sponsors} />
    </View>
  );

  const sponsor_level_color = sponsor_level => {
    switch (sponsor_level) {
      case 'Platinum':
        return '#DFDFE2';
      case 'Gold':
        return '#FFD700';
      default:
        return '#FFFFFF';
    }
  };

  const Item = props => (
    <View style={styles.sponsor_level_container}>
      <Text
        style={[
          styles.sponsor_level,
          {
            color: sponsor_level_color(props.item.sponsor_level),
          },
        ]}>
        {props.item.sponsor_level}
      </Text>
      <FlatList
        data={props.item.sponsors}
        renderItem={({item}) => <SubItem sponsors={item} />}
        contentContainerStyle={{alignItems: 'stretch'}}
        style={{width: '100%'}}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.item_container, {backgroundColor: event.colors[appearance].background}]}>
      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} />}
        contentContainerStyle={{alignItems: 'stretch'}}
        style={{width: '100%'}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item_container: {
    flex: 1,
    width: '100%',
  },
  sponsor_level_container: {
    alignItems: 'center',
    padding: 5,
  },
  sponsor_level: {
    fontSize: 32,
    fontWeight: 'bold',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
  logo_container: {
    padding: 5,
    marginVertical: 8,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  sub_item: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
