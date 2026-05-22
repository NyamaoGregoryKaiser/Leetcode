```javascript
/**
 * @fileoverview Unit tests for Problem 2: Merge Intervals.
 */

const { expect } = require('chai');
const mergeIntervals = require('../src/problems/problem2_mergeIntervals');

describe('Merge Overlapping Intervals', () => {

  it('should merge basic overlapping intervals', () => {
    const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
    const expected = [[1, 6], [8, 10], [15, 18]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should merge fully contained intervals', () => {
    const intervals = [[1, 10], [2, 3], [4, 5]];
    const expected = [[1, 10]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should merge intervals that touch at endpoints', () => {
    const intervals = [[1, 4], [4, 5]];
    const expected = [[1, 5]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should handle no overlapping intervals', () => {
    const intervals = [[1, 2], [3, 4], [5, 6]];
    const expected = [[1, 2], [3, 4], [5, 6]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should handle an empty array of intervals', () => {
    const intervals = [];
    const expected = [];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should handle a single interval', () => {
    const intervals = [[1, 5]];
    const expected = [[1, 5]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should handle multiple overlapping intervals that merge into one', () => {
    const intervals = [[1, 4], [0, 4]];
    const expected = [[0, 4]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should handle unsorted input intervals correctly', () => {
    const intervals = [[8, 10], [1, 3], [15, 18], [2, 6]];
    const expected = [[1, 6], [8, 10], [15, 18]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should handle intervals starting at 0', () => {
    const intervals = [[0, 2], [1, 3], [4, 5]];
    const expected = [[0, 3], [4, 5]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should handle intervals with negative numbers', () => {
    const intervals = [[-5, -1], [-2, 0], [1, 2]];
    const expected = [[-5, 0], [1, 2]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should handle intervals with identical start and end points (point intervals)', () => {
    const intervals = [[1, 1], [2, 2], [3, 3]];
    const expected = [[1, 1], [2, 2], [3, 3]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should merge point intervals if they overlap', () => {
    const intervals = [[1, 5], [2, 2], [3, 3], [5, 7]];
    const expected = [[1, 7]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should handle complex overlaps with many intervals', () => {
    const intervals = [[1, 4], [0, 0], [2, 3], [0, 2], [4, 5]];
    const expected = [[0, 5]];
    expect(mergeIntervals(intervals)).to.deep.equal(expected);
  });

  it('should throw an error for invalid input type', () => {
    expect(() => mergeIntervals(null)).to.throw('Input must be an array of intervals.');
    expect(() => mergeIntervals(123)).to.throw('Input must be an array of intervals.');
    expect(() => mergeIntervals('string')).to.throw('Input must be an array of intervals.');
  });
});
```