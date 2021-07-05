import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useAuth } from '../Reducers/Auth';
import { useUiState } from '../Reducers/Ui';
import { globalStyles } from '../styles/globalStyles';



function LoginScreen() {

  const initialState = {
    username: "",
    password: ""
  }

  const { uiDispatch } = useUiState();
  const { authStore: { userList }, authDispatch } = useAuth();
  const [state, setState] = useState(initialState);

  const navigator = useNavigation();


  useEffect(() => {
    uiDispatch({
      type: 'setviewtitle',
      payload: 'LOGIN'
    });
  }, [useIsFocused]);

  const setUsername = e => {
    setState(prevState => ({
      ...prevState,
      username: e
    }))
  }

  const setPassword = e => {
    setState(prevState => ({
      ...prevState,
      password: e
    }))
  }

  const loginHandler = () => {
    const { username, password } = state;
    const exist = userList.find(item => item.username === username);
    if (exist) {
      const matchpass = userList.find(item => item.password === password)
      if (matchpass) {
        const { password, ...rest } = matchpass;
        authDispatch({
          type: 'authsuccess',
          payload: rest
        })
      } else {
        Alert.alert(
          'Incorrect password'
        )
      }
    } else {
      Alert.alert(
        'Username not found...'
      )
    }
  }

  const signupRedirect = () => {
    navigator.navigate('RegisterScreen');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.container}>
        <View style={{ marginTop: '25%', paddingHorizontal: '2%', flex: 1 }}>
          <View style={globalStyles.inputBox}>
            <Text style={globalStyles.inputLabel}>Username</Text>
            <TextInput
              style={globalStyles.input}
              autoCapitalize={'none'}
              onChangeText={setUsername}
            />
          </View>
          <View style={globalStyles.inputBox}>
            <Text style={globalStyles.inputLabel}>Password</Text>
            <TextInput
              style={globalStyles.input}
              autoCapitalize={'none'}
              onChangeText={setPassword}
              secureTextEntry={true}
              textContentType='password'
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={loginHandler}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={signupRedirect}
            >
              <Text>Don't Have an Account?<Text style={styles.registerButtonText}>SignUp</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
 

  loginButton: {
    backgroundColor: '#00adee',
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 10,

  },
  registerButtonText: {
    color: '#00adee',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  }
})

export default LoginScreen;