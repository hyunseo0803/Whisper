import { SafeAreaView, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { SIGNOUT } from "../util/firebase/user";
import GlobalStyle from "../globalStyle/GlobalStyle";
import { Ionicons, AntDesign, Octicons } from "@expo/vector-icons";

const Setting = ( {navigation }) => {

  const onPressBtnLogout = () => {
    Alert.alert('로그아웃', '로그아웃하시겠습니까?',
    [
      {
        text:'취소',
      },
      {
        text: '로그아웃',
        onPress: () => {
          SIGNOUT()
        }
      }
    ])
  }

  return (
    <SafeAreaView style={[styles.container, GlobalStyle.safeAreaWrap]}>
      <View style={{width:'100%', alignItems: 'center', marginTop: -30}}>
      <Text style={[GlobalStyle.font_title1, {marginBottom: 66}]}>SETTING</Text>
        <Pressable
        style={[styles.buttomWrap, styles.justifyContentSB]}
        onPress={() => navigation.navigate('settingAlert')}>
          <View style={styles.flexDirectionRow}>
          <Ionicons name="notifications-circle-outline" size={36} style={{marginLeft:-2}}/>
            <Text style={[GlobalStyle.font_body, {marginLeft:7}]}>알림시간설정</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={25}></Ionicons>
        </Pressable>

        <Pressable
        style={[styles.buttomWrap, styles.justifyContentSB]}
        onPress={() => navigation.navigate('settingContact')}>
          <View style={styles.flexDirectionRow}>
            <AntDesign name="questioncircleo" size={30} color="black" />
            <Text style={[GlobalStyle.font_body, {marginLeft:10}]}>문의하기</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={25}></Ionicons>
        </Pressable>

        <Pressable
        style={[styles.buttomWrap, styles.justifyContentSB]}
        onPress={() => navigation.navigate('settingContactLog')}>
          <View style={styles.flexDirectionRow}>
            <Ionicons name="list-circle-outline" size={36} style={{marginLeft:-3}}></Ionicons>
            <Text style={[GlobalStyle.font_body, {marginLeft:7}]}>문의 기록 보기</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={25}></Ionicons>
        </Pressable>

        <Pressable
        style={[styles.buttomWrap, styles.justifyContentSB]}
        onPress={() => navigation.navigate('settingPremium')}>
          <View style={styles.flexDirectionRow}>
            <AntDesign name="staro" size={30} color="black" />
            <Text style={[GlobalStyle.font_body, {marginLeft:10}]}>소곤소곤 프리미엄 가입</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={25}></Ionicons>
        </Pressable>

        <Pressable
        style={[styles.buttomWrap, styles.justifyContentSB]}
        onPress={() => {onPressBtnLogout()}}>
          <View style={styles.flexDirectionRow}>
            <AntDesign name="logout" size={30} color="#E76B5C" />
            <Text style={[GlobalStyle.fontRED, GlobalStyle.font_body, {marginLeft:10}]}>로그아웃</Text>
          </View>
        </Pressable>

        <Pressable
        style={[styles.buttomWrap, styles.justifyContentSB, {borderBottomWidth:1}]}
        onPress={() => navigation.navigate('settingWithdrawal')}>
          <View style={styles.flexDirectionRow}>
            <AntDesign name="closecircleo" size={30} color="#E76B5C" />
            <Text style={[GlobalStyle.fontRED, GlobalStyle.font_body, {marginLeft:10}]}>회원탈퇴</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  buttomWrap:{
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#BDBFC4',
  },
  justifyContentSB:{
    justifyContent: 'space-between'
  },
  flexDirectionRow:{
    flexDirection: "row",
    alignItems: 'center'
  }
});
