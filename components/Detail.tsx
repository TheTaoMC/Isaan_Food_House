/* eslint-disable react/no-unstable-nested-components */
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const Detail = ({navigation, route}) => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    //fetch('http://192.168.1.77:89/products/' + route.params.id)
    fetch('http://192.168.1.77:89/api/products/')
      .then(res => res.json())
      .then(result => {
        setItem(result.find(product => product.id === route.params.id));
      });
  }, []);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView style={{padding: 10}}>
        <View style={{marginVertical: 10}}>
          <Image
            style={{height: 333, width: '100%'}}
            source={
              item.image !== null && item.image !== undefined
                ? {uri: item.image}
                : require('../img/loading.gif')
            }
          />
          <Text style={styles.text3}>{item.name}</Text>
          <Text style={styles.text3}>{item.detail}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;

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
