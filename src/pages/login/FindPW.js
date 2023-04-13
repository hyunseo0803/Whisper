import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  Alert,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import NameLogo from "../../../assets/images/NameLogo.png";
import GlobalStyle from "../../globalStyle/GlobalStyle";
import { Ionicons } from "@expo/vector-icons";
import { RESET_password } from "../../../firebase";

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
    <View
      style={{
        backgroundColor: '#fff',
        display: 'flex',
        flex: 1
      }}>
      <SafeAreaView
        style={{
          display: "flex",
          alignItems: "center",
          marginHorizontal: 30,
          height: "85%",
        }}
      >

        {/* 로고 */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 50,
            width: "100%",
            height: 110,
          }}
        >
          <Image source={NameLogo} style={styles.logo} />
          <Text style={[styles.login, GlobalStyle.font_title2]}>
            비밀번호 재설정
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
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
            alignItems: "stretch",
            marginTop: 20,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <TextInput
            style={[styles.inputbox, GlobalStyle.font_caption1]}
            value={email}
            placeholder="이메일"
            label="email"
            onChangeText={setEmail}
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
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 50,
    margin: "auto",
    textAlign: "center",
  },

  login: {
    justifyContent: "center",
    color: "#4E4981",
    textAlign: "center",
    marginTop: 20,
  },
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
