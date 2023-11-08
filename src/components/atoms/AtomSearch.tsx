import React, { FC, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '../../styles';
import { SEARCH_BAR_HIGHT, SEARCH_BAR_TEXT } from '../../contents';
import { StackPramList } from '../../types';
import { useNavigation } from '@react-navigation/native';
import SvgIcon from '../../images/SvgIcon';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'searchScreen'>;
  text: string;
  setText: (e: string) => void;
};

const AtomSearch: FC<Props> = ({ text, setText }) => {
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'searchScreen'>>();
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
          <SvgIcon
            type={'ionicons'}
            name='chevron-back'
            size={28}
            color={COLORS.MAIN_TEXT_COLOR}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textArea}>
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={(e) => setText(e)}
          placeholder='検索'
          style={styles.textInput}
          clearButtonMode={'always'}
        />
        <View style={styles.icon}>
          <SvgIcon
            type={'antDesign'}
            name='search1'
            size={18}
            color={COLORS.SEARCH_ICON}
          />
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
  textArea: {
    width: '100%',
  },
  textInput: {
    height: SEARCH_BAR_HIGHT,
    fontSize: SEARCH_BAR_TEXT,
    borderRadius: 50,
    paddingLeft: 30,
    paddingRight: 5,
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
