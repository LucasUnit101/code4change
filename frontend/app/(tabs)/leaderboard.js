import StyledButton from "@components/StyledButton";
import { View, Text, StyleSheet } from "react-native";

/*
  Route: /leaderboard
*/

export default function Leaderboard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
      </View>
      <View style={styles.buttonContainer}>
          <StyledButton 
            text="Add Friend"
            backgroundColor="white"
            borderColor='black'
            pressedColor='#D3D3D3'
          />
      </View>
      <View style={styles.scores}>
        <Text style={styles.user}>Friend Name</Text> 
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
    padding: 20,
  },

  user: {
    fontSize: 20,
    fontWeight: "bold",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  buttonContainer: { 
    justifyContent: "center",
    height: 60,
  },

  button: {
    borderRadius: 20,
    justifyContent: "Content",
  },

  title: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    padding: 20, 
  },
});