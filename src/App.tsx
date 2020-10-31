/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import LoginScreen from 'views/loginScreen';
import HomeScreen from 'views/homeScreen';
import Playlist from 'views/playlist';
import LinkDetail from 'views/linkDetail';
import LinkTitle from 'components/linkTitle';
import CreatePlaylist from 'views/createPlaylist';
import CreatePost from 'views/createPost';
import globalVariables from 'globals/globalVariables';
import Onboard from 'views/onboard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser]: any = useState(null);
  const [userDetails, setUserDetails] = useState([]);

  function onAuthStateChanged(user: any) {
    // temp fix around state persistance
    setUser(user);
  }

  function needOnboarding(user: any) {
    firestore()
      .collection('logins')
      .doc(user.phoneNumber)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          //returns {email, name, phoneNumber}
          let userData: any = documentSnapshot.data();
          console.log(userData);
          setUserDetails(userData);
        }
        if (initializing) setInitializing(false);
      });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  useEffect(() => {
    if (user) needOnboarding(user);
    return;
  }, [user?.phoneNumber]);

  const ScreenInit = () => {
    if (user == null) {
      return (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: 'Sign Up',
          }}
        />
      );
    }
    if (!userDetails) {
      return (
        <Stack.Screen
          name="Onboard"
          component={Onboard}
          options={{
            headerTitle: 'Setup Profile',
          }}
          initialParams={{userData: user?._user, colRef: colRef}}
        />
      );
    }
  };

  if (initializing) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: globalVariables.color.navBar,
          },
          headerTintColor: globalVariables.color.title,
        }}>
        {ScreenInit()}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Home',
          })}
          initialParams={{userData: userDetails}}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{title: 'Create Post'}}
        />
        <Stack.Screen
          name="CreatePlaylist"
          component={CreatePlaylist}
          options={{title: 'Create Playlist'}}
        />
        <Stack.Screen
          name="Playlist"
          component={Playlist}
          options={({route}) => ({title: route.params.item.title})}
        />
        <Stack.Screen
          name="LinkDetail"
          component={LinkDetail}
          options={({route}) => ({
            headerTitle: () => (
              <LinkTitle
                title={route.params.item.title}
                writer={route.params.item.writer}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
