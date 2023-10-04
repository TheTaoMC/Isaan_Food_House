import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const img = {
  1: require('../img/1.jpg'),
  2: require('../img/2.jpg'),
  3: require('../img/3.jpg'),
  4: require('../img/4.jpg'),
};

const Detail = ({navigation, route}) => {
  return (
    <View>
      <Image
        style={{height: 200, width: '100%'}}
        source={img[route.params.id]}
      />
      <Text>{route.params.id}</Text>
      <Text>{route.params.name}</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({});
