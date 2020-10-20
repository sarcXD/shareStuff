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
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);

  function onAuthStateChanged(user: any) {
    // temp fix around state persistance
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) needOnboarding(user);
  }

  function needOnboarding(user: any) {
    console.log(user);
    const loginDocument = firestore()
      .collection('logins')
      .doc(user.email)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          //returns {email, name, phoneNumber}
          let userData = documentSnapshot.data();
          setUserDetails(userData);
        }
      });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

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
        {user == null ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: 'Sign Up',
            }}
          />
        ) : !userDetails.length ? (
          <Stack.Screen
            name="Onboard"
            component={Onboard}
            options={{
              headerTitle: 'Setup Profile',
            }}
            initialParams={user?._user}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({navigation, route}) => ({
              headerTitle: 'Home',
            })}
            initialParams={userDetails}
          />
        )}
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
