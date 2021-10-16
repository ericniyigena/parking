import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StoreProvider } from './config/store';
import Login from './pages/login';
import List from './pages/list';
import Home from './pages/home';

const Stack = createStackNavigator();

const routes = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="dashboard" component={List} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  )
}

export default routes
