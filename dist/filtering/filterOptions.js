"use strict";
/**
 * Interface representing the options for filtering license plates.
 * Each filter option defines the criteria for recognizing specific types of license plates.
 *
 * @param {number} minLength - The minimum length of the string.
 * @param {number} maxLength - The maximum length of the string.
 * @param {RegExp} pattern - The regular expression pattern used to match the string.
 * @param {string} [country] - (Optional) The country associated with the filter option.
 *                             This can be used to distinguish between different types of license plates from different countries.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL = exports.DK = void 0;
// Specific RegEx for Danish/Norweigan Plates
// 2 Letters Followed by 5 Numbers
var DK_NO = {
    minLength: 7,
    maxLength: 7,
    pattern: /[A-Z]{2}\d{5}/,
    name: ' Danish_Norweigan',
};
// Regular expression for matching strings with at least two uppercase letters and atleast two digits
var generalPlate = {
    minLength: 5,
    maxLength: 8,
    pattern: /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9]).{4,}$/,
    name: 'General',
};
/**
 * Array of 1 filter options for Danish/Norweigan license plates.
 */
exports.DK = DK_NO;
/**
 * Array of 1 filter for a more generalised license plate description.
 * Regular expression for matching strings with at least two uppercase letters and atleast two digits
 */
exports.GENERAL = generalPlate;
