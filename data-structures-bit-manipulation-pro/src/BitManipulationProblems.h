#ifndef BIT_MANIPULATION_PROBLEMS_H
#define BIT_MANIPULATION_PROBLEMS_H

#include <cstdint> // For uint32_t
#include <vector>  // For std::vector

namespace BitManipulation {

/**
 * @brief Solution class containing various bit manipulation algorithms.
 */
class Solution {
public:
    // --- Problem 1: Count Set Bits (Hamming Weight) ---

    /**
     * @brief Counts the number of set bits (1s) in an unsigned 32-bit integer.
     *        (Iterative Approach)
     *        Time Complexity: O(log N) where N is the value of the number (max 32 iterations for 32-bit int).
     *        Space Complexity: O(1)
     * @param n The unsigned 32-bit integer.
     * @return The number of set bits.
     */
    int countSetBitsIterative(uint32_t n);

    /**
     * @brief Counts the number of set bits (1s) in an unsigned 32-bit integer
     *        using Brian Kernighan's Algorithm.
     *        This algorithm is more efficient for numbers with fewer set bits.
     *        Time Complexity: O(k) where k is the number of set bits.
     *        Space Complexity: O(1)
     * @param n The unsigned 32-bit integer.
     * @return The number of set bits.
     */
    int countSetBitsKernighan(uint32_t n);

    /**
     * @brief Counts the number of set bits (1s) in an unsigned 32-bit integer
     *        using a lookup table for 8-bit chunks.
     *        This is efficient if called many times.
     *        Time Complexity: O(1) (for fixed 32-bit, 4 lookups). O(D) where D is number of bytes.
     *        Space Complexity: O(256) for the lookup table.
     * @param n The unsigned 32-bit integer.
     * @return The number of set bits.
     */
    int countSetBitsLookupTable(uint32_t n);

    /**
     * @brief Counts the number of set bits (1s) in an unsigned 32-bit integer
     *        using the GCC built-in popcount function.
     *        This is typically the fastest approach as it leverages hardware instructions.
     *        Time Complexity: O(1) (hardware accelerated)
     *        Space Complexity: O(1)
     * @param n The unsigned 32-bit integer.
     * @return The number of set bits.
     */
    int countSetBitsBuiltin(uint32_t n);


    // --- Problem 2: Check if Power of Two ---

    /**
     * @brief Checks if a given integer is a power of two.
     *        (Iterative Division Approach)
     *        Time Complexity: O(log N)
     *        Space Complexity: O(1)
     * @param n The integer to check.
     * @return True if n is a power of two, false otherwise.
     */
    bool isPowerOfTwoIterative(int n);

    /**
     * @brief Checks if a given integer is a power of two.
     *        (Bitwise Approach)
     *        A number is a power of two if and only if it's positive and has exactly one set bit.
     *        The expression `n & (n - 1)` clears the least significant set bit of `n`.
     *        If `n` has only one set bit, `n & (n - 1)` will be 0.
     *        Time Complexity: O(1)
     *        Space Complexity: O(1)
     * @param n The integer to check.
     * @return True if n is a power of two, false otherwise.
     */
    bool isPowerOfTwoBitwise(int n);


    // --- Problem 3: Single Number (Find Unique Element) ---

    /**
     * @brief Finds the single element that appears only once in an array where all
     *        other elements appear twice.
     *        (XOR-based approach)
     *        Uses the properties of XOR: `x ^ x = 0` and `x ^ 0 = x`.
     *        Time Complexity: O(N) where N is the number of elements in the array.
     *        Space Complexity: O(1)
     * @param nums The input vector of integers.
     * @return The single unique number.
     */
    int singleNumber(const std::vector<int>& nums);


    // --- Problem 4: Reverse Bits ---

    /**
     * @brief Reverses the bits of a given 32-bit unsigned integer.
     *        Iterates through all 32 bits, shifting bits from the original number
     *        to the result number.
     *        Time Complexity: O(1) (exactly 32 iterations for a 32-bit integer).
     *        Space Complexity: O(1)
     * @param n The unsigned 32-bit integer.
     * @return The integer with its bits reversed.
     */
    uint32_t reverseBits(uint32_t n);


    // --- Problem 5: Insert M into N ---

    /**
     * @brief Inserts a 32-bit number M into another 32-bit number N
     *        between bit positions i and j (inclusive).
     *        Assumes that M fits within the range [i, j].
     *        Steps:
     *        1. Clear bits in N from j to i.
     *        2. Shift M to the left by i positions.
     *        3. OR the modified M with N.
     *        Time Complexity: O(1)
     *        Space Complexity: O(1)
     * @param N The target 32-bit unsigned integer.
     * @param M The source 32-bit unsigned integer to insert.
     * @param i The starting bit position (inclusive, least significant).
     * @param j The ending bit position (inclusive, most significant).
     * @return The modified N with M inserted.
     */
    uint32_t insertBits(uint32_t N, uint32_t M, int i, int j);

}; // class Solution

} // namespace BitManipulation

#endif // BIT_MANIPULATION_PROBLEMS_H
```
---