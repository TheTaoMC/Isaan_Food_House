import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {Text as Txtt} from 'react-native-paper';

const Login = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
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
          <Button mode="contained" onPress={() => console.log('Pressed')}>
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
