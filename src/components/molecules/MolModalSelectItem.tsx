import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTSIZE, SIZE } from '../../styles';
import AtomFilterSelectButton from '../atoms/AtomFilterSelectButton';
import { useRootSelector } from '../../redux/store/store';

type Props = {
  label: string;
  data: { text: string; id: string }[];
  elementName: string;
  setTargetFilterData: (e: any) => void;
};

const MolModalSelectItem: FC<Props> = ({
  label,
  data,
  elementName,
  setTargetFilterData,
}) => {
  const singleData = useRootSelector(
    (state) => state.filterModal.filterSelectedData.single
  );
  const multiData = useRootSelector(
    (state) => state.filterModal.filterSelectedData.multi
  );
  /** 単数選択の場合 */
  const [selectedId, setSelectedId] = useState(
    singleData[elementName] === '' ? data[0].id : singleData[elementName]
  );
  /** 複数選択の場合 */
  const [multiSelectedId, setMultiSelectedId] = useState<string[]>(
    multiData[elementName]?.length ? multiData[elementName] : []
  );

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
            elementName={elementName}
            setTargetFilterData={setTargetFilterData}
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
