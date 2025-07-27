/**
 * Reverses the bits of an unsigned integer.
 * @param {number} n The input integer.
 * @returns {number} The integer with reversed bits.
 */
const reverseBits = (n) => {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result <<= 1;
        result |= (n >> i) & 1;
    }
    return result >>> 0; // Ensure unsigned result
};

/**
 * Counts the number of set bits (1s) in an unsigned integer.
 * @param {number} n The input integer.
 * @returns {number} The number of set bits.
 */
const countSetBits = (n) => {
  let count = 0;
  while (n > 0) {
    count += (n & 1);
    n >>= 1;
  }
  return count;
};


/**
 * Finds the only non-repeating element in an array where every other element appears twice.
 * @param {number[]} nums The input array.
 * @returns {number} The single non-repeating element.
 */
const findSingleNonRepeating = (nums) => {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
};

/**
 * Checks if a number is a power of 2.
 * @param {number} n The input integer.
 * @returns {boolean} True if n is a power of 2, false otherwise.
 */
const isPowerOfTwo = (n) => {
  return (n > 0) && ((n & (n - 1)) === 0);
};

/**
 * Swaps two numbers without using a temporary variable.
 * @param {number} a First number.
 * @param {number} b Second number.
 * @returns {array} An array containing the swapped numbers.
 */
const swapNumbers = (a, b) => {
  a ^= b;
  b ^= a;
  a ^= b;
  return [a, b];
};


//Time and Space Complexity Analysis (Example for reverseBits)
//Time Complexity: O(log n) - We iterate through the bits of the number.
//Space Complexity: O(1) - Constant extra space is used.


module.exports = { reverseBits, countSetBits, findSingleNonRepeating, isPowerOfTwo, swapNumbers };