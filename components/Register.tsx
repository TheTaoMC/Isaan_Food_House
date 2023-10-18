import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
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
  console.log('password: ' + password);
  console.log('passwordc: ' + passwordc);

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  console.log(visible);

  const [helperText, setHelperText] = useState({
    ht1: 0,
    ht2: 0,
    ht3: 0,
    ht4: 0,
    ht5: 0,
    ht6: 0,
    ht7: 0,
  });

  //const showHelperText = () => setHelperText(true);
  //const hideHelperText = () => setHelperText(false);
  console.log('helperText: ', helperText);

  const handleRegister = async () => {
    if (fname === '') {
      console.log('กรุณากรอกชื่อ');
      setHelperText({
        ...helperText,
        ht1: 1,
      });
      return;
    }

    console.log('111111');
    setHelperText(prevHelperText => ({
      ...prevHelperText, // คัดลอกค่าจาก helperText เดิม
      ht1: 0, // ตั้งค่า ht1 เป็น 0
    }));
    console.log('22222');

    if (lname === '') {
      console.log('กรุณากรอกนามสกุล');
      setHelperText({
        ...helperText,
        ht2: 1,
      });
      return;
    } else {
      setHelperText({
        ...helperText,
        ht2: 0,
      });
    }

    if (email === '') {
      console.log('กรุณากรอกอีเมล');
      setHelperText({
        ...helperText,
        ht3: 1,
      });
      return;
    } else {
      setHelperText({
        ...helperText,
        ht3: 0,
      });
    }

    if (username === '') {
      console.log('กรุณากรอกชื่อผู้ใช้งาน');
      setHelperText({
        ...helperText,
        ht4: 1,
      });
      return;
    } else {
      setHelperText({
        ...helperText,
        ht4: 0,
      });
    }

    if (password === '') {
      console.log('กรุณากรอกรหัสผ่าน');
      setHelperText({
        ...helperText,
        ht5: 1,
      });
      return;
    } else {
      setHelperText({
        ...helperText,
        ht5: 0,
      });
    }

    if (passwordc === '') {
      console.log('กรุณากรอกรหัสผ่านยืนยัน');
      setHelperText({
        ...helperText,
        ht6: 1,
      });
      return;
    } else {
      setHelperText({
        ...helperText,
        ht6: 0,
      });
    }

    if (password !== passwordc) {
      console.log('รหัสผ่านไม่ตรงกับยืนยัน');
      setHelperText({
        ...helperText,
        ht7: 1,
      });
      return;
    } else {
      setHelperText({
        ...helperText,
        ht7: 0,
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
      console.log('Response Data:', datas);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const [text, setText] = useState('');

  const onChangeText = text => setText(text);

  const hasErrors = () => {
    return !fname || fname === '';
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

          {helperText.ht1 === 1 ? (
            <HelperText type="error">กรุณากรอกชื่อ</HelperText>
          ) : (
            <></>
          )}

          <TextInput
            label="นามสกุล"
            mode="outlined"
            value={lname}
            onChangeText={text => setLname(text)}
          />

          {helperText.ht2 === 1 ? (
            <HelperText type="error">กรุณากรอกชื่อ</HelperText>
          ) : (
            <></>
          )}

          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          {helperText.ht3 === 1 ? (
            <HelperText type="error">กรุณากรอกชื่อ</HelperText>
          ) : (
            <></>
          )}

          <TextInput
            label="ชื่อผู้ใช้งาน"
            mode="outlined"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          {helperText.ht4 === 1 ? (
            <HelperText type="error">กรุณากรอกชื่อ</HelperText>
          ) : (
            <></>
          )}

          <TextInput
            label="รหัสผ่าน"
            mode="outlined"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          {helperText.ht5 === 1 ? (
            <HelperText type="error">กรุณากรอกชื่อ</HelperText>
          ) : (
            <></>
          )}

          <TextInput
            label="ยืนยันรหัสผ่าน"
            mode="outlined"
            value={passwordc}
            secureTextEntry
            onChangeText={text => setPasswordc(text)}
          />
          {helperText.ht6 === 1 ? (
            <HelperText type="error">กรุณากรอกชื่อ</HelperText>
          ) : (
            <></>
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
