import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, View } from "react-native";
import { useCallback } from 'react';
import Clock from './Clock';
/* 
  Styled Button Component - Displays button with text

  props: {
    text: Text to display on button,
    backgroundColor: Background color of button,
    pressedColor: Background color of button when pressed,
    onClick: Method to be called on button press,
    elapsedTime: Elapsed time to display inside the button,
    isRunning: Boolean to indicate if the timer is running,
    onReset: Method to be called on reset button press
  }
*/
export default function HomeButton(props) {
  const [pressed, setPressed] = useState(false);

    const handlePress = useCallback(() => {
        if (pressed) {
          return;
        }
        setPressed(true);
      }, [pressed]);


      const StopTimer = useCallback(() => {
        setPressed(false);
      });
      const pauseTimer = useCallback(() => {
        setPressed(true);
      });
  return (
    <View>
        <Pressable
            onPress={handlePress}
            style = {styles.button}
        >
            {pressed ?(
        <>
        <Text>Start</Text> 
        <Clock />
        </>
        ):(
          <View>
            <Pressable onPjess={pauseTimer}></Pressable>
            <Pressable onPress={StopTimer}></Pressable>
          </View>
        )
        
      }
        </Pressable>
    </View> 
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 400,
    borderRadius: 800,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow'
  },
  resetButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
  },
  resetText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});