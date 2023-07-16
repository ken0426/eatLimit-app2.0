import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  text: string;
};

const AtomSettingLabel: FC<Props> = ({ text }) => {
  return (
    <View style={styles.headline}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default AtomSettingLabel;

const styles = StyleSheet.create({
  headline: {
    width: '100%',
    backgroundColor: COLORS.SETTING_LABEL,
    height: SIZE.BASE_HP * 4,
    justifyContent: 'center',
    paddingHorizontal: SIZE.BASE_WP * 2,
  },
  text: {
    fontSize: FONTSIZE.SIZE18PX,
  },
});
