
  
export interface ParkingArea {
  name: string;
  PAC: string;
} 
export interface ParkingAreaPosition {
  ParkingArea: ParkingArea;
  latitude: number;
  longitude: number;
}
  export interface PhonePosition {
    coords: {
      latitude: number;
      longitude: number;
      altitude: number | null;
      accuracy: number;
      altitudeAccuracy: number | null;
      heading: number | null;
      speed: number | null;
    };
    timestamp: number;
  }
  
  export interface Options {
    timeout?: number;
    maximumAge?: number;
    enableHighAccuracy?: boolean;
  }