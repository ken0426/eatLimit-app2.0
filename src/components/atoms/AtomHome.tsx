import React, { FC, useState } from 'react';
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

type Props = {
  setListData: (e: ApiData[]) => void;
  editData: ApiData[];
  data: ApiData[];
};

const AtomHome: FC<Props> = ({ setListData, editData, data }) => {
  const dispatch = useRootDispatch();
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'homeScreen'>>();
  const [isVisible, setIsVisible] = useState(false);

  /** リセットボタンを押したかどうかのフラグ */
  const [isRestButton, setIsRestButton] = useState(false);

  /** フィルターした内容を管理するhooks */
  const { setTargetFilterData, filterData } = useFilterRegister(isRestButton);

  /** 一覧画面用 */
  useListFilter(editData, filterData, setListData, isVisible);

  return (
    <>
      <View style={styles.contents}>
        <View style={styles.settingArea}>
          {/* 設定 */}
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

          {/* 日付 */}
          <View style={{ marginLeft: SIZE.BASE_WP * 1.5 }}>
            <Text style={{ fontSize: FONTSIZE.SIZE20PX, fontWeight: 'bold' }}>
              {`${moment().format('YYYY年MM月DD日')}`}
            </Text>
          </View>
        </View>
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
            <SvgIcon type={'antDesign'} name='filter' size={24} color='black' />
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
      </View>

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
  touchRightArea: {
    flexDirection: 'row',
    width: SIZE.BASE_WP * 25,
    justifyContent: 'space-between',
  },
});
