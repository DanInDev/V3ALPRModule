import { FilterOptions, DK, GENERAL } from "../../src/filtering/filterOptions";
import { filterMap, addFilterToMap, removeFilterFromMap } from '../../src/filtering/filterMap';

// Example of a Swedish filter option
const SWE: FilterOptions = {
    minLength: 6,
    maxLength: 6,
    pattern: /[A-Z]{3}\d{3}/,
    name: 'Swedish',
};

// Example of a licenseplate from Netherlands filter option
const NL: FilterOptions = {
    minLength: 6,
    maxLength: 6,
    pattern: /[A-Z]{2}\d{2}[A-Z]{2}/,
    name: 'Netherlands',
};

// Both DK/NO and SWE are Scandinavian filters
const ScandinavianFilter: FilterOptions[] = [DK,SWE]

// Both DK/NO and SWE are Scandinavian filters
const NetherlandAndGeneral: FilterOptions[] = [NL,GENERAL]

describe('filterMap module', () => {

  beforeEach(() => {
    // Clear filterMap before each test to ensure test isolation
    filterMap.clear();
  });

  test('should add a filter to the map', () => {
    addFilterToMap('ScandinavianFilter', ScandinavianFilter);
    expect(filterMap.has('ScandinavianFilter')).toBe(true);
    expect(filterMap.get('ScandinavianFilter')).toEqual(ScandinavianFilter);
  });

  test('should overwrite an existing filter in the map', () => {
    addFilterToMap('ScandinavianFilter', ScandinavianFilter);
    addFilterToMap('NetherlandsAndGeneral', NetherlandAndGeneral);
    expect(filterMap.get('NetherlandsAndGeneral')).toEqual(NetherlandAndGeneral);
  });

  test('should remove a filter from the map', () => {
    addFilterToMap('ScandinavianFilter', ScandinavianFilter);
    removeFilterFromMap('ScandinavianFilter');
    expect(filterMap.has('ScandinavianFilter')).toBe(false);
  });

  test('should add multiple filters to the map', () => {
    addFilterToMap('ScandinavianFilter', ScandinavianFilter);
    addFilterToMap('NetherlandsAndGeneral', NetherlandAndGeneral);
    expect(filterMap.has('ScandinavianFilter')).toBe(true);
    expect(filterMap.get('ScandinavianFilter')).toEqual(ScandinavianFilter);
    expect(filterMap.has('NetherlandsAndGeneral')).toBe(true);
    expect(filterMap.get('NetherlandsAndGeneral')).toEqual(NetherlandAndGeneral);
  });
});