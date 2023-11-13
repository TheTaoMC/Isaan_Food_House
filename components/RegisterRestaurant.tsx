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

import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TimePicker} from 'react-native-paper-dates';

const RegisterRestaurant = () => {
  const [checked, setChecked] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = time => {
    console.warn(
      'A date has been picked: ',
      time.toLocaleString('en-US', {hourFormat: '24'}),
    );
    hideDatePicker();
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView style={{padding: 10}}>
        <View>
          <Card>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          </Card>
        </View>
        <View style={{paddingTop: 10}}>
          <View style={{flexDirection: 'row', paddingBottom: 10}}>
            <Text style={styles.txt} variant="titleMedium">
              ชื่อร้าน :
            </Text>
            <TextInput
              style={{flex: 1, height: 40}} // or adjust width as needed
              mode="outlined"
              // value={text}
              // onChangeText={text => setText(text)}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txt} variant="titleMedium">
              ราคา :
            </Text>
            <TextInput
              style={{flex: 1, height: 40}} // or adjust width as needed
              mode="outlined"
              // value={text}
              // onChangeText={text => setText(text)}
            />
          </View>

          <View style={{flexDirection: 'row', paddingTop: 10}}>
            <Text style={{fontWeight: 'bold'}} variant="titleLarge">
              เวลาเปิด - ปิด
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 10, borderWidth: 1}}>
            <Text
              style={{fontWeight: 'bold', alignSelf: 'center'}}
              variant="titleLarge">
              จ.
            </Text>
            <Checkbox.Item
              label="ปิด"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TextInput
              style={{flex: 1, height: 40}}
              mode="outlined"
              // value={text}
              // onChangeText={text => setText(text)}
            />
            <IconButton
              icon="clock"
              //iconColor={MD3Colors.error50}
              size={20}
              onPress={showDatePicker}
            />
            <Text
              style={{fontWeight: 'bold', alignSelf: 'center'}}
              variant="titleLarge">
              ถึง
            </Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TextInput
              style={{flex: 1, height: 40}}
              mode="outlined"
              // value={text}
              // onChangeText={text => setText(text)}
            />
            <IconButton
              icon="clock"
              //iconColor={MD3Colors.error50}
              size={20}
              onPress={showDatePicker}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterRestaurant;

const styles = StyleSheet.create({
  txt: {
    fontFamily: 'Kanit-Regular',
    width: 65,
    alignSelf: 'center',
    //borderWidth: 1,
  },
});
