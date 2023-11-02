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
  FlatList,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Ip from './ip.json';

const Home = ({navigation}: {navigation: any}) => {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAttractionsList = () => {
    fetch(Ip.ip + '/api/products')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setItems(result);
      });
  };
  useEffect(fetchAttractionsList, []);

  const fetchAttractionsSearch = () => {
    fetch(Ip.ip + '/api/products/' + searchQuery)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setItems(result);
        setIsLoading(false);
      });
  };
  useEffect(fetchAttractionsSearch, [searchQuery]);

  const onPress = (id: string, name: string) => {
    //Alert.alert(id + ' ' + name);
    navigation.navigate('Detail', {id: id, name: name});
  };

  console.log(searchQuery);
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <View style={{padding: 10}}>
        <View>
          <Text style={{fontSize: 25}}>โปรโมชั่นเดือนนี้</Text>
        </View>

        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={() => setSearchQuery(searchQuery)}
          onSubmitEditing={() => setSearchQuery(searchQuery)}
        />
      </View>

      <FlatList
        style={{padding: 10}}
        data={items}
        renderItem={({item}) => (
          <View key={item.id} style={{marginVertical: 10}}>
            <Pressable onPress={() => onPress(item.id)}>
              <Image
                style={{height: 333, width: '100%'}}
                source={{uri: item.image}}
              />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text3}>{item.name}</Text>
                <Text style={styles.text}> {item.price} บาท.-</Text>
              </View>
            </Pressable>
          </View>
        )}
        keyExtractor={item => item.id}
        refreshing={false}
        onRefresh={() => setSearchQuery('')}
      />
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
    fontSize: 30,
    color: 'red',
    fontWeight: 'bold',
    flex: 1,
  },
  text2: {
    fontSize: 15,
    color: 'red',
  },
  text3: {
    fontSize: 20,
    paddingTop: 5,
    width: '100%',
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default Home;
