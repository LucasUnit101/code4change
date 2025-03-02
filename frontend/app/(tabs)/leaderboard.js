import StyledButton from "@components/StyledButton";
import { View, Text, StyleSheet, ScrollView } from "react-native";

/*
  Route: /leaderboard
*/

export default function Leaderboard() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <Text style={styles.title}>Leaderboard</Text>
        </View>
        <View style={styles.buttonContainer}>
          <StyledButton 
            text="Friends"
            backgroundColor="white"
            borderColor="black"
            pressedColor="#D3D3D3"
          />
          <StyledButton 
            text="Global"
            backgroundColor="white"
            borderColor="black"
            pressedColor="#D3D3D3"
          />
        </View>
        <View style={styles.leaderboardFields}>
          <Text style={[styles.fieldText, styles.fieldHeader]}>#</Text>
          <Text style={[styles.fieldText, styles.fieldHeader]}>Name</Text>
          <Text style={[styles.fieldText, styles.fieldHeader]}>Time Studied</Text>
        </View>
      </View>
      <ScrollView style={styles.leaderboard}>
        <View style={styles.scores}>
          <Text style={[styles.users, styles.column1]}>1</Text> 
          <Text style={[styles.users, styles.column2]}>Lucas Romero</Text> 
          <Text style={[styles.users, styles.column3]}>100hr</Text> 
        </View>
      </ScrollView>
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

  scores: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey", 
  },

  users: {
    fontSize: 14,
    textAlign: "left",
    color: "black",
    fontWeight: "bold",
    flexShrink: 1,
    flexWrap: "nowrap", 
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },

  top: {
    borderBottomColor: "grey",
    borderBottomWidth: 2, 
  },

  buttonContainer: { 
    flexDirection: "row",
    width: 180,
    height: 60,
    marginBottom: 10, 
    marginTop: 0, 
  },

  button: {
    borderRadius: 20,
  },

  fieldText: {
    fontSize: 14,
    textAlign: "left",
    color: "grey",
    paddingHorizontal: 5, 
    flexWrap: "nowrap",
  },

  fieldHeader: {
    fontWeight: "bold",
    textAlign: "center",
  },

  leaderboardFields: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },

  leaderboard: {
    flex: 1,
  },

  column1: {
    flex: 0.37,  
    paddingRight: 10,
  },

  column2: {
    flex: 0.51,  
    paddingRight: 16,
  },

  column3: {
    flex: 0.3,  
  },
});
