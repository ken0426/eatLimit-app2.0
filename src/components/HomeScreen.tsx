import React, { FC, useEffect, useState } from 'react';
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
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import {
  setSelectMemoTemplate,
  setSelectMemoTemplateData,
} from '../redux/slices/commonSlice';
import { HEADER_TYPE, settingMemoData } from '../contents';
import NoListScreen from './organisms/NoListScreen';
import AtomCountDisplay from './atoms/AtomCountDisplay';
import { StyleSheet } from 'react-native';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const dispatch = useRootDispatch();
  const tagList = useRootSelector((state) => state.common.tagList);
  const [listData, setListData] = useState<ApiData[]>([]);

  // 本来ならDBからのデータをここで受け取る（現在は一旦仮のデータとする）
  // TODO 最終的にはログイン直後にこの計算をする可能性あり
  const editData = data.map((item) => {
    if (item.tagData?.length) {
      const tagData = item.tagData.map((data) =>
        tagList.find((tag) => tag.id === data.id)
      );
      if (
        tagData.length &&
        tagData.filter((tag) => tag?.name && tag.id).length
      ) {
        // タグのDBに保存してるIDがあればID情報をリストに追加し一覧で表示する配列を生成する。
        return {
          ...item,
          tagData: tagData as { id: string; name: string }[],
        };
      } else {
        // 一覧のデータでタグのDBに存在していないタグIDがなければ、それは削除されたタグのため、商品データからタグIDを削除する。
        delete item.tagData;
        return item;
      }
    } else {
      // 商品データにそもそもタグIDが存在しない場合はそのままデータを返却する。
      return item;
    }
  });
  const responseData = editData;

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
              /** ここは最終的にバック側から受け取ったデータを入れる */
              // data: [],
              data: settingMemoData,
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
    <View style={styles.contents}>
      <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
        <AtomHome
          setListData={setListData}
          responseData={responseData}
          listData={listData}
        />
      </MolHeader>
      <AtomCountDisplay listData={listData} />
      {listData.length ? (
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <NoListScreen />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contents: {
    flex: 1,
  },
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: COLORS.MAIN_COLOR,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
