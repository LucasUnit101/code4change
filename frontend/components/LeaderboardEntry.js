import { StyleSheet, Text, View } from "react-native";

export default function LeaderboardEntry(props) {
  return (
    <View style={styles.entry}>
      <Text style={styles.idx}>{props.idx}</Text>
      <Text
        style={styles.name}
        numberOfLines={1}
        ellipsizeMode='tail'
      >{props.name}</Text>
      <Text style={styles.points}>{props.points}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  entry: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  idx: {
    flex: 0.2,
    fontSize: 18
  },
  name: {
    flex: 0.5,
    fontSize: 18
  },
  points: {
    flex: 0.3,
    fontSize: 18
  }
})