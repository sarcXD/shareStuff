import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import globalVariables from 'globals/globalVariables';
import {Icon} from 'react-native-elements';
import {HeaderHeightContext} from '@react-navigation/stack';

const CreatePost = ({route, navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [tag, setTag] = useState('');

  const CreateBtn = () => {
    if (title && link) {
      return (
        <View style={styles.submitBtn}>
          <Icon
            type="font-awesome-5"
            color={globalVariables.color.mainCard}
            name="check-circle"
            solid={true}
            size={40}
            onPress={() => {
              console.log('Create Post');
            }}
          />
        </View>
      );
    } else return null;
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <KeyboardAvoidingView behavior={null} style={{flex: 1}}>
          <View style={styles.mainCard}>
            <View>
              <Text style={styles.title}>Playlist Title</Text>
              <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={(text) => setTitle(text)}
                maxLength={80}
                multiline={true}
              />
            </View>
            <View>
              <Text style={styles.title}>Description</Text>
              <TextInput
                style={styles.titleInput}
                value={desc}
                onChangeText={(text) => setDesc(text)}
                maxLength={300}
                multiline={true}
              />
            </View>
            <View>
              <Text style={styles.title}>Link</Text>
              <TextInput
                style={styles.titleInput}
                value={link}
                onChangeText={(text) => setLink(text)}
              />
            </View>
            <View>
              <Text style={styles.title}>Tag</Text>
              <TextInput
                style={styles.titleInput}
                value={tag}
                onChangeText={(text) => setTag(text)}
                maxLength={25}
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
  titleInput: {
    backgroundColor: globalVariables.color.mainCard,
    color: globalVariables.color.secondaryText,
    marginVertical: 5,
  },
  title: globalVariables.styles.title,
  submitBtn: globalVariables.styles.addBtn,
});
export default CreatePost;
