import {View, Text, Image, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Splash = ({navigation}: {navigation: any}) => {
  const onPress = () => {
    navigation.push('Home');
  };

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'column',
          height: '100%',
        }}>
        <View
          style={{
            backgroundColor: 'black',
            flex: 97,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 150, width: 150}}
            source={require('../img/Logo.png')}
          />
          <Text style={{color: 'red'}}>ขอเสียงหน่อยยยยยยย</Text>
        </View>
        <View
          style={{
            backgroundColor: 'black',
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>บ้านอาหารอีสานบ้านนามาอยู่กรุง</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Splash;
