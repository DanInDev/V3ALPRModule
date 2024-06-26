import { OCRStatus } from "../components/OCRResult";

// Define the apiResponse interface
export interface apiResponse {
  hasPermission: boolean;
  expirationTime?: string;
  warningMinutes?: string;
}

// Function to check if remaining time is within warning minutes
export const isWithinWarningMinutes = (expirationTime: string, warningMinutes?: string): boolean => {
 
  // If warningMinutes is not defined, return false
  if (!warningMinutes) {
    return false;
  }

  // Parse expirationTime string into a Date object
  const expirationDate = new Date(expirationTime);

  // Calculate remaining time in minutes
  const currentTime = new Date();
  const millisecondsDifference = expirationDate.getTime() - currentTime.getTime();
  const remainingTimeMinutes = Math.floor(millisecondsDifference / 60000); // Remaining time in minutes

  // Check if remaining time is within warningMinutes
  return remainingTimeMinutes <= parseInt(warningMinutes);
};

// Handle the response
export const handleResponse = (response: apiResponse | undefined): [boolean, boolean] => {
  try {
    
    if (!response) {
      return [false, false]; // Return false for both values if response is null
    }

    switch (true) {
      case !response.hasPermission:
        return [false, false]; // Return false for both values if permission is denied
      
      case !response.expirationTime:
        return [true, false]; // Return true for hasPermission, but false for isWithinWarning if expirationTime is missing
      
      default:
        // Check if remaining time is within warning minutes
        const isWithinWarning = isWithinWarningMinutes(response.expirationTime, response.warningMinutes);
        return [true, isWithinWarning];
    }
  } catch (error: unknown) {
    console.error('Error handling response:', (error as Error).message);
    return [false, false]; // Return false for both values if there is an error
  }
};

// Define a function to map response handler cases to OCRStatus enum values
export const updateStatus = (response: [boolean, boolean]): OCRStatus => {
  const [permission, warningMinutes] = response;

  if (permission) {
    if (warningMinutes) {
      return OCRStatus.Warning;
    }
    return OCRStatus.Valid;
  }
  return OCRStatus.Invalid;
};
