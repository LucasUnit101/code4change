import React, { useState, useEffect } from 'react';
import StyledButton from "@components/StyledButton";
import { View, Text, StyleSheet, ScrollView } from "react-native";

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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

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

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timer);
      setStartTime(null);
      setRecordedTimes([...recordedTimes, elapsedTime]);

      const [hours, minutes, seconds] = elapsedTime.split(':').map(Number);
      const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
      const earnedPoints = Math.floor(totalSeconds) * 1;
      setPoints(earnedPoints);
      setTotalPoints(totalPoints + earnedPoints);

      console.log(`Elapsed Time: ${elapsedTime}`);
    } else {
      setStartTime(new Date());
    }
    setIsRunning(!isRunning);
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.font}>Welcome!</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.font2}>Current Time</Text>
        <Text style={styles.bigClock}>{formatTime(currentTime)}</Text>
        <View style = {{display: 'flex', flexDirection: 'row'}}>
        <View style={styles.buttonContainer}>
          <StyledButton
            text={isRunning ? "Press To Stop Studying" : "Press To Start Studying"}
            backgroundColor="#ffb6c1"
            pressedColor="yellow"
            onClick={handleStartStop}
            textTransform="uppercase"
            borderColor = 'transparent'
            color = "yellow"
          />
        </View>
        <Text style={styles.timer}>{elapsedTime}</Text>
        </View>
        <Text style={styles.recordTime}>Your study Time</Text>
        
        {recordedTimes.map((time, index) => (
          <Text key={index} style={styles.timeRecord}>{index + 1}. {time}</Text>
        ))}
        <View>
          <Text>Points Earned This Time: {points}</Text>
          <Text>Total Points: {totalPoints}</Text>
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
  recordTime:{
    textAlign: "center",
    marginTop: 40,
    borderStartColor: 'grey',
    borderTopWidth:2,
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
  timeRecord:{
    fontSize: 20,
    color: 'grey',
  },
  bigClock: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 20,
  },
  buttonContainer: {
    width: "50%",
    justifyContent: 'center',
  }
});