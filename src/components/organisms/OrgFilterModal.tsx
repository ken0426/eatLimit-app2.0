import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { WINDOW_HEIGHT } from '../../utils';
import AtomButton from '../atoms/AtomButton';
import MolFilterTabBar from '../molecules/MolFilterTabBar';
import { FILTER_TAB_BAR } from '../../contents';
import MolModalSelectItem from '../molecules/MolModalSelectItem';
import { FILTER_MODAL_SELECT_BUTTON_DATA } from '../../contents/filterModalSelectButtonData';
import { TargetFilterData } from '../../types';
import { useRootSelector } from '../../redux/store/store';
import MolModalTagSelect from '../molecules/MolModalTagSelect';

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
  setTargetFilterData: (e: TargetFilterData) => void;
  filterData: TargetFilterData[];
  isRestButton: boolean;
  setIsRestButton: (e: boolean) => void;
};

const OrgFilterModal: FC<Props> = ({
  isVisible,
  setIsVisible,
  setTargetFilterData,
  filterData,
  isRestButton,
  setIsRestButton,
}) => {
  const [selectBar, setSelectBar] = useState<0 | 1 | 2>(0);
  const tagList = useRootSelector((state) => state.common.tagList);

  /** もしタグタブを選択している状態で、保存しているタグが消えた場合は、「フィルター」タブに戻す */
  useEffect(() => {
    if (tagList.length === 0) setSelectBar(0);
  }, [tagList]);

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal}>
        <View style={styles.modalContents}>
          <View style={styles.header}>
            <Text style={styles.headerText}>絞り込み</Text>
          </View>
          <MolFilterTabBar selectBar={selectBar} setSelectBar={setSelectBar} />
          <ScrollView style={styles.scroll}>
            <View
              style={
                selectBar === FILTER_TAB_BAR.FILTER ? styles.flex : styles.none
              }
            >
              {FILTER_MODAL_SELECT_BUTTON_DATA.map((item) =>
                item.FILTER.map((itm, index) => (
                  <MolModalSelectItem
                    key={index}
                    label={itm.LABEL}
                    data={itm.DATA}
                    elementName={itm.ELEMENT_NAME}
                    setTargetFilterData={setTargetFilterData}
                    isRestButton={isRestButton}
                    setIsRestButton={setIsRestButton}
                  />
                ))
              )}
            </View>
            {tagList.length > 0 && (
              <MolModalTagSelect
                selectBar={selectBar}
                tagList={tagList}
                filterData={filterData}
                setTargetFilterData={setTargetFilterData}
              />
            )}
            <View
              style={
                selectBar === FILTER_TAB_BAR.SORT ? styles.flex : styles.none
              }
            >
              {FILTER_MODAL_SELECT_BUTTON_DATA.map((item) =>
                item.SORT.map((itm, index) => (
                  <MolModalSelectItem
                    key={index}
                    label={itm.LABEL}
                    data={itm.DATA}
                    elementName={itm.ELEMENT_NAME}
                    setTargetFilterData={setTargetFilterData}
                    isRestButton={isRestButton}
                    setIsRestButton={setIsRestButton}
                  />
                ))
              )}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.footerButtonArea}>
              <View style={styles.resetButtonArea}>
                <AtomButton
                  onPress={() => setIsRestButton(true)}
                  buttonText={'リセット'}
                  color={COLORS.MAIN_TEXT_COLOR}
                  backgroundColor={COLORS.MAIN_COLOR}
                  borderColor={COLORS.MAIN_TEXT_COLOR}
                  borderWidth={1}
                  width={90}
                  fontSize={20}
                />
              </View>
              <AtomButton
                onPress={() => {
                  setIsVisible(false);
                  console.log(filterData); // 確認のため残す
                }}
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
  modalContents: {
    justifyContent: 'space-between',
    flex: 1,
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
  scroll: {
    flex: 1,
    paddingTop: SIZE.BASE_HP * 2,
    paddingHorizontal: SIZE.BASE_HP,
  },
  flex: {
    display: 'flex',
  },
  none: {
    display: 'none',
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
  resetButtonArea: {
    position: 'absolute',
    top: 8,
    right: -2,
  },
});
