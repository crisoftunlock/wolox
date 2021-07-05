import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../../Reducers/Auth';
import { useUiState } from '../../Reducers/Ui';
import { globalStyles } from '../../styles/globalStyles';

function Settings() {
  const { uiDispatch } = useUiState();
  const { authDispatch } = useAuth();
  useEffect(() => {
    uiDispatch({
      type: 'setviewtitle',
      payload: 'Settings'
    });
  }, []);


  const handleLogout = () => {
    authDispatch({
      type:'logout'
    })
  }

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <View style={globalStyles.card}>
          <Image source={require('../../Assets/General/img_user1.png')} style={{ width: 100, height: 100 }} />
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>John Wick</Text>
        </View>
        <View style={globalStyles.card}>
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            placeholder={'Name'}
          />
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            placeholder={'Lastname'}
          />
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            placeholder={'Email'}
          />
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            placeholder={'Phone'}
          />
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  input: {
    minWidth: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: '#00adee',
    borderWidth: 1.5,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  saveButton: {
    backgroundColor: '#fff',
    marginTop: 18,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderRadius: 30,
    borderColor: '#00adee',
    marginBottom: 10,
    minWidth: '80%'

  },
  saveButtonText: {
    color: '#00adee',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#fff',
    marginTop: 18,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderRadius: 30,
    borderColor: 'red',
    marginBottom: 10,
    minWidth: '80%'

  },
  logoutButtonText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Settings;