"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWithinFilterOption = exports.sanitizeString = exports.sanitizeTextBlock = exports.BlockToString = void 0;
/*

      Defines helper functions for text processing and filtering.

*/ //glpat-mzkqAktZm6wZsbArACc6
/**
 * Converts a TextBlock object into a single string by concatenating all its lines.
 *
 * @param {TextBlock} result - The TextBlock object to convert.
 * @returns {string} - The concatenated string representation of the TextBlock.
 */
var BlockToString = function (result) {
    var linesText = result.lines.map(function (line) { return line.text; }).join('');
    return linesText;
};
exports.BlockToString = BlockToString;
/**
* Sanitizes a TextBlock by removing spaces, symbols, and newline characters from its text.
*
* @param {TextBlock} textblock - The TextBlock to sanitize.
* @returns {string} - The sanitized text.
*/
var sanitizeTextBlock = function (textblock) {
    var blockText = textblock.lines.map(function (line) { return line.text; }).join('');
    // Remove spaces, symbols, and newline characters from the text
    var sanitizedText = (0, exports.sanitizeString)(blockText);
    return sanitizedText;
};
exports.sanitizeTextBlock = sanitizeTextBlock;
/**
* Sanitizes a string by removing spaces, symbols, and newline characters.
*
* @param {string} input - The input string to sanitize.
* @returns {string} - The sanitized string.
*/
var sanitizeString = function (input) {
    return input.replace(/[\s\n.,\/#!$%\^&\*;:{}=`~()|[\]\-?"\\]/g, '');
};
exports.sanitizeString = sanitizeString;
/**
* Checks if a TextBlock meets the criteria specified in the FilterOptions.
*
* @param {TextBlock} block - The TextBlock to check.
* @param {FilterOptions} options - The filter options specifying criteria.
* @returns {boolean} - True if the TextBlock meets the criteria, otherwise false.
*/
var isWithinFilterOption = function (block, options) {
    var sanitizedText = (0, exports.sanitizeTextBlock)(block);
    var minLength = options.minLength, maxLength = options.maxLength, pattern = options.pattern;
    // Check if the text matches the regex and is within the specified character length range
    return (sanitizedText.length >= minLength &&
        sanitizedText.length <= maxLength &&
        pattern.test(sanitizedText));
};
exports.isWithinFilterOption = isWithinFilterOption;
