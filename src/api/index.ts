import { tagData } from '../moc';

/** ユーザーが保存しているタグのデータを取得 */
export const fetchTag = async () => {
  try {
    const res = tagData;
    return res;
  } catch (error) {}
};
