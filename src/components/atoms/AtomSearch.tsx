import React, { FC, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { color } from '../../styles';
import { SEARCH_BAR_HIGHT, SEARCH_BAR_TEXT } from '../../contents';
import { StackPramList } from '../../types';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'searchScreen'>;
};

const AtomSearch: FC<Props> = ({ navigation }) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.contents}>
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back' size={28} color={color.mainTextColor} />
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%' }}>
        <TextInput ref={inputRef} placeholder='検索' style={styles.textInput} />
        <View style={styles.icon}>
          <AntDesign name='search1' size={18} color={color.searchIcon} />
        </View>
      </View>
    </View>
  );
};

export default AtomSearch;

const styles = StyleSheet.create({
  contents: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: SEARCH_BAR_HIGHT,
    fontSize: SEARCH_BAR_TEXT,
    borderRadius: 50,
    paddingLeft: 30,
    paddingRight: 20,
    backgroundColor: color.TextInput,
    width: '80%',
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    padding: 10,
    height: SEARCH_BAR_HIGHT,
  },
});
