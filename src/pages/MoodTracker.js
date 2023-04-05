import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const MoodTracker = () => {
  return (
    <View style={styles.container}>
      <Text>MoodTrackerPage</Text>
      <Button
        title='Click Here'
        onPress = { () => alert('Button Clicked!')}/>
    </View>
  );
}

export default MoodTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "center",
  },
});
