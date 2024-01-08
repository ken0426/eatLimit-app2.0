import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { FC } from 'react';
import { COLORS, FONTSIZE, SIZE } from '../../styles';

type Props = {
  labelText: string;
  setLabelText: (e: string) => void;
};

const AtomMemoLabel: FC<Props> = ({ labelText, setLabelText }) => {
  return (
    <View style={styles.labelArea}>
      <Text style={styles.label}>項目名：</Text>
      <TextInput
        value={labelText}
        onChangeText={(e) => setLabelText(e)}
        style={styles.labelText}
      />
    </View>
  );
};

export default AtomMemoLabel;

const styles = StyleSheet.create({
  labelArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZE.BASE_WP * 2,
    borderBottomColor: COLORS.BORDER_LINE,
    borderBottomWidth: 0.5,
    paddingBottom: SIZE.BASE_WP,
  },
  label: {
    fontSize: FONTSIZE.SIZE20PX,
    color: COLORS.TEXT_LABEL,
    fontWeight: '400',
  },
  labelText: {
    flex: 1,
    height: SIZE.BASE_WP * 8,
    fontSize: FONTSIZE.SIZE20PX,
    textAlign: 'right',
  },
});
