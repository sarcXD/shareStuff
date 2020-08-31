import React from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import globalVariables from 'globals/globalVariables';
import {Icon} from 'react-native-elements';

const FriendsList = [
  {
    id: '1',
    name: 'Talha Aamir',
  },
  {
    id: '2',
    name: 'Taha Ahmad',
  },
  {
    id: '3',
    name: 'Moughees Ahmad',
  },
];

const CreatePlaylist = ({route, navigation}) => {
  const ListItem = ({item}) => {
    return (
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed
              ? globalVariables.color.pressed
              : globalVariables.color.mainCard,
          },
          styles.listItem,
        ]}
        onPress={() => {
          navigation.navigate('LinkDetail', {item: item});
        }}>
        <View style={styles.cardText}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };

  const renderItem = item => {
    return <ListItem item={item.item} />;
  };
  return (
    <View style={styles.root}>
      <View style={styles.mainCard}>
        <View>
          <Text style={styles.title}>Playlist Title</Text>
          <TextInput style={styles.titleInput} maxLength={25} />
        </View>
        <View style={styles.addMembers}>
          <Text style={styles.title}>Add Members</Text>
          <View style={styles.addBtn}>
            <Icon
              type="font-awesome-5"
              color={globalVariables.color.mainCard}
              name="plus"
              solid={true}
              size={15}
              iconStyle={{marginRight: 5}}
            />
            <Text>Add</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: globalVariables.styles.viewportRoot,
  button: {
    width: 192,
    height: 48,
    margin: 25,
  },
  mainCard: {
    backgroundColor: globalVariables.color.secondaryLayer,
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  titleInput: {
    backgroundColor: globalVariables.color.mainCard,
    color: globalVariables.color.secondaryText,
    marginVertical: 5,
  },
  addMembers: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: globalVariables.color.clickable,
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  cardText: {
    ...globalVariables.styles.cardText,
    marginLeft: 35,
  },
  listItem: {
    ...globalVariables.styles.listItem,
    height: 55,
    borderRadius: 40,
  },
  title: globalVariables.styles.title,
  writer: globalVariables.styles.secondaryText,
  unread: globalVariables.styles.bubbleTag,
});
export default CreatePlaylist;
