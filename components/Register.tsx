import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  PaperProvider,
} from 'react-native-paper';
import {Text as Txtt} from 'react-native-paper';

const Register = ({navigation}: {navigation: any}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  console.log(visible);

  const handleRegister = () => {
    if (!visible) {
      showDialog();
    } else {
      hideDialog();
      navigation.navigate('Login');
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
          <TextInput
            label="นามสกุล"
            mode="outlined"
            value={lname}
            onChangeText={text => setLname(text)}
          />
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label="ชื่อผู้ใช้งาน"
            mode="outlined"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            label="รหัสผ่าน"
            mode="outlined"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            label="ยืนยันรหัสผ่าน"
            mode="outlined"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <Button
            style={{marginBottom: 5, margin: 5}}
            mode="outlined"
            textColor="#f5f6f5"
            buttonColor="#4cb5f9"
            //onPress={handleRegister}
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
