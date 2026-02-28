```cpp
#include "bit_manipulation_solver.hpp"
#include <stdexcept> // For std::invalid_argument
#include <iostream>  // For debug output, can be removed

// Initialize static members
const unsigned char BitManipulationSolver::BIT_COUNT_LOOKUP_TABLE[256] = {
    0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4,
    1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
    1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
    2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
    1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
    2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
    2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
    3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
    1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
    2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
    2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
    3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
    2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
    3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
    3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
    4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8
};
bool BitManipulationSolver::lookupTableInitialized = false;

// No need for a separate initializeLookupTable function if it's const and initialized directly.
// The `lookupTableInitialized` flag is technically not needed for this const static array,
// but included for demonstration of how one might manage dynamic static initialization.
// For const data, it's initialized before main().

// --- Problem 1: Count Set Bits (Hamming Weight) ---

int BitManipulationSolver::countSetBits_BruteForce(uint32_t n) {
    int count = 0;
    // Iterate 32 times for a 32-bit integer.
    // In each iteration, check the least significant bit (LSB) using `& 1`.
    // Then right shift the number by 1 to expose the next bit.
    for (int i = 0; i < 32; ++i) {
        if ((n & 1) != 0) { // Check if the LSB is 1
            count++;
        }
        n >>= 1; // Right shift n by 1 to check the next bit
    }
    return count;
}

int BitManipulationSolver::countSetBits_Kernighan(uint32_t n) {
    int count = 0;
    // Brian Kernighan's algorithm works by repeatedly unsetting the least significant set bit
    // until the number becomes 0.
    // The operation `n & (n - 1)` clears the rightmost set bit of `n`.
    // Example: n = 12 (binary 1100)
    // 1. n = 1100, count = 0
    //    n-1 = 1011
    //    n & (n-1) = 1100 & 1011 = 1000 (n becomes 8), count = 1
    // 2. n = 1000, count = 1
    //    n-1 = 0111
    //    n & (n-1) = 1000 & 0111 = 0000 (n becomes 0), count = 2
    // Loop terminates.
    while (n != 0) {
        n &= (n - 1); // Clear the least significant set bit
        count++;      // Increment count for each cleared bit
    }
    return count;
}

int BitManipulationSolver::countSetBits_LookupTable(uint32_t n) {
    // This approach leverages a precomputed table for byte-sized bit counts.
    // A 32-bit integer is composed of 4 bytes. We can count bits for each byte
    // using the lookup table and sum them up.
    // Example: n = 0x12345678
    // byte 0: 0x78
    // byte 1: 0x56
    // byte 2: 0x34
    // byte 3: 0x12

    int count = 0;
    // Extract the first byte (LSB)
    count += BIT_COUNT_LOOKUP_TABLE[n & 0xFF];
    // Shift right by 8 bits to get the next byte
    n >>= 8;
    count += BIT_COUNT_LOOKUP_TABLE[n & 0xFF];
    n >>= 8;
    count += BIT_COUNT_LOOKUP_TABLE[n & 0xFF];
    n >>= 8;
    count += BIT_COUNT_LOOKUP_TABLE[n & 0xFF];
    
    return count;
}

// --- Problem 2: Check if a number is a power of two ---

bool BitManipulationSolver::isPowerOfTwo(uint32_t n) {
    // A number `n` is a power of two if and only if:
    // 1. `n` is positive (n > 0). Powers of two are always positive.
    // 2. `n` has only one set bit in its binary representation.
    //    For example: 1 (0001), 2 (0010), 4 (0100), 8 (1000).
    //
    // The trick `n & (n - 1)` clears the least significant set bit.
    // If `n` has only one set bit, say at position `k`, then `n` is `2^k`.
    // `n - 1` will have all bits from `0` to `k-1` set, and the `k`-th bit cleared.
    // Example: n = 8 (1000)
    //          n-1 = 7 (0111)
    //          n & (n-1) = 1000 & 0111 = 0000 (0)
    // If `n` has more than one set bit, `n & (n - 1)` will be non-zero.
    // Example: n = 6 (0110)
    //          n-1 = 5 (0101)
    //          n & (n-1) = 0110 & 0101 = 0100 (4), which is not 0.
    return (n > 0) && ((n & (n - 1)) == 0);
}

// --- Problem 3: Reverse Bits ---

uint32_t BitManipulationSolver::reverseBits(uint32_t n) {
    uint32_t reversed_n = 0;
    // Iterate 32 times for a 32-bit integer.
    // In each iteration, we take the least significant bit from `n`
    // and place it into the most significant available position in `reversed_n`.
    for (int i = 0; i < 32; ++i) {
        // Shift `reversed_n` left by 1 to make space for the next bit.
        // This effectively moves existing bits towards MSB.
        reversed_n <<= 1;

        // Get the least significant bit of `n`.
        // If (n & 1) is 1, it means the LSB of `n` is 1.
        if ((n & 1) == 1) {
            // Add this bit to `reversed_n`. Since `reversed_n` was just shifted left,
            // its LSB is 0, so ORing with 1 will set it.
            reversed_n |= 1;
        }
        
        // Right shift `n` by 1 to process the next bit (which was originally the second LSB).
        n >>= 1;
    }
    return reversed_n;
}

// --- Problem 4: Single Number ---

int BitManipulationSolver::singleNumber(const std::vector<int>& nums) {
    int unique_num = 0;
    // The XOR operator has the following properties:
    // 1. `a ^ a = 0` (XORing a number with itself results in 0)
    // 2. `a ^ 0 = a` (XORing a number with 0 results in the number itself)
    // 3. XOR is associative and commutative: `(a ^ b) ^ c = a ^ (b ^ c)` and `a ^ b = b ^ a`.
    //
    // If we XOR all numbers in the array, all pairs of identical numbers will cancel out to 0,
    // leaving only the unique number XORed with 0, which results in the unique number itself.
    // Example: nums = [4, 1, 2, 1, 2]
    // unique_num = 0
    // unique_num = 0 ^ 4 = 4
    // unique_num = 4 ^ 1 = 5 (binary 0100 ^ 0001 = 0101)
    // unique_num = 5 ^ 2 = 7 (binary 0101 ^ 0010 = 0111)
    // unique_num = 7 ^ 1 = 6 (binary 0111 ^ 0001 = 0110)
    // unique_num = 6 ^ 2 = 4 (binary 0110 ^ 0010 = 0100)
    // Result: 4
    for (int num : nums) {
        unique_num ^= num;
    }
    return unique_num;
}

// --- Problem 5: Insert M into N ---

uint32_t BitManipulationSolver::insertMIntoN(uint32_t N, uint32_t M, int i, int j) {
    // Validate input ranges for i and j
    if (i < 0 || j > 31 || i > j) {
        throw std::invalid_argument("Invalid bit positions: i must be >= 0, j must be <= 31, and i <= j.");
    }

    // Step 1: Create a mask to clear bits from j down to i in N.
    // There are two parts to this mask:
    // a. Bits from 0 to i-1 should be 1s. This is `~((1 << i) - 1)` for 32-bit, or `~0 << i`.
    //    More simply, all ones shifted left by i: `~0 << (j + 1)`.
    // b. Bits from j+1 to 31 should be 1s. This is `~((1 << (j + 1)) - 1)`.
    //
    // A clearer way:
    // Create an all-ones mask: `~0u` (unsigned to ensure all 1s for 32 bits)
    // Create a mask for bits from j+1 to 31: `allOnes << (j + 1)`
    // Create a mask for bits from 0 to i-1: `(1 << i) - 1` (or 0 if i=0)

    // Example with N=1024 (10000000000), M=19 (10011), i=2, j=6
    // Binary positions: ... 10 9 8 7 6 5 4 3 2 1 0
    // N:                 ... 1  0 0 0 0 0 0 0 0 0 0
    // M:                             1 0 0 1 1      (will be inserted at positions 2-6)

    // Create a mask for the bits to the left of j (MSB side):
    // If j is 31, this mask is 0. Otherwise, it's 1s from bit j+1 to 31.
    // `~0 << (j + 1)` generates a mask like `111...100...00` where `j+1` zeros are at the right.
    // For j=6, `j+1=7`. `~0 << 7` would be `111...10000000`.
    uint32_t left_mask = (~0u) << (j + 1);

    // Create a mask for the bits to the right of i (LSB side):
    // `(1 << i) - 1` generates a mask like `00...011...11` where `i` ones are at the right.
    // For i=2, `(1 << 2) - 1` is `(4 - 1) = 3`, binary `00...0011`.
    uint32_t right_mask = (1 << i) - 1;

    // Combine these two masks to get a mask that has 1s everywhere EXCEPT between i and j.
    // This mask will be used to clear bits in N.
    uint32_t clear_mask = left_mask | right_mask;
    // Example clear_mask for i=2, j=6 (32-bit):
    // left_mask (j=6): 11...110000000 (bits 7-31 are 1, bits 0-6 are 0)
    // right_mask (i=2): 00...000000011 (bits 0-1 are 1, bits 2-31 are 0)
    // clear_mask:      11...110000011 (bits 7-31 are 1, bits 2-6 are 0, bits 0-1 are 1)

    // Step 2: Clear the relevant bits in N using the clear_mask.
    // `N & clear_mask` will set all bits between i and j to 0, preserving others.
    // N:               10000000000 (1024)
    // clear_mask:      111111111111111111111111111000011 (for i=2, j=6 assuming 32-bit)
    // N_cleared:       10000000000 & 11...110000011 = 10000000000 (N's bits 2-6 were already 0, so no change)
    uint32_t N_cleared = N & clear_mask;

    // Step 3: Shift M to the correct position `i`.
    // M: 10011 (19)
    // M_shifted = 10011 << 2 = 1001100 (76)
    uint32_t M_shifted = M << i;

    // Step 4: OR the modified N with the shifted M.
    // N_cleared: 10000000000
    // M_shifted: 000001001100 (aligned for i=2, j=6)
    // Result:    10001001100
    return N_cleared | M_shifted;
}
```