import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeepData, ManagementData } from '../../types';
import { FONTSIZE, color } from '../../styles';

type Props = {
  item: KeepData | ManagementData;
  onPress: () => void;
};

const AtomSelectButton: FC<Props> = ({ item, onPress }) => {
  if (item?.image) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[styles.content, { borderColor: item.selectColor }]}
      >
        <View style={styles.imageArea}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={[styles.textArea, { borderColor: item.selectColor }]}>
          <Text style={[styles.text, { color: item.selectColor }]}>
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={styles.noImageContent}
      >
        <View style={styles.noImageTextArea}>
          <Text style={styles.noImageText}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export default AtomSelectButton;

const styles = StyleSheet.create({
  selectArea: {
    padding: 10,
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  content: {
    height: '70%',
    width: '30%',
    borderWidth: 3,
    borderRadius: 10,
  },
  noImageContent: {
    width: '44%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: color.detailBorderColor,
  },
  imageArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '55%',
    height: '100%',
    resizeMode: 'contain',
  },
  textArea: {
    borderTopWidth: 3,
  },
  noImageTextArea: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: FONTSIZE.SIZE25PX,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  noImageText: {
    fontSize: FONTSIZE.SIZE25PX,
    color: color.detailBorderColor,
    fontWeight: 'bold',
  },
});
