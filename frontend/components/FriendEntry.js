import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FriendEntry = ({ name }) => {``
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  name: {
    fontSize: 30,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});

export default FriendEntry;