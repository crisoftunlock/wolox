import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';


import Header from './Header';

import HomeScreenRoutes from '../Views/HomeScreen/routes';
import WishList from '../Views/WishList';
import Rentals from '../Views/Rentals';
import Settings from '../Views/Settings';

function LoggedRoutes() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Header text="Library Screen" />
            {/* Tabs */}
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#00adee',
                    inactiveTintColor: '#aeb0d4',
                    
                }}
            >
                <Tab.Screen
                    name='Library'
                    component={HomeScreenRoutes}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../Assets/ToolBar/ic_library.png')} style={{ width: 25 }} />
                        ),
                        unmountOnBlur: true
                    }}
                />
                <Tab.Screen
                    name='WishList'
                    component={WishList}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../Assets/ToolBar/ic_wishlist.png')} style={{ width: 25 }} />
                        ),
                        unmountOnBlur: true
                    }}
                />
                <Tab.Screen
                    name='Add New'
                    component={HomeScreenRoutes}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../Assets/ToolBar/ic_add_new_active.png')} style={{ width: 25 }} />
                        ),
                        unmountOnBlur: true
                    }}
                />
                <Tab.Screen
                    name='Rentals'
                    component={Rentals}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../Assets/ToolBar/ic_myrentals.png')} style={{ width: 25 }} />
                        ),
                        unmountOnBlur: true
                    }}
                />
                <Tab.Screen
                    name='Settings'
                    component={Settings}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../Assets/ToolBar/ic_settings.png')} style={{ width: 25 }} />
                        ),
                        unmountOnBlur: true
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default LoggedRoutes;