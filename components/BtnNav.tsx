import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import Home from './Home';
import Review from './Review';

//Screen names
const home = 'Home';
const review = 'Review';

const Tab = createBottomTabNavigator();
const BtnNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={home} component={Home} />
      <Tab.Screen name={review} component={Review}  />
    </Tab.Navigator>
  );
};

export default BtnNav;

const styles = StyleSheet.create({});
