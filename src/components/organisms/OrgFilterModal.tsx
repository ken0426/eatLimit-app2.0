import React, { FC } from 'react';
import Modal from 'react-native-modal';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../styles';
import { WINDOW_HEIGHT } from '../../utils';
import AtomButton from '../atoms/AtomButton';

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
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal}>
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>フィルターまたは並び替え</Text>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <Text>aa</Text>
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
    paddingVertical: 30,
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
