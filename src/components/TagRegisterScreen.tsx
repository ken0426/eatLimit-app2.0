/** React */
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
/** ライブラリ */
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { auth } from '../firebase';
/** その他 */
import AtomSettingRegister from './atoms/AtomSettingRegister';
import AtomButton from './atoms/AtomButton';
import MolHeader from './molecules/MolHeader';
import OrgModalDefault from './organisms/OrgModalDefault';
import {
  BUTTON_TEXT,
  HEADER_TYPE,
  LABEL_NAME,
  MODAL_MESSAGE,
} from '../contents';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import { StackPramList } from '../types';
import { deleteTag, saveTag, saveTagOrder, saveUpdateTag } from '../api';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import { setTagList } from '../redux/slices/commonSlice';
import { setFilterSelectedData } from '../redux/slices/filterModalSlice';

const TagRegisterScreen = () => {
  const route = useRoute<RouteProp<StackPramList, 'tagRegisterScreen'>>();
  const dispatch = useRootDispatch();
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);
  const tagList = useRootSelector((state) => state.common.tagList);
  const tagsOrderId = useRootSelector((state) => state.common.tagsOrderId);
  const filterTagSelected = useRootSelector(
    (state) => state.filterModal.filterSelectedData.multi.tag
  );
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
  const onRightPress = async () => {
    if (auth.currentUser === null) return;
    if (text.length) {
      const tagListCopy = [...tagList];

      try {
        const userId = auth.currentUser.uid;
        if (tagData?.id && setListData) {
          // タグの変更
          await saveUpdateTag(userId, tagData.id, text);
          const tagIndex = tagListCopy.findIndex(
            (item) => item.id === tagData.id
          );
          tagListCopy.splice(tagIndex, 1, { id: tagData.id, name: text });

          // タグの並び順を保存
          await saveTagOrder(tagListCopy, userId, tagsOrderId);

          setListData(tagListCopy);
          dispatch(setTagList(tagListCopy));
        } else {
          // タグの新規登録
          const addDocData = await saveTag(userId, text);

          // タグの並び順を保存
          await saveTagOrder(
            [...tagListCopy, { id: addDocData.id, name: text }],
            userId,
            tagsOrderId
          );

          dispatch(
            setTagList([...tagListCopy, { id: addDocData.id, name: text }])
          );
        }
        navigation.goBack();
      } catch (error) {
        throw error; // TODO 本来であればここでエラーモーダルを表示する予定
      }
    }
  };

  /** タグの削除 */
  const onTagDeletePress = async () => {
    try {
      if (setListData && auth.currentUser !== null && tagData?.id) {
        // ここでAPIを叩き、DBへの保存が完了したらreduxにデータを保存し、リストの更新を行う
        await deleteTag(auth.currentUser.uid, tagData.id);
        const tagListCopy = [...tagList];
        const postTagData = tagListCopy.filter(
          (item) => item.id !== tagData?.id
        );

        // タグの並び順を保存
        await saveTagOrder(postTagData, auth.currentUser.uid, tagsOrderId);

        setListData(postTagData);
        dispatch(setTagList(postTagData));
        setIsVisible(false);
        if (filterTagSelected.includes(tagData.id)) {
          // タグの選択状態を解除
          dispatch(
            setFilterSelectedData({
              multi: {
                [LABEL_NAME.TAG]: filterTagSelected.filter(
                  (id) => id !== tagData.id
                ),
              },
            })
          );
        }
        navigation.goBack();
        if (!postTagData.length) {
          // タグのデータをすべて削除した場合は設定画面に戻す
          navigation.goBack();
        }
      }
    } catch (error) {
      throw error; // TODO 本来であればここでエラーモーダルを表示する予定
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
            title={tagData?.id ? 'タグ編集' : 'タグ作成'}
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
