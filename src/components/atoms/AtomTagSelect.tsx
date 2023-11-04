import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTSIZE, INPUT_HEIGHT, SIZE } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackPramList } from '../../types';

type Props = {
  tagSelectedIds: string[];
  tagList: { id: string; name: string }[];
};

const AtomTagSelect: FC<Props> = ({ tagSelectedIds, tagList }) => {
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'registerScreen'>>();

  const tagData = useMemo(
    () => tagList.filter((item) => tagSelectedIds.includes(item.id)),
    [tagSelectedIds, tagList]
  );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('tagScreen')}
      style={styles.itemArea}
    >
      <Text style={styles.label}>タグ：</Text>
      <View style={styles.displayTagAra}>
        {/* TODO ここはループさせる */}
        {tagData.length ? (
          tagData.map((item) => (
            <View key={item.id} style={styles.tag}>
              <Text style={styles.text}>{item.name}</Text>
            </View>
          ))
        ) : (
          <></>
        )}
      </View>
      <View>
        <MaterialIcons
          name='keyboard-arrow-down'
          size={20}
          color={COLORS.TEXT_COLOR}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AtomTagSelect;

const styles = StyleSheet.create({
  itemArea: {
    flexDirection: 'row',
    minHeight: INPUT_HEIGHT - SIZE.BASE_WP,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
    paddingVertical: SIZE.BASE_WP,
  },
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.TEXT_LABEL,
    fontWeight: '400',
  },
  displayTagAra: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: 7,
    backgroundColor: COLORS.TAG,
    paddingHorizontal: SIZE.BASE_WP * 1.2,
    marginVertical: SIZE.BASE_WP,
    marginHorizontal: SIZE.BASE_WP,
  },
  text: {
    fontSize: FONTSIZE.SIZE18PX,
    fontWeight: 'bold',
    paddingVertical: SIZE.BASE_WP,
  },
});
