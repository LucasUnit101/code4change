import { useCallback, useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';

import Clock from '@components/Clock';

/*
  Route: /home
*/
export default function Home() {
  const [time, setTime] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [paused, setPaused] = useState(false);

  const timer = useRef();
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const handlePress = useCallback(() => {
    if (pressed) return;
    setPressed(true);
    timer.current = setInterval(() => {
      if (pausedRef.current) return;
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }, [pressed, paused]);

  const pauseTimer = () => {
    setPaused(prevPaused => !prevPaused);
  }

  const stopTimer = () => {
    clearInterval(timer.current);
    timer.current = undefined;
    setPaused(false);
    setTime(0);
    setPressed(false);

    // Make a request to the backend with time
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { backgroundColor: pressed ? 'green': 'red' }]}
        onPress={handlePress}
      >
        {!pressed ?
          <Text style={styles.text}>Start</Text> :
          (
            <View style={styles.controlsContainer}>
              <Clock time={time} />
              <View style={styles.controls}>
                <Pressable onPress={pauseTimer}>
                  <Ionicons name={paused ? "play" : "pause"} size={60} color="white" />
                </Pressable>
                <Pressable onPress={stopTimer}>
                  <Ionicons name="stop" size={60} color="white" />
                </Pressable>
              </View>
            </View>
          )
        }
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  },
  button: {
    aspectRatio: 1,
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    color: 'white'
  },
  controlsContainer: {
    display: 'flex',
    gap: 20,
    alignItems: 'center'
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  }
});