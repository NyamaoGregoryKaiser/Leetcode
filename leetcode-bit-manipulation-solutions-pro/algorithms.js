/**
 * Counts the number of set bits (1s) in an integer.
 *
 * @param {number} n The input integer.
 * @returns {number} The number of set bits.
 */
const countSetBits = (n) => {
  // Approach 1:  Iterative approach (using bitwise AND)
  let count = 0;
  while (n > 0) {
    count += (n & 1); // Check the least significant bit
    n >>= 1; // Right-shift n by 1 bit
  }
  return count;
};


/**
 * Reverses the bits of an integer.
 *
 * @param {number} n The input integer.
 * @param {number} bitSize The number of bits to consider (e.g., 32 for 32-bit integers).
 * @returns {number} The integer with reversed bits.
 */
const reverseBits = (n, bitSize = 32) => {
    let reversed = 0;
    for (let i = 0; i < bitSize; i++) {
        if ((n >> i) & 1) {
            reversed |= 1 << (bitSize - 1 - i);
        }
    }
    return reversed;
};


/**
 * Finds the single non-repeating number in an array where all other numbers appear twice.
 * @param {number[]} nums An array of numbers.
 * @returns {number} The single non-repeating number.
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
 * @param {number} n The input number.
 * @returns {boolean} True if n is a power of 2, false otherwise.
 */
const isPowerOfTwo = (n) => {
    return (n > 0) && ((n & (n - 1)) === 0);
};


/**
 * Swaps two numbers without using a temporary variable.
 * @param {number} a First number
 * @param {number} b Second number
 */
const swapNumbers = (a, b) => {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  return [a, b];
};



module.exports = { countSetBits, reverseBits, findSingleNonRepeating, isPowerOfTwo, swapNumbers };