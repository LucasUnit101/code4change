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
    const profile = await fetch(`http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles/${session}`).then(res => res.json());
    
    let profiles = await fetch(`http://${URI}:${process.env.EXPO_PUBLIC_PORT}/profiles`).then(res => res.json());
    
    if (view === 'friends') {
      const friends = profile.friends;
      profiles = profiles.filter(p => p.id === profile.id || friends.includes(p.id));
    }

    let allWeeklyEntries = profiles.map(profile => ({
      id: profile.id,
      name: profile.name,
      points: getWeeklyPoints(profile)
    }));
    allWeeklyEntries.sort((a, b) => b.points - a.points);
    allWeeklyEntries = allWeeklyEntries.map((entry, i) => ({
      ...entry,
      idx: i + 1
    }));
    
    let allGlobalEntries = profiles.map(profile => ({
      id: profile.id,
      name: profile.name,
      points: getTotalPoints(profile)
    }));
    allGlobalEntries.sort((a, b) => b.points - a.points);
    allGlobalEntries = allGlobalEntries.map((entry, i) => ({
      ...entry,
      idx: i + 1
    }));

    const weeklyIdx = allWeeklyEntries.find(entry => entry.id === profile.id).idx;
    const globalIdx = allGlobalEntries.find(entry => entry.id === profile.id).idx;

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
  };

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

      <Text style={styles.leaderboardTitle}>Weekly Leaderboard</Text>
      <FlatList
        data={weeklyEntries}
        keyExtractor={item => item.idx.toString()}
        renderItem={({ item }) => (
          <LeaderboardEntry
            idx={item.idx}
            name={item.name}
            points={item.points}
          />
        )}
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

      <Text style={styles.leaderboardTitle}>Overall Leaderboard</Text>
      <FlatList
        data={globalEntries}
        keyExtractor={item => item.idx.toString()}
        renderItem={({ item }) => (
          <LeaderboardEntry
            idx={item.idx}
            name={item.name}
            points={item.points}
          />
        )}
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
    backgroundColor: "#f7f8fa",
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  viewButton: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f0f4f8',
    borderRadius: 8,
  },

  globalButton: {
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },

  viewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  currentView: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },

  leaderboardTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: "#f0f4f8",
  },

  leaderboardEntry: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  leaderboardEntryHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },

  leaderboardEntryPoints: {
    fontSize: 20,
    color: '#2E8B57',
    fontWeight: '500',
  },
});
