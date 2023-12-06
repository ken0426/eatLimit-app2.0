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
import { setTagList } from '../redux/slices/commonSlice';
import { TagData } from '../types';
import { getTagId } from '../utils';

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
      tagIds.forEach((doc) => {
        tagIdsData.push(...doc.data().tagData);
      });
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
export const saveTagOrder = async (tagListCopy: TagData[], userId: string) => {
  try {
    const tagsOrderSaveId = await getDocs(
      collection(db, `users/${userId}/tagsOrder`)
    );
    let data: string = '';
    tagsOrderSaveId.forEach((doc) => (data = doc.id));

    if (data) {
      // すでにタグの並び順を保持するデータが存在する場合はタグの並び順を更新
      const res = doc(db, `users/${userId}/tagsOrder`, data);
      await setDoc(res, { tagData: getTagId(tagListCopy) });
    } else {
      // タグの並び順を保持するデータが存在しない場合はタグの並び順を保存
      const tagIds = getTagId(tagListCopy);
      addDoc(collection(db, `users/${userId}/tagsOrder`), { tagData: tagIds });
    }
  } catch (error) {
    throw error;
  }
};
