import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeepData, ManagementData } from '../../types';
import AtomSelectButton from '../atoms/AtomSelectButton';

type Props = {
  data: KeepData[] | ManagementData[];
  setIsVisible: (e: boolean) => void;
  setText: (e: string) => void;
};

const MolSingleSelect: FC<Props> = ({ data, setIsVisible, setText }) => {
  return (
    <View style={styles.selectArea}>
      {data.map((item, index) => (
        <AtomSelectButton
          key={index}
          item={item}
          onPress={() => {
            setText(item.text);
            setIsVisible(false);
          }}
        />
      ))}
    </View>
  );
};

export default MolSingleSelect;

const styles = StyleSheet.create({
  selectArea: {
    padding: 10,
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    height: '70%',
    width: '30%',
    borderWidth: 3,
    borderRadius: 10,
  },
  imageArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%',
    height: '50%',
  },
  textArea: {
    borderTopWidth: 3,
  },
});
