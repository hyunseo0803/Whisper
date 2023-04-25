import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { AutoFocus, Camera, CameraType } from 'expo-camera';


const WriteCamera = ({navigation}) => {
    
  const cameraRef = useRef(null); // 카메라 제어
  const [cameraType, setCameraType] = useState(CameraType.back); // 카메라 전/후면 제어
  const [zoomLevel,setZoomLevel] = useState(0); // 확대 축소 제어

  return (
    <View>
      <Camera
        ref={cameraRef}
        type={cameraType}
        zoom={zoomLevel}
        autoFocus={AutoFocus.on}  // 초점 활성화
        // whiteBalance={toggleWhiteBalance}
      />
    </View>
  );
}

const styles = StyleSheet.create({})

export default WriteCamera;
