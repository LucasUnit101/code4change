import { Link, router} from 'expo-router';
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
        <Link href="../modal" style={styles.link}>
          Add Friend
        </Link>
        </View>
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
    justifyContent: "space-between",
    borderBottomWidth: "2",
    borderBottomColor: "grey",
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

  link: {
    pressedColor:"white",
    fontSize:"20",
    fontWeight:"600",
    borderWidth: 2, 
    borderColor: "black",
    borderRadius: 20,
    padding: 7,
    marginTop: 10,
  }
});