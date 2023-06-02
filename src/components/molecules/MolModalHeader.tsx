import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONTSIZE, color } from '../../styles';

type Props = {
  cancelOnPress: () => void;
  completedOnPress: () => void;
};

const MolModalHeader: FC<Props> = ({ cancelOnPress, completedOnPress }) => {
  return (
    <View style={styles.buttonArea}>
      <TouchableOpacity onPress={cancelOnPress}>
        <Text style={styles.cancel}>キャンセル</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={completedOnPress}>
        <Text style={styles.completed}>完了</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default MolModalHeader;

const styles = StyleSheet.create({
  buttonArea: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: color.modalFooterTextArea,
  },
  cancel: {
    width: '100%',
    justifyContent: 'center',
    fontSize: FONTSIZE.SIZE20PX,
    color: color.mainTextColor,
  },
  completed: {
    width: '100%',
    justifyContent: 'center',
    fontSize: FONTSIZE.SIZE20PX,
    color: color.mainTextColor,
  },
});
