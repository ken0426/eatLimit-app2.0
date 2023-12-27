import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTSIZE } from '../../styles';

type Props = {
  displayText: string;
};

const NoListScreen: FC<Props> = ({ displayText }) => {
  return (
    <View style={styles.contents}>
      <Text style={styles.text}>{displayText}</Text>
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
