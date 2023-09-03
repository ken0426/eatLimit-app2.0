import React, { FC, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import AtomRequire from './AtomRequire';
import { PostData } from '../../types';

type Props = {
  onPressIn: () => void;
  setData: ({ key, value }: PostData) => void;
};

const AtomCounter: FC<Props> = ({ onPressIn, setData }) => {
  const [text, setText] = useState<number>(1);

  useEffect(() => {
    setData({ key: '個数', value: String(text), isRequired: true });
  }, [text]);

  return (
    <View style={styles.itemArea}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.labelArea}>
          <AtomRequire label={'個数'} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.counterArea}>
            <TouchableOpacity
              style={styles.countTouchArea}
              onPress={() => setText((e) => (e > 1 ? e - 1 : e))}
            >
              <AntDesign name='minus' size={24} color='black' />
            </TouchableOpacity>
            <TextInput
              onPressIn={onPressIn}
              style={[
                styles.textInput,
                text > 999 && { backgroundColor: COLORS.CAVEAT },
              ]}
              value={String(text)}
              onChangeText={(inputText) =>
                setText(() => {
                  if (Number(inputText) < 1) {
                    return Number(1);
                  } else {
                    return Number(inputText);
                  }
                })
              }
              keyboardType={'numeric'}
            />
            <TouchableOpacity
              style={styles.countTouchArea}
              onPress={() => setText((e) => e + 1)}
            >
              <AntDesign name='plus' size={24} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {text > 999 && <Text style={styles.errorMessage}>個数は999までです</Text>}
    </View>
  );
};

export default AtomCounter;

const styles = StyleSheet.create({
  itemArea: {
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
    justifyContent: 'center',
  },
  labelArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    color: COLORS.TEXT_LABEL,
    fontWeight: '400',
  },
  counterArea: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInput: {
    width: 80,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: FONTSIZE.SIZE20PX,
    borderWidth: 1,
    marginHorizontal: SIZE.BASE_WP,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  errorMessage: {
    color: COLORS.RED,
    marginTop: 10,
    width: '100%',
    textAlign: 'right',
  },
  countTouchArea: {
    borderWidth: 1,
    borderRadius: 5,
  },
});
