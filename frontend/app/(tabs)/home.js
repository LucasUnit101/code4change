import { useCallback, useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { useSession } from "@context/ctx";
import Constants from "expo-constants";
import * as Location from "expo-location";

import { getLibrary } from "@util/location";

import Ionicons from "@expo/vector-icons/Ionicons";

import Clock from "@components/Clock";

/*
  Route: /home
*/
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

    // Determine if current location is in a library
    const determineLocation = async () => {
      const foreground = await Location.getForegroundPermissionsAsync();
      // Location tracking not granted
      if (!foreground.granted) return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation
      });

      // Determine if close to library
      setLibrary(getLibrary(location));
    }
    determineLocation();
  }, [pressed, paused]);

  const pauseTimer = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  const stopTimer = useCallback(async () => {
    clearInterval(timer.current);
    timer.current = undefined;
    setPaused(false);
    setTime(0);
    setPressed(false);

    // Make a request to the backend with time
    const URI = Constants.expoConfig.hostUri.split(":").shift();
    await fetch(
      `http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}/time`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time,
          multiplier: library !== undefined
        }),
      }
    );

    setLibrary(undefined);
  }, [time, library]);

  return (
      <View style={styles.container}>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: pressed ? "green" : "#DD0000" },
          ]}
          onPress={handlePress}
        >
          {!pressed ? (
            <Text style={styles.text}>START</Text>
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
        <View style={styles.padding}></View>
        {library && <Text style={styles.library}>Great work studying at {library}!</Text>}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#220000",
  },
  font: {
    paddingTop: 30,
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  button: {
    aspectRatio: 1,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
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
  library: {
    position: 'absolute',
    color: 'white',
    bottom: 10,
    marginHorizontal: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 30
  }
});
