import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { color } from '../../../styles';

const AtomSearch = ({ navigation, inputRef }: any) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back' size={28} color='#ffffff' />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TextInput
          ref={inputRef}
          placeholder='検索'
          style={{
            height: 40,
            fontSize: 20,
            borderRadius: 50,
            paddingLeft: 30,
            paddingRight: 20,
            backgroundColor: color.TextInput,
            width: '80%',
          }}
        />
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            padding: 10,
            height: 40,
          }}
        >
          <AntDesign name='search1' size={18} color={'#a78b74'} />
        </View>
      </View>
    </View>
  );
};

export default AtomSearch;
