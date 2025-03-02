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
              style={styles.input}
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
              style={styles.input}
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
              style={styles.input}
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
              style={styles.input}
            />
            <StyledButton
              text="Create Account"
              backgroundColor="#FA4616"
              pressedColor="#cf360e"
              onClick={createUser}
              style={styles.button}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa', // Soft light gray background
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    gap: 25,
    marginTop: 50,
  },
  input: {
    backgroundColor: '#ffffff',  // White background for input fields
    borderRadius: 10,  // Rounded corners for inputs
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D8E0',  // Subtle gray border for input fields
    elevation: 2,  // Subtle shadow for depth
  },
  button: {
    borderRadius: 10,  // Rounded corners for button
    paddingVertical: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20, // Space between inputs and button
  },
});
