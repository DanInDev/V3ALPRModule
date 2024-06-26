import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Camera, runAsync, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';

import { OCRFrame, scanOCR } from "@ismaelmoreiraa/vision-camera-ocr"
import { Worklets } from 'react-native-worklets-core';
import { applyFilterFunctions } from '../filtering/filterService';
import { callLimiter } from '../api/callLimiter';
import { ALPRCameraProps } from './ALPRCameraProps';
import { DefaultPermissionPage } from '../pages/defaultPermissionPage';
import { DefaultNoCameraDeviceError } from '../pages/noCameraDeviceError';

import RNFS from 'react-native-fs';

/**
 * ALPRCamera component is a camera component that integrates with an Automatic License Plate Recognition (ALPR) system.
 * It allows capturing pictures, recognizing license plates, and applying filters to the OCR frames.
 *
 * @component
 * @example
 * ```tsx
 * <ALPRCamera
 *   isActive={true}
 *   OnPlateRecognized={handlePlateRecognized}
 *   OnCallLimitReached={handleCallLimitReached}
 *   OnPictureTaken={handlePictureTaken}
 *   callLimit={5}
 *   filterOption="DK"
 *   cameraStyle={styles.camera}
 *   PermissionPage={PermissionPage}
 *   NoCameraDevicePage={NoCameraDevicePage}
 *   takePictureButtonStyle={styles.takePictureButton}
 *   takePictureButtonTextStyle={styles.takePictureButtonText}
 *   takePictureButtonText="Take Picture"
 *   torch="off"
 * >
 *   {children}
 * </ALPRCamera>
 * ```
 *
 * @param {object} props - The component props.
 * @param {boolean} [props.isActive=true] - Determines if the camera is active.
 * @param {function} props.OnPlateRecognized - Callback function when a license plate is recognized.
 * @param {function} props.OnCallLimitReached - Callback function when the call limit is reached.
 * @param {function} props.OnPictureTaken - Callback function when a picture is taken.
 * @param {number} [props.callLimit] - The call limit for recognizing license plates.
 * @param {string} [props.filterOption="DK"] - The filter option for OCR frames.
 * @param {object} [props.cameraStyle] - The style object for the camera component.
 * @param {React.Component} [props.PermissionPage] - The component to render when camera permission is not granted.
 * @param {React.Component} [props.NoCameraDevicePage] - The component to render when no camera device is found.
 * @param {object} [props.takePictureButtonStyle] - The style object for the take picture button.
 * @param {object} [props.takePictureButtonTextStyle] - The style object for the take picture button text.
 * @param {string} [props.takePictureButtonText] - The text to display on the take picture button.
 * @param {string} [props.torch="off"] - The torch mode for the camera.
 * @param {React.Component} [props.children] - The child components to render.
 * @returns {React.Component} The ALPRCamera component.
 * see {@link ALPRCameraProps} for more details.
  */
 
export const ALPRCamera: React.FC<ALPRCameraProps> = ({
  isActive = true,
  OnPlateRecognized,
  OnCallLimitReached,
  OnPictureTaken,
  callLimit,
  filterOption = 'DK',
  cameraStyle,
  PermissionPage,
  NoCameraDevicePage,
  takePictureButtonStyle,
  takePictureButtonTextStyle,
  takePictureButtonText, 
  torch = "off",
  children,
}: ALPRCameraProps) => {

  // Hook to check if the app has camera permissions
  const { hasPermission } = useCameraPermission();

  // Hook for camera device
  const device = useCameraDevice('back');

  // Camera reference, required for taking pictures
  const camera = useRef<Camera>(null);

  const currentFilterRef = useRef<string>(filterOption);

  const [currentFilter, setCurrentFilter] = useState<string>(filterOption);

  console.log ('First filter is: ', currentFilter)
  
  useEffect(() => {
    currentFilterRef.current = filterOption;
    setCurrentFilter(filterOption);
    console.log ('Filter changed to: ', currentFilter)
  }, [filterOption]);

  const findPlatesAndVerify = Worklets.createRunOnJS((ocrFrame: OCRFrame) => {
    const ocrResult = applyFilterFunctions(ocrFrame, currentFilterRef.current);

    if (OnPlateRecognized) {
      OnPlateRecognized(ocrResult);
    }

    if (ocrResult !== null) {
      callLimiter(ocrResult, callLimit || 0, (result: string | null) => {
        if (result !== null) {
          console.log(`APILimiter[${callLimit || 0}] has recognized: ${ocrResult}\n`);
          if (OnCallLimitReached) {
            OnCallLimitReached(result);
          }
        }
      });
    }
  });


  // Takes a picture utilzing the camera, and returns a blob with a callback and deletes the file
  const takePicture = async (): Promise<Blob | null> => {
    if (camera.current !== null) {
      const file = await camera.current.takePhoto({ enableShutterSound: false });
      const result = await fetch(`file://${file.path}`);
      const data = await result.blob();

      // Call the callback function with the blob
      if (OnPictureTaken) {
        OnPictureTaken(data);
      }

      // Delete the file after the blob is processed
      try {
        await RNFS.unlink(file.path);
        console.log('File deleted successfully');
      } catch (error) {
        console.error('Failed to delete file', error);
      }

      return data;
    }
    console.log('Camera not found');
    return null;
  };

  /**
   * Platform specific configuration for frame processors, since iOS and Android have different worklet implementations
   * And using async functions in worklets causes memory leaks on IOS.
   */

  const frameProcessorIOS = useFrameProcessor((frame) => {
    'worklet'

    const ocrFrame = scanOCR(frame);

    findPlatesAndVerify(ocrFrame);
  }, [])
  
  const frameProcessorAndroid = useFrameProcessor((frame) => {
    'worklet'
    const ocrFrame = scanOCR(frame);

    runAsync(frame, () => {
      'worklet'
      findPlatesAndVerify(ocrFrame);
    })
  }, [])

  const frameProcessor = Platform.OS === 'ios' ? frameProcessorIOS : frameProcessorAndroid;

  
  // Conditional rendering after all hooks are defined
  if (!hasPermission) {
    return PermissionPage || <DefaultPermissionPage />;
  }

  if (device == null) {
    return NoCameraDevicePage || <DefaultNoCameraDeviceError />;
  }


  return (
    <View style={cameraStyle || { flex: 1 }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        frameProcessor={frameProcessor}
        photo={true}
        video={true}
        enableZoomGesture={true}
        torch={torch}
        resizeMode='cover'
      />
      {children}
      {takePictureButtonStyle || takePictureButtonText ? (
        <TouchableOpacity onPress={takePicture} style={takePictureButtonStyle}>
          {takePictureButtonText ? (
            <Text style={takePictureButtonTextStyle}>{takePictureButtonText}</Text>
          ) : null}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ALPRCamera;
