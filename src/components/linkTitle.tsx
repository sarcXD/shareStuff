import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalVariables from 'globals/globalVariables';

const LinkTitle = ({title, writer}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}> {title} </Text>
      <Text style={styles.writer}> {writer} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
  },
  title: {
    color: globalVariables.color.title,
    fontSize: 16,
  },
  writer: {
    fontSize: 14,
    color: globalVariables.color.desc,
  },
});
export default LinkTitle;
