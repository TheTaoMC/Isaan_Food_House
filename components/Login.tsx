/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, StatusBar, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {Text as Txtt} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './Profile';
import Ip from './ip.json';

const Login = ({navigation}: {navigation: any}) => {
  const [username, setUsername] = useState('qwe');
  const [password, setPassword] = useState('1234');

  /*  const handleLogin = async () => {
    //const response = await fetch('https://www.melivecode.com/api/login', {
    const response = await fetch('192.168.1.77:89/api/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        //expiresIn: 60000,
      }), // body data type must match "Content-Type" header
    });
    const data = await response.json();
    if (data.status === 'ok') {
      await AsyncStorage.setItem('@accessToken', data.accessToken);
      const value = await AsyncStorage.getItem('@accessToken');
      console.log('เข้าสู่ระบบ', value);
      navigation.navigate('Profile');
    } else {
      Alert.alert(
        'แจ้งผู้ใช้งาน',
        'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง !!!',
        [{text: 'ตกลง'}],
      );
    }
    //console.log(data.accessToken);
  }; */

  const handleLogin = () => {
    fetch('http://' + Ip.ip + ':89/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresIn: '5s',
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          console.log(data);
          // ทำสิ่งที่คุณต้องการเมื่อ login สำเร็จ
          console.log('Login success!');
          console.log('Token:', data.token);
          AsyncStorage.setItem('@accessToken', data.token);
          //const value = AsyncStorage.getItem('@accessToken');
          onPress();
        } else {
          // ทำสิ่งที่คุณต้องการเมื่อ login ไม่สำเร็จ
          console.log('Login failed:', data.message);
        }
      })
      .catch(error => {
        // จัดการ error ที่เกิดขึ้นในการเรียก API
        console.error('API Error:', error);
      });
  };

  const onPress = async () => {
    await navigation.navigate('Profile');
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{height: 300, width: 300, marginTop: 20}}
          source={require('../img/Logo.png')}
        />
        <Txtt variant="displaySmall">เข้าสู่ระบบ</Txtt>
        <TextInput
          style={styles.textinput}
          label="ชื่อผู้ใช้งาน"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.textinput}
          label="รหัสผ่าน"
          value={password}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          right={<TextInput.Icon icon="eye" />}
        />
        <View
          style={{
            //flex: 2,
            width: '70%',
            marginVertical: 5,
          }}>
          <Button
            style={{marginBottom: 5}}
            mode="outlined"
            textColor="#f5f6f5"
            buttonColor="#4cb5f9"
            onPress={handleLogin}>
            <Txtt style={{fontWeight: 'bold', fontSize: 16, color: '#f5f6f5'}}>
              ตกลง
            </Txtt>
          </Button>
          <Button
            mode="text"
            textColor="#0095f6"
            onPress={() => navigation.navigate('Register')}>
            สมัครใช้งาน
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  textinput: {width: '70%', marginVertical: 5},
});
