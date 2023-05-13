import React, {useState, useEffect} from "react";
import { Pressable, View, Text, StyleSheet, Modal, Button, useColorScheme } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalStyle from "../../globalStyle/GlobalStyle";
import YMPicker from "../datePicker/YMPicker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { changeMonth } from "../../util/Calender.js";
import { COLOR_BLACK, COLOR_DARK_PRIMARY, COLOR_DARK_WHITE, COLOR_LIGHT_PRIMARY } from "../../globalStyle/color";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";

/**
 * YMPicker head
 * @param {props} month useState
 * @param {props} year useState
 * @param {props} moveNextMonth 다음달로 이동하는 화살표버튼 함수
 * @param {props} movePrevMonth 이전달로 이동하는 화살표버튼함수
 * @param {props} setMonth useState
 * @param {props} setYear useState
 * @param {props} isDark(useColorScheme)
 * @returns calender
 */
function Header(props) {
  const isDark = props.isDark

  // 모달창 show
  const [showModal, setShowModal] = useState(false);

  return(
    <View style={S.headerContainer}>
      <Pressable 
      style={S.btnBox}
      onPress={props.movePrevMonth.bind(this, props.month)}>
        <Ionicons name="chevron-back" size={40} color={isDark ? COLOR_DARK_WHITE : COLOR_BLACK} />
      </Pressable>

      <Pressable style={S.dateContainer}
      onPress={() => {
        setShowModal(true);
      }}>
        <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>{props.year}</Text>
        <Text style={[GlobalStyle.font_title1, ModeColorStyle(isDark).font_DEFALUT]}>
          {changeMonth(props.month)}
        </Text>
      </Pressable>

      <Pressable 
      style = {S.btnBox}
      onPress={props.moveNextMonth.bind(this, props.month)}>
        <Ionicons name="chevron-forward" size={40} color={isDark ? COLOR_DARK_WHITE : COLOR_BLACK} />
      </Pressable>

      {
        showModal &&
        <YMPicker 
          animationType = 'fade'
          visible={true}
  
          setShowModal = {setShowModal}
          month = {props.month}
          setMonth = {props.setMonth}
          year = {props.year}
          setYear = {props.setYear}
          isDark={isDark}
        />
      }

    </View>
  )
}

export default Header;

const S = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  btnBox:{
    height: 50,
    width: 50,

    alignItems: 'center',
    justifyContent: 'center',
  },
  
  dateContainer:{
    alignItems: 'center',
  },
})