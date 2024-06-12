import * as tf from '@tensorflow/tfjs';
import { fetch } from '@tensorflow/tfjs-react-native';
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native';

import {Base64Binary} from '../utils/utils';
const BITMAP_DIMENSION = 224;

// 0: channel from JPEG-encoded image
// 1: gray scale
// 3: RGB image
const TENSORFLOW_CHANNEL = 3;

const modelUrl = 'https://teachablemachine.withgoogle.com/models/hDz6bZ1Oj/model.json';

export const getModel = async () => {
  try {
    await tf.ready();
    const model = await tf.loadLayersModel(modelUrl, { fetchFunc: fetch });
    return model;
  } catch (error) {
    console.log('Could not load model', error);
  }
};

export const convertBase64ToTensor = async (base64) => {
  try {
    const uIntArray = Base64Binary.decode(base64);
    // decode a JPEG-encoded image to a 3D Tensor of dtype
    const decodedImage = decodeJpeg(uIntArray, 3);
    // reshape Tensor into a 4D array
    return decodedImage.reshape([
      1,
      BITMAP_DIMENSION,
      BITMAP_DIMENSION,
      TENSORFLOW_CHANNEL,
    ]);
  } catch (error) {
    console.log('Could not convert base64 string to tesor', error);
  }
};

export const startPrediction = async (model, tensor) => {
  try {
    console.log('Input tensor shape:', tensor.shape); // Verifica la forma del tensor de entrada
    const output = await model.predict(tensor);
    console.log('Output shape:', output.shape); // Verifica la forma del tensor de salida
    return output.dataSync();
  } catch (error) {
    console.log('Error predicting from tensor image', error);
  }
};