import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SvgIcon from '../../images/SvgIcon';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  item: {
    name: string;
  };
};

const AtomDetailTag: FC<Props> = ({ item }) => {
  return (
    <View style={styles.listItem}>
      <SvgIcon
        type={'antDesign'}
        name={'tagso'}
        size={20}
        color={COLORS.BLACK}
      />
      <Text style={styles.tagText}>{item.name}</Text>
    </View>
  );
};

export default AtomDetailTag;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 5,
    backgroundColor: COLORS.TAG,
    marginHorizontal: SIZE.BASE_WP,
    marginVertical: SIZE.BASE_HP * 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZE.BASE_WP,
    paddingHorizontal: SIZE.BASE_WP * 2,
  },
  tagText: {
    fontSize: FONTSIZE.SIZE20PX,
    fontWeight: 'bold',
    marginLeft: SIZE.BASE_WP * 0.5,
  },
});
