import { TouchableWithoutFeedback, Keyboard, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";

import Title from "@components/Title";
import StyledTextInput from "@components/StyledTextInput";
import StyledButton from "@components/StyledButton";

/*
  Route: /login
*/
export default function Login() {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Title />
        <View style={styles.form}>
          <StyledTextInput
            field="Username/Email"
            value={userID}
            setText={setUserID}
            placeholder="albert/albert@ufl.edu"
            autoComplete="username"
            autoCorrect={false}
            required
          />
          <StyledTextInput
            field="Password"
            value={password}
            setText={setPassword}
            placeholder="supersecretpassword"
            autoComplete="current-password"
            autoCorrect={false}
            required
            secureTextEntry={true}
          />
          <StyledButton
            text="Sign In"
            backgroundColor="#FA4616"
            pressedColor="#cf360e"
            onClick={loginUser}
          />
          <Link style={styles.create} href="/register">Create an Account</Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292D5D',
    paddingVertical: 20
  },
  form: {
    flex: 1,
    gap: 30,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  create: {
    marginTop: -20,
    textAlign: 'right',
    color: 'white'
  }
});