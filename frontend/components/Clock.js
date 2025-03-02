import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Clock = ({ start }) => {
  const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer;
    if (start) {
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }, 1000);
    } else {
      setElapsedTime(0);
    }

    return () => clearInterval(timer);
  }, [start, fadeAnim]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.clockText, { opacity: fadeAnim }]}>
        {formatTime(elapsedTime)}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Clock;