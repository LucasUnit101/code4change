import { Text } from "react-native";

export default function Clock({ time }) {
  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>{formatTime(time)}</Text>;
}