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

/** ユーザーが保存しているタグのデータを取得 */
export const fetchTag = async (userId: string) => {
  try {
    const res = await getDocs(collection(db, `users/${userId}/tags`));
    const data: { id: string; name: string }[] = [];

    res.forEach((doc) => {
      data.push({
        id: doc.id,
        name: doc.data().name,
      });
    });

    if (data.length) {
      store.dispatch(setTagList(data));
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
