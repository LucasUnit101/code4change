import StyledButton from "@components/StyledButton";
import { View, Text, StyleSheet } from "react-native";

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
              text="Local"
              backgroundColor="white"
              borderColor='black'
              pressedColor='#D3D3D3'
            />
            <StyledButton 
              text="Global"
              backgroundColor="white"
              borderColor='black'
              pressedColor='#D3D3D3'
            />
        </View>
        <View style={styles.leaderboardFields}>
          <Text style={styles.fieldText}>#</Text>
          <Text style={styles.fieldText}>Name</Text>
          <Text style={styles.fieldText}>Time Studied</Text>
        </View>
      </View>
      <View style={styles.leaderboard}>
        <View style={styles.scores}>
          <Text style={styles.users}>1</Text> 
          <Text style={styles.users}>Lucas Romero</Text> 
          <Text style={styles.users}>100hr</Text> 
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

  scores: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  users: {
    flex: 0.2,
    fontSize: 14,
    textAlign: "left",
    color: "black",
    fontWeight: "bold",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
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

  title: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    padding: 20, 
  },

  fieldText: {
    flex: 1,
    fontSize: 14,
    textAlign: "left",
    color: "grey"
  },
  
  leaderboardFields: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});