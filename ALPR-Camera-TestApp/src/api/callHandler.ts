import { OCRStatus } from '../components/OCRResult';
import { handleResponse, updateStatus } from './responseHandler';
import { testObjectsMap } from '../../tests/api/testObjects';
import { Timestamp } from 'react-native-reanimated/lib/typescript/reanimated2/commonTypes';

interface POSTRequest {
  licensePlate: string,
  PAC: string,
  timestamp?: Timestamp
}

export const callHandler = (licensePlate: string | null, PAC: string | null): OCRStatus => {
  
  console.log (
    '\nCallHandler:\n' +
    ' License plate:' + licensePlate + '\n' +
    ' PAC: ' + PAC
    )
  if (licensePlate !== null && PAC) {
    
    // Retrieve the response from the map
    const response = testObjectsMap.get(licensePlate); 
    
    // Handle the response to get permission and warning status
    const responseStatus = handleResponse(response);

    // Update the OCR status based on permission and warning status
    const status = updateStatus(responseStatus);

    return status;
  }
  console.log('Input text is null or selected location is not available');
  return OCRStatus.Processing;
};
