import React from 'react';
import {Alert, StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import globalVariables from 'globals/globalVariables';

const DATA = [
  {
    id: '1',
    title: 'Ghees',
    unread: '13',
    latestPostTitle: 'check this out guys',
  },
  {
    id: '2',
    title: 'SharedPlaylist',
    unread: '2',
    latestPostTitle: 'this is unreal',
  },
  {
    id: '3',
    title: 'Khwaja',
    unread: '7',
    latestPostTitle: 'sick new game for you I mean check ...',
  },
];

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
      onPress={() => {}}>
      <View style={styles.cardText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.latestPostTitle}</Text>
      </View>
      <Text style={styles.unread}>{item.unread}</Text>
    </Pressable>
  );
};

const HomeScreen = () => {
  const renderItem = item => {
    return <ListItem item={item.item} />;
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: globalVariables.color.background,
  },
  button: {
    width: 192,
    height: 48,
    margin: 25,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    borderStyle: 'dotted',
    borderWidth: 1,
  },
  cardText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 7,
    maxWidth: 250,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  desc: {
    fontSize: 14,
    color: globalVariables.color.desc,
  },
  unread: {
    right: 0,
    borderStyle: 'solid',
    borderColor: 'white',
    backgroundColor: globalVariables.color.unread,
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 7,
    marginRight: 15,
    paddingLeft: 6,
    paddingRight: 6,
    height: 20,
  },
});
export default HomeScreen;
