import { StyleSheet, SafeAreaView, FlatList, View, Text, Image, Linking, TouchableOpacity } from "react-native";
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from "../SessionizeContext";
import { useTheme } from "@react-navigation/native";

const Item = (props) => (
  <View style={[styles.item, {backgroundColor: props.colors.primary}]}>

    {/*profile pic*/}

    <Image style={styles.logo} source={{uri: props.uri}}/>

    {/*Name and links*/}

    <View style={{ maxWidth: 130, alignItems: 'center' }}>
      <Text style={[styles.name, {color: props.colors.card}]}>{props.fullName}</Text>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
        {props.links.map((link, index) => 
          {var title = link.title;
            // an if statement to catch the company website link and change the icon to a briefcase
            {if (title == "Company Website") {title = "Briefcase"}}
            {if (title == "Blog") {title = "pencil"}}
            return (
              <View key={index} style={{ justifyContent: 'center', padding: 5 }}>
                <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
                  <Icon name={title.toLowerCase()} size={20} color={props.colors.card} item_container/>
                </TouchableOpacity>
              </View>
          )}
        )}
      </View>
    </View>

    {/*bio*/}

    <View style={{ width: 120 }}>
      <Text style={[styles.bio, {color: props.colors.card}]}>{props.tagLine}</Text>
    </View>
  </View>
);

export default function Speakers() {

  const { colors } = useTheme();

  const {speakers} = useContext(SessionizeContext);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.item_container}>
        <FlatList
          data={speakers}
          renderItem={({ item }) => <Item fullName={item.fullName} uri={item.profilePicture} tagLine={item.tagLine} links={item.links} colors={colors} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{alignItems: 'stretch'}}
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

