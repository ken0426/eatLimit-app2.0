import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { WINDOW_HEIGHT } from '../../utils';
import AtomButton from '../atoms/AtomButton';
import { COLORS, FONTSIZE } from '../../styles';
import { ModalButton } from '../../types';

type Props = {
  isVisible: boolean;
  cancelOnPress: () => void;
  message: string;
  data: ModalButton[];
  fontSize?: number;
  borderColor?: string;
};

const OrgModalDefault: FC<Props> = ({
  isVisible,
  cancelOnPress,
  message,
  data,
  fontSize = FONTSIZE.SIZE30PX,
  borderColor = COLORS.DETAIL_BORDER,
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={cancelOnPress}>
      <View style={styles.modal}>
        <Text style={styles.text}>{message}</Text>
        <View style={styles.buttonArea}>
          {data.map((item, index) => (
            <AtomButton
              key={index}
              onPress={item.onPress}
              buttonText={item.text}
              fontSize={fontSize}
              borderColor={borderColor}
              color='#000000'
              backgroundColor='white'
              width={150}
              borderWidth={1}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default OrgModalDefault;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: WINDOW_HEIGHT / 3.2,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonArea: {
    flexDirection: 'row',
  },
  text: {
    fontSize: FONTSIZE.SIZE20PX,
  },
});
