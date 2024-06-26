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
        { text: '  Hello,,\n', elements: [], recognizedLanguages: [] },
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
