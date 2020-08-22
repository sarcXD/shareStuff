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
import globalVariables from 'globals/globalVariables';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
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
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
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
