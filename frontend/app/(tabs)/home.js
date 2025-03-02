import { useCallback, useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { useSession } from "@context/ctx";
import Constants from "expo-constants";

import Ionicons from "@expo/vector-icons/Ionicons";

import Clock from "@components/Clock";

/*
  Route: /home
*/
export default function Home() {
  const [time, setTime] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [paused, setPaused] = useState(false);
  const { session } = useSession();

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
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }, [pressed, paused]);

  const pauseTimer = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  const stopTimer = async () => {
    clearInterval(timer.current);
    timer.current = undefined;
    setPaused(false);
    setTime(0);
    setPressed(false);

    // Make a request to the backend with time
    const URI = Constants.expoConfig.hostUri.split(":").shift();
    const profile = await fetch(
      `http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}`
    ).then((res) => res.json());

    await fetch(
      `http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${profile.id}/time`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time,
        }),
      }
    );
  };

  return (
    <ScrollView>
      <View style={styles.title}>
        <Text style={styles.font}>Start Your Study Jouney</Text>
      </View>
      <View style={styles.container}>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: pressed ? "green" : "red" },
          ]}
          onPress={handlePress}
        >
          {!pressed ? (
            <Text style={styles.text}>Start</Text>
          ) : (
            <View style={styles.controlsContainer}>
              <Clock time={time} />
              <View style={styles.controls}>
                <Pressable onPress={pauseTimer}>
                  <Ionicons
                    name={paused ? "play" : "pause"}
                    size={60}
                    color="white"
                  />
                </Pressable>
                <Pressable onPress={stopTimer}>
                  <Ionicons name="stop" size={60} color="white" />
                </Pressable>
              </View>
            </View>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    paddingTop: 80,
  },
  font: {
    paddingTop: 30,
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
  },

  title: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  button: {
    aspectRatio: 1,
    borderRadius: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "white",
  },
  controlsContainer: {
    display: "flex",
    gap: 20,
    alignItems: "center",
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
