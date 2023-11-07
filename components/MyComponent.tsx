import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import Home from './Home';
import Review from './Review';
import Detail from './Detail';

const MyComponent = ({navigation}: {navigation: any}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'Home',
      title: 'Home',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {key: 'Review', title: 'Review', focusedIcon: 'album'},
    {key: 'Detail', title: 'Detail', focusedIcon: 'history'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: Home,
    Review: Review,
    Detail: Detail,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;
