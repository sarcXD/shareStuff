import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Linking,
} from 'react-native';
import globalVariables from 'globals/globalVariables';
import VoteButton from 'components/voteButton';
import {Icon} from 'react-native-elements';

const DATA = {
  postId: '12',
  desc:
    'Man I came across this sickAf video, like checkout how awesome it is,the explanation is too good',
  mainTag: 'tech',
  link: 'https://www.youtube.com/watch?v=C27RVio2rOs',
  totalMore: 2,
  totalLess: 0,
};

const ListItem = ({item}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed
            ? globalVariables.color.pressed
            : globalVariables.color.mainCard,
        },
        styles.listItem,
      ]}
      onPress={() => {}}>
      <View style={styles.cardText}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.unread}>{item.mainTag}</Text>
    </Pressable>
  );
};

//<FlatList
//  data={DATA}
//  renderItem={renderItem}
//  keyExtractor={item => item.id}
//  style={{marginTop: 4}}
///>;
const Playlist = ({route, navigation}) => {
  const renderItem = item => {
    return <ListItem item={item.item} />;
  };
  return (
    <View style={styles.root}>
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
        </View>
      </View>
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
    paddingVertical: 8,
  },
  cardBottom: {
    borderTopColor: globalVariables.color.secondaryText,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: globalVariables.color.secondaryText,
  },
  voteBar: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 4,
    justifyContent: 'space-evenly',
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
  unread: globalVariables.styles.bubbleTag,
});
export default Playlist;
