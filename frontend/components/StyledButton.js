import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from "react-native";

/* 
  Styled Button Component - Displays button with text

  props: {
    text: Text to display on button,
    backgroundColor: Background color of button,
    pressedColor: Background color of button when pressed,
    onClick: Method to be called on button press
  }
*/
export default function StyledButton(props) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable 
      style={[styles.button, { 
        backgroundColor: pressed ? props.pressedColor : props.backgroundColor , 
        borderColor: props.borderColor || 'white',
      }]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onClick}
    >
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    borderRadius: 50,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});