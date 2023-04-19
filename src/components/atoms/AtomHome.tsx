import React, { FC } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { StackPramList } from '../../types';
import { color } from '../../styles';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
};

const AtomHome: FC<Props> = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {`本日${moment().format('YYYY-MM-DD')}`}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('searchScreen')}>
          <AntDesign name='search1' size={24} color={color.textWhite} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={() => Alert.alert('登録画面準備中')}
        >
          <AntDesign name='pluscircleo' size={24} color={color.textWhite} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AtomHome;
