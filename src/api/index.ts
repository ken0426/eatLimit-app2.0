import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import store from '../redux/store/store';
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
