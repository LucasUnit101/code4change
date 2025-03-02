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
      const URI = Constants.expoConfig.hostUri.split(":").shift();
      const profile = fetch(`http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}`)
        .then(res => res.json())
        .then(async (json) => {
          setProfile(json);
          setLoading(false);
        });

    }, [])
  );

  const [totalTimeStudied, setTotalTimeStudied] = useState(0);
  const [totalPointsScored, setTotalPointsScored] = useState(0);
  const [WeeklyTotalTime, setWeeklyTotalTime] = useState(0);
  const [WeeklyTotalPoints, setWeeklyTotalPoints] = useState(0);
  
  useEffect(() => {
    if (profile === undefined) return;
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
          <Text style={{ fontWeight: "500", fontSize: 26, color: "#FF6347" }}>
            {loading ? "..." : profile.streak} day{profile.streak === 1 ? '' : 's'}🔥
          </Text>
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.field}>
          <Text style={styles.statTitle}>Weekly Stats:</Text>
          <Text style={styles.statItem}>
            Weekly Time Studied:{" "}
            <Text style={styles.highlightText}>
              {loading ? "..." : formatTime(WeeklyTotalTime)}
            </Text>
          </Text>
          <Text style={styles.statItem}>
            Weekly Points:{" "}
            <Text style={styles.highlightText}>
              {loading ? "..." : WeeklyTotalPoints}
            </Text>
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.statTitle}>Total Stats:</Text>
          <Text style={styles.statItem}>
            Total Time Studied:{" "}
            <Text style={styles.highlightText}>
              {loading ? "..." : formatTime(totalTimeStudied)}
            </Text>
          </Text>
          <Text style={styles.statItem}>
            Total Points:{" "}
            <Text style={styles.highlightText}>
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
    backgroundColor: "#f0f4f8",
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 38,
    fontWeight: "700",
    color: "#333",
  },

  top: {
    marginTop: 20,
  },

  topField: {
    height: 50,
    width: "100%",
    fontSize: 28,
    paddingVertical: 10,
    fontWeight: "600",
    textAlign: "center",
  },

  statsContainer: {
    marginTop: 30,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#fafafa",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  field: {
    width: 350,
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
  },

  statTitle: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    color: "#444",
  },

  statItem: {
    fontSize: 22,
    marginTop: 12,
    marginBottom: 12,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
  },

  highlightText: {
    fontWeight: "600",
    color: "#2E8B57",
  },
});
