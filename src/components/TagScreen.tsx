import React, { useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { setTagSelected } from '../redux/slices/commonRegisterSlice';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
import MolHeader from './molecules/MolHeader';
import { BUTTON_TEXT, HEADER_TYPE } from '../contents';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import AtomSettingRegister from './atoms/AtomSettingRegister';
import AtomButton from './atoms/AtomButton';
import AtomTagCheckSelect from './atoms/AtomTagCheckSelect';
import { tagData } from '../moc';

type RenderItem = {
  name: string;
  id: string;
};

const TagScreen = () => {
  const dispatch = useRootDispatch();
  const navigation = useNavigation();
  /** 選択しているタグのID */
  const tagSelected = useRootSelector(
    (state) => state.commonRegister.tagSelected
  );

  const [tagChecked, setTagChecked] = useState<string[]>(tagSelected);

  const renderItem: ListRenderItem<RenderItem> = ({ item, index }) => (
    <AtomTagCheckSelect
      key={item.id}
      name={item.name}
      id={item.id}
      style={index === tagData.length - 1 && styles.lastItem}
      tagChecked={tagChecked}
      setTagChecked={setTagChecked}
    />
  );

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

      {/* TODO 検索のUIを追加 */}

      <View style={styles.selectArea}>
        <FlatList
          data={tagData}
          renderItem={renderItem}
          style={styles.tagList}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      {tagChecked.length ? (
        <View style={styles.buttonArea}>
          <AtomButton
            onPress={() => {
              dispatch(setTagSelected(tagChecked));
              navigation.goBack();
            }}
            buttonText={`${BUTTON_TEXT.OK}(${tagChecked.length})`}
            color={COLORS.WHITE}
            fontSize={FONTSIZE.SIZE25PX}
            backgroundColor={COLORS.BLUE}
            width={wp('90%')}
            buttonStyle={styles.registerButton}
            textStyle={styles.registerButtonText}
          />
        </View>
      ) : (
        <></>
      )}
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
    paddingVertical: SIZE.BASE_WP * 2.7,
    fontFamily: 'HiraginoSans-W3',
  },
  selectArea: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SIZE.BASE_WP * 10,
  },
  tagList: {
    flex: 1,
  },
  lastItem: {
    marginBottom: SIZE.BASE_WP * 20,
  },
});
