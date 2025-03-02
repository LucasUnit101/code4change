import { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Pressable, Text, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";

import { useSession } from "@context/ctx";
import { getTotalPoints, getWeeklyPoints } from "@util/calculateTotals";

import LeaderboardEntry from "@components/LeaderboardEntry";

/*
  Route: /leaderboard
*/

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('friends');
  const [weeklyUserEntry, setWeeklyUserEntry] = useState({});
  const [globalUserEntry, setGlobalUserEntry] = useState({});
  const [weeklyEntries, setWeeklyEntries] = useState([]);
  const [globalEntries, setGlobalEntries] = useState([]);

  const { session } = useSession();

  const getLeaderboard = async (view) => {
    setLoading(true);
    setWeeklyEntries([]);
    setGlobalEntries([]);

    const URI = Constants.expoConfig.hostUri.split(":").shift();
    // Get user's name and scores
    const profile = await fetch(`http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}`)
                            .then(res => res.json());
    
    // Create others' leaderboard entries
    let profiles = await fetch(`http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles`)
                            .then(res => res.json());
    
    // Filter view if friends only
    if (view === 'friends') {
      const friends = profile.friends;
      profiles = profiles.filter(profile => friends.includes(profile.id));
    }

    // Get entries
    let allWeeklyEntries = profiles.map(profile => ({
      id: profile.id,
      name: profile.name,
      points: getWeeklyPoints(profile)
    }));
    allWeeklyEntries.sort((a, b) => {
      return b.points - a.points;
    })
    allWeeklyEntries = allWeeklyEntries.map((entry, i) => ({
      ...entry,
      idx: i + 1
    }));
    let allGlobalEntries = profiles.map(profile => ({
      id: profile.id,
      name: profile.name,
      points: getTotalPoints(profile)
    }));
    allGlobalEntries.sort((a, b) => {
      return b.points - a.points;
    });
    allGlobalEntries = allGlobalEntries.map((entry, i) => ({
      ...entry,
      idx: i + 1
    }));

    // Get index of user's entry
    const weeklyIdx = allWeeklyEntries.find(entry => entry.id === profile.id).idx;
    const globalIdx = allGlobalEntries.find(entry => entry.id === profile.id).idx;

    // Set state
    setWeeklyUserEntry({
      idx: weeklyIdx,
      name: profile.name,
      points: getWeeklyPoints(profile)
    });
    setGlobalUserEntry({
      idx: globalIdx,
      name: profile.name,
      points: getTotalPoints(profile)
    });
    setWeeklyEntries(allWeeklyEntries);
    setGlobalEntries(allGlobalEntries);

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getLeaderboard(view);
    }, [view])
  );

  return (
    <View style={styles.container}>
      <View style={styles.viewButtons}>
        <Pressable
          style={[styles.viewButton, view === 'friends' && styles.currentView]}
          onPress={() => setView('friends')}
        >
          <Text style={styles.viewText}>Friends</Text>
        </Pressable>
        <Pressable
          style={[styles.viewButton, styles.globalButton, view === 'global' && styles.currentView]}
          onPress={() => setView('global')}
        >
          <Text style={styles.viewText}>Global</Text>
        </Pressable>
      </View>
      <Text style={styles.leaderboardTitle}>Weekly</Text>
      <FlatList
        data={weeklyEntries}
        keyExtractor={item => item.idx}
        renderItem={({ item }) =>
          <LeaderboardEntry
            idx={item.idx}
            name={item.name}
            points={item.points}
          />
        }
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <LeaderboardEntry
            idx="#"
            name="Name"
            points="Points"
          />
        }
      />
      <LeaderboardEntry
        idx={loading ? "..." : weeklyUserEntry.idx}
        name={loading ? "..." : weeklyUserEntry.name}
        points={loading ? "..." : weeklyUserEntry.points}
      />
      <Text style={styles.leaderboardTitle}>Overall</Text>
      <FlatList
        data={globalEntries}
        keyExtractor={item => item.idx}
        renderItem={({ item }) =>
          <LeaderboardEntry
            idx={item.idx}
            name={item.name}
            points={item.points}
          />
        }
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <LeaderboardEntry
            idx="#"
            name="Name"
            points="Points"
          />
        }
      />
      <LeaderboardEntry
        idx={loading ? "..." : globalUserEntry.idx}
        name={loading ? "..." : globalUserEntry.name}
        points={loading ? "..." : globalUserEntry.points}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  viewButton: {
    flex: 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  globalButton: {
    borderLeftWidth: 1,
  },
  viewText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  currentView: {
    backgroundColor: '#CCCCCC'
  },
  leaderboardTitle: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    borderTopWidth: 1,
    borderTopColor: 'black'
  }
});
