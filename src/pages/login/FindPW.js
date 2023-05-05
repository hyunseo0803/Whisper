import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import NameLogo from "../../../assets/images/NameLogo.png";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import { Ionicons } from "@expo/vector-icons";
import { RESET_password } from "../../util/firebase/user";
import { GlobalLoginStyle } from "../../globalStyle/LoginStyle";
import { Keyboard } from "react-native";

export default function FindPW() {
  const [email, setEmail] = useState("");

  /**
   * 비밀번호 찾기
   * @param {string} email 
   */
  const handleFindPw = (email) => {
    RESET_password(email)
  };

  return (
    <Pressable
    onPress={Keyboard.dismiss}
    style={{
      backgroundColor: '#fff',
      display: 'flex',
      flex: 1
    }}>
      <SafeAreaView
        style={[GlobalStyle.safeAreaWrap, {marginHorizontal: 30}]}
      >

        {/* 로고 */}
        <View
          style={{
            alignItems: "center",
            marginTop: 50,
            height: 110,
          }}
        >
          <Image source={NameLogo} style={GlobalLoginStyle.logo} />
          <Text style={[GlobalLoginStyle.loginTitle, GlobalStyle.font_title2]}>
            비밀번호 재설정
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Text style={[{ color: "#86878C" }, GlobalStyle.font_caption2]}>
            이메일을 입력하시면,
          </Text>
          <Text style={[{ color: "#86878C" }, GlobalStyle.font_caption2]}>
            해당 이메일로 비밀번호 재설정 링크를 보내드립니다.
          </Text>
        </View>

        {/* 입력 폼 */}
        <View
          style={{
            marginTop: 20,
          }}
        >
          <TextInput
            style={[styles.inputbox, GlobalStyle.font_caption1]}
            value={email}
            placeholder="이메일"
            label="email"
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* 메일 보내기 버튼 */}
        <View style={styles.loginButtonWrap}>
          <Pressable
            style={styles.loginbutton}
            onPress={() => {handleFindPw(email)}}
          >
            <Ionicons
              name="ios-mail-outline"
              size={24}
              color="white"
              style={{ paddingHorizontal: 10 }}
            />
            <Text
              style={[
                {
                  color: "white",
                  fontSize: 20,
                },
                GlobalStyle.font_title2,
              ]}
            >
              메일 보내기
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inputbox: {
    width: "100%",
    height: 60,
    borderColor: "#4E4981",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    position: "relative",
  },

  loginButtonWrap: {
		width: "100%",
		height: 60,
		flexDirection: "row",
		marginTop: 110,
	},
	loginbutton: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		backgroundColor: "#E76B5C",
		flexDirection: "row",
	},
});
