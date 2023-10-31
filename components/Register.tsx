import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useReducer} from 'react';
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  PaperProvider,
  HelperText,
} from 'react-native-paper';
import {Text as Txtt} from 'react-native-paper';
import Ip from './ip.json';

const Register = ({navigation}: {navigation: any}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordc, setPasswordc] = useState('');
  //console.log('password: ' + password);
  //console.log('passwordc: ' + passwordc);

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [isEmpty, setIsEmpty] = useState(Array(6).fill(false));

  const fieldValues = [fname, lname, email, username, password, passwordc];
  const handleRegister = async () => {
    console.log(isEmpty);

    let hasEmptyField = false;
    fieldValues.forEach((value, index) => {
      if (value === '') {
        hasEmptyField = true;
        setIsEmpty(prevState => {
          const newState = [...prevState];
          newState[index] = true; // ตั้งค่า isEmpty[index] เป็น true เมื่อมีช่องว่าง
          return newState;
        });
      } else {
        setIsEmpty(prevState => {
          const newState = [...prevState];
          newState[index] = false; // ตั้งค่า isEmpty[index] เป็น false เมื่อไม่มีช่องว่าง
          return newState;
        });
      }
      return;
    });

    if (password !== passwordc) {
      setIsEmpty(prevState => {
        const newState = [...prevState];
        newState[6] = true; // ตั้งค่า isEmpty[6] เป็น true เมื่อรหัสผ่านไม่ตรงกัน
        return newState;
      });
      console.log('รหัสผ่านไม่ตรงกับยืนยัน');
      return;
    } else {
      setIsEmpty(prevState => {
        const newState = [...prevState];
        newState[6] = false; // ตั้งค่า isEmpty[6] เป็น true เมื่อรหัสผ่านไม่ตรงกัน
        return newState;
      });
    }

    try {
      const res = await fetch('http://' + Ip.ip + ':89/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: fname,
          lname: lname,
          email: email,
          username: username,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const datas = await res.json();
      console.log('Response Data:', datas);0
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <PaperProvider>
      <View style={{padding: 20, flex: 1, alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>
          กรอกข้อมูลเพื่อสมัครใช้งาน
        </Text>

        <View style={{width: '70%'}}>
          <TextInput
            label="ชื่อ"
            mode="outlined"
            value={fname}
            onChangeText={text => setFname(text)}
          />
          {isEmpty[0] && <HelperText type="error">กรุณากรอกชื่อ</HelperText>}

          <TextInput
            label="นามสกุล"
            mode="outlined"
            value={lname}
            onChangeText={text => setLname(text)}
          />
          {isEmpty[1] && <HelperText type="error">กรุณากรอกชื่อ</HelperText>}
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {isEmpty[2] && <HelperText type="error">กรุณากรอกอีเมล</HelperText>}

          <TextInput
            label="ชื่อผู้ใช้งาน"
            mode="outlined"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          {isEmpty[3] && (
            <HelperText type="error">กรุณากรอกชื่อผู้ใช้งาน</HelperText>
          )}
          <TextInput
            label="รหัสผ่าน"
            mode="outlined"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          {isEmpty[4] && (
            <HelperText type="error">กรุณากรอกรหัสผ่าน</HelperText>
          )}

          <TextInput
            label="ยืนยันรหัสผ่าน"
            mode="outlined"
            value={passwordc}
            secureTextEntry
            onChangeText={text => setPasswordc(text)}
          />
          {isEmpty[5] && (
            <HelperText type="error">กรุณากรอกยืนยันรหัสผ่าน</HelperText>
          )}

          {!isEmpty[4] && !isEmpty[5] && isEmpty[6] && (
            <HelperText type="error">
              รหัสผ่านไม่ตรงกับยืนยันรหัสผ่าน
            </HelperText>
          )}

          <Button
            style={{marginBottom: 5, margin: 5}}
            mode="outlined"
            textColor="#f5f6f5"
            buttonColor="#4cb5f9"
            onPress={handleRegister}>
            <Txtt style={{fontWeight: 'bold', fontSize: 16, color: '#f5f6f5'}}>
              สมัครใช้งาน
            </Txtt>
          </Button>
          <Portal>
            <Dialog visible={visible} onDismiss={handleRegister}>
              <Dialog.Title>สมัครใช้งานสำเร็จ</Dialog.Title>
              <Dialog.Content>
                <Txtt variant="bodyMedium">
                  กด ตกลง เพื่อกลับไปหน้า เข้าสู่ระบบ
                </Txtt>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleRegister}>ตกลง</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </View>
    </PaperProvider>
  );
};

export default Register;

const styles = StyleSheet.create({});
