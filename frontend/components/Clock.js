import { Text } from "react-native";

export default function Clock(props) {
  return <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>{props.time}</Text>
}