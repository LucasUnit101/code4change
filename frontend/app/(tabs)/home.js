import { useCallback, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';

/*
  Route: /home
*/
export default function Home() {
  const [pressed, setPressed] = useState(false);

  const handlePress = useCallback(() => {
    if (pressed) return;
    setPressed(true);
  }, [pressed]);

  const pauseTimer = () => {

  }

  const stopTimer = () => {
    setPressed(false);
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
              <Text style={styles.text}>TIMER</Text>
              <View style={styles.controls}>
                <Pressable onPress={pauseTimer}>
                  <Ionicons name="pause" size={60} color="white" />
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