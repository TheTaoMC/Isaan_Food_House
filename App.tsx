import React from 'react';
import {View} from 'react-native';
import {Text as PaperText} from 'react-native-paper';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Splash from './components/Splash';
import Home from './components/Home';
import Detail from './components/Detail';
import Login from './components/Login';
import Profile from './components/Profile';
import MyProfile from './components/MyProfile';
import Register from './components/Register';
import Review from './components/Review';
import Testcodedemo from './components/Testcodedemo';
import MyComponent from './components/MyComponent';
import RegisterRestaurant from './components/RegisterRestaurant';
import uploadimg from './components/uploadimg';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navtab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Review"
        component={Review}
        options={{title: 'Review'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{title: 'Register'}}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*         <Stack.Screen
          name="uploadimg"
          component={uploadimg}
          options={{title: 'uploadimg'}}
        /> */}
        <Stack.Screen
          name="RegisterRestaurant"
          component={RegisterRestaurant}
          options={{title: 'ลงทะเบียนร้านอาหาร'}}
        />
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
          name="Navtab"
          component={Navtab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyComponent"
          component={MyComponent}
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
