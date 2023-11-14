import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
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
import Timetotime from './componentsbrabra/Timetotime';

const RegisterRestaurant = () => {
  //const [checked, setChecked] = useState();
  const [checkeds, setCheckeds] = useState([]);
  const txtday = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];
  console.log(checkeds);

  const updateCheckedState = (index, checked) => {
    setCheckeds(prevCheckeds => {
      const newCheckeds = {...prevCheckeds};
      newCheckeds[index] = checked;
      return newCheckeds;
    });
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

          {txtday.map((day, index) => (
            <Timetotime
              txtday={day}
              onCheckedChange={checked => updateCheckedState(index, checked)}
              key={index}
            />
          ))}
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
