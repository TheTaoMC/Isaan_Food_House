/* eslint-disable react/react-in-jsx-scope */
import {View, Text, StyleSheet, Button, Image, TextInput} from 'react-native';
import Reactม, {useState} from 'react';
//import {HelperText, TextInput} from 'react-native-paper';

const Testcodedemo = () => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [text, setText] = useState('');

  return (
    <View>
      <TextInput
        style={styles.container}
        placeholder="Search"
        onChangeText={setText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
});

export default Testcodedemo;
