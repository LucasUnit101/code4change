import { View, Image, Text, StyleSheet } from "react-native";

import logo from "@assets/logo.png";

/* 
  Title Component - Displays logo with app name
*/
export default function Title(props) {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={logo} />
      <Text style={[styles.title, styles.study]}>Study</Text>
      <Text style={[styles.title, styles.gator]}>Gator</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292D5D'
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  study: {
    color: '#FA4616',
    paddingLeft: 5
  },
  gator: {
    color: '#0021A5'
  }
});