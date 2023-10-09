import {StyleSheet, Text, View, Image} from 'react-native';
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

    await console.log(data);
    await setUser(data.user);

    await setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [isLoading]);

  const handlehome = () => {
    navigation.push('Home');
  };

  return (
    <View>
      {isLoading ? (
        <Text>Loading..........</Text>
      ) : (
        <View>
          <Image
            style={{height: 200, width: 200}}
            source={
              user.avatar !== null && user.avatar !== undefined
                ? {uri: user.avatar}
                : require('../img/loading.gif')
            }
          />
          <Text>
            {user.fname} {user.lname}
          </Text>
          <Text>{user.email}</Text>
          <Button mode="contained" onPress={handlehome}>
            Go to Home
          </Button>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
