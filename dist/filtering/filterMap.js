"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFilterFromMap = exports.addFilterToMap = exports.filterMap = void 0;
var filterOptions_1 = require("./filterOptions");
/**
 * Map to store filter options arrays with their respective names as keys.
 * @param Key: String, the filter name
 * @param Value: Single or Array of filter options
 */
exports.filterMap = new Map();
// Add default filter functions to the map
exports.filterMap.set('DK', filterOptions_1.DK);
exports.filterMap.set('GENERAL', filterOptions_1.GENERAL);
/**
 * Adds a new filter function to the map.
 *
 * @param filterName The name and key of the filter.
 * @param filterOptions The filter options to add.
 */
function addFilterToMap(filterName, filterOptions) {
    try {
        exports.filterMap.set(filterName, filterOptions);
        console.log('Added filter to map: ', filterName, filterOptions);
    }
    catch (error) {
        console.error('Error adding filter to map: ', error);
    }
}
exports.addFilterToMap = addFilterToMap;
/**
 * Removes a filter function from the map from a key.
 *
 * @param filterName The name and key of the filter.
 */
function removeFilterFromMap(filterName) {
    try {
        exports.filterMap.delete(filterName);
        console.log('Removing filter from map: ', filterName);
    }
    catch (error) {
        console.error('Error removing filter from map: ', error);
    }
}
exports.removeFilterFromMap = removeFilterFromMap;
