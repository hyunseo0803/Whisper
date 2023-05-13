// 일기 삭제 버튼 모달창

import React from 'react';
import {View, StyleSheet, Text, Modal, Pressable, Alert, useColorScheme} from 'react-native';
import GlobalStyle from '../globalStyle/GlobalStyle'
import ModeColorStyle from '../globalStyle/ModeColorStyle';
import { deleteDiary } from '../util/firebase/CRUD';

/**
 * 일기 삭제 안내 모달창
 * @param {visible, setVisible, wantDelteId(dId), wantDelteDate(date)} props 
 */
const DeleteMessage = (props) => {

  const isDark = useColorScheme() === 'dark'

  const onClickDelete = (want_delete) => {
    if(want_delete === true) {
      Alert.alert("삭제하시겠습니까?", `삭제하시면 다시 복구하실 수 없습니다. 
${props.wantDelteDate}의 일기를 정말 삭제할까요?`, [
        {
          text: '취소',
          onPress: () => props.setVisible(false)
        },
        {
          text: '삭제',
          onPress: () => deleteDiaryFun(props.wantDelteId)
        }
      ])
    }
    else {
      props.setVisible(false)
    }
  }

  const deleteDiaryFun = async(id) => {
    if(deleteDiary(id)){
      props.setRedirect(true)
    }
    props.setVisible(false)
  }

  return (
    <Modal 
    animationType={'fade'}
    visible={props.showDeleteModal}
    transparent={true}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}
    >
      <View style={modalS.background}>
        <Pressable style={[modalS.button, ModeColorStyle(isDark).bg_box, {marginBottom: 20}]}
        onPress={() => onClickDelete(true)}>
          <Text style={[GlobalStyle.font_title2, ModeColorStyle(isDark).font_RED]}>삭 제</Text>
        </Pressable>
        <Pressable style={[modalS.button, ModeColorStyle(isDark).bg_RED]}
        onPress={() => onClickDelete(false)}
        >
          <Text style={[GlobalStyle.font_title2, GlobalStyle.fontWHITE]}>취 소</Text>
        </Pressable>
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
