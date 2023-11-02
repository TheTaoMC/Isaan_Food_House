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

const initialState = Array(7).fill(false);
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMPTY':
      const updatedIsEmpty = [...state];
      updatedIsEmpty[action.index] = action.value;
      return updatedIsEmpty;
    default:
      return state;
  }
};

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
  //const [isEmpty, setIsEmpty] = useState(Array(6).fill(false));

  const [isEmpty, dispatch] = useReducer(reducer, initialState);

  /*   const validateField = (inputValue, index, text) => {
    if (inputValue.trim() === '') {
      console.log(text);
      const updatedIsEmpty = [...isEmpty];
      updatedIsEmpty[index] = true;
      setIsEmpty(updatedIsEmpty);
      return true;
    } else {
      const updatedIsEmpty = [...isEmpty];
      updatedIsEmpty[index] = false;
      setIsEmpty(updatedIsEmpty);
      return false;
    }
  }; */

  //console.log(isEmpty);

  /*   const validateField = (inputValue, index, text) => {
    const isEmptyValue = inputValue.trim() === '';
    console.log('1', isEmptyValue);
    const isInvalidValue = inputValue !== text;
    console.log('2', isInvalidValue);

    if (isEmptyValue) {
      dispatch({type: 'SET_EMPTY', index, value: isEmptyValue});
      return isEmptyValue;
    }
    if (!isEmptyValue) {
      dispatch({type: 'SET_EMPTY', index, value: isEmptyValue});
      return isEmptyValue;
    }
    if (isInvalidValue) {
      dispatch({type: 'SET_EMPTY', index, value: isInvalidValue});
      return isInvalidValue;
    }
  }; */
  const [isEmptyq, setIsEmptyq] = useState(Array(7).fill(false));
  console.log(isEmptyq);
  const validateField = (inputValue, index, text) => {
    const isEmptyValue = inputValue.trim() === '';
    const isInvalidValue = inputValue !== text;

    const updatedIsEmpty = [...isEmpty];
    updatedIsEmpty[index] = isEmptyValue || isInvalidValue;
    setIsEmptyq(updatedIsEmpty);

    return isEmptyValue || isInvalidValue;
  };

  const handleRegister = async () => {
    /*  if (
      validateField(fname, 0, 'กรุณากรอกชื่อ') ||
      validateField(lname, 1, 'กรุณากรอกนามสกุล') ||
      validateField(email, 2, 'กรุณากรอกอีเมล') ||
      validateField(username, 3, 'กรุณากรอกชื่อผู้ใช้งาน') ||
      validateField(password, 4, 'กรุณากรอกรหัสผ่าน') ||
      validateField(passwordc, 5, 'กรุณากรอกรหัสผ่านยืนยัน')
    ) {
      return;
    } */
    /*     if (validateField(fname, 0, 'กรุณากรอกชื่อ')) return;
    if (validateField(lname, 1, 'กรุณากรอกนามสกุล')) return;
    if (validateField(email, 2, 'กรุณากรอกอีเมล')) return;
    if (validateField(username, 3, 'กรุณากรอกชื่อผู้ใช้งาน')) return;
    if (validateField(password, 4, 'กรุณากรอกรหัสผ่าน')) return;
    if (validateField(passwordc, 5, 'กรุณากรอกรหัสผ่านยืนยัน')) return; */

    if (fname === '') {
      console.log('กรุณากรอกชื่อ');
      return;
    }

    if (password !== passwordc) {
      //initialState[6] = true;
      console.log('รหัสผ่านไม่ตรงกับยืนยัน00');
      if (validateField(password, 6, passwordc)) return;
    }

    try {
      const res = await fetch('http://' + Ip.ip + '/api/register', {
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
            <HelperText type="error">กรุณากรอกรหัสผ่านยืนยัน</HelperText>
          )}
          {isEmpty[6] && (
            <HelperText type="error">รหัสผ่านไม่ตรงกับยืนยัน</HelperText>
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
