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
export interface FilterOptions {
    /**
     * The minimum length of the string.
     */
    minLength: number;
    /**
     * The maximum length of the string.
     */
    maxLength: number;
    /**
     * The regular expression pattern used to match the string.
     */
    pattern: RegExp;
    /**
     * (Optional) The country associated with the filter option.
     * This can be used to distinguish between different types of license plates from different countries.
     */
    name?: string;
}
/**
 * Array of 1 filter options for Danish/Norweigan license plates.
 */
export declare const DK: FilterOptions;
/**
 * Array of 1 filter for a more generalised license plate description.
 * Regular expression for matching strings with at least two uppercase letters and atleast two digits
 */
export declare const GENERAL: FilterOptions;
