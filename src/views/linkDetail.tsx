import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  SectionList,
  Pressable,
  Linking,
} from 'react-native';
import globalVariables from 'globals/globalVariables';
import VoteButton from 'components/voteButton';
import CommentSection from 'components/commentSection';
import {Icon} from 'react-native-elements';
import {HeaderHeightContext} from '@react-navigation/stack';

const DATA = {
  postId: '12',
  userId: '69',
  desc:
    'Man I came across this sickAf video, like checkout how awesome it is,the explanation is too good',
  mainTag: 'tech',
  link: 'https://www.youtube.com/watch?v=C27RVio2rOs',
  totalMore: 2,
  totalLess: 0,
  comments: [
    {id: 1, userId: '72', name: 'moughees', comment: 'wow! pretty good'},
    {
      id: 2,
      userId: '69',
      name: 'talha',
      comment: 'yeah, what do you think about it',
    },
    {id: 3, userId: '72', name: 'moughees', comment: 'about what?'},
    {
      id: 4,
      userId: '69',
      name: 'talha',
      comment: 'for our direction now, how long before we achieve market fit?',
    },
    {id: 5, userId: '72', name: 'moughees', comment: 'testing scrolling'},
    {id: 6, userId: '72', name: 'moughees', comment: 'testing scrolling'},
  ],
};

const Playlist = ({route, navigation}) => {
  return (
    <View style={styles.root}>
      <HeaderHeightContext.Consumer>
        {headerHeight => (
          <KeyboardAvoidingView
            behavior={null}
            keyboardVerticalOffset={headerHeight + 64}>
            <View style={styles.descCard}>
              <View style={styles.cardTop}>
                <Text style={styles.desc}>{DATA.desc}</Text>
                <Text
                  style={styles.link}
                  onPress={() => {
                    Linking.openURL(DATA.link);
                  }}>
                  {DATA.link}
                </Text>
                <View style={styles.mainTagContainer}>
                  <Text style={styles.mainTag}>{DATA.mainTag}</Text>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <View style={styles.voteBar}>
                  <VoteButton
                    count={DATA.totalMore}
                    name="plus"
                    btnStyle={styles.moreButton}
                    color={globalVariables.color.positive}
                    iconStyle={styles.moreButtonIcon}
                  />
                  <VoteButton
                    count={DATA.totalLess}
                    name="minus"
                    btnStyle={styles.lessButton}
                    color={globalVariables.color.negative}
                    iconStyle={styles.lessButtonIcon}
                  />
                </View>
                <CommentSection DATA={DATA} />
                <View style={styles.typeBox}>
                  <TextInput style={styles.typeInput} />
                  <Icon
                    type="font-awesome"
                    name="paper-plane"
                    iconStyle={styles.sendIcon}
                  />
                </View>
              </View>
              <View style={{flex: 1}} />
            </View>
          </KeyboardAvoidingView>
        )}
      </HeaderHeightContext.Consumer>
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
  descCard: {
    backgroundColor: globalVariables.color.mainCard,
    margin: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 15,
    borderColor: globalVariables.color.pressed,
    paddingTop: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    position: 'relative',
  },
  cardBottom: {},
  voteBar: {
    borderTopColor: globalVariables.color.secondaryText,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: globalVariables.color.secondaryText,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 4,
    justifyContent: 'space-evenly',
    backgroundColor: globalVariables.color.secondaryLayer,
  },
  moreButton: {
    ...globalVariables.styles.bubbleTag,
    backgroundColor: globalVariables.color.mainCard,
    borderColor: globalVariables.color.positive,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  moreButtonIcon: {
    fontSize: 14,
    margin: 1,
  },
  lessButton: {
    ...globalVariables.styles.bubbleTag,
    backgroundColor: globalVariables.color.mainCard,
    borderColor: globalVariables.color.negative,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  lessButtonIcon: {
    fontSize: 12,
    margin: 1,
    marginTop: 2,
  },
  cardTop: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  desc: globalVariables.styles.title,
  divider: {
    borderBottomColor: globalVariables.color.secondaryText,
    borderBottomWidth: 1,
    marginHorizontal: 5,
    marginVertical: 9,
  },
  link: {
    color: globalVariables.color.clickable,
    marginVertical: 9,
  },
  mainTagContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  mainTag: {
    ...globalVariables.styles.bubbleTag,
    marginRight: 0,
    marginLeft: 0,
  },
  typeBox: {
    backgroundColor: 'red',
    flexDirection: 'row',
    maxHeight: 45,
    backgroundColor: globalVariables.color.secondaryLayer,
  },
  typeInput: {
    backgroundColor: globalVariables.color.mainCard,
    flex: 2,
    marginLeft: 6,
    marginVertical: 5,
    borderBottomLeftRadius: 10,
    color: 'white',
  },
  sendIcon: {
    margin: 9,
    color: globalVariables.color.secondaryText,
  },
});
export default Playlist;
