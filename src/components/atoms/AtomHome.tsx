import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { ApiData, StackPramList } from '../../types';
import { FONTSIZE, color } from '../../styles';
import { useRootDispatch } from '../../redux/store/store';
import { setRegisterData } from '../../redux/slices/commonRegisterSlice';

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
      <View>
        <Text style={{ fontSize: FONTSIZE.SIZE20PX, fontWeight: 'bold' }}>
          {`本日${moment().format('YYYY-MM-DD')}`}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('searchScreen', { data: data })}
        >
          <AntDesign name='search1' size={24} color={color.mainTextColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={() => {
            dispatch(
              setRegisterData({
                eatName: '',
                image: '',
                date: '',
              })
            );
            navigation.navigate('registerScreen');
          }}
        >
          <AntDesign name='pluscircleo' size={24} color={color.mainTextColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AtomHome;
