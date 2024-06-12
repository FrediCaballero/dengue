import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';

import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from '../helpers/tensor-helper';
import { cropPicture } from '../helpers/image-helper';

const RESULT_MAPPING = ['NS1 Positivo', 'NS1 Negativo', 'NS1 Nulo'];

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [presentedResult, setPresentedResult] = useState('');
  const [permission, requestPermission] = useCameraPermissions();

  const handleImageCapture = async () => {
    setIsProcessing(true);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ 
        base64: true
      });
      processImagePrediction(photo);
    }
  };

  const processImagePrediction = async (base64Image) => {
    const croppedData = await cropPicture(base64Image, 300);
    const model = await getModel();
    const tensor = await convertBase64ToTensor(croppedData.base64);
    const prediction = await startPrediction(model, tensor);

    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction)
    );
    console.log('Highest prediction index:', highestPrediction);
    setPresentedResult(RESULT_MAPPING[highestPrediction]);

    // Wait for 5 seconds before clearing the result and stopping processing
    setTimeout(() => {
      setPresentedResult('');
      setIsProcessing(false);
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleImageCapture}>
            <MaterialIcons name="camera-alt" size={34} color="black" />
          </TouchableOpacity>
        </View>
      </CameraView>
      <Modal visible={isProcessing} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>Resultado actual:  {presentedResult}</Text>
            {presentedResult === '' && <ActivityIndicator size="large" />}
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={() => {
                setPresentedResult('');
                setIsProcessing(false);
              }}>
              <Text>Descartar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  dismissButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});
