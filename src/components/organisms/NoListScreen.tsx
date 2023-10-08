import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTSIZE } from '../../styles';

const NoListScreen = () => {
  return (
    <View style={styles.contents}>
      <Text style={styles.text}>検索結果がありません。</Text>
    </View>
  );
};

export default NoListScreen;

const styles = StyleSheet.create({
  contents: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: FONTSIZE.SIZE20PX,
    letterSpacing: 1.5,
  },
});
