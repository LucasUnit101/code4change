import { View, Text, StyleSheet } from "react-native";

/*
  Route: /profile
*/

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
          Hello User!
        </Text>
      </View>

      <View style={styles.top}>
        <Text style={styles.topField}>
          Current Streak: <Text style={{ fontWeight: "400" }}>0 days🔥</Text>
        </Text>
      </View>

      <View style={styles.statsContainer}>

        <View style={styles.field}>
          <Text style={styles.statTitle}>Weekly Stats:</Text>
          <Text style={styles.statItem}>Weekly Time Studied: <Text style={{ fontWeight: "400" }}>5hr</Text></Text>
          <Text style={styles.statItem}>Weekly Points: <Text style={{ fontWeight: "400" }}>1500</Text></Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.statTitle}>Total Stats:</Text>
          <Text style={styles.statItem}>Total Time Studied: <Text style={{ fontWeight: "400" }}>50hr</Text></Text>
          <Text style={styles.statItem}>Total Points: <Text style={{ fontWeight: "400" }}>1500</Text></Text>
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
    width: 350,
    fontSize: 30,
    textAlign: "left",
    textAlignVertical: "center",
    paddingVertical: 9,
    fontWeight: "600",
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
