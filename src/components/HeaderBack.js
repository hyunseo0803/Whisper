import React, { useContext } from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ModeColorStyle from '../globalStyle/ModeColorStyle';
import GlobalStyle from '../globalStyle/GlobalStyle';
import themeContext from '../globalStyle/themeContext';
import { COLOR_BLACK, COLOR_DARK_WHITE } from '../globalStyle/color';

/**
 * 뒤로가기가 있는 header
 * @param {string} text
 * @param {Function} backFun
 * @returns 
 */
const HeaderBack = ({text, backFun}) => {
  const isDark = useContext(themeContext).theme === 'dark'

	const textColor = isDark?COLOR_DARK_WHITE:COLOR_BLACK

  return (
    <View style={[GlobalStyle.header, {width:'100%'}]}>
    <Pressable
    onPress={backFun}>
      <Feather name="chevron-left" size={36} color={textColor} />
    </Pressable>
    <Text style={[GlobalStyle.font_caption1, ModeColorStyle(isDark).font_DEFALUT]}>{text}</Text>
    <Feather name="chevron-left" size={36} color="rgba(0,0,0,0)" />
  </View>
  );
}

const styles = StyleSheet.create({})

export default HeaderBack;
