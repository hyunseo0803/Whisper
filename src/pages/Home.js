import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import Calender from "../components/calender/Calender";
import GlobalStyle from "../globalStyle/GlobalStyle";
import { Image } from "react-native";
import Logo from '../../assets/images/Logo.png';


const Home = () => {


  return (
    <View style={[GlobalStyle.GWidth, styles.container]}>
      <View style={styles.imgWrap}>
        <Image source={Logo} style={styles.logoImg}/>
      </View>
			<Calender/>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
		paddingTop: 55,
    backgroundColor: '#fff'
  },

  imgWrap:{
    height: 18,
    marginBottom: 40
  },
  logoImg:{
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  }
});
