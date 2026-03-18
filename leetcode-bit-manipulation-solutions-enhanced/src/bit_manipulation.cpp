```cpp
#include "bit_manipulation.h"
#include <numeric> // For std::accumulate in SingleNumberIII

// Problem 1: Count Set Bits (Hamming Weight)
namespace CountSetBits {

    /**
     * @brief Counts the number of set bits (1s) in a 32-bit unsigned integer using a simple iterative approach.
     *
     * This method iterates 32 times, checking the least significant bit (LSB) and right-shifting the number.
     *
     * @param n The 32-bit unsigned integer.
     * @return The count of set bits.
     *
     * @complexity
     *   Time: O(k), where k is the number of bits (e.g., 32 for uint32_t).
     *         It performs a fixed number of operations (32 shifts and 32 checks).
     *   Space: O(1)
     */
    int countSetBits_iterative(uint32_t n) {
        int count = 0;
        // Iterate 32 times for a 32-bit integer
        for (int i = 0; i < 32; ++i) {
            // Check if the least significant bit is 1
            if ((n & 1) == 1) {
                count++;
            }
            // Right shift n by 1 to check the next bit
            n >>= 1;
        }
        return count;
    }

    /**
     * @brief Counts the number of set bits (1s) in a 32-bit unsigned integer using Brian Kernighan's Algorithm.
     *
     * This algorithm is more efficient than simple iteration because it only iterates as many times as there are set bits.
     * The operation `n & (n - 1)` clears the least significant set bit in n.
     *
     * @param n The 32-bit unsigned integer.
     * @return The count of set bits.
     *
     * @complexity
     *   Time: O(k), where k is the number of set bits. In the worst case (all bits set), it's O(32).
     *   Space: O(1)
     */
    int countSetBits_brianKernighan(uint32_t n) {
        int count = 0;
        while (n != 0) {
            // Clear the least significant set bit
            n = n & (n - 1);
            count++;
        }
        return count;
    }

    // Lookup table for 8-bit integers (0-255)
    static int lookupTable[256];
    static bool lookupTableInitialized = false;

    /**
     * @brief Initializes the lookup table for counting set bits in bytes.
     *
     * This function should be called once before using `countSetBits_lookupTable`.
     */
    void initializeLookupTable() {
        if (!lookupTableInitialized) {
            for (int i = 0; i < 256; ++i) {
                lookupTable[i] = countSetBits_brianKernighan(i); // Use any method to precompute
            }
            lookupTableInitialized = true;
        }
    }

    /**
     * @brief Counts the number of set bits in a 32-bit unsigned integer using a precomputed lookup table.
     *
     * This method breaks the 32-bit integer into 4 bytes (8 bits each) and sums the precomputed set bit counts
     * for each byte from the lookup table.
     *
     * @param n The 32-bit unsigned integer.
     * @return The count of set bits.
     *
     * @complexity
     *   Time: O(1) after initial lookup table setup. It performs 4 table lookups and 3 additions.
     *   Space: O(256) for the lookup table.
     */
    int countSetBits_lookupTable(uint32_t n) {
        if (!lookupTableInitialized) {
            initializeLookupTable(); // Ensure table is initialized
        }
        int count = 0;
        count += lookupTable[n & 0xFF];          // Count for the first byte (bits 0-7)
        count += lookupTable[(n >> 8) & 0xFF];   // Count for the second byte (bits 8-15)
        count += lookupTable[(n >> 16) & 0xFF];  // Count for the third byte (bits 16-23)
        count += lookupTable[(n >> 24) & 0xFF];  // Count for the fourth byte (bits 24-31)
        return count;
    }

} // namespace CountSetBits


// Problem 2: Single Number III (Find two unique numbers)
namespace SingleNumberIII {

    /**
     * @brief Finds two unique numbers in an array where all other numbers appear twice.
     *
     * This algorithm uses properties of the XOR operator.
     * 1. XOR all numbers together to get `xor_sum = num1 ^ num2`.
     * 2. Find any set bit in `xor_sum`. This bit must be different between `num1` and `num2`.
     *    (e.g., `diff_bit = xor_sum & (-xor_sum)` to get the rightmost set bit).
     * 3. Partition the original array into two groups: those with `diff_bit` set and those without.
     * 4. XOR all numbers in each group. The result of each group's XOR will be one of the unique numbers.
     *
     * @param nums A vector of integers where two numbers appear once and all others twice.
     * @return A vector containing the two unique numbers.
     *
     * @complexity
     *   Time: O(N) because the array is traversed a constant number of times.
     *   Space: O(1) (excluding input/output storage).
     */
    std::vector<int> findTwoUniqueNumbers(std::vector<int>& nums) {
        // Step 1: XOR all numbers to get xor_sum = num1 ^ num2
        int xor_sum = 0;
        for (int num : nums) {
            xor_sum ^= num;
        }

        // Step 2: Find any set bit (distinguishing bit) in xor_sum.
        // We can use `xor_sum & (-xor_sum)` to get the rightmost set bit.
        // This bit is guaranteed to be set in one of the unique numbers and unset in the other.
        int diff_bit = xor_sum & (-xor_sum);

        // Step 3 & 4: Partition numbers into two groups and XOR them
        int num1 = 0; // Will hold one unique number
        int num2 = 0; // Will hold the other unique number

        for (int num : nums) {
            if ((num & diff_bit) != 0) { // If the distinguishing bit is set
                num1 ^= num;
            } else { // If the distinguishing bit is not set
                num2 ^= num;
            }
        }

        return {num1, num2};
    }

} // namespace SingleNumberIII


// Problem 3: Power of Two
namespace PowerOfTwo {

    /**
     * @brief Checks if an integer is a power of two using a loop and division.
     *
     * A number `n` is a power of two if `n > 0` and `n` can be repeatedly divided by 2
     * until it becomes 1, with no remainder at any step.
     *
     * @param n The integer to check.
     * @return True if `n` is a power of two, false otherwise.
     *
     * @complexity
     *   Time: O(log N) as it performs divisions until n becomes 1.
     *   Space: O(1)
     */
    bool isPowerOfTwo_loop(int n) {
        if (n <= 0) {
            return false;
        }
        while (n % 2 == 0) {
            n /= 2;
        }
        return n == 1;
    }

    /**
     * @brief Checks if an integer is a power of two using bit manipulation.
     *
     * A positive integer `n` is a power of two if and only if it has exactly one bit set to 1 in its binary representation.
     * The expression `n & (n - 1)` clears the least significant set bit of `n`.
     * If `n` is a power of two, it has only one set bit. So `n - 1` will have all bits to the right of that set bit flipped
     * from 0 to 1, and that set bit flipped from 1 to 0.
     * Therefore, `n & (n - 1)` will result in 0 if `n` is a power of two.
     *
     * Example:
     *   n = 8 (1000_2)
     *   n-1 = 7 (0111_2)
     *   n & (n-1) = 1000_2 & 0111_2 = 0000_2
     *
     * @param n The integer to check.
     * @return True if `n` is a power of two, false otherwise.
     *
     * @complexity
     *   Time: O(1)
     *   Space: O(1)
     */
    bool isPowerOfTwo_bitManipulation(int n) {
        // A power of two must be positive.
        // For any power of two (e.g., 1, 2, 4, 8, ...), its binary representation
        // has exactly one '1' bit.
        // n & (n - 1) clears the lowest set bit. If n has only one set bit,
        // then n & (n - 1) will be 0.
        return n > 0 && (n & (n - 1)) == 0;
    }

} // namespace PowerOfTwo


// Problem 4: Reverse Bits
namespace ReverseBits {

    /**
     * @brief Reverses the bits of a 32-bit unsigned integer.
     *
     * This method iterates 32 times. In each iteration, it takes the least significant bit (LSB)
     * of the input number `n`, shifts it to the appropriate position in the `reversed_n` result,
     * and adds it (ORs it) to `reversed_n`. Then `n` is right-shifted, and `reversed_n` is left-shifted
     * to prepare for the next bit.
     *
     * @param n The 32-bit unsigned integer to reverse.
     * @return The integer with its bits reversed.
     *
     * @complexity
     *   Time: O(k), where k is the number of bits (32 for uint32_t). Fixed number of operations.
     *   Space: O(1)
     */
    uint32_t reverseBits_iterative(uint32_t n) {
        uint32_t reversed_n = 0;
        for (int i = 0; i < 32; ++i) {
            // Left shift the reversed_n by 1 to make space for the next bit
            reversed_n <<= 1;
            // Get the current LSB of n and add it to reversed_n
            if (n & 1) { // If LSB is 1
                reversed_n |= 1;
            }
            // Right shift n by 1 to process the next bit
            n >>= 1;
        }
        return reversed_n;
    }

} // namespace ReverseBits


// Problem 5: Insert M into N (Update Bits)
namespace UpdateBits {

    /**
     * @brief Inserts integer `m` into integer `n` between bit positions `j` and `i` (inclusive).
     *
     * This problem requires clearing a specific range of bits in `n` and then inserting `m` into that range.
     *
     * Steps:
     * 1. Create a mask to clear bits from `j` down to `i` in `n`.
     *    - Create a sequence of all 1s: `~0` (or `UINT_MAX`).
     *    - Shift `~0` left by `j + 1` to get a mask with 1s from `j+1` to MSB, and 0s from `j` to 0. (e.g., `...11100000`)
     *      `left_mask = ~0 << (j + 1)`
     *    - Create a sequence of 1s from `i-1` down to 0, and 0s elsewhere. (e.g., `000000111...`)
     *      `right_mask = (1 << i) - 1`
     *    - Combine these two to get a mask with 1s outside the range [i, j] and 0s within:
     *      `clear_mask = left_mask | right_mask`
     * 2. Clear the bits in `n` within the range [i, j] using the `clear_mask`.
     *    `n_cleared = n & clear_mask`
     * 3. Shift `m` left by `i` positions to align it with the cleared range.
     *    `m_shifted = m << i`
     * 4. OR `n_cleared` with `m_shifted` to insert `m`.
     *    `result = n_cleared | m_shifted`
     *
     * Example: n = 10000000000_2, m = 10011_2, i = 2, j = 6
     *   n = ...0000 1000 0000 0000_2 (decimal 1024)
     *   m = ...0000 0000 0001 0011_2 (decimal 19)
     *   i = 2, j = 6 (range [2, 6] inclusive)
     *
     *   1. Create clear mask:
     *      left_mask = ~0 << (6 + 1) = ~0 << 7 = ...1111 1000 0000_2
     *      right_mask = (1 << 2) - 1 = 0000 0000 0011_2
     *      clear_mask = left_mask | right_mask = ...1111 1000 0011_2
     *
     *   2. Clear bits in n:
     *      n_cleared = n & clear_mask = 1000 0000 0000_2 & ...1111 1000 0011_2 = 1000 0000 0000_2
     *
     *   3. Shift m to position i:
     *      m_shifted = m << 2 = 0001 0011_2 << 2 = 0100 1100_2
     *
     *   4. Combine:
     *      result = n_cleared | m_shifted = 1000 0000 0000_2 | 0000 0100 1100_2 = 1000 0100 1100_2
     *
     * @param n The target integer.
     * @param m The integer to insert.
     * @param i The starting bit position (inclusive, 0-indexed).
     * @param j The ending bit position (inclusive, 0-indexed).
     * @return The integer `n` with `m` inserted into the specified bit range.
     *
     * @complexity
     *   Time: O(1)
     *   Space: O(1)
     */
    int updateBits(int n, int m, int i, int j) {
        // Handle edge cases for i and j if necessary (e.g., j < i, i or j out of bounds for int)
        // For standard 32-bit int, i and j should be between 0 and 31.
        if (i < 0 || j < i || j >= 32) { // Assuming 32-bit int
            // Or throw an exception, or return an error code
            // For simplicity, we'll proceed assuming valid i,j
        }

        // Step 1: Create a mask to clear bits from j down to i in n.
        // Part 1: Bits from (j+1) to MSB are 1s, others 0s.
        int left_mask = (~0) << (j + 1);

        // Part 2: Bits from 0 to (i-1) are 1s, others 0s.
        // Special case: if i = 0, right_mask should be 0. (1 << 0) - 1 = 0.
        int right_mask = (1 << i) - 1;

        // Combine masks to get a mask with 1s outside [i, j] and 0s inside [i, j].
        int clear_mask = left_mask | right_mask;

        // Step 2: Clear the bits in n within the range [i, j].
        int n_cleared = n & clear_mask;

        // Step 3: Shift m left by i positions to align it with the cleared range.
        int m_shifted = m << i;

        // Step 4: OR n_cleared with m_shifted to insert m.
        return n_cleared | m_shifted;
    }

} // namespace UpdateBits

```