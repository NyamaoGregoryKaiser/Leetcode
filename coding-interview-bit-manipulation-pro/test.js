const { reverseBits, countSetBits, findSingleNonRepeating, isPowerOfTwo, swapNumbers } = require('./bitManipulation');

const testCasesReverseBits = [
  { input: 43261596, output: 964176192 },
  { input: 0, output: 0 },
  { input: 1, output: 2147483648 }
];

const testCasesCountSetBits = [
  { input: 11, output: 3 },
  { input: 0, output: 0 },
  { input: 15, output: 4}
]

const testCasesFindSingle = [
  { input: [2,2,1], output: 1 },
  { input: [4,1,2,1,2], output: 4},
  { input: [1], output: 1}
]


const testCasesIsPowerOfTwo = [
  { input: 16, output: true },
  { input: 15, output: false },
  { input: 1, output: true }
]

const testCasesSwap = [
  { input: [10,5], output: [5,10] },
  { input: [0,1], output: [1,0] },
  { input: [100, 200], output: [200, 100]}
]

describe('Bit Manipulation', () => {
  describe('reverseBits', () => {
    testCasesReverseBits.forEach(({ input, output }) => {
      it(`should reverse bits of ${input} to ${output}`, () => {
        expect(reverseBits(input)).toBe(output);
      });
    });
  });

  describe('countSetBits', () => {
    testCasesCountSetBits.forEach(({ input, output }) => {
      it(`should count set bits of ${input} as ${output}`, () => {
        expect(countSetBits(input)).toBe(output);
      });
    });
  });

  describe('findSingleNonRepeating', () => {
    testCasesFindSingle.forEach(({ input, output }) => {
      it(`should find single non repeating element in ${input} as ${output}`, () => {
        expect(findSingleNonRepeating(input)).toBe(output);
      });
    });
  });

  describe('isPowerOfTwo', () => {
    testCasesIsPowerOfTwo.forEach(({ input, output }) => {
      it(`should check if ${input} is power of 2 as ${output}`, () => {
        expect(isPowerOfTwo(input)).toBe(output);
      });
    });
  });

  describe('swapNumbers', () => {
    testCasesSwap.forEach(({ input, output }) => {
      it(`should swap ${input} to ${output}`, () => {
        expect(swapNumbers(input[0],input[1])).toEqual(output);
      });
    });
  });
});