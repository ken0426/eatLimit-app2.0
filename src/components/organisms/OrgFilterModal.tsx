import React, { FC, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { WINDOW_HEIGHT } from '../../utils';
import AtomButton from '../atoms/AtomButton';
import MolFilterTabBar from '../molecules/MolFilterTabBar';
import { FILTER_TAB_BAR } from '../../contents';
import MolModalSelectItem from '../molecules/MolModalSelectItem';

/** フィルターとして実装する機能
 * - 画像が存在するもの
 * - 管理方法
 * - 保存方法
 * - 期限日の日付（開始日時〜終了日時）
 * - 日付の並べ変え（ソート）
 */

type Props = {
  isVisible: boolean;
  setIsVisible: (e: boolean) => void;
};

const OrgFilterModal: FC<Props> = ({ isVisible, setIsVisible }) => {
  const [selectBar, setSelectBar] = useState<0 | 1>(0);

  // TODO 以下のデータは仮のため修正必須
  const buttonData1 = [
    { text: 'あり', id: uuidv4() },
    { text: 'なし', id: uuidv4() },
  ];
  const buttonData2 = [
    { text: '消費期限', id: uuidv4() },
    { text: '賞味期限', id: uuidv4() },
    { text: '購入日', id: uuidv4() },
    { text: '登録日', id: uuidv4() },
  ];
  const buttonData3 = [
    { text: '冷蔵', id: uuidv4() },
    { text: '冷凍', id: uuidv4() },
    { text: '常温', id: uuidv4() },
  ];

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal}>
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>絞り込み</Text>
          </View>
          <MolFilterTabBar selectBar={selectBar} setSelectBar={setSelectBar} />
          <ScrollView
            style={{
              flex: 1,
              paddingTop: SIZE.BASE_HP * 2,
              paddingHorizontal: SIZE.BASE_HP,
            }}
          >
            {selectBar === FILTER_TAB_BAR.FILTER && (
              <View>
                <MolModalSelectItem label={'画像の表示'} data={buttonData1} />
                <MolModalSelectItem label={'管理方法'} data={buttonData2} />
                <MolModalSelectItem label={'保存方法'} data={buttonData3} />
              </View>
            )}
            {selectBar === FILTER_TAB_BAR.SORT && (
              <View>
                <Text>これは並び替えの画面です</Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.footerButtonArea}>
              <AtomButton
                onPress={() => setIsVisible(false)}
                buttonText={'検索する'}
                color={COLORS.MAIN_TEXT_COLOR}
                backgroundColor={COLORS.MAIN_COLOR}
                borderColor={COLORS.MAIN_TEXT_COLOR}
                borderWidth={1}
                width={150}
                fontSize={30}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrgFilterModal;

// TODO iOSとAndroidでUIが崩れないように数値の箇所を修正する
const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    height: WINDOW_HEIGHT * 0.9,
    borderRadius: 20,
  },
  header: {
    width: '100%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LINE,
  },
  headerText: {
    textAlign: 'center',
    paddingVertical: SIZE.BASE_HP * 1.6,
    fontSize: FONTSIZE.SIZE25PX,
  },
  footer: {
    width: '100%',
    height: 100,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_LINE,
  },
  footerButtonArea: {
    alignItems: 'center',
    flex: 1,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    justifyContent: 'center',
  },
});
