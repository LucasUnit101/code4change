import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import Title from "@components/Title";
import StyledButton from "@components/StyledButton";

/*
  Route: / (Entry Point)

  Displays login and create account buttons
*/
export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.buttons}>
        <StyledButton
          text="Login"
          backgroundColor="#FA4616"
          pressedColor="#cf360e"
          onClick={() => router.navigate("/login")}
        />
        <StyledButton
          text="Create Account"
          backgroundColor="#FA4616"
          pressedColor="#cf360e"
          onClick={() => router.navigate("/register")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292D5D',
    alignItems: 'center',
    paddingVertical: 60
  },
  buttons: {
    flex: 1,
    gap: 40,
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});