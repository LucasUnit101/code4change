import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, View, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";

import { validateUsername, validateEmail, validatePassword } from '@util/userValidation';

import Title from "@components/Title";
import StyledTextInput from "@components/StyledTextInput";
import StyledButton from "@components/StyledButton";

/*
  Route: /register
*/
export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [reset, setReset] = useState(false);

  const router = useRouter();

  const createUser = () => {
    const payload = {
      name,
      username,
      email,
      password
    }

    // Get IP that Expo server is using to host app, allows to connect with the backend
    const URI = Constants.expoConfig.hostUri.split(':').shift();

    // POST to /register with payload
    fetch(`http://${URI}:${process.env.EXPO_PUBLIC_PORT}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(res => {
      if (!res.ok) { // Login failed
        res.text().then(text => {
          Alert.alert('', text, [{
            text: 'OK',
            style: 'cancel'
          }]);

          // Clear text inputs
          setReset(!reset);
        });
      } else {
        /*
          Register successful, navigate to /login page
        */
        router.navigate('/login');
      }
    }).catch(err => console.log(err));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Title />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.body}
        >
          <View style={styles.form}>
            <StyledTextInput
              field="Name"
              value={name}
              setText={setName}
              placeholder="Albert Gator"
              autoComplete="name"
              autoCorrect={false}
              required
            />
            <StyledTextInput
              field="Username"
              value={username}
              setText={setUsername}
              placeholder="albert"
              autoComplete="username"
              autoCorrect={false}
              validate={validateUsername}
              required
              reset={reset}
            />
            <StyledTextInput
              field="Email"
              value={email}
              setText={setEmail}
              placeholder="albert@ufl.edu"
              autoComplete="email"
              autoCorrect={false}
              validate={validateEmail}
              required
              reset={reset}
            />
            <StyledTextInput
              field="Password"
              value={password}
              setText={setPassword}
              placeholder="supersecretpassword"
              autoComplete="current-password"
              autoCorrect={false}
              secureTextEntry={true}
              validate={validatePassword}
              required
              reset={reset}
            />
            <StyledButton
              text="Create Account"
              backgroundColor="#FA4616"
              pressedColor="#cf360e"
              onClick={createUser}
            />
          </View>
        </KeyboardAvoidingView>
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
  body: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
    paddingHorizontal: 20
  }
});