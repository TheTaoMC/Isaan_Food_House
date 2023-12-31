import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './components/Splash';
import Home from './components/Home';
import Detail from './components/Detail';
import Login from './components/Login';
import Profile from './components/Profile';
import MyProfile from './components/MyProfile';
import Register from './components/Register';
import Review from './components/Review';
import Testcodedemo from './components/Testcodedemo';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  return (
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{headerShown: false}}
    />
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <MainScreen />
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
          name="MyProfile"
          component={MyProfile}
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
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: 'สมัครใช้งาน'}}
        />
        <Stack.Screen
          name="Testcodedemo"
          component={Testcodedemo}
          options={{title: 'Testcodedemo'}}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
