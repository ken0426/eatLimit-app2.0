import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { useRootDispatch } from '../../redux/store/store';
import { setFilterSelectedData } from '../../redux/slices/filterModalSlice';
import { TargetFilterData } from '../../types';

type Props = {
  text: string;
  id: string;
  data: { text: string; id: string }[];
  selectedId: string;
  setSelectedId: (e: string) => void;
  multiSelectedId: string[];
  setMultiSelectedId: (e: string[]) => void;
  elementName: string;
  setTargetFilterData: (e: TargetFilterData) => void;
  setIsRestButton: (e: boolean) => void;
  isRestButton: boolean;
};

const AtomFilterSelectButton: FC<Props> = ({
  text,
  id,
  data,
  selectedId,
  setSelectedId,
  multiSelectedId,
  setMultiSelectedId,
  elementName,
  setTargetFilterData,
  setIsRestButton,
  isRestButton,
}) => {
  const dispatch = useRootDispatch();

  /** ボタンの背景色を計算 */
  const getBackGroundColor = () => {
    if (data.length > 2) {
      if (multiSelectedId.find((selectedId) => selectedId === id)) {
        return { backgroundColor: COLORS.TEXT_LABEL };
      } else {
        return { backgroundColor: COLORS.TEXT_INPUT };
      }
    } else {
      if (id === selectedId) {
        return { backgroundColor: COLORS.TEXT_LABEL };
      } else {
        return { backgroundColor: COLORS.TEXT_INPUT };
      }
    }
  };

  /** ボタンの文字の色を計算 */
  const getTextColor = () => {
    if (data.length > 2) {
      if (multiSelectedId.find((selectedId) => selectedId === id)) {
        return { color: COLORS.SIGN_IN_BUTTON };
      } else {
        return { color: COLORS.MAIN_TEXT_COLOR };
      }
    } else {
      if (id === selectedId) {
        return { color: COLORS.SIGN_IN_BUTTON };
      } else {
        return { color: COLORS.MAIN_TEXT_COLOR };
      }
    }
  };

  const onPress = () => {
    setIsRestButton(false);
    if (data.length > 2) {
      // 複数選択
      if (multiSelectedId.find((selectedId) => selectedId === id)) {
        // 選択を解除
        const newMultiSelectedId = multiSelectedId.filter(
          (selectedId) => selectedId !== id
        );
        setMultiSelectedId(newMultiSelectedId);
        dispatch(
          setFilterSelectedData({
            multi: {
              [elementName]: newMultiSelectedId,
            },
          })
        );
        setTargetFilterData({ elementName, id: newMultiSelectedId });
      } else {
        // 選択した時
        setMultiSelectedId([...multiSelectedId, id]);
        const selectedData: string[] = [...multiSelectedId, id];
        dispatch(
          setFilterSelectedData({ multi: { [elementName]: selectedData } })
        );
        setTargetFilterData({ elementName, id: selectedData });
      }
    } else {
      // 単数選択
      setSelectedId(id);
      dispatch(setFilterSelectedData({ single: { [elementName]: id } }));
      setTargetFilterData({ elementName, id });
    }
  };

  /** リセットボタンの発火用hook */
  useEffect(() => {
    if (isRestButton) {
      if (data.length > 2) {
        setMultiSelectedId([]);
        dispatch(setFilterSelectedData({ multi: { [elementName]: [] } }));
      } else {
        setSelectedId('1');
        dispatch(setFilterSelectedData({ single: { [elementName]: '1' } }));
      }
    }
  }, [isRestButton]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, getBackGroundColor()]}
    >
      <Text style={[styles.buttonText, getTextColor()]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AtomFilterSelectButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TEXT_INPUT,
    marginBottom: SIZE.BASE_WP * 1.6,
  },
  buttonText: {
    fontSize: FONTSIZE.SIZE15PX,
    paddingHorizontal: SIZE.BASE_WP * 3,
    paddingVertical: SIZE.BASE_WP * 4,
    fontWeight: 'bold',
  },
});
