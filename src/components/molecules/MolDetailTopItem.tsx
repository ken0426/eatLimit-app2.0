import React, { FC, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { ApiData } from '../../types';
import MolDetailDateDisplay from './MolDetailDateDisplay';
import AtomDetailTag from '../atoms/AtomDetailTag';

type Props = {
  item: ApiData;
};

const MolDetailTopItem: FC<Props> = ({ item }) => {
  const [isSwipe, setIsSwipe] = useState(true);

  const renderItem = ({ item, index }: any) => (
    <AtomDetailTag key={index} item={item} />
  );

  return (
    <View style={styles.contents}>
      <TouchableOpacity activeOpacity={1} onPress={() => setIsSwipe(!isSwipe)}>
        <Text style={styles.eatName}>{item.eatName}</Text>
        <MolDetailDateDisplay item={item} />
      </TouchableOpacity>
      {item?.tagData?.length && (
        <View style={styles.tagArea}>
          {isSwipe ? (
            <FlatList
              data={item.tagData}
              renderItem={renderItem}
              horizontal={true}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={item.tagData.length > 1}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.openArea}
              onPress={() => setIsSwipe(!isSwipe)}
            >
              {item.tagData.map((tag) => (
                <AtomDetailTag key={tag.id} item={tag} />
              ))}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default MolDetailTopItem;

const styles = StyleSheet.create({
  contents: {
    backgroundColor: COLORS.WHITE,
    padding: SIZE.BASE_WP * 3,
    shadowOffset: { width: 0, height: 2 }, // ここで影のオフセットを設定
    shadowOpacity: 0.2, // 影の透明度
    shadowRadius: 1, // 影のぼかしの範囲
    elevation: 3,
  },
  eatName: {
    fontSize: FONTSIZE.SIZE30PX,
    fontWeight: 'bold',
    marginVertical: SIZE.BASE_WP,
  },
  tagArea: {
    flexDirection: 'row',
    marginTop: SIZE.BASE_WP * 2,
    flexWrap: 'wrap',
  },
  openArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
