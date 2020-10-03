import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalVariables from 'globals/globalVariables';
import {Icon} from 'react-native-elements';

const VoteButton = ({count, name, btnStyle, clicked, color, iconStyle}) => {
  const colorStyle = {color: color};
  return (
    <View style={styles.btnView}>
      <Text style={[colorStyle, styles.count]}>{count}</Text>
      <View style={btnStyle}>
        <Icon
          type="simple-line-icon"
          name={name}
          color={clicked == 1 ? globalVariables.color.secondaryLayer : color}
          iconStyle={iconStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
});
export default VoteButton;
