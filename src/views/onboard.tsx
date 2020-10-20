import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import globalVariables from 'globals/globalVariables';
import {Icon} from 'react-native-elements';
import {HeaderHeightContext} from '@react-navigation/stack';

const Onboard = ({route, navigation}) => {
  const user = route.params.userData;
  const colRef = route.params.colRef;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const phone = user.phoneNumber;

  const formatNumber = (num: string) => {
    let onlyNumeric = num.replace(/[^0-9+]/g, '');
    let formattedText = onlyNumeric.split(' ').join('');
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    return formattedText;
  };

  const displayPhone = formatNumber(phone);

  const postData = () => {
    colRef
      .doc(phone)
      .set({
        email: email,
        name: name,
        phone: phone,
      })
      .then(() => {
        navigation.navigate('Home', {
          userData: {email: email, name: name, phone: phone},
        });
      });
  };

  const CreateBtn = () => {
    if (phone && email && name) {
      return (
        <View style={styles.submitBtn}>
          <Icon
            type="font-awesome-5"
            color={globalVariables.color.mainCard}
            name="check-circle"
            solid={true}
            size={40}
            onPress={() => {
              postData();
            }}
          />
        </View>
      );
    } else return null;
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.mainCard}>
            <View>
              <Text style={styles.title}>Display Name</Text>
              <TextInput
                style={styles.titleInput}
                value={name}
                onChangeText={(text) => setName(text)}
                maxLength={60}
                multiline={false}
                autoCompleteType="name"
              />
            </View>
            <View>
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.titleInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
                maxLength={80}
                multiline={false}
                autoCompleteType="email"
              />
            </View>
            <View>
              <Text style={styles.title}>Phone Number</Text>
              <TextInput
                style={styles.titleInput}
                value={displayPhone}
                editable={false}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <CreateBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  root: globalVariables.styles.viewportRoot,
  mainCard: {
    backgroundColor: globalVariables.color.secondaryLayer,
    margin: 15,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  titleInput: globalVariables.styles.titleInput,
  title: globalVariables.styles.title,
  submitBtn: globalVariables.styles.addBtn,
});
export default Onboard;
