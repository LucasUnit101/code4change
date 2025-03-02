import { Link } from 'expo-router';
import { Pressable, View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Location from "expo-location";

import { useSession } from '@context/ctx';
import { getLibrary } from '@util/location';

import Ionicons from '@expo/vector-icons/Ionicons';

import FriendEntry from "@components/FriendEntry";

/*
  Route: /friends
*/
export default function Friends() {
  const [friendProfiles, setFriendProfiles] = useState([]);
  const { session } = useSession();

  useEffect(() => {
    const startLocation = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (!foreground.granted) return;

      Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation
      }, async (location) => {
        let library = getLibrary(location);
        if (library === undefined) library = "";

        // Update db
        const URI = Constants.expoConfig.hostUri.split(":").shift();
        await fetch(
          `http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}/location`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ location: library }) 
          }
        );
      })
    }
    startLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchFriends = async () => {
        const URI = Constants.expoConfig.hostUri.split(":").shift();
        // get your own profile
        const profile = await fetch(`http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}`)
              .then(res => res.json());
        // get all profiles
        let profiles = await fetch(`http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles`)
              .then(res => res.json());
  
        // only get friends
        const friends = profile.friends;
        profiles = profiles.filter(p => friends.includes(p.id));
  
        setFriendProfiles(profiles); 
      };
      fetchFriends();
    }, [])
  );

  const removeFriend = async (profileID) => {
    const URI = Constants.expoConfig.hostUri.split(":").shift();
    // Remove a friend from a profile
    const response = await fetch(
      `http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}/friend/remove`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ friendID: profileID }) 
      }
    );

    if (response.ok) {
      setFriendProfiles(profiles => profiles.filter(p => p.id !== profileID));
    }
  }

  const renderFriend = ({ item, index }) => (
    <View style= {styles.friendBlock}>
      <FriendEntry name={`${index + 1}. ${item.name}`} />
      <Pressable onPress={() => removeFriend(item.id)}>
        <View style = {styles.icon}><Ionicons name="trash-outline" size={40} color="white" /></View>
      </Pressable>
    </View>
  );

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
      <FlatList
        data={friendProfiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFriend}
        contentContainerStyle={styles.scores}
        style={{ flex: 0.5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",  
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row", 
    alignItems: "center",  
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#003B5C",  
  },
  scores: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003B5C",  
  },
  buttonContainer: {
    marginLeft: 10, 
    width: 120,
    height: 60,
  },
  link: {
    fontSize: 20,
    fontWeight: "600",
    borderWidth: 2,
    borderColor: "#F15A29",  
    borderRadius: 20,
    padding: 7,
    marginTop: 10,
    color: "#F15A29", 
    textAlign: "center",
  },
  trashcan: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  friendBlock: {
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#F15A29",  
    borderRadius: 50,
    padding: 10,
  }
});
