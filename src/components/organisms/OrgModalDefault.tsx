import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { WINDOW_HEIGHT } from '../../utils';
import AtomButton from '../atoms/AtomButton';
import { color } from '../../styles';

type Props = {
  isVisible: boolean;
  cancelOnPress: () => void;
  onPress: () => void;
  text: string;
  label: string;
  fontSize?: number;
  borderColor?: string;
  borderRadius?: number;
};

const OrgModalDefault: FC<Props> = ({
  isVisible,
  cancelOnPress,
  onPress,
  text,
  label,
  fontSize = 30,
  borderColor = color.detailBorderColor,
  borderRadius = 20,
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={cancelOnPress}>
      <View style={styles.modal}>
        <Text style={{ fontSize: 20 }}>{text}</Text>
        <AtomButton
          style={[styles.button, { fontSize, borderColor, borderRadius }]}
          onPress={onPress}
          label={label}
        />
      </View>
    </Modal>
  );
};

export default OrgModalDefault;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: WINDOW_HEIGHT / 3.2,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
