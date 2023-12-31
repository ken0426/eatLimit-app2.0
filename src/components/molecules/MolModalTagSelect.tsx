import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FILTER_TAB_BAR, LABEL_NAME } from '../../contents';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { TargetFilterData } from '../../types';
import { useRootDispatch } from '../../redux/store/store';
import { setFilterSelectedData } from '../../redux/slices/filterModalSlice';

type Props = {
  selectBar: 0 | 1 | 2;
  tagList: { id: string; name: string }[];
  filterData: TargetFilterData[];
  setTargetFilterData: (e: TargetFilterData) => void;
};

const MolModalTagSelect: FC<Props> = ({
  selectBar,
  tagList,
  filterData,
  setTargetFilterData,
}) => {
  const dispatch = useRootDispatch();
  const selectTagIds = filterData.find(
    (item) => item.elementName === LABEL_NAME.TAG
  )?.id as string[];

  return (
    <View style={selectBar === FILTER_TAB_BAR.TAG ? styles.flex : styles.none}>
      <View style={styles.touchArea}>
        {tagList.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              if (selectTagIds?.includes(item.id)) {
                // 選択を解除
                setTargetFilterData({
                  elementName: LABEL_NAME.TAG,
                  id: selectTagIds.filter((id) => id !== item.id),
                });
                dispatch(
                  setFilterSelectedData({
                    multi: {
                      [LABEL_NAME.TAG]: selectTagIds.filter(
                        (id) => id !== item.id
                      ),
                    },
                  })
                );
              } else {
                const id = [...(selectTagIds || []), item.id];
                // 選択したとき
                setTargetFilterData({
                  elementName: LABEL_NAME.TAG,
                  id,
                });
                dispatch(
                  setFilterSelectedData({ multi: { [LABEL_NAME.TAG]: id } })
                );
              }
            }}
            style={
              selectTagIds?.includes(item.id)
                ? styles.selectedButton
                : styles.noTouchButton
            }
          >
            <Text
              style={
                selectTagIds?.includes(item.id)
                  ? styles.touchButtonText
                  : styles.noTouchButtonText
              }
              numberOfLines={1}
            >
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
  noTouchButton: {
    borderRadius: 4,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TEXT_INPUT,
    marginBottom: SIZE.BASE_WP * 1.6,
  },
  selectedButton: {
    borderRadius: 4,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TEXT_LABEL,
    marginBottom: SIZE.BASE_WP * 1.6,
  },
  noTouchButtonText: {
    color: COLORS.MAIN_TEXT_COLOR,
    fontSize: FONTSIZE.SIZE15PX,
    paddingHorizontal: SIZE.BASE_WP * 3,
    paddingVertical: SIZE.BASE_HP * 1.5,
    fontWeight: 'bold',
  },
  touchButtonText: {
    color: COLORS.SIGN_IN_BUTTON,
    fontSize: FONTSIZE.SIZE15PX,
    paddingHorizontal: SIZE.BASE_WP * 3,
    paddingVertical: SIZE.BASE_HP * 1.5,
    fontWeight: 'bold',
  },
});
