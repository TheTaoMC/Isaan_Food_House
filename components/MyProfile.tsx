import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const MyProfile = ({navigation}) => {
  const [balance, setBalance] = useState(0);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลยอดคะแนนสะสมและกิจกรรมล่าสุด
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => {
        setBalance(data.balance);
        setActivities(data.activities);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>
      <View style={styles.balance}>
        <Text style={styles.balanceText}>Balance: {balance} points</Text>
      </View>
      <View style={styles.activities}>
        {activities.map(activity => (
          <Activity key={activity.id} activity={activity} />
        ))}
      </View>
    </View>
  );
};

const Activity = ({activity}) => {
  return (
    <TouchableOpacity style={styles.activityItem}>
      <View style={styles.activityDate}>
        <Text style={styles.activityDateText}>{activity.date}</Text>
      </View>
      <View style={styles.activityStore}>
        <Text style={styles.activityStoreText}>{activity.store}</Text>
      </View>
      <View style={styles.activityPoints}>
        <Text style={styles.activityPointsText}>{activity.points}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 60,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  balance: {
    margin: 20,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  activities: {
    margin: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  activityDate: {
    width: 100,
  },
  activityDateText: {
    fontSize: 16,
  },
  activityStore: {
    width: 200,
  },
  activityStoreText: {
    fontSize: 16,
  },
  activityPoints: {
    width: 100,
  },
  activityPointsText: {
    fontSize: 16,
    color: '#0000ff',
  },
});

export default MyProfile;
