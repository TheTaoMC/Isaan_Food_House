import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {
  Searchbar,
  Text,
  Card,
  Avatar,
  Button,
  TextInput,
  Checkbox,
  Icon,
  IconButton,
  MD3Colors,
} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const Timetotime = ({txtday, onCheckedChange, onFromChange, onToChange}) => {
  const [checked, setChecked] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  console.log('ส่งข้อมูล', checked, from, to);

  return (
    <View style={{flexDirection: 'row', paddingTop: 10}}>
      <Text
        style={{
          fontWeight: 'bold',
          alignSelf: 'center',
          width: 40,
          borderWidth: 0,
        }}
        variant="titleLarge">
        {txtday}
      </Text>
      <Checkbox.Item
        style={{
          borderWidth: 0,
          marginRight: 1,
          paddingVertical: 5,
          paddingHorizontal: 1,
          width: 60,
        }}
        label="ปิด"
        position={'leading'}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          const newChecked = !checked;
          setChecked(newChecked);
          onCheckedChange(newChecked);
        }}
      />

      <TextInput
        disabled={checked ? true : false}
        style={{flex: 1, height: 40, alignSelf: 'center', borderWidth: 0}}
        mode="outlined"
        value={from}
        onChangeText={text => {
          setFrom(text);
          onFromChange(text);
        }}
      />
      <IconButton
        style={{borderWidth: 0, margin: 0}}
        disabled={checked ? true : false}
        icon="clock"
        //iconColor={MD3Colors.error50}
        size={20}
        //onPress={showtimePicker}
      />
      <Text
        style={{
          fontWeight: 'bold',
          alignSelf: 'center',
          marginRight: 10,
        }}
        variant="titleLarge">
        ถึง
      </Text>

      <TextInput
        disabled={checked ? true : false}
        style={{flex: 1, height: 40, alignSelf: 'center'}}
        mode="outlined"
        value={to}
        onChangeText={text => {
          setTo(text);
          onToChange(text);
        }}
      />
      <IconButton
        style={{borderWidth: 0, margin: 0}}
        disabled={checked ? true : false}
        icon="clock"
        //iconColor={MD3Colors.error50}
        size={20}
        //onPress={showDatePicker}
      />
    </View>
  );
};

export default Timetotime;

const styles = StyleSheet.create({});
