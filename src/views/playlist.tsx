import React from 'react';
import {Alert, StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import globalVariables from 'globals/globalVariables';
import {Icon} from 'react-native-elements';

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

  const renderItem = (item) => {
    return <ListItem item={item.item} />;
  };
  return (
    <View style={styles.root}>
      <View style={{marginVertical: 10}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{marginTop: 4}}
        />
      </View>
      <View style={styles.addBtn}>
        <Icon
          type="font-awesome-5"
          color={globalVariables.color.mainCard}
          name="plus"
          solid={true}
          size={25}
          onPress={() => {
            navigation.navigate('CreatePost');
          }}
        />
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
  addBtn: globalVariables.styles.addBtn,
});
export default Playlist;
