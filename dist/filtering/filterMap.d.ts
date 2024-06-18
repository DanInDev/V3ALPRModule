import { FilterOptions } from "./filterOptions";
/**
 * Map to store filter options arrays with their respective names as keys.
 * @param Key: String, the filter name
 * @param Value: Single or Array of filter options
 */
export declare const filterMap: Map<string, FilterOptions[] | FilterOptions>;
/**
 * Adds a new filter function to the map.
 *
 * @param filterName The name and key of the filter.
 * @param filterOptions The filter options to add.
 */
export declare function addFilterToMap(filterName: string, filterOptions: FilterOptions[] | FilterOptions): void;
/**
 * Removes a filter function from the map from a key.
 *
 * @param filterName The name and key of the filter.
 */
export declare function removeFilterFromMap(filterName: string): void;
