import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';

const Profile = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    await console.log('p1.' + value);
    const response = await fetch('https://www.melivecode.com/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + value,
      },
    });
    const data = await response.json();

    await console.log(data.status);

    if (data.status === 'forbidden') {
      navigation.navigate('Login');
    }

    await setUser(data.user);

    await setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [isLoading]);

  const handlehome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading..........</Text>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 200, width: 200, margin: 10}}
            source={
              user.avatar !== null && user.avatar !== undefined
                ? {uri: user.avatar}
                : require('../img/loading.gif')
            }
          />
          <Text style={{margin: 10}}>
            {user.fname} {user.lname}
          </Text>
          <Text style={{margin: 10}}>{user.email}</Text>
          <Button
            style={{margin: 10, width: '50%'}}
            mode="contained"
            onPress={handlehome}>
            Go to Home
          </Button>
          <Button
            style={{margin: 10, width: '50%'}}
            mode="contained"
            onPress={fetchUser}>
            Reload
          </Button>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: '100%',
  },
  textinput: {width: '70%', marginVertical: 5},
});
