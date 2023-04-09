import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { data } from '../moc';
import moment from 'moment';
import { StackPramList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { color } from '../../styles';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
};

const HomeScreen = ({ navigation }: Props) => {
  const [text, setText] = useState<string>('');

  const renderItem = ({ item, index }: any) => {
    if (item.eatName.match(text)) {
      return (
        <View key={Number(index)} style={{ backgroundColor: '#ffffff' }}>
          <TouchableOpacity
            style={styles.contents}
            onPress={() => {
              navigation.navigate('detailScreen', { item });
              Keyboard.dismiss();
            }}
          >
            <View style={styles.imageArea}></View>
            <View>
              <Text>{item.eatName}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyboardDismissMode='on-drag'
        keyExtractor={(_, index) => index.toString()}
        keyboardShouldPersistTaps='always' // キーボードの閉じる
        // contentInsetAdjustmentBehavior='automatic'
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contents: {
    height: 90,
    borderBottomWidth: 0.3,
    borderColor: '#c2c2c2',
    flexDirection: 'row',
  },
  imageArea: {
    width: 130,
    height: '100%',
    backgroundColor: 'red',
  },
  dateArea: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.mainColor,
  },
  iconArea: {
    position: 'absolute',
    right: 10,
  },
});
