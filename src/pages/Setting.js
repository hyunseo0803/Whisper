import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { SIGNOUT } from "../util/firebase/user";

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
    <View style={styles.container}>
      <Text>SettingPage</Text>
      
      <Pressable
      onPress={() => navigation.navigate('settingAlert')}>
        <Text>알림시간설정</Text>
      </Pressable>

      <Pressable
      onPress={() => navigation.navigate('settingContact')}>
        <Text>문의하기</Text>
      </Pressable>

      <Pressable
      onPress={() => navigation.navigate('settingContactLog')}>
        <Text>문의 기록 보기</Text>
      </Pressable>

      <Pressable
      onPress={() => navigation.navigate('settingPremium')}>
        <Text>소곤소곤 프리미엄 가입</Text>
      </Pressable>

      <Pressable
      onPress={() => {onPressBtnLogout()}}>
        <Text>로그아웃</Text>
      </Pressable>

      <Pressable
      onPress={() => navigation.navigate('settingWithdrawal')}>
        <Text>회원탈퇴하기</Text>
      </Pressable>
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
