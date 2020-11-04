import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  Modal,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import Contacts from 'react-native-contacts';
import FriendsList from 'components/friendsList';
import SelectedList from 'components/selectedList';
import globalVariables from 'globals/globalVariables';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {parsePhoneNumberWithError, ParseError} from 'libphonenumber-js';
import * as RNLocalize from 'react-native-localize';

const CreatePlaylist = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const passedPlaylist = route.params.passedPlaylist;
  // objects to fetch ... users
  let userData = {};
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [playlistObj, setPlaylistObj] = useState({
    name: passedPlaylist.name,
    desc: passedPlaylist.desc,
    users: [],
  });
  const [contactsList, setContactsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = RNLocalize.getLocales();

  const useReadData = async (key, setter) => {
    try {
      let value = await AsyncStorage.getItem('@' + key);
      if (value) {
        let parsedVal = JSON.parse(value);
        setter(parsedVal);
      }
    } catch (e) {
      console.log('err', err);
    }
  };

  const readData = (key) => {
    try {
      AsyncStorage.getItem('@' + key).then((value) => {
        if (value) {
          let parsedVal = JSON.parse(value);
          userData = parsedVal;
        }
        fetchFromFirebaseDocRef(passedPlaylist.users, setSelectedFriends);
      });
    } catch (e) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    useReadData('contactsList', setContactsList);
    readData('userData');
  }, [contactsList.length]);

  // UTILITY
  // Fetches information of users of the passed playlist object
  // and fills the selectedFriends Object
  const fetchFromFirebaseDocRef = (objRef: any, setter: any) => {
    let promiseArr: any = [];
    console.log(objRef);
    objRef.forEach((ref: any) => {
      if (ref.id !== userData.phone) {
        console.log(1);
        promiseArr.push(ref.get());
      }
    });

    let keyIter = 0;
    let fetchedArr: any = [];
    Promise.all(promiseArr).then((documentSnapshots: any) => {
      documentSnapshots.forEach((documentSnapshot: any) => {
        if (documentSnapshot.exists) {
          let docData: any = {};
          // assigning a value for react indexing to fetchedArr obj
          // also assigning a value in the object so I can use it to directly compare 2 objects
          docData = documentSnapshot.data();
          docData.key = keyIter;

          fetchedArr.push(docData);
          console.log('fetched', fetchedArr);
          setter(fetchedArr);

          keyIter++;
        }
      });
    });
  };

  // UTILITY FUNCTION
  const formatNumber = (num) => {
    let noSpaceNum = num.split(' ').join('');
    if (noSpaceNum[0] === '+') {
      // international format, just return
      return noSpaceNum;
    }
    try {
      // Hardcoded for now since i found no other fix currently
      const phoneNumber = parsePhoneNumberWithError(noSpaceNum, 'PK');
      return phoneNumber.number;
    } catch (error) {
      if (error instanceof ParseError) {
        console.log(error.message);
      } else {
        throw error;
      }
    }
  };

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@' + key, jsonValue);
    } catch (e) {
      console.log('Storing error', e);
    }
  };

  // Basically, for all of the users contacts, pings the firebase db,
  // checks to see if any of the contact exists as a user in the db
  // for the existing ones, adds as contact list, and adds to the asyncStorage
  const setExistingContacts = (contacts, setter) => {
    let verifiedContactsArray = [];
    let userRef = firestore().collection('logins');
    let promiseArr = [];
    // How contacting formatting should work
    // Ask user location. All International numbers will start from +, only local with 0. I think.
    contacts.forEach((el) => {
      let elNumbers = el.phoneNumbers;
      elNumbers.forEach((num) => {
        let formattedNum = formatNumber(num.number);
        if (formattedNum !== undefined) {
          promiseArr.push(userRef.doc(formattedNum).get());
        }
      });
    });

    let keyIter = 0;
    let contactsFound = [];
    setLoading(true);
    Promise.all(promiseArr).then((documentSnapshots) => {
      documentSnapshots.forEach((documentSnapshot) => {
        if (documentSnapshot.exists) {
          let data = {
            key: keyIter,
            ...documentSnapshot.data(),
          };
          contactsFound.push(data);
          setter(contactsFound);
        }
      });
      // add to cache
      if (!contactsFound.length) return;
      storeData('contactsList', contactsFound);
      setLoading(false);
    });
  };

  const askAndGetContacts = () => {
    if (!contactsList.length) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Accept',
      }).then(
        Contacts.getAll().then((contacts) => {
          setExistingContacts(contacts, setContactsList);
        }),
      );
    }
    setModalVisible(true);
  };

  // handles click of contact list modal, adds or removes the selected
  // friends.
  // Updates the playlist users
  const addToSelectedFriends = (item) => {
    let index = -1;
    let tempIndex = -1;
    let arrayCopy = JSON.parse(JSON.stringify(selectedFriends));
    arrayCopy?.forEach((ele) => {
      tempIndex++;
      if (ele.key === item.key) {
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
    let newUsers = arrayCopy;
    let playlistCopy = JSON.parse(JSON.stringify(playlistObj));
    playlistCopy.users = newUsers;
    setPlaylistObj(playlistCopy);
  };

  const removeSelectedItem = (item) => {
    let index = -1;
    let tempIndex = -1;
    let arrayCopy = JSON.parse(JSON.stringify(selectedFriends));
    arrayCopy.forEach((ele) => {
      tempIndex++;
      if (ele.key === item.key) {
        index = tempIndex;
        return;
      }
    });

    arrayCopy.splice(index, 1);
    setSelectedFriends(arrayCopy);
    console.log(selectedFriends);
    let newUsers = arrayCopy;
    let playlistCopy = JSON.parse(JSON.stringify(playlistObj));
    playlistCopy.users = newUsers;
    setPlaylistObj(playlistCopy);
  };

  const updateTitle = (text) => {
    let newTitle = text;
    playlistObj.name = newTitle;
    setPlaylistObj(playlistObj);
  };

  const CreateBtn = () => {
    if (playlistObj.name) {
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

  // UTILITY FUNCTION (SPINNER)
  if (loading) {
    return (
      <View style={styles.spinner}>
        <Text style={styles.loadingText}>Loading</Text>
        <ActivityIndicator
          size="large"
          style={{elevation: 9}}
          color={globalVariables.color.clickable}
        />
      </View>
    );
  }

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
            friendList={contactsList}
            selectedFriends={selectedFriends}
            onChange={addToSelectedFriends}
          />
        </View>
      </Modal>
      <View style={styles.mainCard}>
        <View>
          <Text style={styles.title}>Playlist Name</Text>
          <TextInput
            style={styles.titleInput}
            value={playlistObj.name}
            onChangeText={(text) => updateTitle(text)}
            maxLength={25}
          />
        </View>
        <View style={styles.addMembers}>
          <Text style={styles.title}>Add Members</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              askAndGetContacts();
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
  spinner: globalVariables.styles.spinner,
  loadingText: globalVariables.styles.loadingText,
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
