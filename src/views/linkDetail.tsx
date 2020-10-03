import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from 'react-native';
import globalVariables from 'globals/globalVariables';
import VoteButton from 'components/voteButton';
import CommentSection from 'components/commentSection';
import {Icon} from 'react-native-elements';
import {HeaderHeightContext} from '@react-navigation/stack';

const DATA = {
  postId: 12,
  userId: 69,
  name: 'talha',
  desc:
    'Man I came across this sickAf video, like checkout how awesome it is,the explanation is too good',
  mainTag: 'tech',
  link: 'https://www.youtube.com/watch?v=C27RVio2rOs',
  totalMore: 2,
  totalLess: 0,
  votes: [
    {voterId: 72, vote: 'plus'},
    {voterId: 69, vote: 'minus'},
  ],
  comments: [
    {id: 1, userId: 72, name: 'moughees', comment: 'wow! pretty good'},
    {
      id: 2,
      userId: 69,
      name: 'talha',
      comment: 'yeah, what do you think about it',
    },
  ],
};

const Playlist = ({route, navigation}) => {
  const [moreTotal, setMoreTotal] = useState(0);
  const [lessTotal, setLessTotal] = useState(0);
  const [activated, setActivated] = useState(0);
  const [myData, setMyData] = useState(DATA);
  const [myComment, setMyComment] = useState('');

  const upDateCount = () => {
    let moreCount = 0;
    let lessCount = 0;
    myData.votes.map(el => {
      if (el.vote === 'plus') {
        if (el.voterId === myData.userId) {
          setActivated(1);
        }
        moreCount++;
      } else if (el.vote === 'minus') {
        if (el.voterId === myData.userId) {
          setActivated(-1);
        }
        lessCount++;
      } else {
        setActivated(0);
      }
    });
    setMoreTotal(moreCount);
    setLessTotal(lessCount);
  };

  const voteToggle = voteName => {
    let notIn: boolean = true;
    myData.votes.map(el => {
      if (el.voterId == myData.userId) {
        notIn = false;
        if (el.vote === voteName) {
          el.vote = '';
        } else {
          el.vote = voteName;
        }
      }
    });
    if (notIn) {
      myData.votes.push({voterId: myData.userId, vote: voteName});
    }
    setMyData(myData);
    upDateCount();
  };

  const addComment = () => {
    if (myComment) {
      let lastIndex = myData.comments.length - 1;
      let newId = myData.comments[lastIndex].id + 1;
      myData.comments.push({
        id: newId,
        userId: myData.userId,
        name: myData.name,
        comment: myComment,
      });
      setMyData(myData);
      setMyComment('');
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    upDateCount();
  });

  return (
    <View style={styles.root}>
      <HeaderHeightContext.Consumer>
        {headerHeight => (
          <KeyboardAvoidingView
            behavior={null}
            keyboardVerticalOffset={headerHeight + 64}>
            <View style={styles.descCard}>
              <View style={styles.cardTop}>
                <Text style={styles.desc}>{myData.desc}</Text>
                <Text
                  style={styles.link}
                  onPress={() => {
                    Linking.openURL(myData.link);
                  }}>
                  {myData.link}
                </Text>
                <View style={styles.mainTagContainer}>
                  <Text style={styles.mainTag}>{myData.mainTag}</Text>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <View style={styles.voteBar}>
                  <TouchableOpacity
                    onPress={() => {
                      voteToggle('plus');
                    }}>
                    <VoteButton
                      count={moreTotal}
                      name="like"
                      btnStyle={[
                        activated == 1
                          ? styles.moreButtonActivated
                          : styles.moreButton,
                      ]}
                      clicked={[activated == 1 ? 1 : 0]}
                      color={globalVariables.color.positive}
                      iconStyle={styles.moreButtonIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      voteToggle('minus');
                    }}>
                    <VoteButton
                      count={lessTotal}
                      name="dislike"
                      btnStyle={[
                        activated == -1
                          ? styles.lessButtonActivated
                          : styles.lessButton,
                      ]}
                      clicked={[activated == -1 ? 1 : 0]}
                      color={globalVariables.color.negative}
                      iconStyle={styles.lessButtonIcon}
                    />
                  </TouchableOpacity>
                </View>
                <CommentSection DATA={myData} />
                <View style={styles.typeBox}>
                  <TextInput
                    style={styles.typeInput}
                    multiline={true}
                    onChangeText={text => {
                      setMyComment(text);
                    }}
                    value={myComment}
                  />
                  <TouchableWithoutFeedback onPress={() => addComment()}>
                    <Icon
                      type="font-awesome"
                      name="paper-plane"
                      disabled={!myComment}
                      disabledStyle={{
                        backgroundColor: 'rgba(0,0,0,0)',
                      }}
                      color={
                        myComment
                          ? globalVariables.color.clickable
                          : globalVariables.color.secondaryText
                      }
                      iconStyle={styles.sendIcon}
                    />
                  </TouchableWithoutFeedback>
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
  descCard: globalVariables.styles.mainCard,
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
    height: 25,
    padding: 3,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  moreButtonActivated: {
    ...globalVariables.styles.bubbleTag,
    backgroundColor: globalVariables.color.positive,
    borderColor: globalVariables.color.positive,
    height: 25,
    padding: 3,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  moreButtonIcon: {
    fontSize: 14,
    margin: 1,
    fontWeight: 'bold',
  },
  lessButton: {
    ...globalVariables.styles.bubbleTag,
    backgroundColor: globalVariables.color.mainCard,
    borderColor: globalVariables.color.negative,
    height: 25,
    padding: 3,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  lessButtonActivated: {
    ...globalVariables.styles.bubbleTag,
    backgroundColor: globalVariables.color.negative,
    borderColor: globalVariables.color.negative,
    height: 25,
    padding: 3,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  lessButtonIcon: {
    fontSize: 13,
    margin: 1,
    fontWeight: 'bold',
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
    backgroundColor: globalVariables.color.secondaryLayer,
    alignItems: 'flex-start',
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
    top: 7,
  },
});
export default Playlist;
