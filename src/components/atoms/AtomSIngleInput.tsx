import React from 'react';
import { Text, View } from 'react-native';
import { color } from '../../styles';

const AtomSIngleInput = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 45,
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: color.detailBorderColor,
      }}
    >
      <Text style={{ fontSize: 18 }}>商品名：</Text>
      <Text
        style={{
          fontSize: 18,
          flex: 1,
          textAlign: 'right',
          paddingRight: 10,
        }}
      >
        いちご
      </Text>
    </View>
  );
};

export default AtomSIngleInput;
