import React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {View} from 'react-native';
import Review from './Review';
import Home from './Home';
import Detail from './Detail';

const MyComponent = ({navigation}: {navigation: any}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Home', title: 'Home', icon: 'home'},
    {key: 'Review', title: 'Review', icon: 'account-circle'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: Home,
    Review: Review,
  });

  return (
    <View style={{flex: 1}}>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
  );
};

export default MyComponent;
