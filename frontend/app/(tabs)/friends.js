import StyledButton from "@components/StyledButton";
import { View, Text, StyleSheet } from "react-native";

/*
  Route: /friends
*/

export default function Friends() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Friends</Text>
        <View style={styles.buttonContainer}>
          <StyledButton 
            text="Add Friend"
            backgroundColor="white"
            borderColor='black'
            pressedColor='#D3D3D3'
          />
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
    justifyContent: "space-between",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  buttonContainer: {
    marginLeft: 10, 
    width: 120,
    height: 60,
  },

  button: {
    borderRadius: 20,
  },

  title: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    padding: 20, 
  },
});