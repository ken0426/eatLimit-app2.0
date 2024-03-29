import React, { FC, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { COLORS, FONTSIZE, SIZE, STYLE_FLEX } from '../../styles';
import AtomRequire from './AtomRequire';
import { PostData } from '../../types';
import { LABEL_TEXT, REGISTER_COUNT_TEXT } from '../../contents';
import SvgIcon from '../../images/SvgIcon';

type Props = {
  onPressIn: () => void;
  setData: ({ key, value }: PostData) => void;
  textData?: number;
};

const AtomCounter: FC<Props> = ({ onPressIn, setData, textData = 1 }) => {
  const [text, setText] = useState<number>(Number(textData));

  useEffect(() => {
    setData({
      key: LABEL_TEXT.QUANTITY,
      value: String(text),
      isRequired: true,
    });
  }, [text]);

  return (
    <View style={styles.itemArea}>
      <View style={styles.touchCounterArea}>
        <View style={styles.labelArea}>
          <AtomRequire label={LABEL_TEXT.QUANTITY} />
        </View>
        <View style={STYLE_FLEX}>
          <View style={styles.counterArea}>
            <TouchableOpacity
              style={styles.countTouchArea}
              onPress={() =>
                setText((e) => {
                  if (e > 1) {
                    return e - 1;
                  } else {
                    return 1;
                  }
                })
              }
            >
              <SvgIcon
                type={'antDesign'}
                name={'minus'}
                size={24}
                color='black'
              />
            </TouchableOpacity>
            <TextInput
              onPressIn={onPressIn}
              style={[
                styles.textInput,
                text > REGISTER_COUNT_TEXT.MAX && {
                  backgroundColor: COLORS.CAVEAT,
                },
              ]}
              value={String(text)}
              onChangeText={(inputText) =>
                setText(() => {
                  if (Number(inputText) < REGISTER_COUNT_TEXT.MIN) {
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
              <SvgIcon type={'antDesign'} name='plus' size={24} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {text > REGISTER_COUNT_TEXT.MAX && (
        <Text style={styles.errorMessage}>個数は999までです</Text>
      )}
    </View>
  );
};

export default AtomCounter;

const styles = StyleSheet.create({
  itemArea: {
    paddingVertical: SIZE.BASE_WP * 3,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
    justifyContent: 'center',
  },
  touchCounterArea: {
    flexDirection: 'row',
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
    height: '100%',
    justifyContent: 'center',
  },
});
