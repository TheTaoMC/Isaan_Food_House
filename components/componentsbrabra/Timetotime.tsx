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

const Timetotime = ({txtday, onCheckedChange}) => {
  const [checked, setChecked] = useState(false);
  console.log('ttt' + checked);

  return (
    <View style={{flexDirection: 'row', paddingTop: 10}}>
      <Text
        style={{fontWeight: 'bold', alignSelf: 'center'}}
        variant="titleLarge">
        {txtday}
      </Text>
      <Checkbox.Item
        label="ปิด"
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          const newChecked = !checked;
          setChecked(newChecked);
          onCheckedChange(newChecked);
        }}
      />

      <TextInput
        disabled={checked ? true : false}
        style={{flex: 1, height: 40, alignSelf: 'center'}}
        mode="outlined"
        // value={text}
        // onChangeText={text => setText(text)}
      />
      <IconButton
        disabled={checked ? true : false}
        icon="clock"
        //iconColor={MD3Colors.error50}
        size={20}
        //onPress={showtimePicker}
      />
      <Text
        style={{fontWeight: 'bold', alignSelf: 'center', marginRight: 10}}
        variant="titleLarge">
        ถึง
      </Text>

      <TextInput
        disabled={checked ? true : false}
        style={{flex: 1, height: 40, alignSelf: 'center'}}
        mode="outlined"
        // value={text}
        // onChangeText={text => setText(text)}
      />
      <IconButton
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
