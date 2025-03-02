import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FriendEntry = ({ name, location }) => {``
  return (
    <View>
      <Text style={styles.name}>{name}</Text>
      {location.name !== "" &&
      <View style={styles.locationContainer}>
        <Text style={styles.location}>Currently at </Text>
        <Text style={[styles.location, styles.library]}>{location.short}</Text>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  location: {
    fontStyle: 'italic',
    color: '#F15A29'
  },
  library: {
    fontWeight: 'bold',
    fontStyle: 'normal'
  }
});

export default FriendEntry;