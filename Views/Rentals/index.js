import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { useUiState } from '../../Reducers/Ui';

function Rentals({ route }) {

  const [rentalsList, setRentals] = useState([]);
  const { uiDispatch } = useUiState();

  useEffect(() => {
    AsyncStorage.getItem('rentlist')
      .then(data => {
        if (data) {
          setRentals(JSON.parse(data));
        } else {
          AsyncStorage.setItem('rentlist', JSON.stringify([]))
            .then(e => {
              setRentals([]);
            })
        }
      });
    uiDispatch({
      type: 'setviewtitle',
      payload: 'Rentals'
    });
  }, []);

  const deleteItem = async id => {
    let filteredItems = rentalsList.filter(item => item.id !== id)
    await AsyncStorage.setItem('rentlist', JSON.stringify(filteredItems));
    setRentals(filteredItems);
  }

  return (
    <View style={globalStyles.container}>
      {rentalsList.length > 0 ?
        <ScrollView>
          {rentalsList.map(({ id, image_url, genre, author, year, publisher }) => {
            return (
              <View key={id} style={{ flexDirection: 'row' }}>
                <Image source={image_url ? { uri: image_url } : require('../../Assets/General/img_book3.png')} style={{ height: 110, width: 80 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 20 }}>
                  <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{genre}</Text>
                  <Text>{author}</Text>
                  <Text>{year}</Text>
                  <Text>{author}</Text>
                  <Text>{publisher}</Text>
                  <TouchableOpacity style={styles.DeleteButton} onPress={() => deleteItem(id)}>
                    <Text style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
        </ScrollView>
        :
        <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>You have not selected books yet. </Text>
      }
    </View>
  )

}

const styles = StyleSheet.create({

  DeleteButton: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderRadius: 30,
    borderColor: 'red',
    marginBottom: 10,
    maxWidth: 100

  },
});

export default Rentals;