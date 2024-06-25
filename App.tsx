import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import ALPRCamera from "./src/camera/ALPRCamera";

const App: React.FC = () => {
  const [ocrResult, setOCRResult] = useState<string | null>(null);
  const [callResult, setCallResult] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const handleOCRResultUpdate = (result: string | null) => {
    setOCRResult(result);
  };

  const handleCallResultUpdate = (result: string | null) => {
    setCallResult(result);
  };

  const handleImageTaken = (path: string | null) => {
    setImagePath(path);
  };

  return (
    <>
      <ALPRCamera
        OnPlateRecognized={handleOCRResultUpdate}
        OnCallLimitReached={handleCallResultUpdate}
        callLimit={5}
        takePictureButtonStyle={buttonStyles.button}
        takePictureButtonTextStyle={buttonStyles.buttonText}
      />
      <View> 
        <Text>Current License Plate: {ocrResult}</Text>
        <Text>Last Called Result: {callResult}</Text>
      </View>
    </>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    display: 'none',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    display: 'none',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
