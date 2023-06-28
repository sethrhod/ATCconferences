import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionizeContext from './context/SessionizeContext';

export default function FilterList(props) {
  const {event, appearance} = useContext(SessionizeContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [filterView, setFilterView] = React.useState(null);

  const FlatListItem = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            styles.filter_item_text,
            {
              color: props.item.value
                ? event.colors[appearance].secondary
                : null,
            },
          ]}>
          {props.item.name}
        </Text>
        <Pressable
          style={{
            marginLeft: 10,
            borderRadius: 5,
            padding: 5,
            backgroundColor: props.item.value
              ? event.colors[appearance].secondary
              : event.colors[appearance].background,
          }}
          onPress={() => {
            let newFilterOptions = [...props.filterOptions];
            newFilterOptions[filterView].options[props.itemIndex].value = !newFilterOptions[filterView].options[props.itemIndex].value;
            props.setFilterOptions(newFilterOptions);
          }}>
          <Text
            style={[
              styles.filter_item_text,
              {color: event.colors[appearance].text},
            ]}>
            {props.item.value ? 'On' : 'Off'}
          </Text>
        </Pressable>
      </View>
    );
  };

  const FilterOptionsList = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 15}}>{props.item.name}</Text>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => {
            setFilterView(props.index);
          }}>
          <Icon name="chevron-circle-down" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
        }}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Icon name="filter" size={20} color={event.colors[appearance].text} />
        <Text
          style={{
            color: event.colors[appearance].text,
            fontSize: 20,
            marginLeft: 10,
          }}>
          Filter
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: event.colors[appearance].primary,
                shadowColor: event.colors[appearance].background,
              },
            ]}>
            {filterView ? (
              <SafeAreaView style={styles.filter_options}>
                <TouchableOpacity onPress={() => setFilterView(null)}>
                  <Icon name="chevron-circle-left" size={20} />
                </TouchableOpacity>
                <FlatList
                  data={props.filterOptions[filterView].options}
                  renderItem={({item, index}) => (
                    <FlatListItem
                      key={index}
                      item={item}
                      itemIndex={index}
                      filterOptions={props.filterOptions}
                      setFilterOptions={props.setFilterOptions}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </SafeAreaView>
            ) : (
              <View>
                <FilterOptionsList item={props.filterOptions[1]} index={1} />
                <FilterOptionsList item={props.filterOptions[2]} index={2} />
              </View>
            )}
          </View>
          <Pressable
            style={{
              ...styles.button,
              backgroundColor: event.colors[appearance].primary,
            }}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    maxHeight: '75%',
    borderRadius: 20,
    marginBottom: 20,
    padding: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  filter_options: {
    flex: 1,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 20,
    marginTop: 0,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filter_item_text: {
    fontSize: 15,
  },
});
