import { BlockToString, sanitizeTextBlock, sanitizeString } from '../../src/filtering/filterHelper';

describe('BlockToString function', () => {
  it('should return concatenated text from all lines in a text block', () => {
    const textBlock = {
      text: '',
      lines: [
        { text: 'Hello,', elements: [], recognizedLanguages: [] },
        { text: 'world!', elements: [], recognizedLanguages: [] },
      ],
      recognizedLanguages: [],
    };
    const result = BlockToString(textBlock);
    expect(result).toBe('Hello,world!');
  });

  it('should return an empty string if the text block has no lines', () => {
    const textBlock = {
      text: '',
      lines: [],
      recognizedLanguages: [],
    };
    const result = BlockToString(textBlock);
    expect(result).toBe('');
  });
});

describe('sanitizeTextBlock function', () => {
  it('should remove spaces, symbols, and newline characters from a text block', () => {
    const textBlock = {
      text: '',
      lines: [
        { text: '  ?"#!*^*Hello,,', elements: [], recognizedLanguages: [] },
        { text: '!world!', elements: [], recognizedLanguages: [] },
      ],
      recognizedLanguages: [],
    };
    const result = sanitizeTextBlock(textBlock);
    expect(result).toBe('Helloworld');
  });

  it('should return an empty string if the text block has no lines', () => {
    const textBlock = {
      text: '',
      lines: [],
      recognizedLanguages: [],
    };
    const result = sanitizeTextBlock(textBlock);
    expect(result).toBe('');
  });
});



/*
  * Sanitizes a string by removing spaces, symbols, and newline characters.
  * 
  * @param {string} input - The input string to sanitize.
  * @returns {string} - The sanitized string.
  
*/
describe('sanitizeString function', () => {
  it('should remove spaces, symbols, and newline characters from a string', () => {
    const input = '  Hello,,\nworld!';
    const result = sanitizeString(input);
    expect(result).toBe('Helloworld');
  });

  it('should return an empty string if the input string is empty', () => {
    const input = '';
    const result = sanitizeString(input);
    expect(result).toBe('');
  });
});

describe('sanitizeString', () => {
  test('should remove spaces', () => {
    expect(sanitizeString('Hello World')).toBe('HelloWorld');
  });

  test('should remove newlines', () => {
    expect(sanitizeString('Hello\nWorld')).toBe('HelloWorld');
  });

  test('should remove periods', () => {
    expect(sanitizeString('Hello.World')).toBe('HelloWorld');
  });

  test('should remove commas', () => {
    expect(sanitizeString('Hello,World')).toBe('HelloWorld');
  });

  test('should remove forward slashes', () => {
    expect(sanitizeString('Hello/World')).toBe('HelloWorld');
  });

  test('should remove backslashes', () => {
    expect(sanitizeString('Hello\\World')).toBe('HelloWorld');
  });

  test('should remove question marks', () => {
    expect(sanitizeString('Hello?World')).toBe('HelloWorld');
  });

  test('should remove double quotes', () => {
    expect(sanitizeString('Hello"World')).toBe('HelloWorld');
  });

  test('should remove multiple special characters', () => {
    expect(sanitizeString('Hello, World! How/are? you?')).toBe('HelloWorldHowareyou');
  });

  test('should handle an empty string', () => {
    expect(sanitizeString('')).toBe('');
  });

  test('should handle a string without special characters', () => {
    expect(sanitizeString('HelloWorld')).toBe('HelloWorld');
  });

  test('should remove all specified special characters', () => {
    const input = 'Hello, \\World! This/is a test: with? multiple.characters and symbols~';
    const expected = 'HelloWorldThisisatestwithmultiplecharactersandsymbols';
    expect(sanitizeString(input)).toBe(expected);
  });
});