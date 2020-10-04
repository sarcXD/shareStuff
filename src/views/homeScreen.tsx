import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  TouchableHighlight,
  Alert,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import globalVariables from 'globals/globalVariables';
import {Icon} from 'react-native-elements';

const DATA = [
  {
    id: '1',
    title: 'Ghees',
    unread: '13',
    latestPostTitle: 'check this out guys',
    ownerId: '1',
  },
  {
    id: '2',
    title: 'SharedPlaylist',
    unread: '2',
    latestPostTitle: 'this is unreal',
    ownerId: '2',
  },
  {
    id: '3',
    title: 'Khwaja',
    unread: '7',
    latestPostTitle: 'sick new game for you I mean check ...',
    ownerId: '1',
  },
];

const PLAYLIST = {
  title: 'Khwaja',
  members: [
    {id: '3', name: 'Moughees Ahmad'},
    {id: '1', name: 'Talha Aamir'},
  ],
};

const ME = {
  id: '1',
};

const HomeScreen = ({navigation}) => {
  const renderItem = item => {
    return <ListItem item={item.item} />;
  };

  const [pressedItem, setPressedItem] = useState({});

  React.useLayoutEffect(() => {
    if (Object.keys(pressedItem).length !== 0) {
      if (pressedItem.ownerId === ME.id) {
        navigation.setOptions({
          headerRight: () => (
            <Icon
              type="font-awesome-5"
              color={globalVariables.color.clickable}
              iconStyle={styles.headerBtn}
              onPress={() => {
                // fetch playlist data (title, members)
                // PLAYLIST as dummy data rn
                // go to edit screen
                navigation.navigate('CreatePlaylist', {
                  passedPlaylist: PLAYLIST,
                });
              }}
              name="edit"
            />
          ),
        });
      }
    } else {
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [navigation, pressedItem]);

  const updatePressedState = item => {
    if (Object.keys(pressedItem).length === 0) {
      setPressedItem(item);
    } else {
      setPressedItem([]);
    }
  };

  const getStyleFromState = (pressed, item) => {
    const normal = globalVariables.color.mainCard;
    const press = globalVariables.color.pressed;
    if (pressed) {
      if (Object.keys(pressedItem).length !== 0) {
        return normal;
      } else {
        return press;
      }
    } else if (pressedItem == item) {
      return press;
    } else {
      return normal;
    }
  };
  const ListItem = ({item}) => {
    return (
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: getStyleFromState(pressed, item),
          },
          styles.listItem,
        ]}
        delayLongPress={300}
        onLongPress={() => updatePressedState(item)}
        onPress={() => {
          if (Object.keys(pressedItem).length !== 0) {
            updatePressedState(item);
          } else {
            navigation.navigate('Playlist', {item: item});
          }
        }}>
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
      <View style={styles.addBtn}>
        <Icon
          type="font-awesome-5"
          color={globalVariables.color.mainCard}
          name="folder-plus"
          solid={true}
          size={30}
          onPress={() => {
            let initObj = {title: '', members: []};
            navigation.navigate('CreatePlaylist', {passedPlaylist: initObj});
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
  listItem: {
    ...globalVariables.styles.listItem,
    height: 70,
  },
  headerBtn: {
    marginHorizontal: 10,
    padding: 5,
  },
  cardText: globalVariables.styles.cardText,
  title: globalVariables.styles.title,
  desc: globalVariables.styles.secondaryText,
  unread: globalVariables.styles.bubbleTag,
  addBtn: globalVariables.styles.addBtn,
});
export default HomeScreen;
