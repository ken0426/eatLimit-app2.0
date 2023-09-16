import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Button, Keyboard, StyleSheet, Text } from 'react-native';
import { InputAccessoryView, Platform } from 'react-native';
import { TextInput, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import { MemoTemplateData, StackPramList } from '../types';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import AtomSingleInput from './atoms/AtomSingleInput';
import MolHeader from './molecules/MolHeader';
import { HEADER_TYPE } from '../contents';

type RouteItem = {
  params: {
    data: MemoTemplateData;
  };
};

type Props = {
  navigation: StackNavigationProp<StackPramList, 'memoTemplateUpdateScreen'>;
  route: RouteProp<StackPramList, 'memoTemplateUpdateScreen'> & RouteItem;
};

const MemoTemplateUpdateScreen: FC<Props> = ({ navigation, route }) => {
  const { data } = route.params;
  const inputAccessoryViewID = 'uniqueID';
  const [text, setText] = useState(data.text);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
        <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
          <AtomSettingRegister
            navigation={navigation}
            title={'テンプレート編集'}
            isRightButton={true}
          />
        </MolHeader>

        <View style={{ paddingHorizontal: 10 }}>
          <AtomSingleInput
            label={'項目名'}
            onPressIn={() => {}}
            setData={() => {}}
            textData={data.label}
          />
        </View>
        <View style={styles.memoArea}>
          <TextInput
            value={text}
            onChangeText={(e) => setText(e)}
            style={styles.textInput}
            multiline
            maxLength={500}
          />
          <Text style={{ textAlign: 'right', color: COLORS.TEXT_LABEL }}>
            {`${text.length}／500`}
          </Text>
        </View>

        {Platform.OS === 'ios' && (
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View pointerEvents='box-none' style={styles.completedArea}>
              <Button title='完了' onPress={() => Keyboard.dismiss()} />
            </View>
          </InputAccessoryView>
        )}
      </View>
    </View>
  );
};

export default MemoTemplateUpdateScreen;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: COLORS.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
  memoArea: {
    margin: 10,
    borderLeftWidth: 2.5,
    borderTopWidth: 2.5,
    borderRadius: 5,
    borderColor: '#d6d6d6',
    backgroundColor: '#e9e9e9',
    height: SIZE.BASE_HP * 75,
  },
  textInput: {
    width: '100%',
    height: '100%',
    fontSize: FONTSIZE.SIZE20PX,
    color: 'black',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  completedArea: {
    backgroundColor: '#f1f1f1',
    alignItems: 'flex-end',
  },
});
