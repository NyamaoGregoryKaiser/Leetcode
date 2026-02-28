```cpp
#ifndef BIT_MANIPULATION_SOLVER_HPP
#define BIT_MANIPULATION_SOLVER_HPP

#include <vector>
#include <cstdint> // For uint32_t, uint64_t

/**
 * @brief A class providing static methods for various bit manipulation problems.
 */
class BitManipulationSolver {
public:
    // --- Problem 1: Count Set Bits (Hamming Weight) ---
    /**
     * @brief Counts the number of set bits (1s) in an integer using a brute-force approach.
     *        Iterates through all 32 bits, checking each one individually.
     * @param n The unsigned 32-bit integer.
     * @return The number of set bits.
     * @complexity Time: O(log N) where N is the value of the number, or O(1) as number of bits is fixed (32).
     *             Space: O(1).
     */
    static int countSetBits_BruteForce(uint32_t n);

    /**
     * @brief Counts the number of set bits (1s) in an integer using Brian Kernighan's Algorithm.
     *        This algorithm clears the least significant set bit in each iteration.
     * @param n The unsigned 32-bit integer.
     * @return The number of set bits.
     * @complexity Time: O(k) where k is the number of set bits. In the worst case, k = 32, so O(1).
     *             Space: O(1).
     */
    static int countSetBits_Kernighan(uint32_t n);

    /**
     * @brief Counts the number of set bits (1s) in an integer using a precomputed lookup table.
     *        This approach divides the 32-bit integer into 4 bytes and sums their precomputed set bit counts.
     * @param n The unsigned 32-bit integer.
     * @return The number of set bits.
     * @complexity Time: O(1) - fixed number of lookups and additions.
     *             Space: O(2^8) = O(256) for the lookup table.
     */
    static int countSetBits_LookupTable(uint32_t n);

    // --- Problem 2: Check if a number is a power of two ---
    /**
     * @brief Checks if a given unsigned integer is a power of two.
     *        A number is a power of two if it's positive and has only one set bit.
     *        This property is elegantly checked by `n > 0 && (n & (n - 1)) == 0`.
     * @param n The unsigned 32-bit integer.
     * @return True if n is a power of two, false otherwise.
     * @complexity Time: O(1).
     *             Space: O(1).
     */
    static bool isPowerOfTwo(uint32_t n);

    // --- Problem 3: Reverse Bits ---
    /**
     * @brief Reverses the bits of a 32-bit unsigned integer.
     *        Iterates through the bits of the input, shifting them into a result variable
     *        from most significant to least significant.
     * @param n The unsigned 32-bit integer to reverse.
     * @return The integer with its bits reversed.
     * @complexity Time: O(1) as the number of bits (32) is fixed.
     *             Space: O(1).
     */
    static uint32_t reverseBits(uint32_t n);

    // --- Problem 4: Single Number ---
    /**
     * @brief Finds the single number that appears only once in an array where all other numbers appear twice.
     *        Uses the XOR bitwise operator's properties: `a ^ a = 0` and `a ^ 0 = a`.
     *        XORing all numbers together will cancel out pairs, leaving the unique number.
     * @param nums A vector of integers.
     * @return The single number that appears only once.
     * @complexity Time: O(N) where N is the number of elements in the vector.
     *             Space: O(1).
     */
    static int singleNumber(const std::vector<int>& nums);

    // --- Problem 5: Insert M into N ---
    /**
     * @brief Inserts bits from M into N starting from bit j down to bit i.
     *        Example: N=10000000000 (1024), M=10011 (19), i=2, j=6.
     *        Result: 10001001100 (1024 + 19*4 = 1024+76 = 1100).
     *        Steps:
     *        1. Create a mask to clear bits from j to i in N.
     *        2. Clear the relevant bits in N using the mask.
     *        3. Shift M to the correct position (i).
     *        4. OR the modified N with the shifted M.
     * @param N The destination unsigned 32-bit integer.
     * @param M The source unsigned 32-bit integer to be inserted.
     * @param i The starting bit position (inclusive, 0-indexed) for insertion.
     * @param j The ending bit position (inclusive, 0-indexed) for insertion.
     * @return The modified N with M inserted.
     * @throws std::invalid_argument if i > j or i, j are out of 0-31 range.
     * @complexity Time: O(1).
     *             Space: O(1).
     */
    static uint32_t insertMIntoN(uint32_t N, uint32_t M, int i, int j);

private:
    // Lookup table for countSetBits_LookupTable
    static const unsigned char BIT_COUNT_LOOKUP_TABLE[256];
    static bool lookupTableInitialized; // Flag to ensure table is initialized once
    static void initializeLookupTable();
};

#endif // BIT_MANIPULATION_SOLVER_HPP
```