import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

const TopScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TouchableOpacity>
          <Text>ログイン</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>新規登録</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TopScreen;
