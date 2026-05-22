```javascript
/**
 * @fileoverview Unit tests for Problem 3: Sort Colors (Dutch National Flag).
 */

const { expect } = require('chai');
const {
  sortColors_twoPass,
  sortColors_onePass,
} = require('../src/problems/problem3_dutchNationalFlag');

const testCases = [
  { nums: [2, 0, 2, 1, 1, 0], expected: [0, 0, 1, 1, 2, 2], description: 'Basic mixed colors' },
  { nums: [2, 0, 1], expected: [0, 1, 2], description: 'Short mixed colors' },
  { nums: [0, 0, 1, 1, 2, 2], expected: [0, 0, 1, 1, 2, 2], description: 'Already sorted' },
  { nums: [2, 2, 1, 1, 0, 0], expected: [0, 0, 1, 1, 2, 2], description: 'Reverse sorted' },
  { nums: [0], expected: [0], description: 'Single 0' },
  { nums: [1], expected: [1], description: 'Single 1' },
  { nums: [2], expected: [2], description: 'Single 2' },
  { nums: [0, 0, 0], expected: [0, 0, 0], description: 'All 0s' },
  { nums: [1, 1, 1], expected: [1, 1, 1], description: 'All 1s' },
  { nums: [2, 2, 2], expected: [2, 2, 2], description: 'All 2s' },
  { nums: [0, 1], expected: [0, 1], description: 'Two colors, 0 and 1' },
  { nums: [1, 0], expected: [0, 1], description: 'Two colors, 1 and 0' },
  { nums: [0, 2], expected: [0, 2], description: 'Two colors, 0 and 2' },
  { nums: [2, 0], expected: [0, 2], description: 'Two colors, 2 and 0' },
  { nums: [1, 2], expected: [1, 2], description: 'Two colors, 1 and 2' },
  { nums: [2, 1], expected: [1, 2], description: 'Two colors, 2 and 1' },
  { nums: [], expected: [], description: 'Empty array' },
];

const errorCases = [
  { nums: [0, 1, 3, 2], error: 'invalid color', description: 'Invalid color value' },
  { nums: null, error: 'Input must be an array.', description: 'Null input' },
  { nums: 'string', error: 'Input must be an array.', description: 'String input' },
];

describe('Sort Colors (Dutch National Flag Problem)', () => {

  const approaches = {
    'Two-Pass Counting Sort (sortColors_twoPass)': sortColors_twoPass,
    'One-Pass Dutch National Flag (sortColors_onePass)': sortColors_onePass,
  };

  Object.keys(approaches).forEach(approachName => {
    const sortColors = approaches[approachName];

    describe(approachName, () => {
      testCases.forEach(({ nums, expected, description }) => {
        it(`should sort colors for ${description}: ${JSON.stringify(nums)} -> ${JSON.stringify(expected)}`, () => {
          const arr = [...nums]; // Work on a copy as the function modifies in-place
          sortColors(arr);
          expect(arr).to.deep.equal(expected);
        });
      });

      errorCases.forEach(({ nums, error, description }) => {
        it(`should throw an error for ${description}`, () => {
          // If the input is not an array, a direct check is performed.
          // If it's an array with invalid colors, the internal loop will catch it.
          const testFunc = () => sortColors(nums === null || typeof nums === 'string' ? nums : [...nums]);
          expect(testFunc).to.throw(error);
        });
      });

      it('should handle a large array of mixed colors', () => {
        const size = 10000;
        const largeArr = [];
        for (let i = 0; i < size; i++) {
          largeArr.push(Math.floor(Math.random() * 3)); // 0, 1, or 2
        }

        const expected = [...largeArr].sort((a, b) => a - b);
        const arrCopy = [...largeArr];

        sortColors(arrCopy);
        expect(arrCopy).to.deep.equal(expected);
      });
    });
  });
});
```