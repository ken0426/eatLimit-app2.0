import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Accordion from '@gapur/react-native-accordion';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { ApiData } from '../../types';
import AtomMemoAccordionRenderItem from './AtomMemoAccordionRenderItem';

type Props = {
  item: ApiData;
};

const AtomDetailMemo: FC<Props> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const lineBreak = (item.memo?.match(/\n/g) || []).length + 1;

  const renderHeader = () => {
    return (
      <AtomMemoAccordionRenderItem
        item={item}
        numberOfLines={7}
        iconName={'keyboard-arrow-down'}
        lineBreak={lineBreak}
      />
    );
  };

  return (
    <View style={styles.contents}>
      <Text style={styles.label}>メモ</Text>

      {lineBreak > 7 ? (
        <Accordion
          showButton
          headerTitle={''}
          headerTitleStyle={styles.memoText}
          headerStyle={isOpen ? styles.displayNone : styles.displayFlex}
          renderHeader={renderHeader}
          renderButtonContent={(e) => {
            setTimeout(() => {
              setIsOpen(e);
            }, 150);
            return <></>;
          }}
          style={styles.accordionStyle}
          buttonStyle={styles.accordionButton}
        >
          <AtomMemoAccordionRenderItem
            item={item}
            iconName={'keyboard-arrow-up'}
            lineBreak={lineBreak}
          />
        </Accordion>
      ) : (
        <View style={styles.noAccordionArea}>
          <AtomMemoAccordionRenderItem
            item={item}
            iconName={'keyboard-arrow-up'}
            lineBreak={lineBreak}
          />
        </View>
      )}
    </View>
  );
};

export default AtomDetailMemo;

const styles = StyleSheet.create({
  contents: {
    marginTop: SIZE.BASE_WP * 3,
    backgroundColor: COLORS.WHITE,
    shadowOffset: { width: 0, height: 2 }, // ここで影のオフセットを設定
    shadowOpacity: 0.2, // 影の透明度
    shadowRadius: 1, // 影のぼかしの範囲
    elevation: 3,
  },
  displayNone: {
    display: 'none',
  },
  displayFlex: {
    display: 'flex',
  },
  label: {
    fontSize: FONTSIZE.SIZE20PX,
    paddingTop: SIZE.BASE_WP * 3,
    paddingHorizontal: SIZE.BASE_WP * 3,
  },
  memoArea: {
    paddingBottom: SIZE.BASE_WP * 6,
  },
  memoText: {
    fontSize: FONTSIZE.SIZE20PX,
  },
  accordionStyle: {
    borderRadius: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    borderColor: 'transparent',
    backgroundColor: COLORS.WHITE,
    elevation: 0,
  },
  accordionButton: {
    flex: 1,
    padding: SIZE.BASE_WP * 2,
  },
  noAccordionArea: {
    marginHorizontal: 12,
    paddingHorizontal: 12,
    marginTop: 12,
    paddingVertical: 12,
  },
});
