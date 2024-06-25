import {OCRFrame, TextBlock} from '../../src/module-types/index'
import {
  filterWithMultipleOptions,
  findBlockWithHighestX,
} from '../../src/filtering/filterService';
import {
  GENERAL,
  DK,
} from '../../src/filtering/filterOptions';

describe('filterWithMultipleOptions function', () => {
    const mockOCRFrame: OCRFrame = {
        result: {
            text: '', // This should be an empty string or actual text, depending on your test case
            blocks: [
                { // Danish Number Plate
                    text: 'AF12712',
                    lines: [
                        { text: 'AF12', elements: [], recognizedLanguages: [], cornerPoints: [] },
                        { text: '712', elements: [], recognizedLanguages: [], cornerPoints: [] }

                    ],
                    recognizedLanguages: [],
                    cornerPoints: [],
                },
                { // Block 2: Polish Number Plate: Spaces
                    text: 'OKR 9H51',
                    lines: [
                        { text: 'OKR 9H51', elements: [], recognizedLanguages: [], cornerPoints: [] }
                    ],
                    recognizedLanguages: [],
                    cornerPoints: [],
                },
                { // Block 3: Netherland License Plate
                    text: 'NL-01-AB',
                    lines: [
                        { text: 'NL-01-AB', elements: [], recognizedLanguages: [], cornerPoints: [] }
                    ],
                    recognizedLanguages: [],
                    cornerPoints: [],
                },
                { // Non-License Plate text
                    text: 'METROPARK APS',
                    lines: [
                        { text: 'METROPARK APS', elements: [], recognizedLanguages: [], cornerPoints: [] }
                    ],
                    recognizedLanguages: [],
                    cornerPoints: [],
                },
            ],
        },
    };
      
  it('should return filtered blocks with the scandinavian collection filter, one motorcycle licenseplate.', () => {
    // In this case use the line created for the Norwegian / Danish Filter
    const filteredBlocks = filterWithMultipleOptions(
      mockOCRFrame,
      DK,
    );
    expect(filteredBlocks).toHaveLength(1); // Only the danish plate should go through
  });

  it('should return filtered blocks with the general filter, three different licenseplates', () => {
    const filteredBlocks = filterWithMultipleOptions(
      mockOCRFrame,
      GENERAL,
    );
    expect(filteredBlocks).toHaveLength(3); // The Danish, polish and Netherland Plates should go through, and ignore any non license plates
  });

});



describe('findBlockWithHighestX function', () => {
  it('should return the block with the highest x value', () => {
    const blocks: TextBlock[] = [
      {
        text: '',
        lines: [],
        recognizedLanguages: [],
        frame: { x: 10, y: 20, width: 100, height: 50, boundingCenterX: 10,boundingCenterY: 20 }, // Update with frame data
      },
      {
        text: '',
        lines: [],
        recognizedLanguages: [],
        frame: { x: 50, y: 60, width: 120, height: 40, boundingCenterX: 80,boundingCenterY: 60 }, // Update with frame data
      },
    ];
    const highestXBlock = findBlockWithHighestX(blocks);
    expect(highestXBlock).toEqual(blocks[1]); // Second block has the highest x value
  });

  it('should return null if the input array is empty', () => {
    const blocks: TextBlock[] = [];
    const highestXBlock = findBlockWithHighestX(blocks);
    expect(highestXBlock).toBeNull(); // No blocks to find the highest x value
  });
});

  it('should return null if the input array is empty', () => {
    const blocks: TextBlock[] = [];
    const highestXBlock = findBlockWithHighestX(blocks);
    expect(highestXBlock).toBeNull(); // No blocks to find the highest x value
  });

