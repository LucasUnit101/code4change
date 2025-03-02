import { useCallback, useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { useSession } from "@context/ctx";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { getLibrary } from "@util/location";
import Ionicons from "@expo/vector-icons/Ionicons";
import Clock from "@components/Clock";

export default function Home() {
  const [time, setTime] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [library, setLibrary] = useState(undefined);
  const { session } = useSession();
  const timer = useRef();
  const pausedRef = useRef(paused);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
  }, []);

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

    const determineLocation = async () => {
      const foreground = await Location.getForegroundPermissionsAsync();
      if (!foreground.granted) return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      setLibrary(getLibrary(location));
    };
    determineLocation();
  }, [pressed, paused]);

  const pauseTimer = () => setPaused((prevPaused) => !prevPaused);

  const stopTimer = useCallback(async () => {
    clearInterval(timer.current);
    timer.current = undefined;
    setPaused(false);
    setTime(0);
    setPressed(false);
    let addedTime = library !== undefined ? time * 1.5 : time;
    const URI = Constants.expoConfig.hostUri.split(":").shift();
    await fetch(`http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}/time`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time: addedTime }),
    });
    setLibrary(undefined);
  }, [time, library]);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Track Your Study Time</Text>
        <Text style={styles.subtitle}>Stay focused and keep improving!</Text>
      </View>

      <View style={styles.timerContainer}>
        {pressed ? (
          <>
            <Clock time={time} />
            <View style={styles.controls}>
              <Pressable onPress={pauseTimer} style={styles.iconButton}>
                <Ionicons name={paused ? "play" : "pause"} size={32} color="white" />
              </Pressable>
              <Pressable onPress={stopTimer} style={[styles.iconButton, styles.stopButton]}>
                <Ionicons name="stop" size={32} color="white" />
              </Pressable>
            </View>
          </>
        ) : (
          <Pressable style={styles.startButton} onPress={handlePress}>
            <Text style={styles.startText}>Start Studying</Text>
          </Pressable>
        )}
      </View>

      {library && <Text style={styles.libraryText}>Great work studying at {library}!</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  startButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  startText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  controls: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
  iconButton: {
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  stopButton: {
    backgroundColor: "#F44336",
  },
  libraryText: {
    marginTop: 20,
    fontSize: 16,
    color: "#444",
  },
});