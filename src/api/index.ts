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
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import {
  setSelectMemoTemplate,
  setTagList,
  setTagsOrderId,
} from '../redux/slices/commonSlice';
import { AuthPostData, ListData, PostData, TagData } from '../types';
import { getTagId } from '../utils';
import { listDisplayAdaptor } from '../adaptor/listDisplayAdaptor';
import { setUpdateRegisterData } from '../redux/slices/commonRegisterSlice';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import {
  setSavedTemplateMemoId,
  setSelectedTemplateMemoId,
  setTemplateMemoData,
} from '../redux/slices/memoSlice';
import {
  PASSWORD_CHANGE_MESSAGE,
  PASSWORD_UPDATE_INPUT_KEY,
  SAVE_TYPE,
} from '../contents';

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
    if (saveType === SAVE_TYPE.ADD) {
      await addDoc(collection(db, `users/${userId}/list`), {
        listData: newPostData,
      });
    } else if (updateListId && saveType === SAVE_TYPE.UPDATE) {
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

/** リストの削除 */
export const deleteList = async (userId: string, listId: string) => {
  try {
    await deleteDoc(doc(db, `users/${userId}/list`, listId));
  } catch (error) {
    throw error;
  }
};

/** 画像データを保存 */
export const saveImage = async (
  userId: string,
  imageData: string,
  imageId: string
) => {
  try {
    const uploadImageAsync = async (
      uri: string,
      fileName: string
    ): Promise<string> => {
      const blob: any = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const storageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(storageRef, blob);

      blob.close();

      return await getDownloadURL(snapshot.ref);
    };

    await uploadImageAsync(imageData, `image/${userId}/${imageId}`);
  } catch (error) {
    throw error;
  }
};

/** 画像データの取得 */
export const getListImage = async (userId: string, imageId: string) => {
  const getImageUrl = async (fileName: string): Promise<string> => {
    const storage = getStorage();
    const imageRef = ref(storage, fileName);
    return await getDownloadURL(imageRef);
  };

  const imageUrl: string = await getImageUrl(`image/${userId}/${imageId}`);

  return imageUrl;
};

/** 画像データを削除 */
export const deleteImage = async (userId: string, imageId: string) => {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, `image/${userId}/${imageId}`);
    await deleteObject(imageRef);
  } catch (error) {
    throw error;
  }
};

/** テンプレートを保存しているデータを取得 */
export const getSaveTemplateData = async (userId: string) => {
  try {
    const saveTemplateId = await getDocs(
      collection(db, `users/${userId}/templateMemo`)
    );
    let id = '';
    const templateData: { label: string; id: string; text: string }[] = [];
    saveTemplateId.forEach((doc) => {
      id = doc.id;
      templateData.push(...doc.data().templateData);
    });

    /** テンプレートメモを保存しているデータのIDをreduxに保存 */
    store.dispatch(setSavedTemplateMemoId(id));
    /** テンプレートメモのデータをreduxに保存 */
    store.dispatch(setTemplateMemoData(templateData));
  } catch (error) {}
};

/** テンプレートの保存 */
export const saveTemplate = async (
  templateData: { label: string; text: string; id: string }[],
  userId: string,
  templateSaveId: string | undefined
) => {
  try {
    if (templateSaveId) {
      const res = doc(db, `users/${userId}/templateMemo`, templateSaveId);
      await setDoc(res, { templateData });
      store.dispatch(setTemplateMemoData(templateData));
    } else {
      const addDocData = await addDoc(
        collection(db, `users/${userId}/templateMemo`),
        { templateData }
      );
      store.dispatch(setSavedTemplateMemoId(addDocData.id));
      store.dispatch(setTemplateMemoData(templateData));
    }
  } catch (error) {}
};

/** 選択されているテンプレートメモのデータを取得 */
export const getSelectedSaveTemplateData = async (userId: string) => {
  try {
    const selectedTemplateData = await getDocs(
      collection(db, `users/${userId}/selectedTemplateMemo`)
    );

    let id = '';
    let data: ListData = { id: '', text: '', check: false };
    selectedTemplateData.forEach((doc) => {
      id = doc.id;
      data = doc.data()?.selectMemoTemplate;
    });

    store.dispatch(setSelectedTemplateMemoId(id));
    if (data?.id) {
      store.dispatch(setSelectMemoTemplate(data));
    }
  } catch (error) {
    throw error;
  }
};

/** 選択されているテンプレートメモを保存 */
export const saveSelectTemplate = async (
  selectMemoTemplate: ListData,
  userId: string,
  selectTemplateId: string | undefined
) => {
  try {
    if (selectTemplateId) {
      const res = doc(
        db,
        `users/${userId}/selectedTemplateMemo`,
        selectTemplateId
      );
      await setDoc(res, { selectMemoTemplate });
    } else {
      const addDocData = await addDoc(
        collection(db, `users/${userId}/selectedTemplateMemo`),
        { selectMemoTemplate }
      );
      store.dispatch(setSelectedTemplateMemoId(addDocData.id));
    }
  } catch (error) {
    throw error;
  }
};

/** パスワードの更新 */
export const saveUpdatePassword = async (
  postData: AuthPostData[],
  hasError: { key: string; error: string }[],
  setHasError: (e: { key: string; error: string }[]) => void
) => {
  try {
    const email = auth.currentUser?.email;
    const password = postData.find(
      (item) => item.key === PASSWORD_UPDATE_INPUT_KEY.PASSWORD
    )?.value;
    const credential = EmailAuthProvider.credential(email!, password!);
    const user = auth.currentUser;
    /** 現在のパスワードが正しいかどうか判定する */
    await reauthenticateWithCredential(user!, credential);
    const newPassword = postData.find(
      (item) => item.key === PASSWORD_UPDATE_INPUT_KEY.NEW_PASSWORD
    )?.value;
    await updatePassword(user!, newPassword!);
  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      const newHasError = hasError.map((item) => {
        if (item.key === PASSWORD_UPDATE_INPUT_KEY.PASSWORD) {
          return {
            key: item.key,
            error: PASSWORD_CHANGE_MESSAGE.INVALID_PASSWORD,
          };
        } else {
          return item;
        }
      });
      setHasError(newHasError);
    }
  }
};
