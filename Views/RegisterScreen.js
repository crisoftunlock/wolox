import { useNavigation } from '@react-navigation/native';
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
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../Reducers/Auth';
import { useUiState } from '../Reducers/Ui';
import { globalStyles } from '../styles/globalStyles';



function RegisterScreen() {

    const initialState = {
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
    }

    const { uiDispatch } = useUiState();
    const { authStore: { userList }, authDispatch } = useAuth();
    const [state, setState] = useState(initialState);

    const navigator = useNavigation();


    useEffect(() => {
        uiDispatch({
            type: 'setviewtitle',
            payload: 'SIGNUP'
        });
    }, []);

    const signupHandler = () => {
        const { username, password, confirmPassword } = state;
        if (password !== confirmPassword) {
            Alert.alert('The passwords doesnt match.')
        } else {
            const exist = userList.some(item => item.username === username);
            if (exist) {
                Alert.alert('Username already exist.')
            } else {
                authDispatch({
                    type: 'registersuccess',
                    payload: state
                })
                navigator.navigate('LoginScreen');
            }
        }
    }

    const loginRedirect = () => {
        navigator.navigate('LoginScreen');
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
                <View style={globalStyles.container}>
                    <View style={{ marginTop: '25%', paddingHorizontal: '2%', flex: 1 }}>
                        <View style={globalStyles.inputBox}>
                            <Text style={globalStyles.inputLabel}>Name</Text>
                            <TextInput
                                style={globalStyles.input}
                                autoCapitalize={'none'}
                                onChangeText={e => setState(prevState => ({
                                    ...prevState,
                                    name: e
                                }))}
                            />
                        </View>
                        <View style={globalStyles.inputBox}>
                            <Text style={globalStyles.inputLabel}>Username</Text>
                            <TextInput
                                style={globalStyles.input}
                                autoCapitalize={'none'}
                                onChangeText={e => setState(prevState => ({
                                    ...prevState,
                                    username: e
                                }))}
                            />
                        </View>
                        <View style={globalStyles.inputBox}>
                            <Text style={globalStyles.inputLabel}>Password</Text>
                            <TextInput
                                style={globalStyles.input}
                                autoCapitalize={'none'}
                                onChangeText={e => setState(prevState => ({
                                    ...prevState,
                                    password: e
                                }))}
                                secureTextEntry={true}
                                textContentType='password'
                            />
                        </View>
                        <View style={globalStyles.inputBox}>
                            <Text style={globalStyles.inputLabel}>Confirm Password</Text>
                            <TextInput
                                style={globalStyles.input}
                                autoCapitalize={'none'}
                                onChangeText={e => setState(prevState => ({
                                    ...prevState,
                                    confirmPassword: e
                                }))}
                                secureTextEntry={true}
                                textContentType='password'
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={signupHandler}
                        >
                            <Text style={styles.loginButtonText}>SignUp</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity
                                style={styles.registerButton}
                                onPress={loginRedirect}
                            >
                                <Text>Already have an account? <Text style={styles.registerButtonText}>Login</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
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

export default RegisterScreen;