import React, { FC, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ApiData, StackPramList } from '../../types';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { useRootDispatch } from '../../redux/store/store';
import { setUpdateRegisterData } from '../../redux/slices/commonRegisterSlice';
import OrgFilterModal from '../organisms/OrgFilterModal';
import { useFilterRegister } from '../../hooks/useFilterRegister';
import { useListFilter } from '../../hooks/useListFilter';
import SvgIcon from '../../images/SvgIcon';
import OrgModalDefault from '../organisms/OrgModalDefault';
import { BUTTON_TEXT } from '../../contents';
import { deleteImage, deleteList } from '../../api';
import { auth } from '../../firebase';

type Props = {
  setListData: (e: ApiData[]) => void;
  editData: ApiData[];
  data: ApiData[];
  deletePress: boolean;
  setDeletePress: (e: boolean) => void;
  deleteIds: string[];
  setDeleteIds: (e: string[]) => void;
  setIsLoading: (e: boolean) => void;
};

const AtomHome: FC<Props> = ({
  setListData,
  editData,
  data,
  deletePress,
  setDeletePress,
  deleteIds,
  setDeleteIds,
  setIsLoading,
}) => {
  const dispatch = useRootDispatch();
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'homeScreen'>>();
  const [isVisible, setIsVisible] = useState(false);
  /** 一括削除の警告モーダルの表示判定フラグ */
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  /** リセットボタンを押したかどうかのフラグ */
  const [isRestButton, setIsRestButton] = useState(false);

  /** フィルターした内容を管理するhooks */
  const { setTargetFilterData, filterData } = useFilterRegister(isRestButton);

  /** 一覧画面用 */
  useListFilter(editData, filterData, setListData, isVisible);

  /** 削除する画像のID */
  const deleteImageIds = useMemo(() => {
    return editData.flatMap((item) =>
      deleteIds.includes(item.id) && item.imageId ? [item.imageId] : []
    );
  }, [deleteIds]);

  /** 一括削除のモーダルで表示するデータ */
  const deleteData = [
    {
      text: BUTTON_TEXT.CANCEL,
      onPress: () => {
        setIsDeleteVisible(false);
      },
    },
    {
      text: BUTTON_TEXT.OK,
      onPress: async () => {
        try {
          setIsDeleteVisible(false);
          setIsLoading(true);
          // 商品の一括削除
          await Promise.all(
            deleteIds.map((item) => deleteList(auth.currentUser!.uid, item))
          );
          // 商品の画像の一括削除
          if (deleteImageIds.length) {
            await Promise.all(
              deleteImageIds.map((item) =>
                deleteImage(auth.currentUser!.uid, item)
              )
            );
          }
          // 一括削除モードを解除
          setDeletePress(false);
          // 選択中のIDをリセット
          setDeleteIds([]);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      },
    },
  ];

  return (
    <>
      <View style={styles.contents}>
        <View style={styles.settingArea}>
          {deletePress ? (
            /** 一括選択を解除 */
            <TouchableOpacity
              onPress={() => {
                setDeletePress(false);
                setDeleteIds([]);
              }}
            >
              <SvgIcon
                type={'ionicons'}
                name='chevron-back'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          ) : (
            /** 設定 */
            <TouchableOpacity
              onPress={() => navigation.navigate('settingScreen')}
            >
              <SvgIcon
                type={'ionicons'}
                name='settings-outline'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          )}

          {/* 日付 */}
          <View style={{ marginLeft: SIZE.BASE_WP * 1.5 }}>
            <Text style={styles.dateText}>
              {`${moment().format('YYYY年MM月DD日')}`}
            </Text>
          </View>
        </View>
        {deletePress ? (
          <View style={styles.touchRightArea}>
            <TouchableOpacity
              style={styles.deleteButtonArea}
              onPress={() => setIsDeleteVisible(true)}
            >
              <SvgIcon
                type={'materialIcons'}
                name={'delete-outline'}
                size={24}
                color={COLORS.MAIN_TEXT_COLOR}
              />
              <Text style={styles.deleteText}>一括削除</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.touchRightArea}>
            {/* 検索 */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('searchScreen', { data });
              }}
            >
              <SvgIcon
                type={'antDesign'}
                name='search1'
                size={24}
                color={COLORS.MAIN_TEXT_COLOR}
              />
            </TouchableOpacity>

            {/* フィルター */}
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <SvgIcon
                type={'antDesign'}
                name='filter'
                size={24}
                color='black'
              />
            </TouchableOpacity>

            {/* 登録 */}
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  setUpdateRegisterData({
                    eatName: '',
                    image: '',
                    date: '',
                    price: undefined,
                    placeOfPurchase: undefined,
                    management: '',
                    preservation: '',
                  })
                );
                navigation.navigate('registerScreen');
              }}
            >
              <SvgIcon
                type={'antDesign'}
                name='pluscircleo'
                size={24}
                color={COLORS.MAIN_TEXT_COLOR}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <OrgModalDefault
        isVisible={isDeleteVisible}
        cancelOnPress={() => setIsDeleteVisible(false)}
        message={`一括削除を行います。\n削除するとデータは元に戻りません、よろしいですか？`}
        data={deleteData}
      />

      <OrgFilterModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setTargetFilterData={setTargetFilterData}
        filterData={filterData}
        isRestButton={isRestButton}
        setIsRestButton={setIsRestButton}
      />
    </>
  );
};

export default AtomHome;

const styles = StyleSheet.create({
  contents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  settingArea: {
    flexDirection: 'row',
  },
  dateText: {
    fontSize: FONTSIZE.SIZE20PX,
    fontWeight: 'bold',
  },
  touchRightArea: {
    flexDirection: 'row',
    width: SIZE.BASE_WP * 25,
    justifyContent: 'space-between',
  },
  deleteButtonArea: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  deleteText: {
    fontSize: FONTSIZE.SIZE20PX,
    textAlign: 'center',
  },
});
