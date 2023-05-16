import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Modal, Animated, TouchableWithoutFeedback, Dimensions, PanResponder, Image, useColorScheme } from 'react-native';
import LogoBlack from '../../../assets/images/Logo-black.png'
import LogoRed from '../../../assets/images/logo.png'
import { COLOR_DARK_FOURTH, COLOR_WHITE } from '../../globalStyle/color';
import GlobalStyle from '../../globalStyle/GlobalStyle';
import ModeColorStyle from '../../globalStyle/ModeColorStyle';
import {changeMonth} from '../../util/Calender'

function DailyPhotoScreen(props) {
  const isDark = useColorScheme() === 'dark'

    const { showPhotoModal, setShowPhotoModal } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    /**
     * 시트 열리는 애니메이션
     */
    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    /**
     * 시트 닫는 애니메이션 함수
     */
    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    /**
     * 드래그 이벤트 받는 함수
     */
    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.showPhotoModal) {
            resetBottomSheet.start();
        }
    }, [props.showPhotoModal]);

    /**
     * 모달창 닫는 함수
     * @result setShowPhotoModal(false)
     */
    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setShowPhotoModal(false);
        })
    }

    return (
        <Modal
            visible={showPhotoModal}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={[styles.background]}/>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[{...styles.modalContainer, transform: [{ translateY: translateY }]}, {backgroundColor:isDark?COLOR_DARK_FOURTH:COLOR_WHITE}]}
                    {...panResponders.panHandlers}
                >
                  <View style={modalS.topWrap}>
                    {
                      isDark?
                      <Image source={LogoRed} style={[modalS.logo, {resizeMode:'contain'}]}></Image>
                      :
                      <Image source={LogoBlack} style={[modalS.logo, {resizeMode:'contain'}]}></Image>
                    }
                    <Text style={[modalS.yearText, GlobalStyle.font_body, ModeColorStyle(isDark).font_DEFALUT]}>{props.year}</Text>
                  </View>

                  <View style={modalS.DateWrap}>
                    <Text style={[modalS.dateMonth, GlobalStyle.font_title2, ModeColorStyle(isDark).font_DEFALUT]}>{changeMonth(props.month)}</Text>
                    <Text style={[modalS.dateDay, GlobalStyle.font_title1, ModeColorStyle(isDark).font_DEFALUT]}>{props.day}</Text>
                  </View>

                  <View style={modalS.ImgWrap}>
                    <Image source={{url : props.modalImg}}
                    style={[modalS.ImgStyle, {width:'100%', height:'100%', resizeMode:'cover'}]}/>
                  </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1,
    },


    modalContainer: {
      display: 'flex',
      height: Dimensions.get("screen").height-50,
      justifyContent: "flex-start",
      alignItems: "center",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      paddingHorizontal: 20,
    }
})

/**
 * 모달 안쪽 엘리먼트들 스타일링
 */
const modalS = StyleSheet.create({
  topWrap: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 20,
    marginTop: 20
  },
  logo:{
    width: 60,
    height: 22,
    resizeMode: 'stretch',
  },

  DateWrap:{
    width: '100%',
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 33
  },
  dateMonth:{
    marginBottom: 6
  },  

  ImgWrap:{
    width: 350,
    height: 450,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  ImgStyle:{
    borderRadius: 20,
  }
})

export default DailyPhotoScreen;