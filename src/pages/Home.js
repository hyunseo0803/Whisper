import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Calender from "../components/calender/Calender";
import GlobalStyle from "../globalStyle/GlobalStyle";
import { Image } from "react-native";
import Logo from '../../assets/images/Logo.png';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {

  const getData = async() => {
    const docRef = doc(db, "users", "1jwlDGzHtnXYzotdlrHf");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  getData();

  return (
    <SafeAreaView style={[GlobalStyle.GWidth, styles.container]}>
      <View style={styles.imgWrap}>
        <Image source={Logo} style={styles.logoImg}/>
      </View>
			<Calender/>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
		marginHorizontal: 20,
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
