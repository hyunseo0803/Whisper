import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const Setting = () => {
  return (
    <View style={styles.container}>
      <Text>SettingPage</Text>
      <Button
        title='Click Here'
        onPress = { () => alert('Button Clicked!')}/>
    </View>
  );
}

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "center",
  },
});
