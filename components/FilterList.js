import React from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '@react-navigation/native';

export default function FilterList(props) {
  const {colors} = useTheme();

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
        <Text style={{color: colors.text, fontSize: 15}}>
          {props.item.name}
        </Text>
        <Pressable
          style={{
            marginLeft: 10,
            backgroundColor: colors.background,
            borderRadius: 5,
            padding: 5,
          }}
          onPress={() => {
            let newFilterOptions = [...props.filterOptions];
            if (props.item.name === 'My Timeline') {
              newFilterOptions[0].value = !newFilterOptions[0].value;
            } else {
              newFilterOptions[filterView].options[props.itemIndex].value =
                !newFilterOptions[filterView].options[props.itemIndex].value;
            }
            props.setFilterOptions(newFilterOptions);
          }}>
          <Text style={{color: colors.text, fontSize: 15}}>
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
        <Text style={{color: colors.text, fontSize: 15}}>
          {props.item.name}
        </Text>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => {
            setFilterView(props.index);
          }}>
          <Icon name="chevron-circle-down" size={20} color={colors.text} />
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
        <Icon name="filter" size={20} color={colors.text} />
        <Text style={{color: colors.text, fontSize: 20, marginLeft: 10}}>
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
                backgroundColor: colors.tertiary,
                shadowColor: colors.background,
              },
            ]}>
            {filterView ? (
              <SafeAreaView>
                <TouchableOpacity onPress={() => setFilterView(null)}>
                  <Icon
                    name="chevron-circle-left"
                    size={20}
                    color={colors.text}
                  />
                </TouchableOpacity>
                <FlatList
                  style={{
                    borderRadius: 5,
                    padding: 5,
                  }}
                  data={props.filterOptions[filterView].options}
                  renderItem={({item, index}) => (
                    <FlatListItem
                      item={item}
                      itemIndex={index}
                      filterOptions={props.filterOptions}
                      setFilterOptions={props.setFilterOptions}
                    />
                  )}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{paddingBottom: 50}}
                />
              </SafeAreaView>
            ) : (
              <View>
                <FlatListItem
                  item={props.filterOptions[0]}
                  index={0}
                  filterOptions={props.filterOptions}
                  setFilterOptions={props.setFilterOptions}
                />
                <FilterOptionsList item={props.filterOptions[1]} index={1} />
                <FilterOptionsList item={props.filterOptions[2]} index={2} />
              </View>
            )}
          </View>
          <Pressable
            style={{...styles.button, backgroundColor: colors.tertiary}}
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
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
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
});
