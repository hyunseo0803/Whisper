import { SafeAreaView, StyleSheet, View, Pressable } from "react-native";
import React from "react";
import Calender from "../components/calender/Calender";
import GlobalStyle from "../globalStyle/GlobalStyle";
import { Image } from "react-native";
import Logo from '../../assets/images/Logo.png';
import { btnGoWriteScreen } from "../globalStyle/BtnStyle";
import { Ionicons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={[GlobalStyle.safeAreaWrap, styles.container]}>
      <View style={styles.imgWrap}>
        <Image source={Logo} style={styles.logoImg}/>
      </View>
			<Calender/>
      
      {/* 일기쓰러가기 버튼 */}
      <View style={styles.btnWrap}>
        <Pressable
          style={[btnGoWriteScreen.btnWrap]}
          onPress={() => {
            navigation.navigate('Write')
          }}>
            <Ionicons style={btnGoWriteScreen.plusIcon} name="add-outline" size={50} color='white' />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },

  imgWrap:{
    height: 18,
    marginBottom: 40
  },
  logoImg:{
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },

  btnWrap:{
    position: 'absolute',
    bottom: 20,
    right: 0
  }
});
