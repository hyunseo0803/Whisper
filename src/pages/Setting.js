import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Setting = ( {navigation }) => {
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
      onPress={() => {}}>
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
