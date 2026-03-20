/**
 * @fileoverview Test suite for Problem 1: Search in a Sorted Array with variations.
 */

const {
    searchAnyOccurrence,
    findFirstOccurrence,
    findLastOccurrence,
    countOccurrences,
    linearSearch
} = require('../../src/algorithms/problems/problem1_sortedArraySearch');

module.exports = {
    // --- Tests for searchAnyOccurrence ---
    testSearchAnyOccurrenceBasic: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(searchAnyOccurrence(arr, 7) === 3, 'Any: Target 7 should be at index 3');
    },
    testSearchAnyOccurrenceNotFound: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(searchAnyOccurrence(arr, 4) === -1, 'Any: Target 4 should not be found');
    },
    testSearchAnyOccurrenceEmpty: (assert) => {
        const arr = [];
        assert(searchAnyOccurrence(arr, 5) === -1, 'Any: Empty array should return -1');
    },
    testSearchAnyOccurrenceSingleElement: (assert) => {
        assert(searchAnyOccurrence([42], 42) === 0, 'Any: Single element array (found)');
        assert(searchAnyOccurrence([42], 100) === -1, 'Any: Single element array (not found)');
    },
    testSearchAnyOccurrenceDuplicates: (assert) => {
        const arr = [1, 2, 2, 2, 3, 4, 5];
        const result = searchAnyOccurrence(arr, 2);
        assert(result >= 1 && result <= 3, 'Any: With duplicates, target 2 should return any valid index');
    },

    // --- Tests for findFirstOccurrence ---
    testFindFirstOccurrenceBasic: (assert) => {
        const arr = [1, 2, 2, 2, 3, 4, 5];
        assert(findFirstOccurrence(arr, 2) === 1, 'First: First occurrence of 2 should be at index 1');
    },
    testFindFirstOccurrenceNoDuplicates: (assert) => {
        const arr = [1, 3, 5, 7, 9];
        assert(findFirstOccurrence(arr, 5) === 2, 'First: Target 5 (no duplicates) should be at index 2');
    },
    testFindFirstOccurrenceNotFound: (assert) => {
        const arr = [1, 2, 3, 4, 5];
        assert(findFirstOccurrence(arr, 6) === -1, 'First: Target 6 should not be found');
    },
    testFindFirstOccurrenceAtBeginning: (assert) => {
        const arr = [1, 1, 2, 3, 4];
        assert(findFirstOccurrence(arr, 1) === 0, 'First: Target 1 should be at index 0');
    },
    testFindFirstOccurrenceAtEnd: (assert) => {
        const arr = [1, 2, 3, 5, 5];
        assert(findFirstOccurrence(arr, 5) === 3, 'First: Target 5 should be at index 3');
    },
    testFindFirstOccurrenceEmpty: (assert) => {
        const arr = [];
        assert(findFirstOccurrence(arr, 5) === -1, 'First: Empty array should return -1');
    },
    testFindFirstOccurrenceSingleElement: (assert) => {
        assert(findFirstOccurrence([42], 42) === 0, 'First: Single element array (found)');
        assert(findFirstOccurrence([42], 100) === -1, 'First: Single element array (not found)');
    },

    // --- Tests for findLastOccurrence ---
    testFindLastOccurrenceBasic: (assert) => {
        const arr = [1, 2, 2, 2, 3, 4, 5];
        assert(findLastOccurrence(arr, 2) === 3, 'Last: Last occurrence of 2 should be at index 3');
    },
    testFindLastOccurrenceNoDuplicates: (assert) => {
        const arr = [1, 3, 5, 7, 9];
        assert(findLastOccurrence(arr, 5) === 2, 'Last: Target 5 (no duplicates) should be at index 2');
    },
    testFindLastOccurrenceNotFound: (assert) => {
        const arr = [1, 2, 3, 4, 5];
        assert(findLastOccurrence(arr, 6) === -1, 'Last: Target 6 should not be found');
    },
    testFindLastOccurrenceAtBeginning: (assert) => {
        const arr = [1, 1, 2, 3, 4];
        assert(findLastOccurrence(arr, 1) === 1, 'Last: Target 1 should be at index 1');
    },
    testFindLastOccurrenceAtEnd: (assert) => {
        const arr = [1, 2, 3, 5, 5];
        assert(findLastOccurrence(arr, 5) === 4, 'Last: Target 5 should be at index 4');
    },
    testFindLastOccurrenceEmpty: (assert) => {
        const arr = [];
        assert(findLastOccurrence(arr, 5) === -1, 'Last: Empty array should return -1');
    },
    testFindLastOccurrenceSingleElement: (assert) => {
        assert(findLastOccurrence([42], 42) === 0, 'Last: Single element array (found)');
        assert(findLastOccurrence([42], 100) === -1, 'Last: Single element array (not found)');
    },

    // --- Tests for countOccurrences ---
    testCountOccurrencesBasic: (assert) => {
        const arr = [1, 2, 2, 2, 3, 4, 5];
        assert(countOccurrences(arr, 2) === 3, 'Count: 2 should appear 3 times');
    },
    testCountOccurrencesNoDuplicates: (assert) => {
        const arr = [1, 3, 5, 7, 9];
        assert(countOccurrences(arr, 5) === 1, 'Count: 5 should appear 1 time');
    },
    testCountOccurrencesNotFound: (assert) => {
        const arr = [1, 2, 3, 4, 5];
        assert(countOccurrences(arr, 6) === 0, 'Count: 6 should appear 0 times');
    },
    testCountOccurrencesAllSame: (assert) => {
        const arr = [7, 7, 7, 7, 7];
        assert(countOccurrences(arr, 7) === 5, 'Count: All elements same, should be 5');
    },
    testCountOccurrencesEmpty: (assert) => {
        const arr = [];
        assert(countOccurrences(arr, 5) === 0, 'Count: Empty array should return 0');
    },
    testCountOccurrencesSingleElementFound: (assert) => {
        assert(countOccurrences([42], 42) === 1, 'Count: Single element array (found)');
    },
    testCountOccurrencesSingleElementNotFound: (assert) => {
        assert(countOccurrences([42], 100) === 0, 'Count: Single element array (not found)');
    },

    // --- Tests for linearSearch (for comparison) ---
    testLinearSearchBasic: (assert) => {
        const arr = [1, 3, 5, 7, 9, 11, 13];
        assert(linearSearch(arr, 7) === 3, 'Linear: Target 7 should be at index 3');
    },
    testLinearSearchDuplicates: (assert) => {
        const arr = [1, 2, 2, 2, 3, 4, 5];
        assert(linearSearch(arr, 2) === 1, 'Linear: Target 2 should be at first index (1)');
    },
    testLinearSearchNotFound: (assert) => {
        const arr = [1, 3, 5];
        assert(linearSearch(arr, 4) === -1, 'Linear: Target 4 should not be found');
    },
    testLinearSearchEmpty: (assert) => {
        assert(linearSearch([], 5) === -1, 'Linear: Empty array should return -1');
    },
};