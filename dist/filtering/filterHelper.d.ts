import { TextBlock } from '@ismaelmoreiraa/vision-camera-ocr';
import { FilterOptions } from './filterOptions';
/**
 * Converts a TextBlock object into a single string by concatenating all its lines.
 *
 * @param {TextBlock} result - The TextBlock object to convert.
 * @returns {string} - The concatenated string representation of the TextBlock.
 */
export declare const BlockToString: (result: TextBlock) => string;
/**
* Sanitizes a TextBlock by removing spaces, symbols, and newline characters from its text.
*
* @param {TextBlock} textblock - The TextBlock to sanitize.
* @returns {string} - The sanitized text.
*/
export declare const sanitizeTextBlock: (textblock: TextBlock) => string;
/**
* Sanitizes a string by removing spaces, symbols, and newline characters.
*
* @param {string} input - The input string to sanitize.
* @returns {string} - The sanitized string.
*/
export declare const sanitizeString: (input: string) => string;
/**
* Checks if a TextBlock meets the criteria specified in the FilterOptions.
*
* @param {TextBlock} block - The TextBlock to check.
* @param {FilterOptions} options - The filter options specifying criteria.
* @returns {boolean} - True if the TextBlock meets the criteria, otherwise false.
*/
export declare const isWithinFilterOption: (block: TextBlock, options: FilterOptions) => boolean;
