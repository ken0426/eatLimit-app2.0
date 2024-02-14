/** React */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
/** ライブラリ */
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
/** その他 */
import AtomSettingRegister from './atoms/AtomSettingRegister';
import AtomSettingLabel from './atoms/AtomSettingLabel';
import MolHeader from './molecules/MolHeader';
import MolSettingList from './molecules/MolSettingList';
import { COLORS, SIZE } from '../styles';
import {
  BUTTON_TEXT,
  HEADER_TYPE,
  LABEL,
  LOG_AUTO,
  settingData,
} from '../contents';
import { SettingData, StackPramList } from '../types';
import { getEditDataFormat, getKey } from '../utils';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import { setTagList, setTagsOrderId } from '../redux/slices/commonSlice';
import { setUserEmail } from '../redux/slices/loginSlice';

const SettingScreen = () => {
  const dispatch = useRootDispatch();
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'settingScreen'>>();
  const dateFormatDisplayId = useRootSelector(
    (state) => state.common.dateFormatDisplayId
  );
  const tagList = useRootSelector((state) => state.common.tagList);
  const [data, setData] = useState<SettingData[]>([]);
  const id = dateFormatDisplayId;

  useEffect(() => {
    if (!tagList.length) {
      // タグのデータがない場合は「タグ編集と並び替え」項目を非表示にする
      const copySettingData = settingData.map((item) => {
        if (item['register']) {
          const newRegisterItem = item['register'].item.filter(
            (itm) => itm.label !== LABEL.TAG_EDIT
          );
          return {
            ['register']: {
              headline: '登録',
              item: newRegisterItem,
            },
          };
        } else {
          return item;
        }
      });
      setData(copySettingData);
    } else {
      setData([...settingData]);
    }
  }, [tagList, auth.currentUser?.emailVerified]);

  /** 最終的に設定画面で表示するデータ */
  const settingListData = useMemo(() => {
    const newData = data.map((item) => {
      if (item.account && auth.currentUser?.emailVerified) {
        const newAccountItem = item.account.item.filter(
          (itm) => itm.label !== 'お知らせ'
        );
        return {
          ...item,
          account: {
            ...item.account,
            item: newAccountItem,
          },
        };
      } else {
        return item;
      }
    });
    return newData;
  }, [data]);

  const renderItem: ListRenderItem<SettingData> = ({ item, index }) => {
    const key = getKey(item);
    const headline = item[key].headline;

    return (
      <View key={index}>
        <AtomSettingLabel text={headline} />
        {item[key].item.map((data, index) => (
          <MolSettingList
            key={index}
            onPress={() => {
              if (data.label === LABEL.DATE_DISPLAY) {
                const editFormat = getEditDataFormat(data, id);
                navigation.navigate('settingDetailScreen', {
                  data: editFormat,
                });
              } else if (data.label === LABEL.MEMO_TEMPLATE) {
                navigation.push('settingMemoScreen');
              } else if (data.label === LABEL.TAG_REGISTER) {
                navigation.push('tagRegisterScreen');
              } else if (data.label === LABEL.TAG_EDIT) {
                navigation.push('tagUpdateScreen');
              } else if (data.label === LABEL.PASSWORD_CHANGE) {
                navigation.navigate('passwordUpdateScreen');
              } else if (data.label === LABEL.MAIL_ADDRESS_UPDATE) {
                navigation.navigate('mailAddressUpdateScreen');
              } else if (data.label === LOG_AUTO) {
                // TODO リファクタリング（定数化など）
                Alert.alert(LOG_AUTO, `ログアウトします。\nよろしいですか？`, [
                  {
                    text: BUTTON_TEXT.CANCEL,
                    onPress: () => {},
                  },
                  {
                    text: BUTTON_TEXT.OK,
                    onPress: async () => {
                      try {
                        auth.signOut();
                        // タグのデータをクリア
                        dispatch(setTagList([]));
                        // タグの並び順を保存しているfirebaseのIDをクリア
                        dispatch(setTagsOrderId(''));
                        /** ユーザーのメールアドレスをクリア */
                        dispatch(setUserEmail(''));
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'topScreen' }],
                        });
                      } catch (error) {
                        Alert.alert(
                          'ログアウトに失敗',
                          '時間をおいて再度お試しください',
                          [
                            {
                              text: BUTTON_TEXT.CANCEL,
                              onPress: () => {},
                            },
                          ]
                        );
                      }
                    },
                  },
                ]);
              } else {
                navigation.navigate('settingDetailScreen', { data });
              }
            }}
            text={data.label}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.contents}>
      <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
        <AtomSettingRegister title={'設定'} />
      </MolHeader>

      <FlatList
        data={settingListData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  contents: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
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
  },
});
