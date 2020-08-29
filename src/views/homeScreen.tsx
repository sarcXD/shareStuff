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

const HomeScreen = ({navigation}) => {
  const renderItem = item => {
    return <ListItem item={item.item} />;
  };

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
        onPress={() => navigation.navigate('Playlist', {item: item})}>
        <View style={styles.cardText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.latestPostTitle}</Text>
        </View>
        <Text style={styles.unread}>{item.unread}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.root}>
      <View style={{marginVertical: 10}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
  listItem: {
    ...globalVariables.styles.listItem,
    height: 70,
  },
  cardText: globalVariables.styles.cardText,
  title: globalVariables.styles.title,
  desc: globalVariables.styles.secondaryText,
  unread: globalVariables.styles.bubbleTag,
});
export default HomeScreen;
