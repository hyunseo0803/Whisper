import { Pressable, View, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import GlobalStyle from "../../globalStyle/GlobalStyle";

function Header(props) {

  // 숫자로 되어있는 월을 영어로 바꿔주는 함수
  const changeMonth = (NMonth) => {
    const EMonth = [
      'January',
      'Fabruary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    return EMonth[NMonth-1]
  }

  return(
    <View style={S.headerContainer}>
      <Pressable onPress={props.movePrevMonth.bind(this, props.month)}>
        <Ionicons name="chevron-back" size={32} color='black' />
      </Pressable>

      <View style={S.dateContainer}>
        <Text style={GlobalStyle.font_body}>{props.year}</Text>
        <Text style={GlobalStyle.font_title1}>
          {changeMonth(props.month)}
        </Text>
      </View>

      <Pressable onPress={props.moveNextMonth.bind(this, props.month)}>
        <Ionicons name="chevron-forward" size={32} color='black' />
      </Pressable>
    </View>
  )
}

export default Header;

const S = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'

    // marginTop: 40
  },
  
  dateContainer:{
    alignItems: 'center',
  },
})