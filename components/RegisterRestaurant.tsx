import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {
  Searchbar,
  Text,
  Card,
  Avatar,
  Button,
  TextInput,
} from 'react-native-paper';
import React from 'react';

const RegisterRestaurant = () => {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView style={{padding: 10}}>
        <View>
          <Card>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          </Card>
        </View>
        <View
          style={{
            paddingTop: 10,
            flex: 1,
            flexDirection: 'column',
          }}>
          <View
            style={{flexDirection: 'row', paddingBottom: 10, borderWidth: 1}}>
            <Text style={styles.txt} variant="titleMedium">
              ชื่อร้าน :
            </Text>
            <TextInput
              style={{width: '100%', maxWidth: '100%'}}
              mode="outlined"
              //value={text}
              //onChangeText={text => setText(text)}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txt} variant="titleMedium">
              ราคา :
            </Text>
            <TextInput
              style={{width: '50%'}}
              mode="outlined"
              //value={text}
              //onChangeText={text => setText(text)}
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
