import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import { setTagList } from '../redux/slices/commonSlice';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DragList, { DragListRenderItemInfo } from 'react-native-draglist';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import MolHeader from './molecules/MolHeader';
import { HEADER_TYPE, LABEL } from '../contents';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import SvgIcon from '../images/SvgIcon';

type TagData = {
  id: number;
  name: string;
};

const TagUpdateScreen = () => {
  const dispatch = useRootDispatch();
  const tagList = useRootSelector((state) => state.common.tagList);
  const [listData, setListData] = useState([...tagList]);

  const renderItem = ({
    item,
    onDragStart,
    onDragEnd,
    isActive,
  }: DragListRenderItemInfo<TagData>) => (
    <TouchableOpacity
      key={item.id}
      style={isActive ? styles.isActive : styles.touchArea}
      onPress={() => Alert.alert('押した')}
      onLongPress={onDragStart}
      onPressOut={onDragEnd}
    >
      <View style={styles.tagLeftArea}>
        <SvgIcon
          type={'antDesign'}
          name={'tagso'}
          size={26}
          color={COLORS.TAG}
        />
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <SvgIcon
        type={'foundation'}
        name={'list-bullet'}
        size={26}
        color={COLORS.TAG}
      />
    </TouchableOpacity>
  );

  const onReordered = async (fromIndex: number, toIndex: number) => {
    const copyListData = [...listData];
    const removed = copyListData.splice(fromIndex, 1);

    copyListData.splice(toIndex, 0, removed[0]);
    setListData(copyListData);
    dispatch(setTagList(copyListData));
  };

  return (
    <View style={styles.contents}>
      <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
        <AtomSettingRegister title={LABEL.TAG_EDIT} />
      </MolHeader>

      <View style={styles.tagArea}>
        <DragList
          data={listData}
          keyExtractor={(item: TagData) => item.id.toString()}
          onReordered={onReordered}
          renderItem={renderItem}
          style={styles.tagList}
        />
      </View>
    </View>
  );
};

export default TagUpdateScreen;

const styles = StyleSheet.create({
  contents: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: COLORS.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
  tagArea: {
    alignItems: 'center',
  },
  touchArea: {
    flexDirection: 'row',
    marginVertical: SIZE.BASE_WP * 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.TAG,
    borderWidth: 1,
    padding: SIZE.BASE_WP * 2,
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    width: wp('85%'),
    marginHorizontal: wp('5%'),
  },
  isActive: {
    flexDirection: 'row',
    marginVertical: SIZE.BASE_WP * 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.TAG,
    borderWidth: 1,
    padding: SIZE.BASE_WP * 2,
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
    elevation: 5, // Android
    shadowColor: COLORS.BLACK, // iOS
    shadowOffset: { width: 0, height: 2 }, // iOS
    shadowOpacity: 0.2, // iOS
    shadowRadius: 4, // iOS
    transform: [
      { rotate: '-1.2deg' }, // 傾ける角度を指定
      { scale: 1.08 }, // スケールを変更
    ],
    marginHorizontal: wp('5%'),
  },
  tagLeftArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: FONTSIZE.SIZE18PX,
    paddingLeft: SIZE.BASE_WP * 1.4,
  },
  tagList: {
    height: '100%',
  },
});
