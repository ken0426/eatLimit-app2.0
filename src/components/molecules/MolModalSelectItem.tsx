import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTSIZE, SIZE } from '../../styles';
import AtomFilterSelectButton from '../atoms/AtomFilterSelectButton';

type Props = {
  label: string;
  data: { text: string; id: string }[];
};

const MolModalSelectItem: FC<Props> = ({ label, data }) => {
  /** 単数選択の場合 */
  const [selectedId, setSelectedId] = useState(data[0].id); // TODO reduxからのデータを取得→なければ初期値をセットする
  /** 複数選択の場合 */
  const [multiSelectedId, setMultiSelectedId] = useState<string[]>([]); // TODO reduxからのデータを取得→なければ初期値をセットする

  return (
    <View style={styles.contents}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.touchArea}>
        {data.map((item) => (
          <AtomFilterSelectButton
            key={item.id}
            text={item.text}
            id={item.id}
            data={data}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            multiSelectedId={multiSelectedId}
            setMultiSelectedId={setMultiSelectedId}
          />
        ))}
      </View>
    </View>
  );
};

export default MolModalSelectItem;

const styles = StyleSheet.create({
  contents: {
    marginBottom: SIZE.BASE_HP * 0.5,
  },
  label: {
    fontSize: FONTSIZE.SIZE18PX,
    fontWeight: 'bold',
  },
  touchArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: SIZE.BASE_WP,
  },
});
