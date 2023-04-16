import React, { useState } from "react";
import { View,Text, StyleSheet, Modal, Button, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import GlobalStyle from "../../globalStyle/GlobalStyle";


// 연, 월 picker
export default function YMPicker(props) {

  const [selectYear, setSelectYear] = useState(props.year);
  const [selectMonth, setSelectMonth] = useState(props.month);

  /**
   * 다음 년도 선택 함수
   * @param {number} year 
   */
  const btnNextYear = (year) => {
    setSelectYear((prevYear) => prevYear+1)
  }
  /**
   * 이전년도 함수
   * @param {number} year 
   */
  const btnPrevYear = (year) => {
    setSelectYear((prevYear) => prevYear-1)
  }


  /**
   * 달(월) 선택 함수
   */
  const onClickSelectMonth = (month) => {
    setSelectMonth(month);
  }
  
  /**
   *  모달 선택 취소 버튼
   *  @result showModal -> false
   */
  const onClickBtnCancle = () => {
    setSelectYear(props.year)
    setSelectMonth(props.month)
    props.setShowModal(false);
  }

  /**
   * 모달 선택(저장) 버튼
   */
  const onClickBtnSave = () => {
    props.setMonth(selectMonth)
    props.setYear(selectYear)
    props.setShowModal(false)
  }

  /**
   * 모달창을 닫을 때 선택한 연도, 월을 보내주는 함수
   * @param {number} year 
   * @param {number} month 
   */
  // const sendYM = (year, month) => {

  // }

  console.log(selectMonth)
  console.log(selectYear)

  /**
   * 세글자 월 이름 배열
   */
  const Month = [
    'Jan',
    'Fab',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  return(
    <Modal
      animationType={props.animationType}
      visible={props.visible}
      transparent={true}
      style={modalS.modalBackground}
    >
      <View style={modalS.modalBackground}>
        <View style={modalS.modalBody}>
          {/* HEADER */}
          <View style={pickerS.header}>
            <Pressable>
              <Ionicons
              name="chevron-back-outline" size={35} color="black"
              style={pickerS.btnArrow} 
              onPress={btnPrevYear}/>
            </Pressable>
            
            <Text style={[GlobalStyle.font_title2, {color: '#4E4981'}]}>{selectYear}</Text>
            
            <Pressable>
              <Ionicons name="chevron-forward-outline" size={35} color="black" 
              style={pickerS.btnArrow} 
              onPress={btnNextYear}/>
            </Pressable>

          </View>

          {/* BODY */}
          <View style={pickerS.body}>
            {
              Month.map((monthName, index) => (
                <Pressable
                style={[pickerS.btnMonth, TextS(index+1, selectMonth).btnMonthBox]}
                key={index}
                onPress={() => onClickSelectMonth(index+1)}>
                  <Text style={[GlobalStyle.font_body, pickerS.monthText, TextS(index+1, selectMonth).btnMonthText]}>{monthName}</Text>
                </Pressable>
              ))
            }
          </View>

          {/* FOOTER */}
          <View style={pickerS.footer}>
            <Pressable
            style={[pickerS.btnInFooter, TextS(0, ).btnSaveCancle]}
            onPress={onClickBtnCancle}>
              <Text style={[GlobalStyle.font_body, TextS(0, ).btnSaveCancleText]}>취 소</Text>
            </Pressable>
            <Pressable
            style={[pickerS.btnInFooter, TextS(1, ).btnSaveCancle]}
            onPress={onClickBtnSave}>
              <Text style={[GlobalStyle.font_body, TextS(1, ).btnSaveCancleText]}>적 용</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const modalS = StyleSheet.create({
  modalBackground:{
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.4)'
    },
  modalBody:{
    marginHorizontal: 50,
    height: 410,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    display: 'flex',
    gap: 5,
    padding: 10,
    borderRadius: 16
  }
})

const pickerS = StyleSheet.create({
  // 헤더
  header:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  btnArrow:{
    justifyContent: 'center',
    alignItems: 'center',
    color: '#4E4981'
  },  

  // 바디
  body:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // gap: 10,
    justifyContent: 'space-between',
    flex: 5
  },
  btnMonth:{
    width: '33%',
    padding: 20,
    marginVertical: 3,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center'
  },
  monthText: {
    color: '#fff'
  },

  // 푸터
  footer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  btnInFooter:{
    width: '47%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
})

const TextS = (el, month) => StyleSheet.create({
  btnMonthBox:{
    backgroundColor: el === month ? '#4E4981' : '#fff',
  },
  btnMonthText:{
    color: el === month ? '#fff' : '#4E4981'
  },

  btnSaveCancle:{
    backgroundColor: el===0? '#fff' : '#E76B5C',
    borderWidth : 2,
    borderColor: '#E76B5C' 
  },
  btnSaveCancleText:{
    color: el===0 ? '#E76B5C' : '#fff'
  }
})