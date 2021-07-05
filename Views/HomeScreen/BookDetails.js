import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../styles/globalStyles';
import { useLibraryState, } from '../../Reducers/Library';
import { useUiState } from '../../Reducers/Ui';

function BookDetails() {

  const { uiDispatch } = useUiState();
  const { libraryStore: { chosenBook } } = useLibraryState();
  const { image_url, author, year, genre, publisher, title } = chosenBook;

  const [wishList, setWishList] = useState([]);
  const [rentList, setRentList] = useState([]);

  useEffect(() => {
    uiDispatch({
      type: 'setviewtitle',
      payload: `Details ${title}`
    })
  }, []);


  useEffect(() => {
    AsyncStorage.getItem('wishlist')
      .then(data => {
        if (data) {
          setWishList(JSON.parse(data));
        } else {
          AsyncStorage.setItem('wishlist', JSON.stringify([]))
            .then(e => {
              setWishList([]);
            })
        }
      });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('rentlist')
      .then(data => {
        if (data) {
          setRentList(JSON.parse(data));
        } else {
          AsyncStorage.setItem('rentlist', JSON.stringify([]))
            .then(e => {
              setRentList([]);
            });
        }
      });
  }, []);

  const addToWish = () => {
    Alert.alert(
      `Add book to wishlist?`,
      `Add ${title} to wishlist`,
      [
        {
          text: 'Yes', onPress: async () => {
            let exist = wishList.some(item => item.id === chosenBook.id);
            if (exist) {
              Alert.alert(
                `The ${title} book is already in your wishlist`
              );
            } else {
              let newItem = [...wishList, chosenBook];
              await AsyncStorage.setItem('wishlist', JSON.stringify(newItem))
            }

          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  const addToRent = () => {
    Alert.alert(
      `Do yoy want to rent ${title}?`,
      `Add ${title} to rent`,
      [
        {
          text: 'Yes', onPress: async () => {
            let exist = rentList.some(item => item.id === chosenBook.id);
            if (exist) {
              Alert.alert(
                `The ${title} book is already in your rent`
              );
            } else {
              let newItem = [...rentList, chosenBook];
              await AsyncStorage.setItem('rentlist', JSON.stringify(newItem))
            }

          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }
  // console.log(wishList);
  return (
    <View style={[globalStyles.container, {
      flexDirection: "column",
      justifyContent: 'space-around'
    }]}>
      <View style={{ flex: 3, backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15, borderRadius: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={image_url ? { uri: image_url } : require('../../Assets/General/img_book3.png')} style={{ height: 110, width: 80 }} />
          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 20 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{genre}</Text>
            <Text style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }}>Available</Text>
            <Text>{author}</Text>
            <Text>{year}</Text>
            <Text>{author}</Text>
            <Text>{publisher}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 30 }}>
          <TouchableOpacity onPress={addToWish} style={styles.AddButton}>
            <Text style={styles.AddButtonText}>ADD TO WISHLIST</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={addToRent} style={styles.RentButton}>
            <Text style={styles.RentButtonText}>RENT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1.7, backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15, borderRadius: 15, marginTop: '3%' }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Image
              source={require('../../Assets/General/img_user1.png')}
              style={{ width: 50, height: 50 }}
              borderRadius={40}
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>John Applessed</Text>

              <Text>Lorem Ipsum Dolor sit ammet  fasdfasfasdfadsfasdf</Text>

            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Image
              source={require('../../Assets/General/img_user2.png')}
              style={{ width: 50, height: 50 }}
              borderRadius={40}
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Susan Collins</Text>
              <Text>Lorem Ipsum Dolor sit ammet  fasdfasfasdfadsfasdf</Text>
            </View>
          </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity>
            <Text style={{ color: '#00adee' }}>View All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  AddButton: {
    backgroundColor: '#fff',
    marginTop: 30,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderRadius: 30,
    borderColor: '#00adee',
    marginBottom: -10,

  },
  AddButtonText: {
    color: '#00adee',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  RentButton: {
    backgroundColor: '#00adee',
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 4,
    borderRadius: 30,
    marginBottom: -10
  },
  RentButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
})


export default BookDetails;
