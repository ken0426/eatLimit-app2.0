import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FILTER_TAB_BAR } from '../../contents';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  selectBar: 0 | 1 | 2;
  tagList: { id: string; name: string }[];
};

const MolModalTagSelect: FC<Props> = ({ selectBar, tagList }) => {
  return (
    <View style={selectBar === FILTER_TAB_BAR.TAG ? styles.flex : styles.none}>
      <View style={styles.touchArea}>
        {tagList.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {}}
            style={styles.button}
          >
            <Text style={styles.buttonText} numberOfLines={1}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MolModalTagSelect;

const styles = StyleSheet.create({
  touchArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: SIZE.BASE_WP,
  },
  flex: {
    display: 'flex',
  },
  none: {
    display: 'none',
  },
  button: {
    borderRadius: 4,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TEXT_INPUT,
    marginBottom: SIZE.BASE_WP * 1.6,
  },
  buttonText: {
    fontSize: FONTSIZE.SIZE15PX,
    paddingHorizontal: SIZE.BASE_WP * 3,
    paddingVertical: SIZE.BASE_HP * 1.5,
    fontWeight: 'bold',
  },
});
