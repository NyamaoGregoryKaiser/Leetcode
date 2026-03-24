#ifndef ADDITIONAL_BIT_MANIPULATION_SOLUTIONS_HPP
#define ADDITIONAL_BIT_MANIPULATION_SOLUTIONS_HPP

#include <vector>

namespace AdditionalBitManipulation {

    // --- Problem 1: Count Set Bits (Hamming Weight) ---

    /**
     * @brief Counts the number of set bits (1s) in an unsigned integer using a brute-force loop.
     *        Checks each bit from LSB to MSB.
     * @param n The unsigned integer.
     * @return The number of set bits.
     * @complexity Time: O(B) where B is the number of bits (e.g., 32 for unsigned int).
     *             Space: O(1).
     */
    int countSetBits_BruteForce(unsigned int n);

    /**
     * @brief Counts the number of set bits (1s) in an unsigned integer using a precomputed lookup table.
     *        Divides the integer into bytes and sums their precomputed popcounts.
     * @param n The unsigned integer.
     * @return The number of set bits.
     * @complexity Time: O(B/8) or O(C) where C is the number of bytes (e.g., 4).
     *             Space: O(2^8) or O(256) for the lookup table.
     */
    int countSetBits_LookupTable(unsigned int n);

    // --- Problem 2: Reverse Bits ---

    /**
     * @brief Reverses the bits of a 32-bit unsigned integer using a byte-by-byte approach
     *        with a precomputed lookup table for reversing individual bytes.
     * @param n The 32-bit unsigned integer.
     * @return The integer with its bits reversed.
     * @complexity Time: O(B/8) or O(C) where C is the number of bytes (e.g., 4).
     *             Space: O(2^8) or O(256) for the lookup table.
     */
    unsigned int reverseBits_ByteByByte(unsigned int n);

} // namespace AdditionalBitManipulation

#endif // ADDITIONAL_BIT_MANIPULATION_SOLUTIONS_HPP

---