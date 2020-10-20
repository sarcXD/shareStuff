import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import globalVariables from 'globals/globalVariables';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const LoginScreen = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  // phone is for numeric only formatted number with spaces every 4 character
  const [phone, setPhone] = useState('');
  // rawPhone is the numeric only phone number not separated by spaces
  const [rawPhone, setRawPhone] = useState('');
  const [initSpinner, setInitSpinner] = useState(false);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    phoneNumber = '+' + phoneNumber;
    setInitSpinner(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setInitSpinner(false);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      setInitSpinner(true);
      await confirm.confirm(code);
      setInitSpinner(false);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const formatNumber = (num: string) => {
    let onlyNumeric = num.replace(/[^0-9]/g, '');
    setRawPhone(onlyNumeric);
    let formattedText = onlyNumeric.split(' ').join('');
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    setPhone(formattedText);
  };

  const Spinner = () => {
    if (initSpinner) {
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
    } else return null;
  };

  if (!confirm) {
    return (
      <View style={styles.root}>
        <View style={styles.mainCard}>
          {initSpinner ? (
            <Spinner />
          ) : (
            <View>
              <Text style={styles.title}> Phone Number </Text>
              <View style={styles.numContainer}>
                <Text style={styles.numPlus}> + </Text>
                <TextInput
                  style={styles.titleInput}
                  value={phone}
                  onChangeText={(text) => formatNumber(text)}
                  placeholder="92XX XXXX XXXX"
                  placeholderTextColor={globalVariables.color.secondaryText}
                  autoCompleteType="tel"
                  keyboardType="numeric"
                  maxLength={15}
                />
              </View>
              <Button
                title="Confirm"
                onPress={() => {
                  console.log(rawPhone);
                  signInWithPhoneNumber(rawPhone);
                }}
              />
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.mainCard}>
        <Text style={styles.title}> Confirm Code </Text>
        <TextInput
          style={globalVariables.styles.titleInput}
          value={code}
          onChangeText={(text) => setCode(text)}
        />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...globalVariables.styles.viewportRoot,
    justifyContent: 'center',
  },
  mainCard: {
    ...globalVariables.styles.mainCard,
    backgroundColor: globalVariables.color.secondaryLayer,
    padding: 12,
  },
  spinner: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: globalVariables.color.title,
    margin: 5,
  },
  numContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: globalVariables.color.mainCard,
    marginTop: 4,
    marginBottom: 8,
    maxHeight: 50,
  },
  numPlus: {
    color: globalVariables.color.title,
    fontSize: 16,
    marginLeft: 4,
  },
  title: globalVariables.styles.title,
  titleInput: {
    ...globalVariables.styles.titleInput,
    flex: 2,
    margin: 0,
  },
});
export default LoginScreen;
