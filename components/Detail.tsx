/* eslint-disable react/no-unstable-nested-components */
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const Detail = ({navigation, route}) => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch('https://www.melivecode.com/api/attractions/' + route.params.id)
      .then(res => res.json())
      .then(result => {
        setItem(result.attraction);
      });
  }, []);

  return (
    <ScrollView style={{padding: 10}}>
      <View>
        <Image
          style={{height: 333, width: '100%'}}
          source={
            item.coverimage !== null && item.coverimage !== undefined
              ? {uri: item.coverimage}
              : require('../img/loading.gif')
          }
        />
        <Text style={styles.text3}>{item.name}</Text>
        <Text style={styles.text3}>{item.detail}</Text>
        <Text style={styles.text3}>{item.detail}</Text>
        <Text style={styles.text3}>{item.detail}</Text>
        <Text style={styles.text3}>{item.detail}</Text>
      </View>
    </ScrollView>
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
