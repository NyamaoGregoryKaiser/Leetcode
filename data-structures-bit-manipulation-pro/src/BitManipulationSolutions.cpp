#include "BitManipulationSolutions.hpp"
#include "bit_manipulation_utils.hpp" // For printBinary if debugging

namespace BitManipulation {

    // --- Problem 1: Count Set Bits (Hamming Weight) ---
    int countSetBits_BrianKernighan(unsigned int n) {
        int count = 0;
        // Brian Kernighan's algorithm:
        // n & (n - 1) unsets the least significant set bit.
        // We repeat this until n becomes 0.
        while (n > 0) {
            n &= (n - 1); // This operation turns the rightmost 1-bit into a 0.
            count++;      // Each time a 1-bit is turned off, increment count.
        }
        return count;
    }

    int countSetBits_Loop(unsigned int n) {
        int count = 0;
        // Iterate 32 times (for a 32-bit unsigned int)
        // Check the least significant bit (LSB) using n & 1.
        // Then right shift n to check the next bit.
        for (int i = 0; i < 32; ++i) { // Assuming 32-bit unsigned int
            if ((n & 1) == 1) { // Check if the LSB is 1
                count++;
            }
            n >>= 1; // Right shift n by 1 to check the next bit
        }
        return count;
    }

    // --- Problem 2: Reverse Bits ---
    unsigned int reverseBits(unsigned int n) {
        unsigned int reversed_n = 0;
        // Iterate 32 times for a 32-bit unsigned integer.
        for (int i = 0; i < 32; ++i) {
            // Left shift the `reversed_n` by 1 to make space for the next bit.
            reversed_n <<= 1;
            // Get the current LSB of `n`.
            // If the LSB of `n` is 1, add it to `reversed_n`.
            if ((n & 1) == 1) {
                reversed_n |= 1; // Set the new LSB of reversed_n to 1
            }
            // Right shift `n` by 1 to process the next bit.
            n >>= 1;
        }
        return reversed_n;
    }

    // --- Problem 3: Single Number ---
    int singleNumber_XOR(const std::vector<int>& nums) {
        // The XOR property:
        // 1. A XOR A = 0 (Any number XORed with itself is 0)
        // 2. A XOR 0 = A (Any number XORed with 0 is itself)
        // 3. XOR is commutative and associative (A XOR B XOR C = A XOR (B XOR C))
        //
        // If we XOR all numbers in the array, all pairs of identical numbers
        // will cancel each other out (result in 0), leaving only the unique number.
        int unique_num = 0;
        for (int num : nums) {
            unique_num ^= num;
        }
        return unique_num;
    }

    int singleNumber_HashMap(const std::vector<int>& nums) {
        // Use a hash map to store counts of each number.
        // Iterate through the map to find the number with count 1.
        std::unordered_map<int, int> counts;
        for (int num : nums) {
            counts[num]++;
        }

        for (auto const& [num, count] : counts) {
            if (count == 1) {
                return num;
            }
        }
        return -1; // Should not happen given problem constraints
    }

    // --- Problem 4: Check if a Number is a Power of 2 ---
    bool isPowerOfTwo_Bitwise(int n) {
        // A number `n` is a power of 2 if and only if:
        // 1. `n` is positive (`n > 0`).
        // 2. `n` has exactly one bit set to 1 in its binary representation.
        // The expression `n & (n - 1)` effectively clears the least significant set bit of `n`.
        // If `n` is a power of 2 (e.g., 8 is 1000_2, 4 is 0100_2), then `n - 1` will be
        // all ones to the right of the single set bit (e.g., 7 is 0111_2, 3 is 0011_2).
        // Performing `n & (n - 1)` will result in 0 if `n` has only one set bit.
        // Example: n = 8 (1000_2), n-1 = 7 (0111_2). 1000_2 & 0111_2 = 0000_2.
        // Example: n = 6 (0110_2), n-1 = 5 (0101_2). 0110_2 & 0101_2 = 0100_2 (not 0).
        return n > 0 && (n & (n - 1)) == 0;
    }

    bool isPowerOfTwo_Loop(int n) {
        // Handle non-positive numbers or zero.
        if (n <= 0) {
            return false;
        }
        // Repeatedly divide n by 2 until it's 1.
        // If at any point n is not divisible by 2 (and not 1), it's not a power of 2.
        while (n % 2 == 0) {
            n /= 2;
        }
        return n == 1; // If it's a power of 2, it will eventually become 1.
    }

    // --- Problem 5: Insert M into N ---
    unsigned int insertMIntoN(unsigned int N, unsigned int M, int i, int j) {
        // This problem assumes M fits within the (j-i+1) bits range.
        // Steps:
        // 1. Create a mask to clear bits from i to j in N.
        // 2. Shift M to the correct position (i).
        // 3. OR the modified N with the shifted M.

        // Step 1: Create a mask to clear bits from i to j in N.
        // We need '1's outside the [i, j] range and '0's inside.

        // Part A: Create a mask for bits from j+1 to the end (left part of N).
        // This is done by creating all ones and shifting left by j+1.
        // Example: if j = 5, mask_left = ~0 << 6.
        // If j is 31 (the last bit), then mask_left would be 0.
        unsigned int mask_left = (~0U) << (j + 1);

        // Part B: Create a mask for bits from 0 to i-1 (right part of N).
        // This is done by creating a sequence of 'i' ones.
        // Example: if i = 2, mask_right = (1 << 2) - 1 which is 011_2.
        // If i is 0, then mask_right would be 0.
        unsigned int mask_right = (1U << i) - 1;

        // Combine the two parts to get the full clear mask.
        // This mask will have 1s everywhere except between i and j (inclusive).
        unsigned int clear_mask = mask_left | mask_right;

        // Apply the clear mask to N to clear bits from i to j.
        N &= clear_mask;

        // Step 2: Shift M to its correct position (starting at bit i).
        M <<= i;

        // Step 3: OR the modified N with the shifted M.
        // The cleared bits in N are now ready to receive M.
        return N | M;
    }

} // namespace BitManipulation

---