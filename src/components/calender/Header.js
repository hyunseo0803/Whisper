import React, {useState, useEffect} from "react";
import { Pressable, View, Text, StyleSheet, Modal, Button, useColorScheme } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalStyle from "../../globalStyle/GlobalStyle";
import YMPicker from "../datePicker/YMPicker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { changeMonth } from "../../util/Calender.js";
import { COLOR_DARK_PRIMARY, COLOR_LIGHT_PRIMARY } from "../../globalStyle/color";
import ModeColorStyle from "../../globalStyle/ModeColorStyle";

function Header(props) {
  const isDark = props.isDark

  // 모달창 show
  const [showModal, setShowModal] = useState(false);

  return(
    <View style={S.headerContainer}>
      <Pressable 
      style={S.btnBox}
      onPress={props.movePrevMonth.bind(this, props.month)}>
        <Ionicons name="chevron-back" size={40} color={isDark ? COLOR_DARK_PRIMARY : COLOR_LIGHT_PRIMARY} />
      </Pressable>

      <Pressable style={S.dateContainer}
      onPress={() => {
        setShowModal(true);
      }}>
        <Text style={[GlobalStyle.font_body, ModeColorStyle(isDark).font_primary]}>{props.year}</Text>
        <Text style={[GlobalStyle.font_title1, ModeColorStyle(isDark).font_primary]}>
          {changeMonth(props.month)}
        </Text>
      </Pressable>

      <Pressable 
      style = {S.btnBox}
      onPress={props.moveNextMonth.bind(this, props.month)}>
        <Ionicons name="chevron-forward" size={40} color={isDark ? COLOR_DARK_PRIMARY : COLOR_LIGHT_PRIMARY} />
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