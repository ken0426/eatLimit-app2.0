import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  item: any;
  index: number;
  onPress: () => void;
};

const AtomSelectButton: FC<Props> = ({ item, index, onPress }) => {
  return (
    <TouchableOpacity
      key={index}
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
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});
