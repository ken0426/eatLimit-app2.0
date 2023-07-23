import React, { FC, useEffect } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ApiData, MemoTemplateData, StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { COLORS, SIZE } from '../styles';
import { data } from '../moc';
import AtomHome from './atoms/AtomHome';
import OrgList from './organisms/OrgList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectMemoTemplateStorage } from '../storage';
import { useRootDispatch } from '../redux/store/store';
import {
  setSelectMemoTemplate,
  setSelectMemoTemplateData,
} from '../redux/slices/commonSlice';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const dispatch = useRootDispatch();

  useEffect(() => {
    (async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const selectMemoTemplateKey = allKeys.find(
          (item) => item === 'selectMemoTemplate'
        );
        if (selectMemoTemplateKey) {
          // 選択中のメモのテンプレートを取得
          const selectMemoTemplate: MemoTemplateData =
            await selectMemoTemplateStorage.load({
              key: 'selectMemoTemplate',
            });
          dispatch(setSelectMemoTemplate(selectMemoTemplate));

          /** ここでデータベースから全てのメモのテンプレートデータを取得。
           * 取得後、idを元にソートを掛けて並び替えをするロジックを追加。
           * 完了後、reduxに保存する。
           * ※暫定対応として、一旦ストーレジから取得したデータのみをセット
           */
          dispatch(
            setSelectMemoTemplateData({
              data: [selectMemoTemplate],
              isTemplate: true,
            })
          );
        } else {
          dispatch(
            setSelectMemoTemplateData({
              data: [],
              isTemplate: true,
            })
          );
        }
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  const renderItem: ListRenderItem<ApiData> = ({ item, index }) => (
    <OrgList item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={{ flex: 1 }}>
      <MolHeader
        style={{
          height: SIZE.BASE_HP * 12,
          paddingHorizontal: SIZE.BASE_WP * 5,
          paddingTop: SIZE.BASE_HP * 4,
          backgroundColor: COLORS.MAIN_COLOR,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        type={'default'}
      >
        <AtomHome navigation={navigation} data={data} />
      </MolHeader>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default HomeScreen;
