import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MolHeader from './molecules/MolHeader';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import { BUTTON_TEXT, HEADER_TYPE } from '../contents';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import AtomButton from './atoms/AtomButton';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import { setTagList } from '../redux/slices/commonSlice';

const TagRegisterScreen = () => {
  const dispatch = useRootDispatch();
  const navigation = useNavigation();
  const tagList = useRootSelector((state) => state.common.tagList);
  const [text, setText] = useState('');

  const onRightPress = () => {
    const tagListCopy = [...tagList];

    // TODO ここでAPIを叩き、DBへの保存が完了したらreduxにデータを保存する
    dispatch(
      setTagList([...tagListCopy, { id: String(uuid.v4()), name: text }])
    );
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
        <AtomSettingRegister
          title={'タグ作成'}
          isRightText={BUTTON_TEXT.DECISION}
          isRightButton={true}
          onRightPress={onRightPress}
        />
      </MolHeader>

      <View style={styles.contents}>
        <View style={styles.label}>
          <Text style={styles.labelText}>名前</Text>
        </View>
        <TextInput
          placeholder={'タグ名を入力'}
          maxLength={20}
          style={styles.textInput}
          value={text}
          onChangeText={(e) => setText(e)}
        />
        {text.length === 20 && (
          <Text style={styles.errorText}>
            ※入力できる文字数は20文字までです
          </Text>
        )}
      </View>

      <View style={styles.buttonArea}>
        <AtomButton
          onPress={onRightPress}
          buttonText={BUTTON_TEXT.DECISION}
          color={COLORS.WHITE}
          fontSize={FONTSIZE.SIZE25PX}
          backgroundColor={COLORS.BLUE}
          width={wp('90%')}
          buttonStyle={styles.registerButton}
          textStyle={styles.registerButtonText}
        />
      </View>
    </View>
  );
};

export default TagRegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: COLORS.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
    marginBottom: SIZE.BASE_WP * 5,
  },
  contents: {
    marginHorizontal: SIZE.BASE_WP * 8,
    marginTop: SIZE.BASE_WP * 50,
  },
  label: {
    marginBottom: SIZE.BASE_WP * 5,
    marginLeft: -10,
  },
  labelText: {
    fontSize: FONTSIZE.SIZE20PX,
  },
  textInput: {
    fontSize: FONTSIZE.SIZE20PX,
    borderBottomColor: COLORS.DETAIL_BORDER,
    borderBottomWidth: 0.3,
  },
  errorText: {
    marginTop: SIZE.BASE_WP * 2,
    color: COLORS.RED,
    fontSize: FONTSIZE.SIZE18PX,
  },
  buttonArea: {
    alignItems: 'center',
    position: 'absolute',
    bottom: wp('10%'),
    right: 0,
    left: 0,
  },
  registerButton: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 1,
  },
  registerButtonText: {
    paddingVertical: SIZE.BASE_WP * 2.7,
    fontFamily: 'HiraginoSans-W3',
  },
});
