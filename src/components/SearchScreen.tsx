import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../styles';
import Header from './molecules/Header';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }: any) => {
  return (
    <Header
      style={{
        height: 100,
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: color.mainColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <View>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back' size={24} color='black' />
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </Header>
  );
};

export default SearchScreen;
