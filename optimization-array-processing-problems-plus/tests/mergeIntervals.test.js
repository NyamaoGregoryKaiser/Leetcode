/**
 * @fileoverview Test suite for the "Merge Overlapping Intervals" problem.
 * Uses Jest for testing.
 */

const { mergeIntervals } = require('../src/mergeIntervals');

describe('mergeIntervals', () => {

    // Test Case 1: Basic overlapping intervals
    test('should merge basic overlapping intervals', () => {
        const intervals = [
            [1, 3],
            [2, 6],
            [8, 10],
            [15, 18]
        ];
        expect(mergeIntervals(intervals)).toEqual([
            [1, 6],
            [8, 10],
            [15, 18]
        ]);
    });

    // Test Case 2: Intervals that touch but don't strictly overlap
    test('should merge intervals that touch at endpoints', () => {
        const intervals = [
            [1, 4],
            [4, 5]
        ];
        expect(mergeIntervals(intervals)).toEqual([
            [1, 5]
        ]);
    });

    // Test Case 3: All intervals overlap and merge into one
    test('should merge all intervals into a single one if all overlap', () => {
        const intervals = [
            [1, 4],
            [0, 4]
        ];
        expect(mergeIntervals(intervals)).toEqual([
            [0, 4]
        ]);

        const intervals2 = [
            [1, 4],
            [0, 1]
        ]; // [0,1], [1,4] -> [0,4]
        expect(mergeIntervals(intervals2)).toEqual([
            [0, 4]
        ]);

        const intervals3 = [
            [1, 10],
            [2, 3],
            [5, 8]
        ];
        expect(mergeIntervals(intervals3)).toEqual([
            [1, 10]
        ]);
    });

    // Test Case 4: No overlapping intervals
    test('should return intervals as is if no overlaps', () => {
        const intervals = [
            [1, 2],
            [3, 4],
            [5, 6]
        ];
        expect(mergeIntervals(intervals)).toEqual([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);
    });

    // Test Case 5: Empty input array
    test('should return an empty array for empty input', () => {
        const intervals = [];
        expect(mergeIntervals(intervals)).toEqual([]);
    });

    // Test Case 6: Single interval
    test('should return the same interval for a single interval input', () => {
        const intervals = [
            [1, 5]
        ];
        expect(mergeIntervals(intervals)).toEqual([
            [1, 5]
        ]);
    });

    // Test Case 7: Unsorted input intervals
    test('should merge correctly even with unsorted input', () => {
        const intervals = [
            [8, 10],
            [1, 3],
            [15, 18],
            [2, 6]
        ];
        // Sorted: [[1,3],[2,6],[8,10],[15,18]]
        expect(mergeIntervals(intervals)).toEqual([
            [1, 6],
            [8, 10],
            [15, 18]
        ]);
    });

    // Test Case 8: Intervals with same start but different end
    test('should handle intervals with same start and different ends', () => {
        const intervals = [
            [1, 4],
            [1, 5]
        ];
        expect(mergeIntervals(intervals)).toEqual([
            [1, 5]
        ]);
    });

    // Test Case 9: Complex overlaps
    test('should handle complex overlapping scenarios', () => {
        const intervals = [
            [2, 3],
            [4, 5],
            [6, 7],
            [8, 9],
            [1, 10]
        ];
        // Sorted: [[1,10],[2,3],[4,5],[6,7],[8,9]]
        expect(mergeIntervals(intervals)).toEqual([
            [1, 10]
        ]);
    });

    // Test Case 10: More overlapping scenarios
    test('should correctly merge intervals with various overlaps', () => {
        const intervals = [
            [1, 4],
            [0, 0]
        ]; // [0,0], [1,4] -> no overlap
        expect(mergeIntervals(intervals)).toEqual([
            [0, 0],
            [1, 4]
        ]);

        const intervals2 = [
            [1, 4],
            [0, 4]
        ]; // [0,4], [1,4] -> [0,4]
        expect(mergeIntervals(intervals2)).toEqual([
            [0, 4]
        ]);
    });

    // Test Case 11: Negative numbers in intervals
    test('should handle negative numbers in intervals', () => {
        const intervals = [
            [-5, -2],
            [-3, 0],
            [1, 2]
        ];
        expect(mergeIntervals(intervals)).toEqual([
            [-5, 0],
            [1, 2]
        ]);
    });
});