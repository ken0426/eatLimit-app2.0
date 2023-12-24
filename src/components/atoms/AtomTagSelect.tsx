import React, { FC, useEffect, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTSIZE, INPUT_HEIGHT, SIZE } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PostData, StackPramList } from '../../types';
import SvgIcon from '../../images/SvgIcon';
import { useRootDispatch } from '../../redux/store/store';
import { setTagSelectedIds } from '../../redux/slices/commonRegisterSlice';

type Props = {
  tagSelectedIds: string[];
  tagList: { id: string; name: string }[];
  setData: ({ key, value }: PostData) => void;
  label: string;
  isRequired: boolean;
  defaultTagData: { id: string; name: string }[];
};

const AtomTagSelect: FC<Props> = ({
  tagSelectedIds,
  tagList,
  setData,
  label,
  isRequired,
  defaultTagData,
}) => {
  const dispatch = useRootDispatch();
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'registerScreen'>>();

  const tagData = useMemo(
    () => tagList.filter((item) => tagSelectedIds.includes(item.id)),
    [tagSelectedIds, tagList]
  );

  useEffect(
    () => setData({ key: label, isRequired, value: tagData }),
    [tagData]
  );

  /** コピーや変更などでデフォルトでセットしてあるタグをreduxに保存する */
  useEffect(() => {
    if (defaultTagData.length) {
      const tagsId = defaultTagData.map((item) => item.id);
      dispatch(setTagSelectedIds(tagsId));
      setData({ key: label, isRequired, value: defaultTagData });
    }
  }, [defaultTagData]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('tagScreen')}
      style={styles.itemArea}
    >
      <Text style={styles.label}>タグ：</Text>
      <View style={styles.displayTagAra}>
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
        <SvgIcon
          type={'materialIcons'}
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
    margin: SIZE.BASE_WP,
  },
  text: {
    fontSize: FONTSIZE.SIZE18PX,
    fontWeight: 'bold',
    paddingVertical: SIZE.BASE_WP,
  },
});
