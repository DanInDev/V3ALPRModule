import { ParkingAreaPosition, PhonePosition, ParkingArea } from "./locationInterfaces";

// Function to convert degrees to radians
// (Export for tests only)
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Function to calculate the distance between two positions using the Haversine formula
// (Export for tests only)
export function calculateDistance(
  position1: PhonePosition,
  position2: ParkingAreaPosition,
): number {
  
  // Radius of the Earth in kilometers
  const earthRadiusKm = 6371;

  // Convert latitude and longitude coordinates from degrees to radians
  const lat1Rad = degreesToRadians(position1.coords.latitude);
  const lat2Rad = degreesToRadians(position2.latitude);
  const deltaLatRad = degreesToRadians(position2.latitude - position1.coords.latitude);
  const deltaLonRad = degreesToRadians(
    position2.longitude - position1.coords.longitude,
  );

  // Haversine formula to calculate distance
  const a =
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLonRad / 2) *
      Math.sin(deltaLonRad / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = earthRadiusKm * c;

  return distance;
}

// Function to find the 5 closest positions to currentLocation
export function findClosestPA(
  currentLocation: PhonePosition,
  positions: ParkingAreaPosition[],
  length: number
): { ParkingArea: ParkingArea; distance: string }[] {

  // Calculate distances from currentLocation to all positions
  const distances: { ParkingArea: ParkingArea; distance: string }[] = positions.map(
    position => ({
      ParkingArea: position.ParkingArea,
      distance: calculateDistance(currentLocation, position).toFixed(2) + " km",
    }),
  );

  // Sort distances array by distance in ascending order
  distances.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

  // Return the 5 closest positions
  return distances.slice(0, length);
}
