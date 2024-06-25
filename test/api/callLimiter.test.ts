import { callLimiter } from '../../src/api/callLimiter';

describe('callLimiter', () => {
  let callback: jest.Mock;
  const counter = 3;

  beforeEach(() => {
    callback = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // One read should not trigger the callback
  test('should initialize the counter and not call the callback', () => {
    callLimiter('testString', counter, callback);
    expect(callback).not.toHaveBeenCalled();
  });

    // 3 reads should trigger the callback
  test('should increment the counter and call the callback after reaching the threshold', () => {
    callLimiter('testString', counter, callback);
    callLimiter('testString', counter, callback);
    callLimiter('testString', counter, callback);
    expect(callback).toHaveBeenCalledWith('testString');
  });

  test('should reset the counter after the callback is called', () => {
    callLimiter('testString', counter, callback);
    callLimiter('testString', counter, callback);
    callLimiter('testString', counter, callback);

    // Callback should be called and counter should be reset
    callLimiter('testString', counter, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('testString');
  });


  test('should handle different strings independently', () => {
    callLimiter('string1', counter, callback);
    callLimiter('string2', counter, callback);
    callLimiter('string1', counter, callback);
    callLimiter('string3', counter, callback);
 
    // Check it only triggers the callback for the string that reached the limit
    callLimiter('string4ANDstring1', counter, callback);

    callLimiter('string2', counter, callback);
    callLimiter('string2', counter, callback);

    expect(callback).toHaveBeenCalledWith('string2');
    expect(callback).toHaveBeenCalledTimes(1);
  })

  test('should reset the counter correctly', () => {
    callLimiter('string1', counter, callback);
    callLimiter('string1', counter, callback);
    callLimiter('string1', counter, callback);
    expect(callback).toHaveBeenCalledWith('string1');

    // Counter should be reset, so the next calls should not trigger the callback again immediately
    callLimiter('string1', counter, callback);
    callLimiter('string1', counter, callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
