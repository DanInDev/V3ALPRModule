import { PermissionsAndroid } from 'react-native';
import Geolocation from "@react-native-community/geolocation";
import { Options, PhonePosition } from './locationInterfaces';

// Function to request location permission
const askLocationPermission = async (): Promise<boolean> => {
  try {
    // Request permission to access location
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

// Function to get geolocation with specified options
export async function getGeolocation(options?: Options): Promise<PhonePosition> {
  // Check if location permission is granted, if not, request permission
  const permissionGranted = await askLocationPermission();

  if (!permissionGranted) {
    throw new Error('Location permission denied.');
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: PhonePosition) => {
        resolve(position);
      },
      (error: Error) => {
        reject(error);
      },
      options
    );
  });
}

