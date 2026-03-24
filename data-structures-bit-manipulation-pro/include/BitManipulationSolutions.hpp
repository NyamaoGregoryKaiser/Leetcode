#ifndef BIT_MANIPULATION_SOLUTIONS_HPP
#define BIT_MANIPULATION_SOLUTIONS_HPP

#include <vector>
#include <numeric> // For std::accumulate in one solution
#include <unordered_map> // For hash map approach

namespace BitManipulation {

    // --- Problem 1: Count Set Bits (Hamming Weight) ---
    /**
     * @brief Counts the number of set bits (1s) in an unsigned integer using Brian Kernighan's algorithm.
     *        This is generally the most optimal approach.
     * @param n The unsigned integer.
     * @return The number of set bits.
     * @complexity Time: O(k), where k is the number of set bits (best case).
     *             Worst case O(log N) as k <= log N.
     *             Space: O(1).
     */
    int countSetBits_BrianKernighan(unsigned int n);

    /**
     * @brief Counts the number of set bits (1s) in an unsigned integer by checking each bit.
     * @param n The unsigned integer.
     * @return The number of set bits.
     * @complexity Time: O(log N) or O(B) where B is the number of bits (e.g., 32 for unsigned int).
     *             Space: O(1).
     */
    int countSetBits_Loop(unsigned int n);

    // --- Problem 2: Reverse Bits ---
    /**
     * @brief Reverses the bits of a 32-bit unsigned integer.
     * @param n The 32-bit unsigned integer.
     * @return The integer with its bits reversed.
     * @complexity Time: O(B) where B is the number of bits (e.g., 32).
     *             Space: O(1).
     */
    unsigned int reverseBits(unsigned int n);

    // --- Problem 3: Single Number ---
    /**
     * @brief Finds the single element that appears only once in an array
     *        where all other elements appear exactly twice.
     *        Uses the XOR property: A XOR A = 0, A XOR 0 = A.
     * @param nums A vector of integers.
     * @return The unique element.
     * @complexity Time: O(N), where N is the number of elements in the array.
     *             Space: O(1).
     */
    int singleNumber_XOR(const std::vector<int>& nums);

    /**
     * @brief Finds the single element that appears only once using a hash map.
     *        For comparison with the bit manipulation approach.
     * @param nums A vector of integers.
     * @return The unique element.
     * @complexity Time: O(N), for iterating through the array and map operations.
     *             Space: O(N), to store counts in the hash map.
     */
    int singleNumber_HashMap(const std::vector<int>& nums);

    // --- Problem 4: Check if a Number is a Power of 2 ---
    /**
     * @brief Checks if a given positive integer is a power of 2.
     *        A number `n` is a power of 2 if `n > 0` and `(n & (n - 1))` is 0.
     * @param n The integer to check.
     * @return True if `n` is a power of 2, false otherwise.
     * @complexity Time: O(1).
     *             Space: O(1).
     */
    bool isPowerOfTwo_Bitwise(int n);

    /**
     * @brief Checks if a given positive integer is a power of 2 by repeatedly dividing by 2.
     *        For comparison with the bit manipulation approach.
     * @param n The integer to check.
     * @return True if `n` is a power of 2, false otherwise.
     * @complexity Time: O(log N), as we divide n by 2 until it becomes 1.
     *             Space: O(1).
     */
    bool isPowerOfTwo_Loop(int n);

    // --- Problem 5: Insert M into N ---
    /**
     * @brief Inserts bits from number M into number N between bit positions i and j (inclusive).
     *        The bits of M will cover N's bits from j down to i.
     * @param N The original number (32-bit).
     * @param M The number to insert (M is assumed to fit within j-i+1 bits).
     * @param i The starting bit position (0-indexed, inclusive).
     * @param j The ending bit position (0-indexed, inclusive).
     * @return The modified number N with M inserted.
     * @complexity Time: O(1).
     *             Space: O(1).
     */
    unsigned int insertMIntoN(unsigned int N, unsigned int M, int i, int j);

} // namespace BitManipulation

#endif // BIT_MANIPULATION_SOLUTIONS_HPP

---