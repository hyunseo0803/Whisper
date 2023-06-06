// 일기 삭제 버튼 모달창

import React from 'react';
import {View, StyleSheet, Text, Modal, Pressable, Alert, useColorScheme, TouchableHighlight, TouchableOpacity} from 'react-native';
import GlobalStyle from '../globalStyle/GlobalStyle'
import ModeColorStyle from '../globalStyle/ModeColorStyle';
import { deleteDiarys } from '../util/database';

/**
 * 일기 삭제 안내 모달창
 * @param {visible, setVisible, wantDelteId(dId), wantDelteDate(date)} props 
 */
const DeleteMessage = (props) => {

  const {
    visible,
    setVisible,
    wantDelteId,
    wantDelteDate,
    setRedirect
  } = props;

  const isDark = useColorScheme() === 'dark'

  const onClickDelete = (want_delete) => {
    if(want_delete === true) {
      Alert.alert("삭제하시겠습니까?", `삭제하시면 다시 복구하실 수 없습니다. 
${wantDelteDate}의 일기를 정말 삭제할까요?`, [
        {
          text: '취소',
          onPress: () => setVisible(false)
        },
        {
          text: '삭제',
          onPress: () => deleteDiaryFun(wantDelteId)
        }
      ])
    }
    else {
      setVisible(false)
    }
  }

  const deleteDiaryFun = async(id) => {
    if(deleteDiarys(id)){
      setRedirect(true)
    }
    setVisible(false)
  }

  return (
    <Modal 
    animationType={'fade'}
    visible={visible}
    transparent={true}
    >
      <View style={modalS.background}>
        <TouchableOpacity style={[modalS.button, ModeColorStyle(isDark).bg_box, {marginBottom: 20}]}
        onPress={() => onClickDelete(true)}>
          <Text style={[GlobalStyle.font_title2, ModeColorStyle(isDark).font_RED]}>삭 제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[modalS.button, ModeColorStyle(isDark).bg_RED]}
        onPress={() => onClickDelete(false)}
        >
          <Text style={[GlobalStyle.font_title2, GlobalStyle.fontWHITE]}>취 소</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const modalS = StyleSheet.create({
  background:{
		flex: 1,
		justifyContent: "flex-end",
    alignItems :'center',
    paddingBottom: 40,
    display: 'flex',
		backgroundColor: "rgba(0,0,0,0.5)",
    // backgroundColor: 'red'
  }, 

  button:{
    width: '80%',
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default DeleteMessage;
