import { POSTRequest } from "../../src/api/POSTRequest";

const requestData1: POSTRequest = {
    licensePlate: 'ABC123',
    PAC: 'somePAC',
  };
  
  const requestData2: POSTRequest = {
    licensePlate: 'XYZ456',
    PAC: 'anotherPAC',
    timeStamp: 1648449124000, // Custom timeStamp provided
  };
  