import React from 'react';
import {Alert, StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import globalVariables from 'globals/globalVariables';

const DATA = [
  {
    id: '1',
    title: 'Good Idea',
    mainTag: 'tech',
    writer: 'Talha Aamir',
  },
  {
    id: '2',
    title: 'useful video',
    mainTag: 'tech',
    writer: 'Taha Ahmad',
  },
  {
    id: '3',
    title: 'Listen to this',
    mainTag: 'music',
    writer: 'Sarwar',
  },
];

const Playlist = ({route, navigation}) => {
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
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.writer}>{item.writer}</Text>
        </View>
        <Text style={styles.unread}>{item.mainTag}</Text>
      </Pressable>
    );
  };

  const renderItem = item => {
    return <ListItem item={item.item} />;
  };
  return (
    <View style={styles.root}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{marginTop: 4}}
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
    height: 55,
    margin: 2,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 40,
  },
  cardText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 35,
    marginRight: 7,
    maxWidth: 250,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  writer: {
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
export default Playlist;
