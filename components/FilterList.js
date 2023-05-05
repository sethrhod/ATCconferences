import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  SafeAreaView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '@react-navigation/native';
import SessionizeContext from '../SessionizeContext.js';

export default function FilterList(props) {
  const {colors} = useTheme();

  const {sessions} = React.useContext(SessionizeContext);

  const dropdownRef = React.useRef(null);

  const options = {
    'Rooms': [],
    'Times': [],
  }

  if (sessions.rooms) {
    for (const room of sessions.rooms) {
      options.Rooms.push(room);
    }
  }
  if (sessions.start_times) {
    for (const time of sessions.start_times) {
      options.Times.push(time);
    }
  }

  return (
    <View>
      {/* <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {selectedFilter == 'Rooms' ? (
          <View style={styles.centeredView}>
            <View
              style={[styles.modalView, {backgroundColor: colors.secondary}]}>
              <Text style={styles.modalText}>Rooms</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Icon name="times" color={colors.tertiary} size={40} />
              </Pressable>
              <FlatList
                data={rooms}
                style={{flex: 1, width: '100%', height: '100%', margin: 10}}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 10,
                      borderWidth: 1,
                      borderBottomWidth: 0,
                      borderColor: 'black',
                    }}
                    key={index}>
                    <Text style={{color: colors.text}}>{item}</Text>
                  </View>
                )}
                keyExtractor={item => item}
              />
            </View>
          </View>
        ) : selectedFilter == 'Times' ? (
          <View style={styles.centeredView}>
            <View
              style={[styles.modalView, {backgroundColor: colors.secondary}]}>
              <Text style={styles.modalText}>Times</Text>
              <Pressable
                style={{
                  margin: 10,
                }}
                onPress={() => setModalVisible(false)}>
                <Icon name="times" color={colors.tertiary} size={40} />
                <FlatList
                  data={times}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      key={index}>
                      <Text style={{color: colors.text}}>{item}</Text>
                    </View>
                  )}
                  keyExtractor={item => item}
                />
              </Pressable>
            </View>
          </View>
        ) : null}
      </Modal> */}
      <SelectDropdown
        data={props.filterOptions}
        ref={dropdownRef}
        renderDropdownIcon={() => (
          <Icon name="filter" color={colors.text} size={25} />
        )}
        defaultButtonText="Filter"
        buttonStyle={{
          width: 100,
          height: 40,
          backgroundColor: colors.background,
        }}
        buttonTextStyle={{
          fontSize: 15,
          color: colors.text,
        }}
        onBlur={() => {
          dropdownRef.current.reset();
          props.setFilterOptions(['My Timeline', 'Rooms', 'Times']);
        }}
        onSelect={(selectedItem, index) => {
          const objectExists = Object.values(options).includes(selectedItem);
          if (objectExists) {
            dropdownRef.current.reset();
            props.setFilterOptions(['My Timeline', 'Rooms', 'Times']);
            return;
          }
          props.setFilterOptions(options[selectedItem]);
          dropdownRef.current.openDropdown();
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    flex: 1,
    margin: 70,
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});
