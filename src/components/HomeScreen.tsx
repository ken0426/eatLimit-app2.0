import React, { FC, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ApiData, MemoTemplateData, PostData, StackPramList } from '../types';
import MolHeader from './molecules/MolHeader';
import { COLORS, SIZE } from '../styles';
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
import { auth, db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { listDisplayAdaptor } from '../adaptor/listDisplayAdaptor';
import AtomLoading from './atoms/AtomLoading';
import { getListImage } from '../api';

type Props = {
  navigation: StackNavigationProp<StackPramList, 'homeScreen'>;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const dispatch = useRootDispatch();
  const tagList = useRootSelector((state) => state.common.tagList);
  const [listData, setListData] = useState<ApiData[]>([]);
  const [editData, setEditData] = useState<ApiData[]>([]);
  const [newData, setNewData] = useState<ApiData[]>([]);
  /** 一括削除を押したかどうかの判定フラグ */
  const [deletePress, setDeletePress] = useState<boolean>(false);
  /** 削除する商品のID */
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  /** ローディングのフラグ */
  const [isLoading, setIsLoading] = useState(false);
  /** 商品が登録されているかどうかのフラグ */
  const [isRegisterList, setIsRegisterList] = useState<boolean>(false);

  /** DBからデータを取得 */
  useEffect(() => {
    if (auth.currentUser === null) return;
    const ref = collection(db, `users/${auth.currentUser.uid}/list`);
    const q = query(ref);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data: ApiData[] = [];
      querySnapshot.forEach((doc) => {
        const listData = listDisplayAdaptor(
          ...[doc.data().listData as PostData[]],
          doc.id
        );
        data.push(...listData);
      });

      setNewData(data);
      if (data.length) {
        setIsRegisterList(true);
      } else {
        setIsRegisterList(false);
      }
    });

    return unsubscribe;
  }, []);

  /** DBから取得したデータをもとにタグ情報と画像データを紐づけするhook */
  useEffect(() => {
    (async () => {
      const newEditData = newData.map((item) => {
        if (item.tagData?.length) {
          const tagData = item.tagData.map((data) =>
            tagList.find((tag) => tag.id === data.id)
          );
          if (
            tagData.length &&
            tagData.filter((tag) => tag?.name && tag.id).length
          ) {
            // タグのDBに保存してるIDがあればID情報をリストに追加し一覧で表示する配列を生成する。
            const filterTagData = tagData.filter((tag) => tag?.name && tag.id);
            return {
              ...item,
              tagData: filterTagData as { id: string; name: string }[],
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

      /** 画像データを紐づけする */
      const finishData = await Promise.all(
        newEditData.map(async (item) => {
          if (item.image) {
            const imageId = item.imageId;
            const imageUrl = await getListImage(
              auth.currentUser!.uid,
              imageId!
            );
            return {
              ...item,
              image: imageUrl,
            };
          } else {
            return item;
          }
        })
      );

      setEditData(finishData);
    })();
  }, [newData, tagList]);

  /** 最終的に表示するデータを生成 */
  const data = useMemo(() => listData, [listData]);

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
    <OrgList
      item={item}
      index={index}
      navigation={navigation}
      deletePress={deletePress}
      setDeletePress={setDeletePress}
      deleteIds={deleteIds}
      setDeleteIds={setDeleteIds}
    />
  );

  return (
    <View style={styles.contents}>
      <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
        <AtomHome
          setListData={setListData}
          editData={editData}
          data={data}
          deletePress={deletePress}
          setDeletePress={setDeletePress}
          deleteIds={deleteIds}
          setDeleteIds={setDeleteIds}
          setIsLoading={setIsLoading}
        />
      </MolHeader>
      <AtomCountDisplay listData={data} />
      {data.length ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <NoListScreen
          displayText={
            isRegisterList
              ? '検索結果が見つかりません。'
              : '商品が登録されていません。'
          }
        />
      )}
      {isLoading && <AtomLoading />}
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
