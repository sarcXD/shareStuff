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

const CommentSection = ({DATA}) => {
  const renderItem = item => {
    return <ListItem item={item.item} />;
  };

  const ListItem = ({item}) => {
    return (
      <Pressable
        style={[
          DATA.userId === item.userId
            ? styles.commentContainer
            : styles.replyContainer,
        ]}
        onPress={() => {}}>
        <View
          style={[DATA.userId === item.userId ? styles.comment : styles.reply]}>
          <Text style={styles.commentTitle}>{item.name}</Text>
          <Text style={styles.desc}>{item.comment}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.commentSection}>
      <FlatList
        data={DATA.comments}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        initialNumToRender={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentTitle: globalVariables.styles.secondaryText,
  reply: {
    ...globalVariables.styles.commentBase,
    borderTopLeftRadius: 0,
  },
  replyContainer: {
    alignItems: 'flex-start',
  },
  comment: {
    ...globalVariables.styles.commentBase,
    borderTopRightRadius: 0,
    alignItems: 'flex-end',
  },
  commentContainer: {
    alignItems: 'flex-end',
  },
  desc: globalVariables.styles.title,
  commentSection: {
    margin: 5,
    maxHeight: 250,
  },
});
export default CommentSection;