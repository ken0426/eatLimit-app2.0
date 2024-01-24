import React, { FC, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MolHeader from './molecules/MolHeader';
import AtomRegister from './atoms/AtomRegister';
import { StackPramList } from '../types';
import { COLORS, FONTSIZE, SIZE, STYLE_FLEX } from '../styles';
import AtomFileSelect from './atoms/AtomFileSelect';
import AtomSingleInput from './atoms/AtomSingleInput';
import AtomSingleSelect from './atoms/AtomSingleSelect';
import AtomDate from './atoms/AtomDate';
import AtomMemo from './atoms/AtomMemo';
import AtomButton from './atoms/AtomButton';
import {
  DATE_ERROR_MESSAGE,
  HEADER_TYPE,
  LABEL_NAME,
  LABEL_TEXT,
  MANAGEMENT_SELECTED_TEXT,
  keepData,
  managementData,
} from '../contents';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import { useRegister } from '../hooks/useRegister';
import AtomLoading from './atoms/AtomLoading';
import { handleRegistrationPress } from '../functions';
import AtomCounter from './atoms/AtomCounter';
import { useDateError } from '../hooks/useDateError';
import AtomTagSelect from './atoms/AtomTagSelect';
import { setTagSelectedIds } from '../redux/slices/commonRegisterSlice';
import { useGoBack } from '../hooks/useGoBack';
import { useApproximateDeadline } from '../hooks/useApproximateDeadline';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'updateRegisterScreen'>;
};

const UpdateRegisterScreen: FC<Props> = ({ navigation }) => {
  const dispatch = useRootDispatch();
  const updateData = useRootSelector(
    (state) => state.commonRegister.updateRegisterData
  );
  /** ユーザーが保存したタグのデータ */
  const tagList = useRootSelector((state) => state.common.tagList);
  /** 選択しているタグのID */
  const tagSelectedIds = useRootSelector(
    (state) => state.commonRegister.tagSelectedIds
  );
  /** キーボードで入力するエリアで高さを調整するフラグ */
  const [enabled, setEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [label, setLabel] = useState('');
  /** 今日の日付と登録する日付を比較して登録する日付が過去の日付の場合はモーダルを表示するためのフラグ */
  const [isDateBefore, setIsDateBefore] = useState(false);
  /** APIのリクエストパラメータ */
  const { setTargetPostData, postData } = useRegister();
  /** 日付項目でエラー判定をするhook */
  const { isDateErrorMessage } = useDateError(postData, label);
  /** 期限目安の計算ロジック */
  const { approximateDeadline } = useApproximateDeadline(postData);
  /** Androidで戻るジェスチャーを無効にするhook */
  useGoBack();

  return (
    <View style={STYLE_FLEX}>
      <View style={styles.contents}>
        <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
          <AtomRegister
            title={'変更'}
            postData={postData}
            setIsLoading={setIsLoading}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            message={message}
            setMessage={setMessage}
            isDateBefore={isDateBefore}
            setIsDateBefore={setIsDateBefore}
            saveType={'update'}
            updateListId={updateData.id}
          />
        </MolHeader>
        <ScrollView>
          <KeyboardAvoidingView
            behavior='position'
            style={STYLE_FLEX}
            enabled={enabled}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View>
                <AtomFileSelect
                  setData={(data) => {
                    setTargetPostData({
                      key: LABEL_NAME.IMAGE,
                      value: data.value,
                      isRequired: data.isRequired,
                    });
                    if (updateData.imageId) {
                      setTargetPostData({
                        key: LABEL_NAME.IMAGE_ID,
                        value: updateData.imageId,
                        isRequired: false,
                      });
                    }
                  }}
                />
                <View style={styles.inputForm}>
                  <AtomSingleInput
                    label={LABEL_TEXT.PRODUCT}
                    onPressIn={() => setEnabled(false)}
                    textData={updateData.eatName}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PRODUCT,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomCounter
                    onPressIn={() => setEnabled(false)}
                    setData={(data) => {
                      setTargetPostData({
                        key: LABEL_NAME.QUANTITY,
                        value: data.value,
                        isRequired: data.isRequired,
                      });
                    }}
                    textData={Number(updateData.count)}
                  />
                  <AtomSingleSelect
                    label={LABEL_TEXT.MANAGEMENT}
                    data={managementData}
                    textData={updateData.management}
                    isRequired={true}
                    setData={(data) => {
                      setTargetPostData({
                        key: LABEL_NAME.MANAGEMENT,
                        value: data.value,
                        isRequired: data.isRequired,
                      });
                      if (typeof data.value === 'string') {
                        setLabel(data.value);
                      }
                    }}
                  />
                  <AtomSingleSelect
                    label={LABEL_TEXT.PRESERVATION}
                    data={keepData}
                    textData={updateData.preservation}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PRESERVATION,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomDate
                    date={updateData.date}
                    label={LABEL_TEXT.DATE}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.DATE,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    errorMessage={
                      isDateErrorMessage ? DATE_ERROR_MESSAGE.DATE : ''
                    }
                  />
                  {(label === MANAGEMENT_SELECTED_TEXT.PURCHASE_DATE ||
                    label === MANAGEMENT_SELECTED_TEXT.REGISTRATION_DATE) && (
                    <AtomDate
                      date={
                        approximateDeadline ?? updateData.approximateDeadline
                      }
                      isRequired={true}
                      label={LABEL_TEXT.APPROXIMATE_DEADLINE}
                      isLimit={true}
                      setData={(data) =>
                        setTargetPostData({
                          key: LABEL_NAME.APPROXIMATE_DEADLINE,
                          value: data.value,
                          isRequired: data.isRequired,
                        })
                      }
                      errorMessage={
                        isDateErrorMessage
                          ? DATE_ERROR_MESSAGE.APPROXIMATE_DEADLINE
                          : ''
                      }
                      selectedDate={approximateDeadline}
                      dateData={
                        approximateDeadline ?? updateData.approximateDeadline
                      }
                    />
                  )}
                  <AtomTagSelect
                    tagList={tagList}
                    tagSelectedIds={tagSelectedIds}
                    setData={(data) => {
                      setTargetPostData({
                        key: LABEL_NAME.TAG,
                        value: data.value,
                        isRequired: false,
                      });
                    }}
                    label={LABEL_NAME.TAG}
                    isRequired={false}
                    defaultTagData={
                      updateData.tagData?.length ? updateData.tagData : []
                    }
                  />
                  <AtomSingleInput
                    label={LABEL_TEXT.PLACE_OF_PURCHASE}
                    onPressIn={() => setEnabled(true)}
                    textData={updateData.placeOfPurchase}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PLACE_OF_PURCHASE,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomSingleInput
                    label={LABEL_TEXT.AMOUNT_OF_MONEY}
                    onPressIn={() => setEnabled(true)}
                    keyboardType={'number-pad'}
                    textData={updateData.price ? String(updateData.price) : ''}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.AMOUNT_OF_MONEY,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                  />
                  <AtomMemo
                    onPress={() => setEnabled(true)}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.MEMO,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    textData={updateData.memo ? updateData.memo : ''}
                  />
                </View>
                <View style={styles.buttonArea}>
                  <AtomButton
                    onPress={async () => {
                      const finish = await handleRegistrationPress({
                        postData,
                        setIsVisible,
                        setMessage,
                        setIsDateBefore,
                        setIsLoading,
                        navigation,
                        saveType: 'update',
                        updateListId: updateData.id,
                      });
                      if (finish) dispatch(setTagSelectedIds([]));
                    }}
                    color={COLORS.WHITE}
                    fontSize={FONTSIZE.SIZE30PX}
                    backgroundColor={COLORS.BLUE}
                    width={SIZE.BASE_WP * 50}
                    buttonText={'変更'}
                    fontWeight={'bold'}
                  />
                  {/* 削除ボタンの仮実装 */}
                  <View style={styles.deleteButtonArea}>
                    <AtomButton
                      onPress={() => {
                        setMessage('本当に削除しますか？');
                        setIsVisible(true);
                      }}
                      color={COLORS.WHITE}
                      fontSize={FONTSIZE.SIZE30PX}
                      backgroundColor={COLORS.RED}
                      width={SIZE.BASE_WP * 50}
                      buttonText={'削除'}
                      fontWeight={'bold'}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>

      {isLoading && <AtomLoading />}
    </View>
  );
};

export default UpdateRegisterScreen;

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
  contents: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  inputForm: {
    paddingHorizontal: SIZE.BASE_HP * 1.2,
    paddingBottom: SIZE.BASE_HP * 1.2,
  },
  buttonArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SIZE.BASE_HP * 2.4,
  },
  deleteButtonArea: {
    marginTop: SIZE.BASE_HP * 2,
  },
});
