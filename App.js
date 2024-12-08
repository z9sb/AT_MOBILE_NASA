import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Gallery from './src/screens/Gallery'; 
import ImageDetail from './src/screens/ImageDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gallery">
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="ImageDetail" component={ImageDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
