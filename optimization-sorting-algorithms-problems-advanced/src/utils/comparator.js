/**
 * src/utils/comparator.js
 *
 * Provides a default comparison function for numbers, useful for sorting.
 */

/**
 * Default comparator function for numerical sorting (ascending order).
 * Behaves like `a - b` in JavaScript's Array.prototype.sort().
 *
 * @param {number} a The first element for comparison.
 * @param {number} b The second element for comparison.
 * @returns {number} A negative value if a < b, zero if a == b, a positive value if a > b.
 */
function defaultComparator(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

module.exports = defaultComparator;