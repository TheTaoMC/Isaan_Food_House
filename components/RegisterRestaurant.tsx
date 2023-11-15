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
  const [checkeds, setCheckeds] = useState(new Array(6).fill(false));
  const [froms, setFroms] = useState(new Array(6).fill(''));
  const [tos, setTos] = useState(new Array(6).fill(''));
  const txtday = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];

  return (
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView style={{padding: 10}}>
        <View>
          <Card>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          </Card>
        </View>
        <View style={{paddingTop: 10, paddingBottom: 20}}>
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
              onCheckedChange={checked => {
                // ไม่ต้องสร้างตัวแปร checked อีก
                setCheckeds(prevCheckeds => {
                  // คัดลอก state เดิม
                  const newCheckeds = {...prevCheckeds};

                  // กำหนดค่า checked ให้กับ index ที่ระบุ
                  newCheckeds[index] = checked;

                  return newCheckeds;
                });
              }}
              onFromChange={from => {
                // ไม่ต้องสร้างตัวแปร checked อีก
                setFroms(prevFroms => {
                  // คัดลอก state เดิม
                  const newFroms = {...prevFroms};

                  // กำหนดค่า checked ให้กับ index ที่ระบุ
                  newFroms[index] = from;

                  return newFroms;
                });
              }}
              onToChange={to => {
                // ไม่ต้องสร้างตัวแปร checked อีก
                setTos(prevTos => {
                  // คัดลอก state เดิม
                  const newTos = {...prevTos};

                  // กำหนดค่า checked ให้กับ index ที่ระบุ
                  newTos[index] = to;

                  return newTos;
                });
              }}
              key={index}
            />
          ))}
          <Button
            style={{width: 100, alignSelf: 'flex-end'}}
            mode="contained"
            onPress={() => {
              console.log('Pressed checkeds ', checkeds);
              console.log('Pressed froms ', froms);
              console.log('Pressed tos ', tos);
            }}>
            ส่งข้อมูล
          </Button>
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
