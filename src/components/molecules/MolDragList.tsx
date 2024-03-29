import React, { FC } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRootDispatch, useRootSelector } from '../../redux/store/store';
import { setTagList } from '../../redux/slices/commonSlice';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DragList, { DragListRenderItemInfo } from 'react-native-draglist';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import SvgIcon from '../../images/SvgIcon';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { StackPramList, TagData } from '../../types';
import { saveTagOrder } from '../../api';
import { auth } from '../../firebase';

type Props = {
  listData: TagData[];
  setListData: (data: TagData[]) => void;
};

const MolDragList: FC<Props> = ({ listData, setListData }) => {
  const dispatch = useRootDispatch();
  const navigation = useNavigation<StackNavigationProp<StackPramList>>();
  const tagsOrderId = useRootSelector((state) => state.common.tagsOrderId);

  const renderItem = ({
    item,
    onDragStart,
    onDragEnd,
    isActive,
    index,
  }: DragListRenderItemInfo<TagData>) => (
    <TouchableOpacity
      key={item.id}
      style={
        isActive
          ? index === listData.length - 1
            ? styles.isActiveLast // 最後のアイテムの場合且つアクティブなら
            : styles.isActive // 最後のアイテム以外の場合且つアクティブなら
          : index === listData.length - 1
          ? styles.lastItem // 最後のアイテムの場合かつアクティブでない場合
          : styles.notActive // 最後のアイテム以外の場合且つアクティブでない場合
      }
      onPress={() =>
        navigation.navigate('tagRegisterScreen', { data: item, setListData })
      }
      onLongPress={() => {
        Haptics.selectionAsync();
        onDragStart();
      }}
      onPressOut={onDragEnd}
    >
      <View style={styles.tagLeftArea}>
        <SvgIcon
          type={'antDesign'}
          name={'tagso'}
          size={26}
          color={COLORS.TAG}
        />
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text}>
          {item.name}
        </Text>
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
    if (auth.currentUser === null) return;
    try {
      const copyListData = [...listData];
      const removed = copyListData.splice(fromIndex, 1);

      copyListData.splice(toIndex, 0, removed[0]);
      // タグの並び順を保存
      await saveTagOrder(copyListData, auth.currentUser.uid, tagsOrderId);
      setListData(copyListData);
      dispatch(setTagList(copyListData));
    } catch (error) {
      throw error;
    }
  };

  return (
    <View style={styles.tagArea}>
      {listData.length ? (
        <DragList
          data={listData}
          keyExtractor={(item: TagData) => item.id.toString()}
          onReordered={onReordered}
          renderItem={renderItem}
          style={styles.tagList}
          onHoverChanged={() => {
            if (Platform.OS === 'ios') {
              Haptics.selectionAsync();
            }
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default MolDragList;

const styles = StyleSheet.create({
  tagArea: {
    alignItems: 'center',
    flex: 1,
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
  isActiveLast: {
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
    marginBottom: SIZE.BASE_WP * 15,
  },
  notActive: {
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
  lastItem: {
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
    marginBottom: SIZE.BASE_WP * 15,
  },
  tagLeftArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: FONTSIZE.SIZE18PX,
    paddingLeft: SIZE.BASE_WP * 1.4,
    flex: 1,
  },
  tagList: {
    height: '100%',
  },
});
