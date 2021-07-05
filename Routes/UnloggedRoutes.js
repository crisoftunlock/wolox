import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../Views/LoginScreen';
import Header from './Header';
import RegisterScreen from '../Views/RegisterScreen';

function UnloggedRoutes() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Header text={'Unlogged routes'} />
            <Stack.Navigator
                screenOptions={{
                    header: () => null,
                    cardStyle: {
                        backgroundColor: "transparent",
                    },
                }}
            >
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        title: "Login",
                        unmountOnBlur: true
                    }}
                />
                 <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{
                        title: "Register",
                        unmountOnBlur: true
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default UnloggedRoutes;