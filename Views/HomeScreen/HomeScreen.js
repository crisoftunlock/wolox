import React, { useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../styles/globalStyles';
import { useLibraryState, } from '../../Reducers/Library';
import SearchBar from '../../components/SearchBar';
import { useUiState } from '../../Reducers/Ui';

function HomeScreen() {
  const { libraryStore: { filteredData }, libraryDispatch } = useLibraryState();
  const navigationroute = useNavigation();

  const { uiDispatch } = useUiState();

  useEffect(()=>{
    uiDispatch({
      type:'setviewtitle',
      payload:'LIBRARY'
    });
  },[]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar />

      <View style={globalStyles.container}>
        <ScrollView>
          {filteredData.map(item => {
            const { id, author, title, image_url } = item;
            return (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  libraryDispatch({
                    type: 'chosenBook',
                    payload: item
                  });
                  navigationroute.navigate('BookDetail');
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 18, borderRadius: 15 }}>
                  <Image source={image_url ? { uri: image_url } : require('../../Assets/General/img_book3.png')} style={{ width: 50, height: 60 }} />
                  <View style={{ marginLeft: 20 }}>
                    <Text>{title}</Text>
                    <Text>{author}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

export default HomeScreen;
