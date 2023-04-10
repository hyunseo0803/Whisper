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

  const onClickBtnSave = () => {}

  console.log(selectMonth)


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
            
            <Text style={GlobalStyle.font_title2}>{selectYear}</Text>
            
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
                style={pickerS.btnMonth}
                key={index}
                onPress={() => onClickSelectMonth(monthName)}>
                  <Text style={[GlobalStyle.font_body, pickerS.monthText]}>{monthName}</Text>
                </Pressable>
              ))
            }
          </View>

          {/* FOOTER */}
          <View style={pickerS.footer}>
            <Pressable
            style={pickerS.btnInFooter}
            onPress={props.closeModal}>
              <Text style={GlobalStyle.font_body}>취 소</Text>
            </Pressable>
            <Pressable
            style={pickerS.btnInFooter}>
              <Text style={GlobalStyle.font_body}>적 용</Text>
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
    height: 400,
    backgroundColor: '#fff',
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
    backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  btnArrow:{
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  },  

  // 바디
  body:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // gap: 10,
    justifyContent: 'space-between',
    backgroundColor: 'blue',
  },
  btnMonth:{
    backgroundColor: '#000',
    width: '32%',
    padding: 20,
    marginVertical: 5,
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
    height: 50,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnInFooter:{
    width: '47%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
})

const TextS = (el) = StyleSheet.create({
  btnMonthText:{
  }
})