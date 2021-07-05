import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import BookDetails from './BookDetails';


function HomeScreenRoutes() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
        cardStyle: {
          backgroundColor: "transparent",
        },

      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          unmountOnBlur: true
        }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetails}
        options={{
          unmountOnBlur: true
        }}
      />
    </Stack.Navigator>


  )
}

export default HomeScreenRoutes;