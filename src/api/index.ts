import store from '../redux/store/store';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { setTagList, setTagsOrderId } from '../redux/slices/commonSlice';
import { PostData, TagData } from '../types';
import { getTagId } from '../utils';
import { listDisplayAdaptor } from '../adaptor/listDisplayAdaptor';
import { setUpdateRegisterData } from '../redux/slices/commonRegisterSlice';

/** ユーザーが保存しているタグのデータを取得 */
export const fetchTag = async (userId: string) => {
  try {
    /** タグのIDとタグ名情報を取得 */
    const tagsData = await getDocs(collection(db, `users/${userId}/tags`));
    const data: { id: string; name: string }[] = [];

    tagsData.forEach((doc) => {
      data.push({
        id: doc.id,
        name: doc.data().name,
      });
    });

    if (data.length) {
      const tagIds = await getDocs(collection(db, `users/${userId}/tagsOrder`));
      const tagIdsData: string[] = [];
      let tagsOrderId = '';
      tagIds.forEach((doc) => {
        tagIdsData.push(...doc.data().tagData);
        tagsOrderId = doc.id;
      });

      store.dispatch(setTagsOrderId(tagsOrderId));
      if (tagIdsData.length === data.length) {
        // タグのデータとタグのIDの並び順を保持するデータの数が同じの場合
        const editData = tagIdsData.map((id) => {
          const tagName = data.find((tag) => tag.id === id)?.name;
          return {
            id,
            name: tagName,
          };
        });
        store.dispatch(setTagList(editData));
      } else {
        // タグのデータとタグのIDの並び順を保持するデータの数が異なる場合（エラーなどでタグの並び順のデータが保存できなかった場合などはfirebaseに保存されているタグのデータの並び順で表示）
        store.dispatch(setTagList(data));
      }
    }
  } catch (error) {}
};

/** タグの登録 */
export const saveTag = async (userId: string, text: string) => {
  try {
    const addDocData = await addDoc(collection(db, `users/${userId}/tags`), {
      name: text,
      updateAt: Timestamp.fromDate(new Date()),
    });

    return addDocData;
  } catch (error) {
    throw error;
  }
};

/** タグの変更 */
export const saveUpdateTag = async (
  userId: string,
  tagId: string,
  text: string
) => {
  try {
    const res = doc(db, `users/${userId}/tags`, tagId);
    await setDoc(res, {
      name: text,
      updateAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    throw error;
  }
};

/** タグの削除 */
export const deleteTag = async (userId: string, tagId: string) => {
  try {
    await deleteDoc(doc(db, `users/${userId}/tags`, tagId));
  } catch (error) {
    throw error;
  }
};

/** タグの並び順を保存 */
export const saveTagOrder = async (
  tagListCopy: TagData[],
  userId: string,
  tagsOrderId: string | undefined
) => {
  try {
    if (tagsOrderId) {
      // すでにタグの並び順を保持するデータが存在する場合はタグの並び順を更新
      const res = doc(db, `users/${userId}/tagsOrder`, tagsOrderId);
      await setDoc(res, { tagData: getTagId(tagListCopy) });
    } else {
      // タグの並び順を保持するデータが存在しない場合はタグの並び順を保存
      const tagIds = getTagId(tagListCopy);

      const addDocData = await addDoc(
        collection(db, `users/${userId}/tagsOrder`),
        { tagData: tagIds }
      );
      // ユーザーが初めてタグを作った場合、タグを並び替えるためのドキュメントのIDが発行されるため、そのIDをreduxに保存しておく。次回以降は上のロジックを通る
      store.dispatch(setTagsOrderId(addDocData.id));
    }
  } catch (error) {
    throw error;
  }
};

/** リストのデータを保存 */
export const saveList = async (
  newPostData: PostData[],
  userId: string,
  saveType: 'add' | 'update',
  updateListId: string | undefined
) => {
  try {
    if (saveType === 'add') {
      await addDoc(collection(db, `users/${userId}/list`), {
        listData: newPostData,
      });
    } else if (updateListId && saveType === 'update') {
      const res = doc(db, `users/${userId}/list`, updateListId);
      await setDoc(res, {
        listData: newPostData,
      });
      const data = listDisplayAdaptor(newPostData, updateListId);
      store.dispatch(setUpdateRegisterData(data[0]));
    }
  } catch (error) {
    throw error;
  }
};
