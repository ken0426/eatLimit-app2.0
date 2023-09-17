import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { FILTER_TAB_BAR } from '../../contents';

type Props = {
  selectBar: 0 | 1;
  setSelectBar: (e: 0 | 1) => void;
};

const MolFilterTabBar: FC<Props> = ({ selectBar, setSelectBar }) => {
  return (
    <View style={styles.tabArea}>
      <TouchableOpacity
        onPress={() => setSelectBar(FILTER_TAB_BAR.FILTER)}
        style={[
          styles.touchArea,
          selectBar === FILTER_TAB_BAR.FILTER && {
            borderBottomWidth: 2,
            borderBottomColor: COLORS.DETAIL_BORDER,
          },
        ]}
      >
        <Text style={styles.tabText}>フィルター</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelectBar(FILTER_TAB_BAR.SORT)}
        style={[
          styles.touchArea,
          selectBar === FILTER_TAB_BAR.SORT && {
            borderBottomWidth: 2,
            borderBottomColor: COLORS.DETAIL_BORDER,
          },
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
    marginBottom: SIZE.BASE_HP * 2,
    backgroundColor: COLORS.SETTING_LABEL,
  },
  touchArea: {
    flex: 1,
    paddingVertical: SIZE.BASE_HP * 0.6,
  },
  tabText: {
    fontSize: FONTSIZE.SIZE24PX,
    textAlign: 'center',
  },
});
