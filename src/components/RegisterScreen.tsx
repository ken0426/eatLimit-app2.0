import React, { useMemo, useState } from 'react';
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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import { ApiData, StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { COLORS, FONTSIZE, SIZE, STYLE_FLEX } from '../styles';
import AtomRegister from './atoms/AtomRegister';
import AtomFileSelect from './atoms/AtomFileSelect';
import AtomSingleSelect from './atoms/AtomSingleSelect';
import AtomSingleInput from './atoms/AtomSingleInput';
import AtomDate from './atoms/AtomDate';
import {
  DATE_ERROR_MESSAGE,
  HEADER_TYPE,
  LABEL_NAME,
  LABEL_TEXT,
  MANAGEMENT_SELECTED_TEXT,
  keepData,
  managementData,
} from '../contents';
import AtomMemo from './atoms/AtomMemo';
import AtomButton from './atoms/AtomButton';
import { useRegister } from '../hooks/useRegister';
import AtomLoading from './atoms/AtomLoading';
import { handleRegistrationPress } from '../functions';
import AtomCounter from './atoms/AtomCounter';
import { useDateError } from '../hooks/useDateError';
import { useCopyEdit } from '../hooks/useCopyEdit';
import AtomTagSelect from './atoms/AtomTagSelect';
import { setTagSelectedIds } from '../redux/slices/commonRegisterSlice';
import { useGoBack } from '../hooks/useGoBack';
import { useApproximateDeadline } from '../hooks/useApproximateDeadline';

type RouteItem = {
  params: {
    data: ApiData;
  };
};

const RegisterScreen = () => {
  const dispatch = useRootDispatch();
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'registerScreen'>>();
  const route = useRoute<
    RouteProp<StackPramList, 'registerScreen'> & RouteItem
  >();
  /** ユーザーが保存したタグのデータ */
  const tagList = useRootSelector((state) => state.common.tagList);
  /** 選択しているタグのID */
  const tagSelectedIds = useRootSelector(
    (state) => state.commonRegister.tagSelectedIds
  );
  /** キーボードで入力するエリアで高さを調整するフラグ */
  const [enabled, setEnabled] = useState<boolean>(false);
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
  /** コピーのデータをリクエストパラメータの形に変換するロジック */
  useCopyEdit(postData, setTargetPostData, setLabel);
  /** コピーデータを取得 */
  const copyData = useMemo(() => route.params, [route.params]);
  /** 期限目安の計算ロジック */
  const { approximateDeadline, plus } = useApproximateDeadline(
    postData,
    copyData
  );
  /** Androidで戻るジェスチャーを無効にするhook */
  useGoBack();

  const getTextData = (key: string) =>
    postData.find((item) => item.key === key)?.value;

  return (
    <View style={STYLE_FLEX}>
      <View style={styles.contents}>
        <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
          <AtomRegister
            title={copyData ? 'コピー' : '登録'}
            postData={postData}
            setIsLoading={setIsLoading}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            message={message}
            setMessage={setMessage}
            isDateBefore={isDateBefore}
            setIsDateBefore={setIsDateBefore}
            copyData={copyData}
            saveType={'add'}
            updateListId={undefined}
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
                  setData={(data) =>
                    setTargetPostData({
                      key: LABEL_NAME.IMAGE,
                      value: data.value,
                      isRequired: data.isRequired,
                    })
                  }
                />
                <View style={styles.inputForm}>
                  <AtomSingleInput
                    label={LABEL_TEXT.PRODUCT}
                    onPressIn={() => setEnabled(false)}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PRODUCT,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    textData={
                      copyData?.data.eatName ?? getTextData(LABEL_NAME.PRODUCT)
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
                    textData={copyData?.data?.count ?? undefined}
                  />
                  <AtomSingleSelect
                    label={LABEL_TEXT.MANAGEMENT}
                    data={managementData}
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
                    textData={
                      getTextData(LABEL_NAME.MANAGEMENT)
                        ? String(getTextData(LABEL_NAME.MANAGEMENT))
                        : ''
                    }
                  />
                  <AtomSingleSelect
                    label={LABEL_TEXT.PRESERVATION}
                    data={keepData}
                    isRequired={true}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PRESERVATION,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    textData={
                      getTextData(LABEL_NAME.PRESERVATION)
                        ? String(getTextData(LABEL_NAME.PRESERVATION))
                        : ''
                    }
                  />
                  <AtomDate
                    isRequired={true}
                    label={LABEL_TEXT.DATE}
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
                    copyDate={
                      copyData
                        ? new Date(
                            getTextData(LABEL_NAME.DATE)
                              ? String(getTextData(LABEL_NAME.DATE))
                              : ''
                          )
                        : undefined
                    }
                  />
                  {(label === MANAGEMENT_SELECTED_TEXT.PURCHASE_DATE ||
                    label === MANAGEMENT_SELECTED_TEXT.REGISTRATION_DATE) && (
                    <AtomDate
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
                      plusDate={copyData?.data?.approximateDeadline ? plus : 10}
                      dateData={
                        postData.find((data) => data.key === LABEL_NAME.DATE)!
                          .value as string
                      }
                    />
                  )}
                  <AtomTagSelect
                    tagSelectedIds={tagSelectedIds}
                    tagList={tagList}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.TAG,
                        value: data.value,
                        isRequired: false,
                      })
                    }
                    label={LABEL_NAME.TAG}
                    isRequired={false}
                    defaultTagData={
                      copyData?.data?.tagData?.length
                        ? copyData.data.tagData
                        : []
                    }
                  />
                  <AtomSingleInput
                    label={LABEL_TEXT.PLACE_OF_PURCHASE}
                    onPressIn={() => setEnabled(true)}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.PLACE_OF_PURCHASE,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    textData={
                      copyData?.data?.placeOfPurchase
                        ? copyData.data.placeOfPurchase
                        : typeof getTextData(LABEL_NAME.PLACE_OF_PURCHASE) ===
                          'string'
                        ? String(getTextData(LABEL_NAME.PLACE_OF_PURCHASE))
                        : undefined
                    }
                  />
                  <AtomSingleInput
                    label={LABEL_TEXT.AMOUNT_OF_MONEY}
                    onPressIn={() => setEnabled(true)}
                    keyboardType={'number-pad'}
                    setData={(data) =>
                      setTargetPostData({
                        key: LABEL_NAME.AMOUNT_OF_MONEY,
                        value: data.value,
                        isRequired: data.isRequired,
                      })
                    }
                    textData={
                      copyData?.data?.price
                        ? String(getTextData(LABEL_NAME.AMOUNT_OF_MONEY))
                        : ''
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
                    textData={copyData?.data?.memo ? copyData.data.memo : ''} // TODO テンプレートのメモデータも最終的にセットできるようにする
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
                        copyData,
                        navigation,
                        saveType: 'add',
                        updateListId: undefined,
                      });
                      if (finish) dispatch(setTagSelectedIds([]));
                    }}
                    color={COLORS.WHITE}
                    fontSize={FONTSIZE.SIZE30PX}
                    backgroundColor={copyData ? COLORS.ORANGE : COLORS.BLUE}
                    width={200}
                    buttonText={'登録'}
                    fontWeight={'bold'}
                  />
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

export default RegisterScreen;

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
});
