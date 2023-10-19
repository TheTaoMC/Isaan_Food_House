/* eslint-disable react/react-in-jsx-scope */
import {View, Text, StyleSheet, Button} from 'react-native';
import Reactม, {useState} from 'react';
import {HelperText, TextInput} from 'react-native-paper';

const Testcodedemo = () => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateName = () => {
    if (name === '') {
      setErrorMessage('กรุณากรอกชื่อ');
    } else {
      setErrorMessage('');
    }
  };

  const onSubmit = () => {
    // ...
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {errorMessage && <HelperText type="error">{errorMessage}</HelperText>}
      <Button onPress={onSubmit} title="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Testcodedemo;
