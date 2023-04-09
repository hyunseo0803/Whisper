import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import Calender from "../components/Calender";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>HomePage</Text>
      <Button
        title='Click Here'
        onPress = { () => alert('Button Clicked!')}/>

			<Calender/>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "center",
  },
});
