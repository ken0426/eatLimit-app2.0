import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { FILTER_TAB_BAR } from '../../contents';
import { useRootSelector } from '../../redux/store/store';

type Props = {
  selectBar: 0 | 1 | 2;
  setSelectBar: (e: 0 | 1 | 2) => void;
};

const MolFilterTabBar: FC<Props> = ({ selectBar, setSelectBar }) => {
  const tagList = useRootSelector((state) => state.common.tagList);

  return (
    <View style={styles.tabArea}>
      <TouchableOpacity
        onPress={() => setSelectBar(FILTER_TAB_BAR.FILTER)}
        style={[
          styles.touchArea,
          selectBar === FILTER_TAB_BAR.FILTER && styles.displayTouchArea,
        ]}
      >
        <Text style={styles.tabText}>フィルター</Text>
      </TouchableOpacity>
      {tagList.length ? (
        <TouchableOpacity
          onPress={() => setSelectBar(FILTER_TAB_BAR.TAG)}
          style={[
            styles.touchArea,
            selectBar === FILTER_TAB_BAR.TAG && styles.displayTouchArea,
          ]}
        >
          <Text style={styles.tabText}>タグ</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <TouchableOpacity
        onPress={() => setSelectBar(FILTER_TAB_BAR.SORT)}
        style={[
          styles.touchArea,
          selectBar === FILTER_TAB_BAR.SORT && styles.displayTouchArea,
        ]}
      >
        <Text style={styles.tabText}>並び替え</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MolFilterTabBar;

const styles = StyleSheet.create({
  tabArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.SETTING_LABEL,
  },
  touchArea: {
    flex: 1,
    paddingVertical: SIZE.BASE_WP * 3,
  },
  displayTouchArea: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.DETAIL_BORDER,
  },
  tabText: {
    fontSize: FONTSIZE.SIZE20PX,
    textAlign: 'center',
  },
});
