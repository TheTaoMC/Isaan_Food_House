/* eslint-disable react-native/no-inline-styles */
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
import React, {useEffect, useState} from 'react';

const Home = ({navigation}: {navigation: any}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://www.melivecode.com/api/attractions')
      .then(res => res.json())
      .then(result => {
        setItems(result);
      });
  }, []);

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
        {items.map(item => (
          <View key={item.id} style={{marginVertical: 10}}>
            <Pressable onPress={() => onPress(item.id)}>
              <Image
                style={{height: 333, width: '100%'}}
                source={{uri: item.coverimage}}
              />
              <Text style={styles.text3}>{item.name}</Text>
            </Pressable>
          </View>
        ))}
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
