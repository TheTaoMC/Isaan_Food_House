/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import Ip from './ip.json';

const Profile = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [timeout, setTimeout] = useState('');

  /*   const fetchUser = async () => {
    const value = await AsyncStorage.getItem('@accessToken');
    await console.log('p1.' + value);
    const response = await fetch('https://192.168.1.77:89/api/authen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + value,
        //Authorization: value,
      },
    });
    const data = await response.json();
    await console.log(data.status);

    if (data.status === 'forbidden') {
      navigation.navigate('Login');
    }
    await setUser(data.user);
    await setIsLoading(false);
  }; */

  // ฟังก์ชันสำหรับทำ API request หลังจาก login สำเร็จ
  const fetchDataWithToken = async () => {
    console.log('Profile');
    const value = await AsyncStorage.getItem('@accessToken');
    fetch('http://' + Ip.ip + '/api/authen', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${value}`, // ส่ง token ใน header Authorization
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify(data) // ถ้าคุณต้องการส่งข้อมูลเพิ่มเติม
    })
      .then(response => response.json())
      .then(data => {
        // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้รับ
        console.log(data);

        if (data.message === 'jwt expired') {
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        // จัดการข้อผิดพลาด
        console.error(error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataWithToken();
  }, [isLoading]);

  const handlehome = () => {
    navigation.navigate('Home');
  };
  const handleMyProfile = () => {
    navigation.navigate('MyProfile');
  };

  const addexptime = async () => {
    console.log('AddExpTime');
    const value = await AsyncStorage.getItem('@accessToken');
    const response = await fetch('http://' + Ip.ip + '/api/addtimetoken', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${value}`, // ส่ง token ใน header Authorization
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        exptime: '5s',
      }), // ถ้าคุณต้องการส่งข้อมูลเพิ่มเติม
    });

    if (response.ok) {
      const data = await response.json();

      if (data.message === 'jwt expired') {
        navigation.navigate('Login');
      } else {
        // ตรวจสอบว่า token ใหม่แตกต่างจาก token เดิมหรือไม่
        if (data.updatetoken !== value) {
          AsyncStorage.setItem('@accessToken', data.updatetoken);
        }
      }
    } else {
      // จัดการข้อผิดพลาด
      console.error(response);
    }

    setIsLoading(false);
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
          {/*           <Image
            style={{height: 200, width: 200, margin: 10}}
            source={
              user.avatar !== null && user.avatar !== undefined
                ? {uri: user.avatar}
                : require('../img/loading.gif')
            }
          /> */}

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
            onPress={fetchDataWithToken}>
            Reload
          </Button>
          <Button
            style={{margin: 10, width: '50%'}}
            mode="contained"
            onPress={addexptime}>
            Add Exptime
          </Button>
          <Button
            style={{margin: 10, width: '50%'}}
            mode="contained"
            onPress={() => navigation.navigate('Testcodedemo')}>
            testCode
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
