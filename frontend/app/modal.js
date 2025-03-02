import { useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useSession } from "@context/ctx";
import Constants from "expo-constants";

export default function Modal() {
  const router = useRouter();
  const { session } = useSession();
  const [friendUsername, setFriendUsername] = useState(""); 
  const URI = Constants.expoConfig.hostUri.split(":").shift();

  const handleAddFriend = async () => {
    if (!friendUsername.trim()) {
      Alert.alert("Error", "Please enter a friend's username!");
      return;
    }

    try {
      const response = await fetch(
        `http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}/friend/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ friendID: friendUsername }) 
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Friend added successfully!");
        setFriendUsername(""); 
        router.back(); 
      } else {
        const errorMessage = await response.text();
        Alert.alert("Error", errorMessage || "Failed to add friend.");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again later.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Friend</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter friend's username"
          autoCapitalize="none"
          value={friendUsername}
          onChangeText={setFriendUsername} 
        />

        <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
          <Text style={styles.buttonText}>Add Friend</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.dismissButton}>
          <Text style={styles.dismissText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "rgb(0, 56, 168)",  // UF blue
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "rgb(0, 56, 168)",  // UF blue
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dismissButton: {
    marginTop: 20,
  },
  dismissText: {
    color: "rgb(255, 79, 0)",  // UF orange
    fontSize: 16,
  },
});
