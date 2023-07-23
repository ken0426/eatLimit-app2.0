import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';

/** 選択中のメモのメモのテンプレート */
export const selectMemoTemplateStorage = new Storage({
  size: 1000,
  // バックエンドにAsyncStorageを使う
  storageBackend: AsyncStorage,
  // キャッシュ期限(null=期限なし)
  defaultExpires: null,
  // メモリにキャッシュするかどうか
  enableCache: true,
});
