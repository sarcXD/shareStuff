import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import globalVariables from 'globals/globalVariables';
import {Icon} from 'react-native-elements';

const FriendsList = ({friendList, selectedFriends, onChange}) => {
  const getColor = (item, arrayToCheck) => {
    return arrayToCheck?.find((el) => el?.phone === item?.phone)
      ? globalVariables.color.mainCard //seleceted
      : globalVariables.color.secondaryLayer; //not selected / deselected
  };
  const updateFriendsList = (item) => {
    onChange(item);
  };
  const Item = ({item, onPress}) => {
    const [color, setColor] = useState(getColor(item, selectedFriends));
    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
          setColor(getColor(item, selectedFriends));
        }}
        style={[styles.listItem, {backgroundColor: color}]}>
        <Text style={styles.listItemText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => updateFriendsList(item)} />;
  };
  return (
    <View>
      <FlatList
        data={friendList}
        renderItem={renderItem}
        keyExtractor={(item) => item?.key?.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    ...globalVariables.styles.listItem,
    height: 55,
    paddingHorizontal: 20,
  },
  listItemText: {
    color: 'white',
    fontSize: 15,
  },
});
export default FriendsList;
