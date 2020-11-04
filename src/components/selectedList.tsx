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

const SelectedList = ({Data, onChange}) => {
  const handlePress = (item) => {
    onChange(item);
  };
  const SelectedItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.selectedItem}>
        <Icon
          name="times"
          type="font-awesome-5"
          color="red"
          size={20}
          onPress={() => handlePress(item)}
        />
        <View style={styles.verticalDivider} />
        <Text style={styles.selectedText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderSelectedItems = ({item}) => {
    return <SelectedItem item={item} />;
  };
  return (
    <FlatList
      data={Data}
      renderItem={renderSelectedItems}
      keyExtractor={(item) => item?.key?.toString()}
    />
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 6,
    margin: 2,
    borderRadius: 5,
    borderColor: globalVariables.color.secondaryText,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  selectedText: {
    color: 'white',
  },
  verticalDivider: {
    borderLeftWidth: 1,
    borderLeftColor: 'white',
    marginHorizontal: 5,
  },
});

export default SelectedList;
