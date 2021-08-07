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
import FriendsList from 'components/friendsList';
import SelectedList from 'components/selectedList';
import globalVariables from 'globals/globalVariables';
import {Icon} from 'react-native-elements';

const friendsArray = [
  {
    id: '1',
    name: 'Talha Aamir',
  },
  {
    id: '2',
    name: 'Friend A',
  },
  {
    id: '3',
    name: 'Friend B',
  },
];

const CreatePlaylist = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {passedPlaylist} = route.params;
  const [selectedFriends, setSelectedFriends] = useState([
    ...passedPlaylist.members,
  ]);
  const [playlistObj, setPlaylistObj] = useState({...passedPlaylist});

  const addToSelectedFriends = item => {
    let index = -1;
    let tempIndex = -1;
    let arrayCopy = [...selectedFriends];
    arrayCopy.forEach(ele => {
      tempIndex++;
      if (ele.id === item.id) {
        index = tempIndex;
        return;
      }
    });
    if (index === -1) {
      arrayCopy.push(item);
    } else {
      arrayCopy.splice(index, 1);
    }
    setSelectedFriends(arrayCopy);
    let objCopy = {...playlistObj};
    let newMembers = arrayCopy;
    objCopy.members = newMembers;
    setPlaylistObj(objCopy);
  };

  const removeSelectedItem = item => {
    let arrayCopy = [...selectedFriends];
    let index = arrayCopy.indexOf(item);
    let tempIndex = -1;
    selectedFriends.forEach(ele => {
      tempIndex++;
      if (ele.id === item.id) {
        index = tempIndex;
        return;
      }
    });
    arrayCopy.splice(index, 1);
    setSelectedFriends(arrayCopy);
    let objCopy = {...playlistObj};
    let newMembers = arrayCopy;
    objCopy.members = newMembers;
    setPlaylistObj(objCopy);
  };

  const updateTitle = text => {
    let objCopy = {...playlistObj};
    let newTitle = text;
    objCopy.title = newTitle;
    setPlaylistObj(objCopy);
  };

  const CreateBtn = () => {
    if (playlistObj.title && playlistObj.members.length) {
      return (
        <View style={styles.submitBtn}>
          <Icon
            type="font-awesome-5"
            color={globalVariables.color.mainCard}
            name="plus"
            solid={true}
            size={30}
            onPress={() => console.log('Submit Data')}
          />
        </View>
      );
    } else return null;
  };

  return (
    <View style={styles.root}>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.modalRoot}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Add Friend(s)</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.modalSubmit}> Done </Text>
            </TouchableOpacity>
          </View>
          <FriendsList
            friendList={friendsArray}
            selectedFriends={selectedFriends}
            onChange={addToSelectedFriends}
          />
        </View>
      </Modal>
      <View style={styles.mainCard}>
        <View>
          <Text style={styles.title}>Playlist Title</Text>
          <TextInput
            style={styles.titleInput}
            value={playlistObj.title}
            onChangeText={text => updateTitle(text)}
            maxLength={25}
          />
        </View>
        <View style={styles.addMembers}>
          <Text style={styles.title}>Add Members</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Icon
              type="font-awesome-5"
              color={globalVariables.color.mainCard}
              name="plus"
              solid={true}
              size={15}
              iconStyle={{marginRight: 5}}
            />
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <SelectedList Data={selectedFriends} onChange={removeSelectedItem} />
      </View>
      <CreateBtn />
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
  modalRoot: {
    backgroundColor: globalVariables.color.background,
    height: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(65, 65, 65)',
    height: 57,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  modalHeaderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalSubmit: {
    color: globalVariables.color.clickable,
    fontSize: 18,
    fontWeight: 'bold',
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
  divider: {
    ...globalVariables.styles.divider,
    marginHorizontal: 0,
  },
  title: globalVariables.styles.title,
  writer: globalVariables.styles.secondaryText,
  unread: globalVariables.styles.bubbleTag,
  submitBtn: globalVariables.styles.addBtn,
});
export default CreatePlaylist;
