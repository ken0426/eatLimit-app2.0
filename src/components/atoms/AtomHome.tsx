import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ApiData, StackPramList } from '../../types';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { useRootDispatch } from '../../redux/store/store';
import { setUpdateRegisterData } from '../../redux/slices/commonRegisterSlice';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
  data: ApiData[];
};

const AtomHome: FC<Props> = ({ navigation, data }) => {
  const dispatch = useRootDispatch();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('settingScreen', { item: [] })}
        >
          <Ionicons name='settings-outline' size={24} color='black' />
        </TouchableOpacity>
        <View style={{ marginLeft: SIZE.BASE_WP * 1.5 }}>
          <Text style={{ fontSize: FONTSIZE.SIZE20PX, fontWeight: 'bold' }}>
            {`${moment().format('YYYY年MM月DD日')}`}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('searchScreen', { data: data })}
        >
          <AntDesign name='search1' size={24} color={COLORS.MAIN_TEXT_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
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
  );
};

export default AtomHome;
