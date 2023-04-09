import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import Calender from "../components/calender/Calender";
import GlobalStyle from "../globalStyle/GlobalStyle";


const Home = () => {


  return (
    <View style={[GlobalStyle.GWidth, styles.container]}>
			<Calender/>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
		marginTop: 100
  }
});
