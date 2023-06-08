import React from 'react';
import { Text } from 'react-native';
import GlobalStyle from '../globalStyle/GlobalStyle';
import ModeColorStyle from '../globalStyle/ModeColorStyle';

/**
 * header text 컴포넌트
 * @props {string} headerText 
 */
const HeaderText = (props) => {
  const isDark = props.isDark;
  return (
    <Text
    style={[
      {
        marginBottom:20,
        textAlign: 'center'}, 
      GlobalStyle.font_caption2, 
      ModeColorStyle(isDark).font_DEFALUT,
    ]}
    >
      {props.headerText}
    </Text>
  );
}

export default HeaderText;
