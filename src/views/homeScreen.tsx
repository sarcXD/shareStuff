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
import firestore from '@react-native-firebase/firestore';

//const DATA = [
//  {
//    id: '1',
//    title: 'Ghees',
//    unread: '13',
//    latestPostTitle: 'check this out guys',
//    ownerId: '1',
//  },
//  {
//    id: '2',
//    title: 'SharedPlaylist',
//    unread: '2',
//    latestPostTitle: 'this is unreal',
//    ownerId: '2',
//  },
//  {
//    id: '3',
//    title: 'Khwaja',
//    unread: '7',
//    latestPostTitle: 'sick new game for you I mean check ...',
//    ownerId: '1',
//  },
//];

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

const HomeScreen = ({navigation, route}) => {
  const userDetails = route.params.userData;
  const [DATA, setDATA] = useState([]);
  const [pressedItem, setPressedItem] = useState({});

  const getPlaylists = (playlistsRef: any) => {
    let playlistPromises: any = [];
    playlistsRef.forEach((playlist: any) => {
      playlistPromises.push(playlist.get());
    });

    let keyIter = 0;
    let playlists: any = [];
    Promise.all(playlistPromises).then((documentSnapshots: any) => {
      documentSnapshots.forEach((documentSnapshot: any) => {
        if (documentSnapshot.exists) {
          let docData: any = {};
          // assigning a value for react indexing to playlist obj
          // also assigning a value in the object so I can use it to directly compare 2 objects
          docData = documentSnapshot.data();
          docData.key = keyIter;

          playlists.push(docData);
          setDATA(playlists);

          keyIter++;
        }
      });
    });
  };

  React.useEffect(() => {
    getPlaylists(userDetails.playlists);
  });

  React.useLayoutEffect(() => {
    if (Object.keys(pressedItem).length !== 0) {
      if (pressedItem.admins.includes(userDetails.phone)) {
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
                  passedPlaylist: pressedItem,
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

  const updatePressedState = (item) => {
    if (item === [] || item.key === pressedItem.key) {
      setPressedItem([]);
      return;
    }
    setPressedItem(item);
  };

  const getStyleFromState = (pressed, item) => {
    const normal = globalVariables.color.mainCard;
    const press = globalVariables.color.pressed;
    const itemsEqual = item.key === pressedItem.key;
    if (pressed) {
      // if already pressed, and pressed again, highlight should cancel
      if (itemsEqual) {
        return normal;
      } else {
        return press;
      }
    } else if (itemsEqual) {
      return press;
    } else {
      return normal;
    }
  };

  // UTILITY FUNCTION
  const textTruncate = (str, lim) => {
    if (str.length < lim) {
      return str;
    }
    let truncStr = str.substring(0, lim) + '...';
    return truncStr;
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
        onLongPress={() => updatePressedState(item)}
        onPress={() => {
          if (Object.keys(pressedItem).length !== 0) {
            updatePressedState([]);
          } else {
            navigation.navigate('Playlist', {item: item});
          }
        }}>
        <View style={styles.cardText}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.desc}>{textTruncate(item.desc, 30)}</Text>
        </View>
      </Pressable>
    );
  };

  const renderItem = (item) => {
    return <ListItem item={item.item} />;
  };

  return (
    <View style={styles.root}>
      <View style={{marginVertical: 10}}>
        {DATA?.length ? (
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.emptyTextBox}>
            <Text style={styles.emptyText}>
              looks like you haven't created any playlists
            </Text>
          </View>
        )}
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
  emptyTextBox: {
    top: 200,
    alignItems: 'center',
  },
  emptyText: {
    color: globalVariables.color.secondaryText,
  },
  cardText: globalVariables.styles.cardText,
  title: globalVariables.styles.title,
  desc: globalVariables.styles.secondaryText,
  unread: globalVariables.styles.bubbleTag,
  addBtn: globalVariables.styles.addBtn,
});
export default HomeScreen;
