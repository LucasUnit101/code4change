import { useSession } from "@context/ctx";
import { View, Text, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";
import { useEffect } from "react";
import { getTotalPoints, getTotalTime, getWeeklyPoints, getWeeklyTime } from "@util/calculateTotals";
import { formatTime } from "@util/timeCalculator";


/*
  Route: /profile
*/

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(undefined);

  const { session } = useSession();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      // Get IP that Expo server is using to host app, allows to connect with the backend
      const URI = Constants.expoConfig.hostUri.split(":").shift();
      const profile = fetch(`http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}`)
        .then(res => res.json())
        .then(async (json) => {
          setProfile(json);
          setLoading(false);
        });

    }, [])
  );
  // Make these all state variables
  
  const [totalTimeStudied, setTotalTimeStudied] = useState(0);
  const [totalPointsScored, setTotalPointsScored] = useState(0);
  const [WeeklyTotalTime, setWeeklyTotalTime] = useState(0);
  const [WeeklyTotalPoints, setWeeklyTotalPoints] = useState(0);
  useEffect(() => {
    if (profile === undefined) return;
    // Do calculations here
      let totalTime = getTotalTime(profile)
      let totalPoints = getTotalPoints(profile)
      let WeeklyTotalTime = getWeeklyTime(profile)
      let WeeklyTotalPoints = getWeeklyPoints(profile)

      setTotalTimeStudied(totalTime);
      setTotalPointsScored(totalPoints);
      setWeeklyTotalTime(WeeklyTotalTime);
      setWeeklyTotalPoints(WeeklyTotalPoints);
  }, [profile]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
          Hello {loading ? "..." : profile.name}!
        </Text>
      </View>

      <View style={styles.top}>
        <Text style={styles.topField}>
          <Text>Current Streak: </Text>
          <Text style={{ fontWeight: "400", fontSize: 25 }}>
            {loading ? "..." : profile.streak || 0} days🔥
          </Text>
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.field}>
          <Text style={styles.statTitle}>Weekly Stats:</Text>
          <Text style={styles.statItem}>
            Weekly Time Studied:{" "}
            <Text style={{ fontWeight: "400" }}>
              {loading ? "..." : formatTime(WeeklyTotalTime)}
            </Text>
          </Text>
          <Text style={styles.statItem}>
            Weekly Points:{" "}
            <Text style={{ fontWeight: "400" }}>
              {loading ? "..." : WeeklyTotalPoints}
            </Text>
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.statTitle}>Total Stats:</Text>
          <Text style={styles.statItem}>
            Total Time Studied:{" "}
            <Text style={{ fontWeight: "400" }}>
              {loading ? "..." : formatTime(totalTimeStudied)}
            </Text>
          </Text>
          <Text style={styles.statItem}>
            Total Points:{" "}
            <Text style={{ fontWeight: "400" }}>
              {loading ? "..." : totalPointsScored}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
  },

  top: {
    marginTop: 10,
  },

  topField: {
    height: 50,
    width: "100%",
    fontSize: 30,
    paddingVertical: 9,
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  statsContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
  },

  field: {
    height: 175,
    width: 350,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
  },

  statTitle: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },

  statItem: {
    fontSize: 22,
    marginTop: 12,
    marginBottom: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
