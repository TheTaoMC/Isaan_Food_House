import {StyleSheet, Text, View, StatusBar, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {Text as Txtt} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './Profile';

const Login = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState('karn.yong@melivecode.com');
  const [password, setPassword] = useState('melivecode');

  const handleLogin = async () => {
    const response = await fetch('https://www.melivecode.com/api/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: user,
        password: password,
        expiresIn: 60000,
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
          value={user}
          onChangeText={text => setUser(text)}
        />
        <TextInput
          style={styles.textinput}
          label="รหัสผ่าน"
          value={password}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          right={<TextInput.Icon icon="eye" />}
        />
        <View style={{flex: 1, width: '30%', marginVertical: 5}}>
          <Button mode="contained" onPress={handleLogin}>
            ตกลง
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
