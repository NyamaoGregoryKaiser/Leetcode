```javascript
/**
 * @fileoverview Utility functions for sorting arrays.
 * This file provides common sorting helpers that might be used across different algorithm implementations.
 */

/**
 * Compares two objects based on a specified key in ascending order.
 * Useful for `Array.prototype.sort()`.
 *
 * @param {string} key - The key to compare.
 * @returns {function(Object, Object): number} A comparator function.
 *
 * @example
 * const items = [{ val: 3 }, { val: 1 }, { val: 2 }];
 * items.sort(compareByKey('val')); // [{ val: 1 }, { val: 2 }, { val: 3 }]
 */
export const compareByKeyAsc = (key) => (a, b) => {
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

/**
 * Compares two objects based on a specified key in descending order.
 * Useful for `Array.prototype.sort()`.
 *
 * @param {string} key - The key to compare.
 * @returns {function(Object, Object): number} A comparator function.
 *
 * @example
 * const items = [{ val: 3 }, { val: 1 }, { val: 2 }];
 * items.sort(compareByKeyDesc('val')); // [{ val: 3 }, { val: 2 }, { val: 1 }]
 */
export const compareByKeyDesc = (key) => (a, b) => {
  if (a[key] > b[key]) return -1;
  if (a[key] < b[key]) return 1;
  return 0;
};

/**
 * Compares two objects based on a primary key (descending) and a secondary key (ascending).
 * Useful for `Array.prototype.sort()` when a tie-breaking rule is needed.
 *
 * @param {string} primaryKey - The primary key to compare (descending).
 * @param {string} secondaryKey - The secondary key to compare (ascending).
 * @returns {function(Object, Object): number} A comparator function.
 *
 * @example
 * const items = [
 *   { profit: 10, deadline: 2 },
 *   { profit: 10, deadline: 1 },
 *   { profit: 5, deadline: 3 }
 * ];
 * items.sort(compareByTwoKeys('profit', 'deadline'));
 * // [{ profit: 10, deadline: 1 }, { profit: 10, deadline: 2 }, { profit: 5, deadline: 3 }]
 */
export const compareByTwoKeys = (primaryKey, secondaryKey) => (a, b) => {
  // Primary key (descending)
  if (a[primaryKey] > b[primaryKey]) return -1;
  if (a[primaryKey] < b[primaryKey]) return 1;

  // Secondary key (ascending) for tie-breaking
  if (a[secondaryKey] < b[secondaryKey]) return -1;
  if (a[secondaryKey] > b[secondaryKey]) return 1;

  return 0;
};
```