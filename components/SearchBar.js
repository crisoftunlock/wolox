import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useLibraryState } from '../Reducers/Library';
import { useUiState } from '../Reducers/Ui';


function SearchBar() {
  const { libraryStore: { libraryData }, libraryDispatch } = useLibraryState();
  const { uiStore: { showSearch } } = useUiState();

  const searchName = value => {
    if (value.length > 1) {
      let filtered = libraryData.filter(item => item.title.toLowerCase().includes(value));
      libraryDispatch({
        type: 'search',
        payload: filtered
      });
    } else {
      libraryDispatch({
        type: 'search',
        payload: libraryData
      })
    }

  };
  return (
    <View style={{ flexDirection: 'row' }}>
      {showSearch &&
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          placeholder="Buscar"
          onChangeText={searchName}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '95%',
    marginBottom: 10,
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginLeft: 10,


  },
});

export default SearchBar;