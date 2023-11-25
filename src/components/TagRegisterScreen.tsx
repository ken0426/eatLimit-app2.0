import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MolHeader from './molecules/MolHeader';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import { BUTTON_TEXT, HEADER_TYPE, MODAL_MESSAGE } from '../contents';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import AtomButton from './atoms/AtomButton';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import { setTagList } from '../redux/slices/commonSlice';
import { StackPramList } from '../types';
import OrgModalDefault from './organisms/OrgModalDefault';

const TagRegisterScreen = () => {
  const route = useRoute<RouteProp<StackPramList, 'tagRegisterScreen'>>();
  const dispatch = useRootDispatch();
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);
  const tagList = useRootSelector((state) => state.common.tagList);
  const tagData = route.params?.data;
  const setListData = route.params?.setListData;
  const [text, setText] = useState(tagData?.name || '');
  const [isVisible, setIsVisible] = useState(false);

  /** 画面を表示した際にキーボードを初回表示し、キーボードを閉じるとワーニングが表示されるのを防ぐためのフック */
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 550));
      if (inputRef.current) inputRef.current.focus();
    })();
  }, []);

  /** タグの登録 */
  const onRightPress = () => {
    if (text.length) {
      const tagListCopy = [...tagList];

      if (tagData?.id && setListData) {
        const tagIndex = tagListCopy.findIndex(
          (item) => item.id === tagData.id
        );
        tagListCopy.splice(tagIndex, 1, { id: tagData.id, name: text });

        // TODO ここでAPIを叩き、DBへの保存が完了したらreduxにデータを保存し、リストの更新を行う

        setListData(tagListCopy);
        dispatch(setTagList(tagListCopy));
      } else {
        // TODO ここでAPIを叩き、DBへの保存が完了したらreduxにデータを保存する
        dispatch(
          setTagList([...tagListCopy, { id: String(uuid.v4()), name: text }])
        );
      }
      navigation.goBack();
    }
  };

  /** タグの削除 */
  const onTagDeletePress = () => {
    if (setListData) {
      const tagListCopy = [...tagList];
      const postTagData = tagListCopy.filter((item) => item.id !== tagData?.id);

      // TODO ここでAPIを叩き、DBへの保存が完了したらreduxにデータを保存し、リストの更新を行う

      setListData(postTagData);
      dispatch(setTagList(postTagData));
      setIsVisible(false);
      navigation.goBack();
      if (!postTagData.length) {
        // タグのデータをすべて削除した場合は設定画面に戻す
        navigation.goBack();
      }
    }
  };

  /** 削除時に使用するボタンのデータ */
  const modalButtonData = [
    {
      text: BUTTON_TEXT.CANCEL,
      onPress: () => setIsVisible(false),
    },
    {
      text: BUTTON_TEXT.OK,
      onPress: onTagDeletePress,
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            ref={inputRef}
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
          {tagData?.id && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setIsVisible(true)}
            >
              <Text style={styles.deleteButtonText}>タグを削除</Text>
            </TouchableOpacity>
          )}
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

        <OrgModalDefault
          isVisible={isVisible}
          message={MODAL_MESSAGE.TAG_DELETE}
          data={modalButtonData}
          cancelOnPress={() => setIsVisible(false)}
        />
      </View>
    </TouchableWithoutFeedback>
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
    paddingTop: SIZE.BASE_WP * 50,
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
  deleteButton: {
    marginBottom: SIZE.BASE_WP * 5,
  },
  deleteButtonText: {
    color: COLORS.RED,
    fontSize: FONTSIZE.SIZE20PX,
  },
});
