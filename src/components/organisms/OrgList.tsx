import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { COLORS, FONTSIZE, SIZE } from '../../styles';
import { noImage } from '../../moc';
import { ApiData, StackPramList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRootDispatch, useRootSelector } from '../../redux/store/store';
import { setUpdateRegisterData } from '../../redux/slices/commonRegisterSlice';
import { useDateFormat } from '../../hooks/useDateFormat';
import SvgIcon from '../../images/SvgIcon';
import { DISPLAY_IMAGE_ID, MANAGEMENT_SELECTED_TEXT } from '../../contents';

type Props = {
  item: ApiData;
  index: number;
  navigation: StackNavigationProp<StackPramList, 'homeScreen' | 'searchScreen'>;
  deletePress?: boolean;
  setDeletePress?: (e: boolean) => void;
  setDeleteIds?: (e: string[]) => void;
  deleteIds?: string[];
};

const OrgList: FC<Props> = ({
  item,
  index,
  navigation,
  deletePress,
  setDeletePress,
  deleteIds,
  setDeleteIds,
}) => {
  const dispatch = useRootDispatch();
  const imageId = useRootSelector((state) => state.common.imageId);
  const isImage = imageId === DISPLAY_IMAGE_ID;

  const beforeDate = moment().isAfter(
    item.management === MANAGEMENT_SELECTED_TEXT.PURCHASE_DATE ||
      item.management === MANAGEMENT_SELECTED_TEXT.REGISTRATION_DATE
      ? item.approximateDeadline!
      : item.date,
    'day'
  );

  const dateText = useDateFormat(
    item.management === MANAGEMENT_SELECTED_TEXT.PURCHASE_DATE ||
      item.management === MANAGEMENT_SELECTED_TEXT.REGISTRATION_DATE
      ? item.approximateDeadline!
      : item.date
  );

  return (
    <TouchableOpacity
      key={Number(index)}
      style={
        index === 0
          ? deleteIds?.includes(item.id)
            ? styles.deleteListTop
            : styles.listTop
          : deleteIds?.includes(item.id)
          ? styles.deleteList
          : styles.list
      }
      onPress={() => {
        if (deletePress) {
          if (deleteIds?.includes(item.id)) {
            if (deleteIds.length === 1) {
              setDeletePress!(false);
              setDeleteIds!([]);
            } else {
              setDeleteIds!(deleteIds.filter((id) => id !== item.id));
            }
          } else {
            setDeleteIds!([...(deleteIds || []), item.id]);
          }
        } else {
          navigation.navigate('detailScreen', { item });
          dispatch(setUpdateRegisterData(item));
        }
      }}
      onLongPress={() => {
        if (setDeleteIds && setDeletePress) {
          setDeleteIds([item.id]);
          setDeletePress(true);
        }
      }}
    >
      {isImage && (
        <View style={styles.imageArea}>
          <Image
            style={styles.image}
            source={{ uri: item.image !== '' ? item.image : noImage }}
          />
        </View>
      )}
      <View style={[styles.textArea, { paddingLeft: isImage ? 0 : 20 }]}>
        <Text numberOfLines={1} style={styles.eatName}>
          {item.eatName}
        </Text>
        <View style={styles.listTextFooter}>
          <Text style={styles.date}>{dateText}</Text>
          {beforeDate && <Text style={styles.caveatText}>期限切れ</Text>}
        </View>
      </View>
      <View style={styles.arrow}>
        <SvgIcon
          type={'materialIcons'}
          name='keyboard-arrow-right'
          size={24}
          color={COLORS.TEXT_COLOR}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OrgList;

const styles = StyleSheet.create({
  deleteList: {
    height: SIZE.BASE_HP * 11,
    borderBottomWidth: SIZE.BASE_HP * 0.06,
    borderColor: COLORS.BORDER_LINE,
    flexDirection: 'row',
    backgroundColor: COLORS.LIST_DELETE,
  },
  list: {
    height: SIZE.BASE_HP * 11,
    borderBottomWidth: SIZE.BASE_HP * 0.06,
    borderColor: COLORS.BORDER_LINE,
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
  },
  listTextFooter: {
    flexDirection: 'row',
  },
  deleteListTop: {
    height: SIZE.BASE_HP * 11,
    borderBottomWidth: SIZE.BASE_HP * 0.06,
    borderColor: COLORS.BORDER_LINE,
    flexDirection: 'row',
    backgroundColor: COLORS.LIST_DELETE,
    borderTopWidth: SIZE.BASE_HP * 0.06,
  },
  listTop: {
    height: SIZE.BASE_HP * 11,
    borderBottomWidth: SIZE.BASE_HP * 0.06,
    borderColor: COLORS.BORDER_LINE,
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderTopWidth: SIZE.BASE_HP * 0.06,
  },
  imageArea: {
    width: SIZE.BASE_HP * 15.5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  textArea: {
    justifyContent: 'space-around',
    marginVertical: SIZE.BASE_HP * 0.6,
    flex: 1,
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
  caveatText: {
    marginLeft: SIZE.BASE_WP,
    color: COLORS.RED,
  },
});
