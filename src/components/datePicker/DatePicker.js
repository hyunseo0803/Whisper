import React from 'react';
import {View, StyleSheet, Modal, Pressable} from 'react-native';

/**
 * 
 * @params {boolean} visible
 * @params setVisible
 * @returns datepicker modal
 */
const DatePicker = () => {

  /**
   * 
   * @param {boolean} save true, false
   */
  const closeModal = (isSave) => {
    if(isSave) { 
      return props.setVisible(false)
    }
    else { return  }
  }


  return (
    <Modal
    animationType={'fade'}
    visible={props.visible}
    transparent={true}
    style={{flex:1}}
    >
      <Pressable
      onPress={}
      >

      </Pressable>

    </Modal>
  );
}

const styles = StyleSheet.create({})

export default DatePicker;
