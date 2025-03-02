import { Link } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { useSession } from '@context/ctx';
import FriendEntry from "@components/FriendEntry";
import Ionicons from '@expo/vector-icons/Ionicons';
/*
  Route: /friends
*/

export default function Friends() {
  const [friendProfiles, setFriendProfiles] = useState([]);
  const { session } = useSession();

  useEffect(() => {
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
  }, [session]);

  const renderFriend = ({ item, index }) => (
    <FriendEntry name={`${index + 1}. ${item.name}`} />
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
      <View style={styles.trashcan}>
        <Ionicons name="trash-outline" size={50} color="black" />
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
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  scores: {
    padding: 20,
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
  link: {
    fontSize: 20,
    fontWeight: "600",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    padding: 7,
    marginTop: 10,
  },
  trashcan: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});