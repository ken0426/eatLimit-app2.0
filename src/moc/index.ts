import moment from 'moment';
import { ApiData } from '../types';

export const noImage = 'https://bpbd.sumbarprov.go.id/images/noimage.png';

const getRandomNumber = <T>(data: readonly T[]) => {
  return Math.floor(Math.random() * data.length);
};

/** 個数の動的処理 */
const getCountRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomNumber = getCountRandomNumber(1, 99);

/** 管理方法の動的処理 */
const managementData = ['消費期限', '賞味期限', '購入日', '登録日'] as const;
const managementIndex: number = getRandomNumber(managementData);
const managementValue = managementData[managementIndex];

/** 保存方法の動的処理 */
const keepData = ['常温', '冷蔵', '冷凍'] as const;
const keepDataIndex: number = getRandomNumber(keepData);
const randomValue = keepData[keepDataIndex];

// export const data: ApiData[] = [
//   {
//     eatName: '動的リスト画像なし',
//     count: randomNumber,
//     date: moment().format('YYYY-MM-DD'),
//     management: managementValue,
//     preservation: randomValue,
//     registerDate: '2023-01-01 00:00:01',
//   },
//   {
//     eatName: '動的リスト画像あり',
//     count: randomNumber,
//     image:
//       'https://www.y-koseiren.jp/web/wp-content/uploads/2021/11/%E9%87%8E%E8%8F%9C.jpg',
//     date: moment().format('YYYY-MM-DD'),
//     approximateDeadline:
//       managementValue === '登録日' || managementValue === '購入日'
//         ? moment().add(10, 'days').format('YYYY-MM-DD')
//         : undefined,
//     management: managementValue,
//     preservation: randomValue,
//     registerDate: '2023-01-02 00:00:02',
//     placeOfPurchase: '北神戸イオン',
//     price: 1000,
//     memo: `日付：2023年12月2日\n
//     ◆ 人参のみの買い物\n
//     1. 野菜コーナー
//     - 人参：1袋
//     メモ：
//     - 今日は人参だけを買ってきました。
//     - 冷蔵庫に他の野菜があるか確認して、煮物やサラダに使えそうなレシピを考える。`,
//     tagData: [
//       { id: '1001', name: '1001のタグ' },
//       { id: '1002', name: '1002のタグ' },
//     ],
//   },
//   {
//     eatName: '消費期限固定リスト',
//     count: 1,
//     date: '2023-04-27',
//     management: '消費期限',
//     preservation: '冷蔵',
//     registerDate: '2023-01-03 00:00:03',
//   },
//   {
//     eatName: '賞味期限固定リスト',
//     count: 1,
//     date: '2023-04-27',
//     management: '賞味期限',
//     preservation: '冷蔵',
//     registerDate: '2023-01-04 00:00:04',
//   },
//   {
//     eatName: '登録日固定リスト',
//     count: 1,
//     date: '2023-04-27',
//     management: '登録日',
//     preservation: '冷蔵',
//     registerDate: '2023-01-05 00:00:05',
//   },
//   {
//     eatName: '購入日固定リスト',
//     count: 1,
//     date: '2023-04-27',
//     management: '購入日',
//     preservation: '冷蔵',
//     registerDate: '2023-01-06 00:00:06',
//   },
//   {
//     eatName: '冷蔵固定リスト',
//     count: 1,
//     date: '2023-04-27',
//     management: '購入日',
//     preservation: '冷蔵',
//     registerDate: '2023-01-07 00:00:07',
//   },
//   {
//     eatName: '冷凍固定リスト',
//     count: 1,
//     date: '2023-04-27',
//     management: '購入日',
//     preservation: '冷凍',
//     registerDate: '2023-01-08 00:00:08',
//   },
//   {
//     eatName: '常温固定リスト',
//     count: 1,
//     date: '2023-04-27',
//     management: '購入日',
//     preservation: '常温',
//     registerDate: '2023-01-09 00:00:09',
//   },
//   {
//     eatName: 'たらこ',
//     count: 1,
//     image:
//       'https://p1-e6eeae93.imageflux.jp/c!/w=800,h=800,a=2/michiba-suisan/9a7ac9aa6985a45b860a.jpg',
//     date: '2023-04-27',
//     management: '消費期限',
//     preservation: '冷蔵',
//     registerDate: '2023-01-10 00:00:10',
//   },
//   {
//     eatName: 'いくら',
//     count: 1,
//     image: 'https://img.tkjm.jp/webshop/003/876/sl_10966.jpg',
//     date: '2023-04-26',
//     price: 2500,
//     placeOfPurchase: 'イオン',
//     management: '消費期限',
//     preservation: '冷蔵',
//     registerDate: '2023-01-11 00:00:11',
//   },
//   {
//     eatName: 'サーモン',
//     count: 1,
//     image:
//       'https://media.delishkitchen.tv/article/105/kmn81saarcn.jpeg?version=1586229518',
//     date: '2023-04-28',
//     placeOfPurchase: 'イオン',
//     price: 1200,
//     management: '消費期限',
//     preservation: '冷蔵',
//     registerDate: '2023-01-12 00:00:12',
//   },
//   {
//     eatName: '納豆',
//     count: 1,
//     image:
//       'https://p1-e6eeae93.imageflux.jp/c!/a=2,w=800,h=800/mkdirect/149d22949040b32ff922.png',
//     date: '2023-08-20',
//     placeOfPurchase: 'イオン',
//     management: '消費期限',
//     preservation: '冷蔵',
//     registerDate: '2023-01-13 00:00:13',
//   },
//   {
//     eatName: 'りんご',
//     count: 1,
//     image:
//       'https://media.delishkitchen.tv/article/742/5mvvi83j09h.jpeg?version=1625233091',
//     date: '2023-04-26',
//     placeOfPurchase: 'イオン',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-01-14 00:00:14',
//   },
//   {
//     eatName: 'バナナ',
//     count: 1,
//     image:
//       'https://img.benesse-cms.jp/thank-you/item/image/normal/resized/resized_619b0fdf-b61c-472a-92f8-623153f27c0e.jpg',
//     date: '2023-09-26',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-01-15 00:00:15',
//   },
//   {
//     eatName: 'いちご',
//     count: 1,
//     image: 'https://life.ja-group.jp/upload/food/vegetable/main/27_1.jpg',
//     date: '2023-04-26',
//     management: '消費期限',
//     preservation: '冷蔵',
//     registerDate: '2023-01-16 00:00:16',
//   },
//   {
//     eatName: 'アイス',
//     count: 1,
//     image:
//       'https://www.haagen-dazs.co.jp/products/uploads/images/20190601_08.png',
//     date: '2023-09-01',
//     price: 200,
//     management: '消費期限',
//     preservation: '冷凍',
//     registerDate: '2023-01-17 00:00:17',
//   },
//   {
//     eatName: 'オレンジジュース',
//     count: 1,
//     date: '2023-04-26',
//     image:
//       'https://ok-netsuper.com/images/sku/d4ae3eb6b068e/d4ae3eb6b068e_01.jpg',
//     management: '消費期限',
//     preservation: '冷蔵',
//     registerDate: '2023-01-18 00:00:18',
//   },
//   {
//     eatName: 'メロン',
//     count: 1,
//     date: '2023-04-26',
//     image:
//       'https://shop.odakyu-dept.co.jp/storage/ex_product_sku_image/1/1052011853.jpg',
//     placeOfPurchase: 'イオン',
//     management: '消費期限',
//     preservation: '冷蔵',
//     registerDate: '2023-01-19 00:00:19',
//   },
//   {
//     eatName: 'うどん',
//     count: 1,
//     date: '2023-10-26',
//     image:
//       'https://housefoods.jp/_sys/catimages/recipe/hfrecipe/items/00023060/0.jpeg',
//     management: '消費期限',
//     preservation: '冷凍',
//     registerDate: '2023-01-20 00:00:20',
//   },
//   {
//     eatName: 'ケーキ',
//     count: 1,
//     date: '2023-10-26',
//     image:
//       'https://tk.ismcdn.jp/mwimgs/5/5/1200w/img_55da7d47b72b81c3e63e872b5cd5965e320650.jpg',
//     management: '消費期限',
//     preservation: '冷蔵',
//     registerDate: '2023-01-21 00:00:21',
//   },
//   {
//     eatName: '購入日を確認するデータ',
//     count: 1,
//     date: moment().add(1, 'day').format('YYYY-MM-DD'),
//     management: '購入日',
//     preservation: '常温',
//     registerDate: '2023-01-22 00:00:22',
//   },
//   {
//     eatName: '登録日の仮データ',
//     count: 1,
//     date: '2023-04-26',
//     management: '登録日',
//     preservation: '常温',
//     approximateDeadline: '2023-09-05',
//     registerDate: '2023-01-23 00:00:23',
//   },
//   {
//     eatName: '画像なし',
//     count: 10,
//     date: '2023-04-26',
//     management: '消費期限',
//     preservation: '常温',
//     placeOfPurchase: 'イオン',
//     price: 1200,
//     registerDate: '2023-01-24 00:00:24',
//   },
//   {
//     eatName: '99個のアイテム',
//     count: 99,
//     date: '2023-07-26',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-01-25 00:00:25',
//   },
//   {
//     eatName: '画像なし',
//     count: 1,
//     date: '2023-07-26',
//     management: '登録日',
//     preservation: '常温',
//     registerDate: '2023-01-26 00:00:26',
//   },
//   {
//     eatName: '画像なし',
//     count: 1,
//     date: '2023-08-09',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-01-27 00:00:27',
//   },
//   {
//     eatName: 'カウンターの不具合対応用',
//     count: 5,
//     date: '2023-10-23',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-10-23 22:07:00',
//   },
//   {
//     eatName: 'タグ確認用1001',
//     count: 5,
//     date: '2023-11-29',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-11-29 20:14:00',
//   },
//   {
//     eatName: 'タグ確認用1002',
//     count: 5,
//     date: '2023-11-29',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-11-29 20:15:00',
//   },
//   {
//     eatName: 'タグ確認用1001と1002',
//     count: 5,
//     date: '2023-11-29',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-11-29 20:16:00',
//   },
//   {
//     eatName: 'タグ消滅用',
//     count: 5,
//     date: '2023-11-29',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-11-29 20:17:00',
//   },
//   {
//     eatName: 'タグ確認用1001とタグ消滅用',
//     count: 5,
//     date: '2023-11-29',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-11-29 20:18:00',
//   },
//   {
//     eatName: 'タグがたくさんたくさんある商品！！！！',
//     count: 5,
//     date: '2023-11-29',
//     management: '消費期限',
//     preservation: '常温',
//     registerDate: '2023-11-29 20:18:00',
//   },
//   {
//     eatName: '全項目入力テスト',
//     count: 5,
//     date: '2023-12-02',
//     management: '登録日',
//     preservation: '常温',
//     registerDate: '2023-12-02 12:00:00',
//     approximateDeadline:
//       managementValue === '登録日' || managementValue === '購入日'
//         ? moment().add(10, 'days').format('YYYY-MM-DD')
//         : undefined,
//     memo: `
//     商品メモ：
// 新商品「エレガントビューティーコレクション」は、洗練されたデザインと高品質な素材で注目を集めています。美容に特化したアイテムで、肌に優しい成分を使用し、ユーザーに安心感を提供します。パッケージもシンプルでありながらエレガントで、贈り物にも最適です。
// 商品ラインナップは幅広く、スキンケアアイテムからメイクアップ製品まで網羅しています。特に、「シルクスムースファンデーション」は軽いつけ心地でありながら高いカバレッジを実現し、長時間崩れにくい仕上がりが魅力です。
// また、新機能搭載の「スマートヘアドライヤー」は、温度や風量を自動で調節し、髪のダメージを最小限に抑えながら効率的にスタイリングができる画期的な商品です。コードレスで使用可能なため、使用場所を選ばず手軽に利用できます。
// 価格帯も幅広く、幅広いユーザーにアプローチできるラインナップとなっています。これらの商品は、美容と利便性を追求する方々に向けて開発され、市場で高い評価を得ています。
//     `,
//   },
// ];
