import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  Searchbar,
  Text as Textt,
  Card,
  Avatar,
  Button,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

const Tab = createBottomTabNavigator();
const Review = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <View style={{padding: 10}}>
        <Searchbar
          placeholder="ค้นหา"
          //onChangeText={onChangeSearch}
          //value={searchQuery}
          //onIconPress={() => ''}
          //onSubmitEditing={() => ''}
        />
        <Textt
          style={{paddingTop: 10, fontFamily: 'Kanit-Bold'}}
          variant="titleLarge">
          รีวิวล่าสุด
        </Textt>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Card>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          </Card>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Textt style={styles.txt} variant="titleMedium">
              ชื่อร้าน
            </Textt>
            <Textt style={styles.txt} variant="titleMedium">
              รีวิว 44 / คะแนน 4.4
            </Textt>
          </View>
        </View>
        <View style={styles.container}>
          <Card>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          </Card>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Textt style={styles.txt} variant="titleMedium">
              ชื่อร้าน
            </Textt>
            <Textt style={styles.txt} variant="titleMedium">
              รีวิว 44 / คะแนน 4.4
            </Textt>
          </View>
        </View>
        <View style={styles.container}>
          <Card>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          </Card>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Textt style={styles.txt} variant="titleMedium">
              ชื่อร้าน
            </Textt>
            <Textt style={styles.txt} variant="titleMedium">
              รีวิว 44 / คะแนน 4.4
            </Textt>
          </View>
        </View>
        <View style={styles.container}>
          <Card>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          </Card>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Textt style={styles.txt} variant="titleMedium">
              ชื่อร้าน
            </Textt>
            <Textt style={styles.txt} variant="titleMedium">
              รีวิว 44 / คะแนน 4.4
            </Textt>
          </View>
        </View>
        <View style={styles.container}>
          <Card>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          </Card>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Textt style={styles.txt} variant="titleMedium">
              ชื่อร้าน
            </Textt>
            <Textt style={styles.txt} variant="titleMedium">
              รีวิว 44 / คะแนน 4.4
            </Textt>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    //paddingTop: StatusBar.currentHeight,
    padding: 10,
  },
  txt: {
    fontFamily: 'Kanit-Regular',
  },
});
