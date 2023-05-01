import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AtomSelectButton = () => {
  return (
    <View style={styles.selectArea}>
      <TouchableOpacity style={styles.content}>
        <View style={styles.imageArea}>
          <Image
            source={require('../../images/snow.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.textArea}>
          <Text style={styles.text}>冷凍</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AtomSelectButton;

const styles = StyleSheet.create({
  selectArea: {
    padding: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    height: '70%',
    width: '30%',
    borderWidth: 3,
    borderColor: 'rgb(79, 199, 214)',
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
    borderTopColor: 'rgb(79, 199, 214)',
    borderTopWidth: 3,
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    paddingVertical: 10,
    color: 'rgb(79, 199, 214)',
    fontWeight: 'bold',
  },
});
