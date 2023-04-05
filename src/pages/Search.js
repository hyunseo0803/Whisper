import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const Search = () => {
  return (
    <View style={styles.container}>
      <Text>SearchPage</Text>
      <Button
        title='Click Here'
        onPress = { () => alert('Button Clicked!')}/>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fcbbc",
    alignItems: "center",
    justifyContent: "center",
  },
});
