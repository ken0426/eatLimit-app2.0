import { MaterialIcons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { noImage } from '../../moc';
import { ApiData, StackPramList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRootDispatch, useRootSelector } from '../../redux/store/store';
import { setUpdateRegisterData } from '../../redux/slices/commonRegisterSlice';
import moment from 'moment';

type Props = {
  item: ApiData;
  index: number;
  navigation: StackNavigationProp<StackPramList, 'homeScreen' | 'searchScreen'>;
};

const OrgList: FC<Props> = ({ item, index, navigation }) => {
  const dispatch = useRootDispatch();
  const imageId = useRootSelector((state) => state.common.imageId);
  const dateFormatDisplayId = useRootSelector(
    (state) => state.common.dateFormatDisplayId
  );
  const dateDisplayId = useRootSelector((state) => state.common.dateDisplayId);
  const isImage = imageId == 1;

  const getDate = () => {
    if (dateFormatDisplayId === 1) {
      if (dateDisplayId === 1) {
        return moment(item.date).format('YYYY年MM月DD日');
      } else {
        return moment(item.date).format('MM月DD日');
      }
    } else if (dateFormatDisplayId === 2) {
      if (dateDisplayId === 1) {
        return moment(item.date).format('YYYY/MM/DD');
      } else {
        return moment(item.date).format('MM/DD');
      }
    } else if (dateFormatDisplayId === 3) {
      if (dateDisplayId === 1) {
        return moment(item.date).format('YYYY-MM-DD');
      } else {
        return moment(item.date).format('MM-DD');
      }
    }
  };

  return (
    <View key={Number(index)} style={{ backgroundColor: COLORS.WHITE }}>
      <TouchableOpacity
        style={[
          styles.contents,
          index === 0 && { borderTopWidth: SIZE.BASE_HP * 0.05 },
        ]}
        onPress={() => {
          navigation.navigate('detailScreen', { item });
          dispatch(setUpdateRegisterData(item));
        }}
      >
        {isImage && (
          <View style={styles.imageArea}>
            <Image
              style={{ width: '90%', height: '90%' }}
              source={{ uri: item.image ?? noImage }}
            />
          </View>
        )}
        <View style={[styles.textArea, { paddingLeft: isImage ? 0 : 20 }]}>
          <Text style={styles.eatName}>{item.eatName}</Text>
          <Text style={styles.date}>{getDate()}</Text>
        </View>
        <View style={styles.arrow}>
          <MaterialIcons
            name='keyboard-arrow-right'
            size={24}
            color={COLORS.TEXT_COLOR}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OrgList;

const styles = StyleSheet.create({
  contents: {
    height: SIZE.BASE_HP * 11,
    borderBottomWidth: SIZE.BASE_HP * 0.05,
    borderColor: COLORS.BORDER_LINE,
    flexDirection: 'row',
  },
  imageArea: {
    width: SIZE.BASE_HP * 15.5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    justifyContent: 'space-around',
    marginVertical: SIZE.BASE_HP * 0.6,
  },
  arrow: {
    height: '100%',
    width: SIZE.BASE_WP * 8,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eatName: {
    fontSize: FONTSIZE.SIZE20PX,
  },
  date: {
    fontSize: FONTSIZE.SIZE15PX,
  },
});
