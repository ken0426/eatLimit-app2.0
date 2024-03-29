/** React */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
/** ライブラリ */
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setTagSelectedIds } from '../redux/slices/commonRegisterSlice';
import { useRootDispatch, useRootSelector } from '../redux/store/store';
/** その他 */
import AtomSettingRegister from './atoms/AtomSettingRegister';
import AtomButton from './atoms/AtomButton';
import AtomTagCheckSelect from './atoms/AtomTagCheckSelect';
import MolHeader from './molecules/MolHeader';
import { BUTTON_TEXT, HEADER_TYPE } from '../contents';
import { COLORS, FONTSIZE, SIZE } from '../styles';
import { filterTagData } from '../utils';
import SvgIcon from '../images/SvgIcon';
import { StackPramList } from '../types';

type RenderItem = {
  name: string;
  id: string;
};

const TagScreen = () => {
  const dispatch = useRootDispatch();
  const navigation =
    useNavigation<StackNavigationProp<StackPramList, 'tagScreen'>>();
  /** 選択しているタグのID */
  const tagSelectedIds = useRootSelector(
    (state) => state.commonRegister.tagSelectedIds
  );
  /** タグの一覧を取得 */
  const tagList = useRootSelector((state) => state.common.tagList);
  const [tagChecked, setTagChecked] = useState<string[]>(tagSelectedIds);
  const [searchText, setSearchText] = useState('');
  const [tagListData, setTagListData] = useState(tagList);

  useEffect(() => setTagListData(tagList), [tagList]);

  const renderItem: ListRenderItem<RenderItem> = ({ item, index }) => (
    <AtomTagCheckSelect
      key={item.id}
      name={item.name}
      id={item.id}
      style={index === tagListData.length - 1 && styles.lastItem}
      tagChecked={tagChecked}
      setTagChecked={setTagChecked}
    />
  );

  const getData = () =>
    searchText === '' ? tagListData : filterTagData(tagListData, searchText);

  const tagRegisterOnPress = () => navigation.navigate('tagRegisterScreen');

  return (
    <View style={styles.contents}>
      <MolHeader style={styles.header} type={HEADER_TYPE.DEFAULT}>
        <AtomSettingRegister
          title={'タグ選択'}
          imageType={'materialCommunityIcons'}
          isRightButton={true}
          onRightPress={tagRegisterOnPress}
        />
      </MolHeader>

      {tagListData.length > 0 && (
        <View style={styles.searchArea}>
          <SvgIcon
            type={'antDesign'}
            name={'search1'}
            size={24}
            color={COLORS.MAIN_TEXT_COLOR}
          />
          <TextInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            style={styles.textInput}
          />
        </View>
      )}

      {tagListData.length ? (
        <View style={styles.selectArea}>
          <FlatList
            data={getData()}
            renderItem={renderItem}
            style={styles.tagList}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      ) : (
        <View style={styles.noSelectArea}>
          <TouchableOpacity onPress={tagRegisterOnPress}>
            <Text style={styles.tagRegisterButton}>タグを登録</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonArea}>
        <AtomButton
          onPress={() => {
            dispatch(setTagSelectedIds(tagChecked));
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
    </View>
  );
};

export default TagScreen;

const styles = StyleSheet.create({
  contents: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
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
  searchArea: {
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.DETAIL_BORDER,
    marginHorizontal: wp('5%'),
    flexDirection: 'row',
    paddingBottom: SIZE.BASE_WP * 2,
    marginTop: SIZE.BASE_WP * 5,
  },
  textInput: {
    fontSize: FONTSIZE.SIZE20PX,
    paddingLeft: SIZE.BASE_WP * 3.5,
    flex: 1,
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
    paddingTop: SIZE.BASE_WP * 5,
    paddingBottom: SIZE.BASE_WP * 10,
  },
  noSelectArea: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: -SIZE.BASE_HP * 12,
  },
  tagRegisterButton: {
    color: COLORS.BLUE,
    fontSize: FONTSIZE.SIZE20PX,
  },
  tagList: {
    flex: 1,
  },
  lastItem: {
    marginBottom: SIZE.BASE_WP * 20,
  },
});
