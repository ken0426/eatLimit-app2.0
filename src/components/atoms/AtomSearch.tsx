import React, { FC, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../styles';
import { SEARCH_BAR_HIGHT, SEARCH_BAR_TEXT } from '../../contents';
import { StackPramList } from '../../types';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'searchScreen'>;
  text: string;
  setText: (e: string) => void;
};

const AtomSearch: FC<Props> = ({ navigation, text, setText }) => {
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
          <Ionicons
            name='chevron-back'
            size={28}
            color={COLORS.mainTextColor}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%' }}>
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={(e) => setText(e)}
          placeholder='検索'
          style={styles.textInput}
        />
        <View style={styles.icon}>
          <AntDesign name='search1' size={18} color={COLORS.searchIcon} />
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
    backgroundColor: COLORS.TEXT_INPUT,
    width: '80%',
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    padding: 10,
    height: SEARCH_BAR_HIGHT,
  },
});
