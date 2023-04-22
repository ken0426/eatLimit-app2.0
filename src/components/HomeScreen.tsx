import React, { FC, useState } from 'react';
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ApiData, StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { color } from '../styles';
import { data } from '../moc';
import AtomHome from './atoms/AtomHome';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const renderItem: ListRenderItem<ApiData> = ({ item, index }) => (
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

  return (
    <View style={{ flex: 1 }}>
      <MolHeader
        style={{
          height: 100,
          paddingHorizontal: 20,
          paddingTop: 30,
          backgroundColor: color.mainColor,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        type={'home'}
      >
        <AtomHome navigation={navigation} />
      </MolHeader>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contents: {
    height: 90,
    borderBottomWidth: 0.3,
    borderColor: color.borderLine,
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
