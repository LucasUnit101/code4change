import React, { useState, useEffect } from 'react';
import StyledButton from "@components/StyledButton";
import { View, Text, StyleSheet } from "react-native";

/*
  Route: /home
*/

export default function Home() {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const [timer, setTimer] = useState(null);
  const [recordedTimes, setRecordedTimes] = useState([]);
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (startTime) {
      const newTimer = setInterval(() => {
        const now = new Date();
        const diff = now - startTime;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setElapsedTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }, 1000);
      setTimer(newTimer);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  const handleStart = () => {
    setStartTime(new Date());
  };

  const handleStop = () => {
    clearInterval(timer);
    setStartTime(null);
    setRecordedTimes([...recordedTimes, elapsedTime]);

    const [hours, minutes, seconds] = elapsedTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    const earnedPoints = Math.floor(totalMinutes) * 10;
    setPoints(earnedPoints);
    setTotalPoints(totalPoints + earnedPoints);

    console.log(`Elapsed Time: ${elapsedTime}`);
  };

  const handleReset = () => {
    clearInterval(timer);
    setStartTime(null);
    setElapsedTime('00:00:00');
    setRecordedTimes([]);
    setPoints(0);
    setTotalPoints(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.font}>Welcome to the Study Gator!</Text>
      </View>
      <View style={styles.block}>
        <StyledButton
          text="Press To Start Studying"
          backgroundColor="#FA4616"
          pressedColor="#cf360e"
          onClick={handleStart}
        />
        
        <Text style={styles.timer}>{elapsedTime}</Text>
        <StyledButton
          text="Press To Stop Studying"
          backgroundColor="#FA4616"
          pressedColor="#cf360e"
          onClick={handleStop}
        />
        <StyledButton
          text="Reset"
          backgroundColor="#FA4616"
          pressedColor="#cf360e"
          onClick={handleReset}
        />
        <Text style={styles.font}>Your study Time</Text>
        
        {recordedTimes.map((time, index) => (
          <Text key={index} style={styles.timer}>{index + 1}. {time}</Text>
        ))}
        <View>
          <Text>Points Earned: {points}</Text>
          <Text>Total Points: {totalPoints}</Text>
        </View>        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    justifyContent: 'start',
    alignItems: 'center',
    paddingTop: 20,
  },
  font: {
    textTransform: 'uppercase',
  },
  block: {
    padding: 40,
    height: 600,
    width: "100%",
    backgroundColor: 'blue',
  },
  timer: {
    marginTop: 20,
    fontSize: 24,
    color: 'white',
  }
});