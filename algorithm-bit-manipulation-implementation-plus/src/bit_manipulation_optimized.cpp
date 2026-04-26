```cpp
#include "bit_manipulation_utils.h" // For printBinary and common utilities
#include <vector>
#include <numeric> // For std::accumulate (less relevant for optimized, but might be used)
#include <algorithm> // For std::reverse (less relevant for optimized)

namespace BitManipulation
{

// --- Problem 1: Count Set Bits (Hamming Weight) ---
// Description: Write a function that takes an unsigned integer and returns the number of '1' bits it has.

/**
 * @brief Counts the number of set bits (1s) in an unsigned 32-bit integer using repeated right shifts.
 *        This is a straightforward but potentially slower approach.
 *
 * @param n The unsigned 32-bit integer.
 * @return The number of set bits.
 *
 * @complexity
 *   Time: O(log N) where N is the value of the integer (specifically, O(number of bits), which is 32 for uint32_t).
 *         Each iteration processes one bit.
 *   Space: O(1)
 */
int countSetBits_Shift(uint32_t n)
{
    int count = 0;
    while (n > 0)
    {
        // Check the least significant bit (LSB)
        if (n & 1)
        {
            count++;
        }
        // Right shift n by 1 to process the next bit
        n >>= 1;
    }
    return count;
}

/**
 * @brief Counts the number of set bits (1s) in an unsigned 32-bit integer using Brian Kernighan's algorithm.
 *        This algorithm is more efficient as it runs only for the number of set bits, not total bits.
 *
 * @param n The unsigned 32-bit integer.
 * @return The number of set bits.
 *
 * @complexity
 *   Time: O(K) where K is the number of set bits in n. In the worst case (all bits set), K=32.
 *         Each iteration turns off the least significant set bit.
 *   Space: O(1)
 *
 * @explanation
 *   The expression `n & (n - 1)` has the effect of unsetting the least significant set bit of `n`.
 *   Example: n = 12 (binary 1100)
 *            n-1 = 11 (binary 1011)
 *            n & (n-1) = 1100 & 1011 = 1000 (8) -> One '1' bit removed.
 *            Next iteration: n = 8 (binary 1000)
 *            n-1 = 7 (binary 0111)
 *            n & (n-1) = 1000 & 0111 = 0000 (0) -> One '1' bit removed.
 *   The loop continues until n becomes 0, and the `count` increments each time a '1' bit is unset.
 */
int countSetBits_Kernighan(uint32_t n)
{
    int count = 0;
    while (n > 0)
    {
        // Unset the least significant set bit
        n &= (n - 1);
        count++;
    }
    return count;
}

// --- Problem 2: Single Number ---
// Description: Given a non-empty array of integers, every element appears twice except for one. Find that single one.

/**
 * @brief Finds the single unique element in an array where all other elements appear twice.
 *        Uses the XOR bitwise operation property:
 *        - `a ^ 0 = a`
 *        - `a ^ a = 0`
 *        - XOR is associative and commutative (`a ^ b ^ c = a ^ (b ^ c)`)
 *
 * @param nums A vector of integers.
 * @return The single unique integer.
 *
 * @complexity
 *   Time: O(N) where N is the number of elements in the vector. Each element is XORed once.
 *   Space: O(1)
 *
 * @explanation
 *   If we XOR all numbers in the array, all pairs of identical numbers will cancel each other out
 *   (e.g., `5 ^ 5 = 0`). The final result will be the unique number XORed with 0, which is the unique number itself.
 *   Example: nums = [4, 1, 2, 1, 2]
 *            result = 0
 *            result = 0 ^ 4 = 4
 *            result = 4 ^ 1 = 5
 *            result = 5 ^ 2 = 7
 *            result = 7 ^ 1 = 6
 *            result = 6 ^ 2 = 4 (The unique number)
 */
int singleNumber(const std::vector<int>& nums)
{
    int result = 0;
    for (int num : nums)
    {
        result ^= num;
    }
    return result;
}

// --- Problem 3: Reverse Bits ---
// Description: Reverse the bits of a given unsigned 32-bit integer.

/**
 * @brief Reverses the bits of an unsigned 32-bit integer.
 *        Iterates 32 times, taking the LSB of `n` and appending it to the result's LSB,
 *        then shifting the result left and `n` right.
 *
 * @param n The unsigned 32-bit integer to reverse.
 * @return The integer with its bits reversed.
 *
 * @complexity
 *   Time: O(1) (specifically O(number of bits), which is 32). The loop runs a fixed number of times.
 *   Space: O(1)
 *
 * @explanation
 *   The algorithm processes each bit of the input `n` from right to left.
 *   In each iteration:
 *   1. `result <<= 1`: The `result` is shifted left by one position. This makes space for the next bit
 *      from `n` at its LSB position.
 *   2. `result |= (n & 1)`: The LSB of `n` (`n & 1`) is OR-ed into the `result`. This effectively
 *      places the current bit from `n` into the LSB of `result`.
 *   3. `n >>= 1`: The input `n` is shifted right by one position, discarding its LSB and bringing the
 *      next bit to be processed into its LSB position.
 */
uint32_t reverseBits(uint32_t n)
{
    uint32_t reversed_num = 0;
    for (int i = 0; i < 32; ++i)
    {
        // Shift reversed_num left to make space for the next bit
        reversed_num <<= 1;
        // Add the least significant bit of n to reversed_num
        reversed_num |= (n & 1);
        // Shift n right to process the next bit
        n >>= 1;
    }
    return reversed_num;
}

// --- Problem 4: Check if a number is a Power of Two ---
// Description: Given an integer n, return true if it is a power of two. Otherwise, return false.
// An integer n is a power of two, if there exists an integer x such that n == 2^x.

/**
 * @brief Checks if an integer is a power of two using bitwise properties.
 *        A number N is a power of two if and only if N > 0 and (N & (N - 1)) == 0.
 *
 * @param n The integer to check.
 * @return True if n is a power of two, false otherwise.
 *
 * @complexity
 *   Time: O(1)
 *   Space: O(1)
 *
 * @explanation
 *   Consider a power of two: it has exactly one '1' bit in its binary representation.
 *   E.g., 8 (1000), 16 (10000).
 *   If N is a power of two, then N-1 will have all bits to the right of N's single set bit also set to '1',
 *   and N's single set bit will be '0'.
 *   Example: N = 8 (binary 1000)
 *            N-1 = 7 (binary 0111)
 *            N & (N-1) = 1000 & 0111 = 0000 (0)
 *   If N is not a power of two (and N > 0), it will have at least two '1' bits.
 *   Then `N & (N - 1)` will not be zero because there will be other set bits remaining after the
 *   least significant set bit is unset.
 *   Example: N = 6 (binary 0110)
 *            N-1 = 5 (binary 0101)
 *            N & (N-1) = 0110 & 0101 = 0100 (4) != 0
 *   The condition `n > 0` handles the case where `n` is 0 (which is not a power of two) and negative numbers.
 */
bool isPowerOfTwo(int n)
{
    return (n > 0) && ((n & (n - 1)) == 0);
}

// --- Problem 5: Check if a number is a Power of Four ---
// Description: Given an integer n, return true if it is a power of four. Otherwise, return false.
// An integer n is a power of four, if there exists an integer x such that n == 4^x.

/**
 * @brief Checks if an integer is a power of four using bitwise properties.
 *        A number is a power of four if:
 *        1. It is a power of two (has only one '1' bit).
 *        2. Its single '1' bit is at an even position (0-indexed from right).
 *           This means the '1' bit must be at index 0, 2, 4, ..., 30.
 *
 * @param n The integer to check.
 * @return True if n is a power of four, false otherwise.
 *
 * @complexity
 *   Time: O(1)
 *   Space: O(1)
 *
 * @explanation
 *   Powers of four in binary:
 *   4^0 = 1    (000...0001) -> '1' at bit 0
 *   4^1 = 4    (000...0100) -> '1' at bit 2
 *   4^2 = 16   (000...10000) -> '1' at bit 4
 *   4^3 = 64   (000...1000000) -> '1' at bit 6
 *
 *   Notice that for powers of four, the single '1' bit is always at an even position.
 *   A bitmask `0x55555555` can be used to check this.
 *   `0x55555555` in binary is `0101 0101 0101 0101 0101 0101 0101 0101`.
 *   This mask has '1's at all even bit positions (0, 2, 4, ..., 30) and '0's at all odd positions.
 *
 *   If `n` is a power of two AND its single '1' bit is at an even position, then `n & 0x55555555`
 *   will be equal to `n` (and thus non-zero). If its single '1' bit is at an odd position, then
 *   `n & 0x55555555` will be zero.
 *
 *   So, the conditions are:
 *   1. `n > 0`: Must be a positive number.
 *   2. `(n & (n - 1)) == 0`: Must be a power of two (has only one set bit).
 *   3. `(n & 0xAAAAAAAA) == 0`: OR equivalently `(n & 0x55555555) != 0`. This checks if the single set bit
 *      is at an even position. The mask `0xAAAAAAAA` has 1s at all odd positions.
 *      If n has its 1 at an odd position (e.g., 2 (0010), 8 (1000)), then `n & 0x55555555` would be 0.
 *      If n has its 1 at an even position (e.g., 1 (0001), 4 (0100)), then `n & 0x55555555` would be n.
 *
 *   Combining these: `(n > 0) && ((n & (n - 1)) == 0) && ((n & 0x55555555) != 0)`
 */
bool isPowerOfFour(int n)
{
    // 1. Must be positive
    // 2. Must be a power of two (only one bit set)
    // 3. The single set bit must be at an even position (0-indexed from right).
    //    0x55555555 has '1's at even positions: 0101 0101 ...
    //    If n is a power of two and its '1' bit is at an even position, then n & 0x55555555 will be n itself.
    //    If its '1' bit is at an odd position, n & 0x55555555 will be 0.
    return (n > 0) && ((n & (n - 1)) == 0) && ((n & 0x55555555) != 0);
}


} // namespace BitManipulation

```