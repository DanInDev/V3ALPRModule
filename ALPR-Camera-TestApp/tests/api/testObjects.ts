
import { apiResponse } from "../../src/api/responseHandler";

// Define the test objects with explicit types

  
  // This object can be called directly and works as intended
  export const AF12712: apiResponse = {
    hasPermission: true,
    expirationTime: new Date(Date.now() + 3 * 60 * 1000).toISOString(), // Current time + 3 minutes
    warningMinutes: '5',
  }
  
  export const testObjectsMap = new Map<string, apiResponse>([
    ["NK12454", { hasPermission: true }],
  
    ["EKY055", { hasPermission: false }],
  
    ["AF12712", {
      hasPermission: true,
      expirationTime: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
      warningMinutes: '5',
    }],
  ]);
