"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilterFunctions = void 0;
var filterHelper_1 = require("./filterHelper");
var filterMap_1 = require("./filterMap");
/*

      Defines main filter functions for processing OCR frames.

*/
/**
 * Finds the TextBlock with the highest X coordinate in the OCRFrame.
 *
 * @param {TextBlock[]} blocks - The array of TextBlocks to search.
 * @returns {TextBlock | null} - The TextBlock with the highest X coordinate, or null if no blocks are provided.
 *
 * @NOTE Since camera stream is mirrored and flipped, highest X in this case is the point
 *       closest to the bottom of the screen when in portrait mode.
 */
var findBlockWithHighestX = function (blocks) {
    var highestX = 0;
    var blockWithHighestX = null;
    blocks.forEach(function (block) {
        if (block.frame.boundingCenterX > highestX) {
            highestX = block.frame.boundingCenterX;
            blockWithHighestX = block;
        }
    });
    // Return the block with the highest x value
    return blockWithHighestX;
};
/**
 * Filters OCRFrame results with multiple filter options.
 *
 * @param {OCRFrame} result - The OCRFrame to filter. @OCRFrame is the object returned from the vision-camera-ocr library when using SCANOCR(frame)
 * @param {FilterOptions[]} optionsList - The list of filter options to apply.
 * @returns {TextBlock[] | null} - The filtered TextBlocks, or null if no blocks pass any filters.
 */
var filterWithMultipleOptions = function (result, options) {
    var optionsList = Array.isArray(options) ? options : [options];
    // Define the blocks that pass through the filter
    var filteredBlocks = [];
    // Loop through all blocks
    for (var _i = 0, _a = result.result.blocks; _i < _a.length; _i++) {
        var block = _a[_i];
        // Loop through all filter options
        for (var _b = 0, optionsList_1 = optionsList; _b < optionsList_1.length; _b++) {
            var option = optionsList_1[_b];
            if ((0, filterHelper_1.isWithinFilterOption)(block, option)) {
                filteredBlocks.push(block); // Keep the block in the result
                break; // Break the option loop if it is within a filter
            }
        }
    }
    // Check if there are any filtered blocks
    if (filteredBlocks.length > 0) {
        return filteredBlocks;
    }
    else {
        return null;
    }
};
/**
 * Applies the current filter to an OCRFrame, checks if there is multiple license plates,
 * which returns the sanitized license plate closest to the bottom of the screen.
 *
 * @param {OCRFrame} ocrFrame - The OCRFrame to apply the filter to.
 * @param {string} activeFilter - The currently active filter name.
 * @returns {string | null} - The sanitized recognized text, or null if no text is recognized.
 */
function applyFilterFunctions(ocrFrame, activeFilter) {
    // Get the filter function from the map
    var filterAsArray = filterMap_1.filterMap.get(activeFilter);
    if (!filterAsArray) {
        console.error('Filter not found in map: ', activeFilter);
        return null;
    }
    // Iterate through each filter option
    for (var _i = 0, _a = Array.isArray(filterAsArray) ? filterAsArray : [filterAsArray]; _i < _a.length; _i++) {
        var filterName = _a[_i];
        // Extract the name property from the filter options
        var name_1 = filterName.name;
        console.log('Filtering with: ' + name_1);
        // Filter the OCR frame with the specified filter
        var filteredResults = filterWithMultipleOptions(ocrFrame, filterAsArray);
        // Check if there are any filtered results
        if (filteredResults !== null) {
            // Check if there is only one filtered result
            if (filteredResults.length === 1) {
                var recognizedText = filteredResults[0] ? (0, filterHelper_1.BlockToString)(filteredResults[0]) : '';
                return (0, filterHelper_1.sanitizeString)(recognizedText);
            }
            else {
                // If there are multiple filtered results, return the one with the highest X coordinate
                var lowestBlock = findBlockWithHighestX(filteredResults);
                var recognizedText = lowestBlock ? (0, filterHelper_1.BlockToString)(lowestBlock) : '';
                return (0, filterHelper_1.sanitizeString)(recognizedText);
            }
        }
    }
    return null;
}
exports.applyFilterFunctions = applyFilterFunctions;
// Conditional exports for testing
if (process.env.NODE_ENV === 'test') {
    module.exports = {
        applyFilterFunctions: applyFilterFunctions,
        findBlockWithHighestX: findBlockWithHighestX,
        filterWithMultipleOptions: filterWithMultipleOptions,
    };
}
