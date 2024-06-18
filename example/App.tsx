/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {View, Text, LayoutChangeEvent} from 'react-native';
import {
  useFrameProcessor,
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';

import {scanOCR} from '@ismaelmoreiraa/vision-camera-ocr';
import { ALPRCamera } from '../src/camera/ALPRCamera';

export default function App() {

  const device = useCameraDevice('back');
  console.log('🚀 ~ App ~ device:', device);
  const format = useCameraFormat(device, [
    {videoResolution: 'max'},
    {photoResolution: 'max'},
  ]);


  return (
    <>
    <ALPRCamera/>
    </>
  ) 
}