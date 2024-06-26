import { handleResponse } from '../../src/api/responseHandler';

// Test case: Valid expiration time in a few years and warning minutes
const AF12712 = {
  hasPermission: true,
  expirationTime: '2029-03-21T23:30:00',
  warningMinutes: '1',
};

test('Valid expiration time and warning minutes', () => {
  expect(handleResponse(AF12712)).toEqual(expect.arrayContaining([true, false]));
});

// Test case: No expiration time or warning minutes
const NK12454 = {
  hasPermission: true,
};

test('Valid: No expiration time or warning minutes', () => {
  expect(handleResponse(NK12454)).toEqual(expect.arrayContaining([true, false]));
});

// Test case: Permission is false 
const permissionFalse = {
  hasPermission: false,
};

test('API response has Permission: False', () => {
  expect(handleResponse(permissionFalse)).toEqual(expect.arrayContaining([false,false]));
});

// Test case: Response is null
const permissionNull = null;
  
test('API response is null, Permission Denied', () => {
    expect(handleResponse(permissionNull)).toEqual(expect.arrayContaining([false,false]));
  });


// Test case: Valid expiration time and warning minutes
const AA12345 = {
    hasPermission: true,
    expirationTime: new Date(Date.now() + 3 * 60 * 1000).toISOString(), // Current time + 3 minutes
    warningMinutes: '5',
  };
  
  test('Valid expiration time and within warning minutes', () => {
    const [hasPermission, isWithinWarning] = handleResponse(AA12345);
    expect(hasPermission).toBe(true); // Expecting permission to be true
    expect(isWithinWarning).toBe(true); // Expecting isWithinWarning to be true
  });
