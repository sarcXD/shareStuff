import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import globalVariables from 'globals/globalVariables';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: globalVariables.variables.clientId,
});

async function onSignInClicked() {
  try {
    await GoogleSignin.hasPlayServices();
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert('Signin already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('Play services are not available');
    } else {
      Alert.alert('An unknown error occurred');
    }
  }
}
const LoginScreen = () => {
  return (
    <View style={styles.root}>
      <GoogleSigninButton
        style={styles.button}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => onSignInClicked()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: globalVariables.color.background,
  },
  labels: {
    color: 'white',
    justifyContent: 'center',
  },
  button: {
    width: 192,
    height: 48,
    margin: 25,
  },
});
export default LoginScreen;
