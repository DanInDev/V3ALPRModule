import { OCRFrame } from '@ismaelmoreiraa/vision-camera-ocr';
/**
 * Applies the current filter to an OCRFrame, checks if there is multiple license plates,
 * which returns the sanitized license plate closest to the bottom of the screen.
 *
 * @param {OCRFrame} ocrFrame - The OCRFrame to apply the filter to.
 * @param {string} activeFilter - The currently active filter name.
 * @returns {string | null} - The sanitized recognized text, or null if no text is recognized.
 */
export declare function applyFilterFunctions(ocrFrame: OCRFrame, activeFilter: string): string | null;
