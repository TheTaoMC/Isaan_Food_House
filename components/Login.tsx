/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, StatusBar, Image, Alert} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  PaperProvider,
  HelperText,
  Icon,
} from 'react-native-paper';
import {Text as Txtt} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './Profile';
import Ip from './ip.json';

const Login = ({navigation}: {navigation: any}) => {
  const [username, setUsername] = useState('thetaomc');
  const [password, setPassword] = useState('1234');
  const [isloading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ฟังก์ชัน `handleLogin` ทำงานแบบอะซิงโครนัส
  // และรอให้คำเรียก API เสร็จสิ้นก่อนดำเนินการคำสั่งถัดไป
  const handleLogin = async () => {
    setIsLoading(true);
    // เรียก API โดยใช้ `fetch()`
    const response = await fetch(Ip.ip + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresIn: '10s',
      }),
    });

    // ตรวจสอบสถานะ HTTP
    if (response.status === 200) {
      // แปลงข้อมูลจาก JSON เป็นวัตถุ
      const data = await response.json();

      // ตรวจสอบสถานะการเข้าสู่ระบบ
      if (data.status === 'ok') {
        // แสดงข้อความแจ้งความสำเร็จ
        console.log('Login success!');
        // บันทึกโทเค็นการเข้าสู่ระบบ
        AsyncStorage.setItem('@accessToken', data.token);
        // ดำเนินการตามขั้นตอนถัดไป
        onPress();
      } else {
        // แสดงข้อความแจ้งความล้มเหลว
        console.log('Login failed:', data.message);
      }
    } else {
      // แสดงข้อความแจ้งข้อผิดพลาด
      console.error('API Error:', response.status);
    }
    await setIsLoading(false);
  };

  const onPress = async () => {
    await setIsLoading(false);
    await navigation.navigate('Profile');
  };
  const input2 = useRef();
  return (
    <PaperProvider>
      <KeyboardAwareScrollView>
        <View style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{height: 300, width: 300, marginTop: 20}}
              source={require('../img/Logo.png')}
            />
            <Txtt variant="displaySmall">เข้าสู่ระบบ v2</Txtt>
            <TextInput
              style={styles.textinput}
              label="ชื่อผู้ใช้งาน"
              value={username}
              autoFocus
              onChangeText={text => setUsername(text)}
              onSubmitEditing={() => {
                input2.current.focus();
              }}
            />
            <TextInput
              ref={input2}
              style={styles.textinput}
              label="รหัสผ่าน"
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={text => setPassword(text)}
              onSubmitEditing={handleLogin}
              right={
                <TextInput.Icon
                  style={{borderColor: 'red', borderWidth: 1}}
                  icon="eye"
                  forceTextInputFocus={false}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
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
                <Txtt
                  style={{fontWeight: 'bold', fontSize: 16, color: '#f5f6f5'}}>
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
        <Portal>
          <Dialog visible={isloading}>
            <Dialog.Title>กรุณารอสักครู่</Dialog.Title>
            <Dialog.Content>
              <Txtt variant="bodyMedium">ระบบกำลังดำเนินการ</Txtt>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </KeyboardAwareScrollView>
    </PaperProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  textinput: {
    width: '70%',
    marginVertical: 5,
    borderColor: 'red',
    borderWidth: 1,
    paddingEnd: 50,
  },
});
