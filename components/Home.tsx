import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import React from 'react';

const Home = ({navigation}: {navigation: any}) => {
  const onPress = (id: string, name: string) => {
    //Alert.alert(id + ' ' + name);
    navigation.push('Detail', {id: id, name: name});
  };
  return (
    <SafeAreaView>
      <ScrollView style={{padding: 10}}>
        <View>
          <Text style={{fontSize: 25}}>โปรโมชั่นเดือนนี้</Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Pressable onPress={() => onPress('1', 'น้ำพริกจรั๊วะโดง')}>
            <Image
              style={{height: 150, width: '100%'}}
              source={require('../img/1.jpg')}
            />
            <Text style={styles.text3}>น้ำพริกจรั๊วะโดง</Text>
            <Text style={styles.text}>
              ราคา 100 บาท
              <Text style={styles.text2}> จาก 120 บาท</Text>
            </Text>
          </Pressable>
        </View>
        <View style={{marginVertical: 10}}>
          <Pressable onPress={() => onPress('2', 'ก้อยเนื้อ')}>
            <Image
              style={{height: 150, width: '100%'}}
              source={require('../img/2.jpg')}
            />
            <Text style={styles.text3}>ก้อยเนื้อ</Text>
            <Text style={styles.text}>
              ราคา 150 บาท
              <Text style={styles.text2}> จาก 180 บาท</Text>
            </Text>
          </Pressable>
        </View>
        <View style={{marginVertical: 10}}>
          <Pressable onPress={() => onPress('3', 'ซุปหน่อไม้')}>
            <Image
              style={{height: 150, width: '100%'}}
              source={require('../img/3.jpg')}
            />
            <Text style={styles.text3}>ซุปหน่อไม้</Text>
            <Text style={styles.text}>
              ราคา 180 บาท
              <Text style={styles.text2}> จาก 200 บาท</Text>
            </Text>
          </Pressable>
        </View>
        <View style={{marginVertical: 10}}>
          <Pressable onPress={() => onPress('4', 'ยำปลาร้ากุ้งสด')}>
            <Image
              style={{height: 150, width: '100%'}}
              source={require('../img/4.jpg')}
            />
            <Text style={styles.text3}>ยำปลาร้ากุ้งสด</Text>
            <Text style={styles.text}>
              ราคา 200 บาท
              <Text style={styles.text2}> จาก 250 บาท</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 15,
    color: 'red',
  },
  text3: {
    fontSize: 20,
    paddingTop: 5,
  },
});

export default Home;
