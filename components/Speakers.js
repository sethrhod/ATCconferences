import { StyleSheet, SafeAreaView, FlatList, View, Text, Image, Linking, TouchableOpacity } from "react-native";
import React, { useContext, memo } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from "../SessionizeContext";

export default function Speakers() {
  const { event } = useContext(SessionizeContext);

  const { speakers } = useContext(SessionizeContext);

  const Item = memo((props) => {

    const isNameValid = (name) => {
      Icon.hasIcon(name.toLowerCase())
    }

    return (
      <View style={[styles.item, { backgroundColor: props.colors.card }]}>

        {/*profile pic*/}

        <Image style={styles.logo} source={{ uri: props.uri }} />

        {/*Name and links*/}

        <View style={{ maxWidth: 130, alignItems: 'center' }}>
          <Text style={[styles.name, { color: props.colors.text }]}>{props.fullName}</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
            {props.links.map((link, index) => {
              var title = link.title;
              // an if statement to catch the company website link and change the icon to a briefcase
              { if (title == "Company Website") { title = "Briefcase" } }
              { if (title == "Blog") { title = "pencil" } }
              return (
                <View key={index} style={{ justifyContent: 'center', padding: 5 }}>
                  <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
                    {
                      Icon.hasIcon(title.toLowerCase()) ? <Icon name={title.toLowerCase()} size={20} color={props.colors.text} item_container /> : null
                    }
                  </TouchableOpacity>
                </View>
              )
            }
            )}
          </View>
        </View>

        {/*bio*/}

        <View style={{ width: 120 }}>
          <Text style={[styles.bio, { color: props.colors.text }]}>{props.tagLine}</Text>
        </View>
      </View>

    );
  });

  return (
    <View style={[styles.container, { backgroundColor: event.colors.background }]}>
      <SafeAreaView style={styles.item_container}>
        <FlatList
          data={speakers}
          renderItem={({ item }) => <Item fullName={item.fullName} uri={item.profilePicture} tagLine={item.tagLine} links={item.links} colors={event.colors} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ alignItems: 'stretch' }}
          style={{ width: '100%' }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item_container: {
    flex: 1,
    width: '100%'
  },
  item: {
    flexDirection: "row",
    justifyContent: 'space-between',
    borderRadius: 15,
    width: '90%',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 17,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  bio: {
    fontSize: 12,
  },
  logo: {
    width: 85,
    height: 85,
    borderRadius: 50,
  }
});

