import {
  degreesToRadians,
  calculateDistance,
  findClosestPA,
} from '../../src/location/findClosestPA';

describe('degreesToRadians function', () => {
  it('converts degrees to radians correctly', () => {
    expect(degreesToRadians(90)).toBe(Math.PI / 2);
    expect(degreesToRadians(180)).toBe(Math.PI);
    expect(degreesToRadians(270)).toBe((3 * Math.PI) / 2);
  });
});

describe('calculateDistance function', () => {
  it('calculates distance between two positions correctly', () => {
    const phonePosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
        altitude: null,
        accuracy: 10,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    }; // New York

    const position2 = {
      ParkingArea:{ name: 'Los Angeles', PAC: '1234'},
      latitude: 34.0522,
      longitude: -118.2437,
    }; // Los Angeles

    expect(calculateDistance(phonePosition, position2)).toBeCloseTo(
      3935.7462,
      1,
    ); // Distance should be approximatly
  });
});

describe('findClosestPositions function', () => {
  it('finds the closest positions correctly', () => {
    const phonePosition = {
      coords: {
        latitude: 55.361652,
        longitude: 10.423251,
        altitude: null,
        accuracy: 10,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    }; // SDU Campus Location

    const positions = [
      {// Metropark Office Location
        ParkingArea: { name: 'MetroParkOffice', PAC: '1234'},
        latitude: 55.384604,
        longitude: 10.42357,
      },

      //Locations somewhere Random
      {
        ParkingArea: {name: '2', PAC: '1234'},
        latitude: 40.73061,
        longitude: -73.935242,
      },
      {
        ParkingArea: {name: '3', PAC: '1234'},
        latitude: 34.0522,
        longitude: -80.2437,
      },
      {
        ParkingArea: {name: '4', PAC: '1234'},
        latitude: 8.73061,
        longitude: 30.935242,
      },
      {
        ParkingArea: {name: '5', PAC: '1234'},
        latitude: 39.0522,
        longitude: 17.2437,
      },
      {
        ParkingArea: {name: '6', PAC: '1234'},
        latitude: 25.73061,
        longitude: 15.935242,
      },
    ];
    const closestPositions = findClosestPA(phonePosition, positions,5);
    expect(closestPositions.length).toBe(5); // Closest 5 positions returned
    expect(closestPositions[0].ParkingArea.name).toBe('MetroParkOffice'); // Odense should be
  });
});
