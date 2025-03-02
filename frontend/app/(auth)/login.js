import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

import { useSession } from "@context/ctx";

import Title from "@components/Title";
import StyledTextInput from "@components/StyledTextInput";
import StyledButton from "@components/StyledButton";

/*
  Route: /login
*/
export default function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useSession();
  const router = useRouter();

  const loginUser = async () => {
    const payload = {
      userID,
      password,
    };

    const result = await signIn(payload);
    if (!result.success) {
      Alert.alert("", result.message, [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    } else {
      router.navigate("/home");
    }
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
            style={styles.input}
            fontWieght="bold"
          />
          <StyledTextInput
            field="Password"
            value={password}
            setText={setPassword}
            placeholder="supersecretpassword"
            autoComplete="current-password"
            autoCorrect={false}
            secureTextEntry={true}
            required
            style={styles.input}
          />
          <StyledButton
            text="Sign In"
            backgroundColor="#FA4616"
            pressedColor="#cf360e"
            onClick={loginUser}
            style={styles.button}
          />
          <Link style={styles.create} href="/register">
            Create an Account
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(38, 44, 94)",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    gap: 25,
    marginTop: 50,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#D1D8E0",
    elevation: 2,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  create: {
    marginTop: 10,
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});
