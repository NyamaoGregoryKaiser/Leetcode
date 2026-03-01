/**
 * @file Test suite for the Sliding Window Maximum problem.
 * @module tests/problem3.test
 */

const slidingWindowMaximum = require('../src/problems/problem3-sliding-window-maximum/slidingWindowMaximum');
const slidingWindowMaximumBruteForce = require('../src/problems/problem3-sliding-window-maximum/slidingWindowMaximumBruteForce');

const testCases = [
    {
        nums: [1, 3, -1, -3, 5, 3, 6, 7],
        k: 3,
        expected: [3, 3, 5, 5, 6, 7],
        description: 'Example from problem statement'
    },
    {
        nums: [1],
        k: 1,
        expected: [1],
        description: 'Single element array, k=1'
    },
    {
        nums: [1, 2, 3, 4, 5],
        k: 3,
        expected: [3, 4, 5],
        description: 'Monotonically increasing array'
    },
    {
        nums: [5, 4, 3, 2, 1],
        k: 3,
        expected: [5, 4, 3],
        description: 'Monotonically decreasing array'
    },
    {
        nums: [1, 3, 1, 2, 0, 5],
        k: 3,
        expected: [3, 3, 2, 5],
        description: 'Array with mixed values'
    },
    {
        nums: [7, 2, 4],
        k: 2,
        expected: [7, 4],
        description: 'Small array, k=2'
    },
    {
        nums: [9, 11],
        k: 2,
        expected: [11],
        description: 'Two elements, k=2'
    },
    {
        nums: [4, -2],
        k: 2,
        expected: [4],
        description: 'Two elements, negative value'
    },
    {
        nums: [1, -1],
        k: 1,
        expected: [1, -1],
        description: 'Two elements, k=1'
    },
    {
        nums: [1, 3, 12, 1, 0, 10, 8, 15, 6, 9],
        k: 4,
        expected: [12, 12, 12, 10, 15, 15, 15],
        description: 'Longer array, larger k'
    },
    {
        nums: [1, 3, 12, 1, 0, 10, 8, 15, 6, 9],
        k: 1,
        expected: [1, 3, 12, 1, 0, 10, 8, 15, 6, 9],
        description: 'k=1 should return original array'
    },
    {
        nums: [],
        k: 0,
        expected: [],
        description: 'Empty array, k=0'
    },
    {
        nums: [],
        k: 3,
        expected: [],
        description: 'Empty array, k>0'
    },
    {
        nums: [1, 2, 3],
        k: 0,
        expected: [],
        description: 'Non-empty array, k=0'
    },
    {
        nums: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        k: 10,
        expected: [10],
        description: 'k equals array length, decreasing'
    },
    {
        nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        k: 10,
        expected: [10],
        description: 'k equals array length, increasing'
    },
    {
        nums: [10, 10, 10, 10, 10],
        k: 3,
        expected: [10, 10, 10],
        description: 'All same elements'
    },
    {
        nums: [-9, -7, -5, -3, -1],
        k: 3,
        expected: [-5, -3, -1],
        description: 'All negative numbers, increasing'
    },
    {
        nums: [-1, -3, -5, -7, -9],
        k: 3,
        expected: [-1, -3, -5],
        description: 'All negative numbers, decreasing'
    },
    {
        nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        k: 11, // k > nums.length
        expected: [10],
        description: 'k larger than array length'
    },
    {
        nums: [10, 5, 12, 15, 3, 20],
        k: 6, // k equals array length
        expected: [20],
        description: 'k equals array length, mixed values'
    }
];

describe('Sliding Window Maximum', () => {
    describe('Optimal Solution (Deque)', () => {
        test.each(testCases)('should return $expected for nums=$nums, k=$k ($description)', ({ nums, k, expected }) => {
            expect(slidingWindowMaximum(nums, k)).toEqual(expected);
        });
    });

    describe('Brute Force Solution', () => {
        test.each(testCases)('should return $expected for nums=$nums, k=$k ($description)', ({ nums, k, expected }) => {
            expect(slidingWindowMaximumBruteForce(nums, k)).toEqual(expected);
        });
    });
});