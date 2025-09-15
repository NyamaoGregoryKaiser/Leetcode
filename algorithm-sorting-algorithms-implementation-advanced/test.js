// test.js
const { sortArray, kthSmallest } = require('./problems');
const { mergeSort } = require('./algorithms');

const testCases = [
    [5, 2, 8, 1, 9, 4],
    [1, 1, 1, 1, 1],
    [],
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    [-1, 2, -3, 4, -5],
];

test('sortArray', () => {
    testCases.forEach(testCase => {
        expect(sortArray(testCase.slice())).toEqual(testCase.slice().sort((a, b) => a - b));
    });
});


test('kthSmallest', () => {
    expect(kthSmallest([7, 10, 4, 3, 20, 15], 3)).toBe(7);
    expect(kthSmallest([7, 10, 4, 3, 20, 15], 1)).toBe(3);
    expect(kthSmallest([7, 10, 4, 3, 20, 15], 6)).toBe(20);
    expect(kthSmallest([], 1)).toBe(null);
    expect(kthSmallest([1,2,3],4)).toBe(null);

});

// Add more tests for other problems