import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './components/Splash';
import Home from './components/Home';
import Detail from './components/Detail';
import Login from './components/Login';
import Profile from './components/Profile';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'ยินดีต้อนรับ', headerShown: false}}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{title: 'รายละเอียด'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
