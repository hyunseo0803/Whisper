import React, {useState, useEffect} from "react";
import { Pressable, View, Text, StyleSheet, Modal, Button } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalStyle from "../../globalStyle/GlobalStyle";
import YMPicker from "../datePicker/YMPicker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { changeMonth } from "../../util/Calender.js";

function Header(props) {

  // 모달창 show
  const [showModal, setShowModal] = useState(false);

  // 숫자로 되어있는 월을 영어로 바꿔주는 함수
  // const changeMonth = (NMonth) => {
  //   const EMonth = [
  //     'January',
  //     'Fabruary',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December'
  //   ]

  //   return EMonth[NMonth-1]
  // }


  return(
    <View style={S.headerContainer}>
      <Pressable 
      style={S.btnBox}
      onPress={props.movePrevMonth.bind(this, props.month)}>
        <Ionicons name="chevron-back" size={40} color='black' />
      </Pressable>

      <Pressable style={S.dateContainer}
      onPress={() => {
        setShowModal(true);
      }}>
        <Text style={GlobalStyle.font_body}>{props.year}</Text>
        <Text style={GlobalStyle.font_title1}>
          {changeMonth(props.month)}
        </Text>
      </Pressable>

      <Pressable 
      style = {S.btnBox}
      onPress={props.moveNextMonth.bind(this, props.month)}>
        <Ionicons name="chevron-forward" size={40} color='black' />
      </Pressable>

      {
        showModal &&
        <YMPicker 
          animationType = 'slide'
          visible={true}
  
          setShowModal = {setShowModal}
          month = {props.month}
          setMonth = {props.setMonth}
          year = {props.year}
          setYear = {props.setYear}
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