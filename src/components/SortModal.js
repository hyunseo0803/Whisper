import React from 'react';
import {View, StyleSheet, Text, Modal, Pressable, Alert, useColorScheme} from 'react-native';
import GlobalStyle from '../globalStyle/GlobalStyle'
import ModeColorStyle from '../globalStyle/ModeColorStyle';

const SortModal = (props) => {
  const isDark = useColorScheme() ==='dark'

  const onClickSort = (how) => {
    switch (how) {
      case 'ASC':
        props.setHowSortDiary('ASC')
        props.setVisible(false)
        break;

      case 'DESC':
        props.setHowSortDiary('DESC')
        props.setVisible(false)
        break;

      default:
      props.setVisible(false)
      break;
    }
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
        <Pressable style={[modalS.button, ModeColorStyle(isDark).bg_box, {marginBottom: 10}]}
        onPress={() => onClickSort('ASC')}>
          <Text style={[GlobalStyle.font_title2, ModeColorStyle(isDark).font_RED]}>오름차순 정렬</Text>
        </Pressable>
        <Pressable style={[modalS.button, ModeColorStyle(isDark).bg_box, {marginBottom: 20}]}
        onPress={() => onClickSort('DESC')}>
          <Text style={[GlobalStyle.font_title2, ModeColorStyle(isDark).font_RED]}>내림차순 정렬</Text>
        </Pressable>

        <Pressable style={[modalS.button, ModeColorStyle(isDark).bg_RED]}
        onPress={() => onClickSort('cancle')}
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

export default SortModal;
