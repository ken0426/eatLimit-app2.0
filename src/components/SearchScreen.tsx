import React, { useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
import AtomSearch from './atoms/AtomSearch';
import MolHeader from './molecules/MolHeader';
import { color } from '../../styles';

const SearchScreen = ({ navigation }: any) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <MolHeader
      style={{
        height: 100,
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: color.mainColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <AtomSearch navigation={navigation} inputRef={inputRef} />
    </MolHeader>
  );
};

export default SearchScreen;
