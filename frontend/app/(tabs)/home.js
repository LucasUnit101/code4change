import React, { useState, useEffect } from 'react';
import HomeButton from "@components/HomeButton";
import { View, Text, StyleSheet, ScrollView } from "react-native";

/*
  Route: /home
*/

export default function Home() {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const [timer, setTimer] = useState(null);
  const [totalTime, setTotalTime] = useState(0); // Total time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [pausedTime, setPausedTime] = useState(0); // Time when paused

  useEffect(() => {
    if (startTime) {
      const newTimer = setInterval(() => {
        const now = new Date();
        const diff = now - startTime + pausedTime;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setElapsedTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }, 1000);
      setTimer(newTimer);
    }
    return () => clearInterval(timer);
  }, [startTime, pausedTime]);

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timer);
      setPausedTime(prev => prev + (new Date() - startTime));
      setStartTime(null);
    } else {
      setStartTime(new Date());
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(timer);
    setStartTime(null);
    setElapsedTime('00:00:00');
    setTotalTime(0);
    setPausedTime(0);
    setIsRunning(false);
  };

  const formatTotalTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.font}>Welcome!</Text>
      </View>
      <View style={styles.block}>
        <View style={{ display: 'flex' }}>
          <HomeButton
            text={isRunning ? "Pause" : "Start"}
            backgroundColor="red"
            pressedColor="black"
            onClick={handleStartStop}
            elapsedTime={elapsedTime}
            isRunning={isRunning}
            onReset={handleReset}
            textTransform="uppercase"
            borderColor='transparent'
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  welcome: {
    justifyContent: 'start',
    alignItems: 'start',
    color: "black",
    textAlign: "left",
    borderBottomColor: 'grey',
    borderBottomWidth: 2, 
  },
  font: {
    padding: 20, 
    fontSize: 40,
    fontWeight: "bold",
  },
  font2: {
    textAlign: "left",
    fontSize: 40,
    fontWeight: "bold",
  },
  recordTime: {
    textAlign: "center",
    marginTop: 40,
    borderStartColor: 'grey',
    borderTopWidth: 2,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  block: {
    padding: 10,
    width: "100%",
    backgroundColor: 'white',
  },
  timer: {
    marginTop: 20,
    fontSize: 30,
    color: '#ffb6c1',
    fontWeight: 'bold',
  },
  timeRecord: {
    fontSize: 20,
    color: 'grey',
  },
  bigClock: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 20,
  },
});