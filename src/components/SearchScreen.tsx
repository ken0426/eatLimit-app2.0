import React, { useEffect, useRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { color } from '../../styles';
import Header from './molecules/Header';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }: any) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back' size={28} color='#ffffff' />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
          }}
        >
          <TextInput
            ref={inputRef}
            placeholder='検索'
            style={{
              height: 40,
              fontSize: 20,
              borderRadius: 50,
              paddingHorizontal: 15,
              backgroundColor: color.TextInput,
              width: '80%',
            }}
          ></TextInput>
        </View>
      </View>
    </Header>
  );
};

export default SearchScreen;
