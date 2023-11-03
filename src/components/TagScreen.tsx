import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MolHeader from './molecules/MolHeader';
import { BUTTON_TEXT, HEADER_TYPE } from '../contents';
import { StyleSheet, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import AtomButton from './atoms/AtomButton';
import { useNavigation } from '@react-navigation/native';

const TagScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
        <AtomSettingRegister
          title={'タグ選択'}
          imageType={'plus'}
          isRightButton={true}
          onRightPress={() => {}}
        />
      </MolHeader>

      <View style={styles.buttonArea}>
        <AtomButton
          onPress={() => navigation.goBack()}
          buttonText={`${BUTTON_TEXT.OK}(${0})`}
          color={COLORS.WHITE}
          fontSize={FONTSIZE.SIZE30PX}
          backgroundColor={COLORS.BLUE}
          width={wp('90%')}
          buttonStyle={styles.registerButton}
          textStyle={styles.registerButtonText}
        />
      </View>
    </View>
  );
};

export default TagScreen;

const styles = StyleSheet.create({
  header: {
    height: SIZE.BASE_HP * 12,
    paddingHorizontal: SIZE.BASE_WP * 5,
    paddingTop: SIZE.BASE_HP * 4,
    backgroundColor: COLORS.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
  buttonArea: {
    alignItems: 'center',
    position: 'absolute',
    bottom: wp('10%'),
    right: 0,
    left: 0,
  },
  registerButton: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 1,
  },
  registerButtonText: {
    padding: SIZE.BASE_WP * 1.3,
    fontFamily: 'HiraginoSans-W3',
  },
});
