```javascript
const {
    maxSubarraySumSlidingWindow,
    rotateArrayBruteForce,
    rotateArrayExtraSpace,
    rotateArrayReversal,
    rotateArrayCyclicReplacement,
    productExceptSelf,
    productExceptSelfOptimal,
    mergeIntervals,
    mergeIntervalsNoSort // Test for its warning and fallback behavior
} = require('../src/algorithms/arrayManipulation');

describe('Max Subarray Sum of K-sized Subarray (Sliding Window)', () => {
    test('should find the maximum sum for a basic array', () => {
        expect(maxSubarraySumSlidingWindow([2, 1, 5, 1, 3, 2], 3)).toBe(9);
    });

    test('should work with different K values', () => {
        expect(maxSubarraySumSlidingWindow([1, 2, 3, 4, 5], 2)).toBe(9); // [4,5]
        expect(maxSubarraySumSlidingWindow([1, 2, 3, 4, 5], 1)).toBe(5); // [5]
    });

    test('should handle arrays with negative numbers', () => {
        expect(maxSubarraySumSlidingWindow([-2, 1, -3, 4, -1, 2, 1, -5, 4], 3)).toBe(6); // [4, -1, 2]
        expect(maxSubarraySumSlidingWindow([-1, -2, -3, -4], 2)).toBe(-3); // [-1,-2]
    });

    test('should return 0 for an empty array', () => {
        expect(maxSubarraySumSlidingWindow([], 3)).toBe(0);
    });

    test('should return 0 if k is 0', () => {
        expect(maxSubarraySumSlidingWindow([1, 2, 3], 0)).toBe(0);
    });

    test('should handle k equal to array length', () => {
        expect(maxSubarraySumSlidingWindow([10, 20, 10], 3)).toBe(40);
    });

    test('should handle single element array', () => {
        expect(maxSubarraySumSlidingWindow([5], 1)).toBe(5);
    });

    test('should throw or return 0 for k > array length', () => {
        // Depending on implementation, can throw or return 0. Current returns 0.
        expect(maxSubarraySumSlidingWindow([1, 2, 3], 4)).toBe(0);
    });

    test('should work with all identical numbers', () => {
        expect(maxSubarraySumSlidingWindow([7, 7, 7, 7, 7], 2)).toBe(14);
    });
});

describe('Rotate Array', () => {
    const testCases = [
        { name: 'Basic rotation', nums: [1, 2, 3, 4, 5, 6, 7], k: 3, expected: [5, 6, 7, 1, 2, 3, 4] },
        { name: 'Rotate by 1', nums: [1, 2, 3, 4], k: 1, expected: [4, 1, 2, 3] },
        { name: 'Rotate by array length', nums: [1, 2, 3], k: 3, expected: [1, 2, 3] },
        { name: 'Rotate by more than array length', nums: [1, 2, 3, 4, 5], k: 7, expected: [4, 5, 1, 2, 3] },
        { name: 'Single element array', nums: [1], k: 5, expected: [1] },
        { name: 'Empty array', nums: [], k: 3, expected: [] },
        { name: 'Two elements, k=1', nums: [1, 2], k: 1, expected: [2, 1] },
        { name: 'Two elements, k=2', nums: [1, 2], k: 2, expected: [1, 2] },
        { name: 'k=0', nums: [1, 2, 3], k: 0, expected: [1, 2, 3] },
        { name: 'Negative numbers', nums: [-1, -2, -3, -4], k: 2, expected: [-3, -4, -1, -2] },
    ];

    const rotationFunctions = {
        'Brute Force': rotateArrayBruteForce,
        'Extra Space': rotateArrayExtraSpace,
        'Reversal Algorithm': rotateArrayReversal,
        'Cyclic Replacement': rotateArrayCyclicReplacement,
    };

    for (const [funcName, rotateFunc] of Object.entries(rotationFunctions)) {
        describe(`Function: ${funcName}`, () => {
            testCases.forEach(({ name, nums, k, expected }) => {
                test(`${name} - should rotate [${nums}] by ${k} steps to [${expected}]`, () => {
                    // Create a deep copy to ensure original array is not modified by previous tests
                    const testNums = JSON.parse(JSON.stringify(nums));
                    rotateFunc(testNums, k);
                    expect(testNums).toEqual(expected);
                });
            });
        });
    }
});

describe('Product of Array Except Self', () => {
    // Shared test cases for both brute force and optimal
    const commonTestCases = [
        { name: 'Basic array', nums: [1, 2, 3, 4], expected: [24, 12, 8, 6] },
        { name: 'Array with negatives', nums: [-1, 1, 0, -3, 3], expected: [0, 0, 9, 0, 0] },
        { name: 'Array with one zero', nums: [0, 1, 2, 3], expected: [6, 0, 0, 0] },
        { name: 'Array with two zeros', nums: [1, 0, 2, 0], expected: [0, 0, 0, 0] },
        { name: 'Array with negative and zero', nums: [-1, 2, 0, -3], expected: [0, 0, 6, 0] },
        { name: 'Single positive element', nums: [5], expected: [1] },
        { name: 'Single negative element', nums: [-5], expected: [1] },
        { name: 'All ones', nums: [1, 1, 1, 1], expected: [1, 1, 1, 1] },
        { name: 'Mixed numbers', nums: [2, 3, -4, 5], expected: [-60, -40, 30, -24] },
    ];

    describe('Brute Force (productExceptSelf)', () => {
        test('should return empty array for empty input', () => {
            expect(productExceptSelf([])).toEqual([]);
        });
        commonTestCases.forEach(({ name, nums, expected }) => {
            test(`${name}: [${nums}] -> [${expected}]`, () => {
                expect(productExceptSelf(nums)).toEqual(expected);
            });
        });
    });

    describe('Optimal (productExceptSelfOptimal)', () => {
        test('should return empty array for empty input', () => {
            expect(productExceptSelfOptimal([])).toEqual([]);
        });
        commonTestCases.forEach(({ name, nums, expected }) => {
            test(`${name}: [${nums}] -> [${expected}]`, () => {
                expect(productExceptSelfOptimal(nums)).toEqual(expected);
            });
        });
    });
});

describe('Merge Overlapping Intervals', () => {
    test('should merge basic overlapping intervals', () => {
        const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
        const expected = [[1, 6], [8, 10], [15, 18]];
        expect(mergeIntervals(intervals)).toEqual(expected);
    });

    test('should merge adjacent intervals', () => {
        const intervals = [[1, 4], [4, 5]];
        const expected = [[1, 5]];
        expect(mergeIntervals(intervals)).toEqual(expected);
    });

    test('should merge intervals that fully contain others', () => {
        const intervals = [[1, 10], [2, 3], [4, 5]];
        const expected = [[1, 10]];
        expect(mergeIntervals(intervals)).toEqual(expected);
    });

    test('should handle already merged intervals', () => {
        const intervals = [[1, 2], [3, 4], [5, 6]];
        const expected = [[1, 2], [3, 4], [5, 6]];
        expect(mergeIntervals(intervals)).toEqual(expected);
    });

    test('should handle empty input array', () => {
        expect(mergeIntervals([])).toEqual([]);
    });

    test('should handle single interval array', () => {
        expect(mergeIntervals([[1, 5]])).toEqual([[1, 5]]);
    });

    test('should handle unsorted intervals', () => {
        const intervals = [[4, 5], [1, 4]];
        const expected = [[1, 5]];
        expect(mergeIntervals(intervals)).toEqual(expected);
    });

    test('should handle complex unsorted overlaps', () => {
        const intervals = [[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]];
        const expected = [[1, 10]];
        expect(mergeIntervals(intervals)).toEqual(expected);
    });

    test('should handle negative numbers in intervals', () => {
        const intervals = [[-5, -2], [-3, 0], [1, 2]];
        const expected = [[-5, 0], [1, 2]];
        expect(mergeIntervals(intervals)).toEqual(expected);
    });

    test('should handle intervals starting at 0', () => {
        const intervals = [[0, 0], [1, 4], [3, 5]];
        const expected = [[0, 0], [1, 5]];
        expect(mergeIntervals(intervals)).toEqual(expected);
    });

    test('should correctly merge intervals with same start but different end', () => {
        const intervals = [[1, 3], [1, 5], [2, 4]];
        const expected = [[1, 5]];
        expect(mergeIntervals(intervals)).toEqual(expected);
    });
});

describe('mergeIntervalsNoSort (Illustrative/Fallback)', () => {
    // This function will issue a warning and then call the sorted version.
    // We expect it to produce the same results as `mergeIntervals` and log a warning.
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    afterAll(() => {
        consoleWarnSpy.mockRestore(); // Restore original console.warn
    });

    test('should call the sorted version and log a warning for basic case', () => {
        const intervals = [[1, 3], [2, 6]];
        const expected = [[1, 6]];
        expect(mergeIntervalsNoSort(intervals)).toEqual(expected);
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith(
            expect.stringContaining("`mergeIntervalsNoSort` is generally not an efficient approach")
        );
    });

    test('should produce same result as sorted version for unsorted input', () => {
        const intervals = [[4, 5], [1, 4], [0, 1]];
        const expected = [[0, 5]];
        expect(mergeIntervalsNoSort(intervals)).toEqual(expected);
    });
});
```