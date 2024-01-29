import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SvgIcon from '../../images/SvgIcon';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { ApiData } from '../../types';

type Props = {
  item: ApiData;
  numberOfLines?: number;
  iconName: 'keyboard-arrow-down' | 'keyboard-arrow-up';
  lineBreak: number;
};

const AtomMemoAccordionRenderItem: FC<Props> = ({
  item,
  numberOfLines,
  iconName,
  lineBreak,
}) => {
  return (
    <View>
      <Text numberOfLines={numberOfLines} style={styles.memoText}>
        {item.memo}
      </Text>
      {lineBreak > 7 && (
        <View style={styles.accordionIconArea}>
          <SvgIcon
            type={'materialIcons'}
            name={iconName}
            size={30}
            color={COLORS.BLACK}
          />
        </View>
      )}
    </View>
  );
};

export default AtomMemoAccordionRenderItem;

const styles = StyleSheet.create({
  memoText: {
    fontSize: FONTSIZE.SIZE20PX,
  },
  accordionIconArea: {
    position: 'absolute',
    flex: 1,
    bottom: -SIZE.BASE_WP * 7,
    left: 0,
    right: 0,
    alignItems: 'center',
    height: SIZE.BASE_WP * 8,
  },
});
