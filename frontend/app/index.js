import { View, Image, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import logo from "@assets/logo.png";
import StyledButton from "@components/StyledButton";

/*
  Route: / (Entry Point)

  Displays login and create account buttons
*/
export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={logo} />
        <Text style={[styles.title, styles.study]}>Study</Text>
        <Text style={[styles.title, styles.gator]}>Gator</Text>
      </View>
      <View style={styles.buttons}>
        <StyledButton
          text="Login"
          backgroundColor="#FA4616"
          pressedColor="#cf360e"
          onClick={() => router.navigate("/home")}
        />
        <StyledButton
          text="Create Account"
          backgroundColor="#FA4616"
          pressedColor="#cf360e"
          onClick={() => router.navigate("/home")}
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  study: {
    color: '#FA4616'
  },
  gator: {
    color: '#0021A5'
  },
  buttons: {
    flex: 1,
    gap: 40,
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})