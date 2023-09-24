import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ApiData, StackPramList } from '../../types';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { useRootDispatch } from '../../redux/store/store';
import { setUpdateRegisterData } from '../../redux/slices/commonRegisterSlice';
import OrgFilterModal from '../organisms/OrgFilterModal';
import { useFilterRegister } from '../../hooks/useFilterRegister';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
  data: ApiData[];
};

const AtomHome: FC<Props> = ({ navigation, data }) => {
  const dispatch = useRootDispatch();
  const [isVisible, setIsVisible] = useState(false);

  /** フィルター用のhooks */
  const { setTargetFilterData, filterData } = useFilterRegister();

  return (
    <>
      <View style={styles.contents}>
        <View style={{ flexDirection: 'row' }}>
          {/* 設定 */}
          <TouchableOpacity
            onPress={() => navigation.navigate('settingScreen')}
          >
            <Ionicons name='settings-outline' size={24} color='black' />
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
              navigation.navigate('searchScreen', { data: data });
            }}
          >
            <AntDesign
              name='search1'
              size={24}
              color={COLORS.MAIN_TEXT_COLOR}
            />
          </TouchableOpacity>

          {/* フィルター */}
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <AntDesign name='filter' size={24} color='black' />
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
                  keep: '',
                })
              );
              navigation.navigate('registerScreen');
            }}
          >
            <AntDesign
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
  touchRightArea: {
    flexDirection: 'row',
    width: SIZE.BASE_WP * 25,
    justifyContent: 'space-between',
  },
});
