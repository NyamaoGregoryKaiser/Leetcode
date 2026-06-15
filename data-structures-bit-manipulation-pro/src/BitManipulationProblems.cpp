#include "BitManipulationProblems.h"
#include <climits> // For CHAR_BIT (number of bits in a byte)
#include <vector>
#include <numeric> // For std::accumulate (in one version of singleNumber)

// For countSetBitsLookupTable, we can initialize a static lookup table
// This table will be initialized once when the program starts.
static unsigned char g_lookupTable256[256];
static bool g_lookupTableInitialized = false;

// Helper function to initialize the lookup table
static void initializeLookupTable() {
    if (!g_lookupTableInitialized) {
        g_lookupTable256[0] = 0;
        for (int i = 1; i < 256; ++i) {
            g_lookupTable256[i] = (i & 1) + g_lookupTable256[i >> 1];
        }
        g_lookupTableInitialized = true;
    }
}

namespace BitManipulation {

// --- Problem 1: Count Set Bits (Hamming Weight) ---

int Solution::countSetBitsIterative(uint32_t n) {
    int count = 0;
    // Iterate through all 32 bits
    for (int i = 0; i < 32; ++i) {
        // Check if the least significant bit is 1
        if ((n >> i) & 1) {
            count++;
        }
    }
    return count;
}

int Solution::countSetBitsKernighan(uint32_t n) {
    int count = 0;
    // Loop while n is not zero
    while (n > 0) {
        // `n & (n - 1)` clears the least significant set bit (the rightmost 1)
        // Each time we clear a bit, we increment the count.
        n &= (n - 1);
        count++;
    }
    return count;
}

int Solution::countSetBitsLookupTable(uint32_t n) {
    initializeLookupTable(); // Ensure table is initialized
    int count = 0;
    // Divide the 32-bit integer into 4 bytes (8-bit chunks)
    // and sum their popcounts from the lookup table.
    count += g_lookupTable256[n & 0xFF];        // Least significant byte
    count += g_lookupTable256[(n >> 8) & 0xFF];  // Second byte
    count += g_lookupTable256[(n >> 16) & 0xFF]; // Third byte
    count += g_lookupTable256[(n >> 24) & 0xFF]; // Most significant byte
    return count;
}

int Solution::countSetBitsBuiltin(uint32_t n) {
    // __builtin_popcount is a GCC extension that counts set bits.
    // It typically maps to a single hardware instruction (e.g., POPCNT on x86).
    return __builtin_popcount(n);
}


// --- Problem 2: Check if Power of Two ---

bool Solution::isPowerOfTwoIterative(int n) {
    // Powers of two are always positive.
    if (n <= 0) {
        return false;
    }
    // Continuously divide by 2 until n becomes 1.
    // If at any point n is not divisible by 2, it's not a power of two.
    while (n % 2 == 0) {
        n /= 2;
    }
    // If n becomes 1, it was a power of two.
    return n == 1;
}

bool Solution::isPowerOfTwoBitwise(int n) {
    // A number `n` is a power of two if and only if:
    // 1. It is positive (n > 0). Powers of two are 1, 2, 4, 8, ...
    // 2. Its binary representation has exactly one '1' bit.
    //    For example: 1 (0001), 2 (0010), 4 (0100), 8 (1000).
    //
    // The trick `n & (n - 1)` clears the least significant set bit of `n`.
    // Example: n = 8 (1000)
    //          n - 1 = 7 (0111)
    //          n & (n - 1) = 8 & 7 = 0 (0000)
    //
    // If `n` has only one set bit, then `n - 1` will have all bits to the right
    // of that set bit flipped to 1, and that set bit itself flipped to 0.
    // Thus, `n & (n - 1)` will be 0.
    // If `n` has multiple set bits, `n & (n - 1)` will not be 0.
    // Example: n = 6 (0110)
    //          n - 1 = 5 (0101)
    //          n & (n - 1) = 6 & 5 = 4 (0100) - not 0.
    return (n > 0) && ((n & (n - 1)) == 0);
}


// --- Problem 3: Single Number (Find Unique Element) ---

int Solution::singleNumber(const std::vector<int>& nums) {
    // The XOR operation has the following properties:
    // 1. Commutative: A ^ B = B ^ A
    // 2. Associative: A ^ (B ^ C) = (A ^ B) ^ C
    // 3. Identity: A ^ 0 = A
    // 4. Inverse: A ^ A = 0
    //
    // If we XOR all elements in the array:
    // (a ^ b ^ a ^ c ^ b)
    // Due to commutativity and associativity, this can be rearranged:
    // (a ^ a) ^ (b ^ b) ^ c
    // (0) ^ (0) ^ c
    // 0 ^ c
    // c
    // So, all numbers that appear twice will cancel each other out (XOR to 0),
    // leaving only the unique number.
    
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;

    // Alternative using std::accumulate (less explicit for an interview, but works)
    // return std::accumulate(nums.begin(), nums.end(), 0, std::bit_xor<int>());
}


// --- Problem 4: Reverse Bits ---

uint32_t Solution::reverseBits(uint32_t n) {
    uint32_t reversed_n = 0;
    // A 32-bit unsigned integer has 32 bits.
    for (int i = 0; i < 32; ++i) {
        // 1. Shift the `reversed_n` to the left by 1.
        //    This makes space for the next bit from `n` at the LSB position.
        reversed_n <<= 1;

        // 2. Get the least significant bit (LSB) of `n`.
        //    `(n & 1)` isolates the LSB.
        //    If n is odd, LSB is 1. If n is even, LSB is 0.
        //    Then, OR it with `reversed_n`.
        reversed_n |= (n & 1);

        // 3. Shift `n` to the right by 1.
        //    This effectively discards the LSB of `n` and brings the next bit
        //    into the LSB position for the next iteration.
        n >>= 1;
    }
    return reversed_n;
}


// --- Problem 5: Insert M into N ---

uint32_t Solution::insertBits(uint32_t N, uint32_t M, int i, int j) {
    // Step 1: Create a mask to clear bits in N from j to i (inclusive).
    // This mask will have 0s from bit i to bit j, and 1s everywhere else.

    // Part A: Create a mask of all 1s (e.g., 0xFFFFFFFF for 32-bit).
    // `~0` results in all bits set to 1.
    uint32_t all_ones = ~0; // Equivalent to UINT32_MAX

    // Part B: Create a mask for bits from j+1 to 31 (most significant part).
    // `left_mask` will have 1s from bit j+1 to 31, and 0s from bit j to 0.
    // If j is 31 (most significant bit), then (j + 1) would be 32,
    // and `all_ones << (j + 1)` would result in 0. This is correct.
    uint32_t left_mask = (j == 31) ? 0 : (all_ones << (j + 1));

    // Part C: Create a mask for bits from 0 to i-1 (least significant part).
    // `right_mask` will have 0s from bit i to 31, and 1s from bit i-1 to 0.
    // The expression `(1 << i) - 1` generates a mask with 'i' number of 1s
    // from the right (e.g., if i=2, it's 0b11).
    // If i is 0, then (1 << 0) - 1 = 1 - 1 = 0, which is correct.
    uint32_t right_mask = (1 << i) - 1;

    // Combine left and right masks to get the final clear mask.
    // This mask has 1s everywhere EXCEPT the range [i, j].
    uint32_t clear_mask = left_mask | right_mask;

    // Step 2: Clear bits in N from j to i.
    // `N & clear_mask` will set bits from i to j in N to 0,
    // while preserving all other bits of N.
    uint32_t N_cleared = N & clear_mask;

    // Step 3: Shift M to the left by i positions to align it for insertion.
    uint32_t M_shifted = M << i;

    // Step 4: OR the cleared N with the shifted M.
    // Since the bits in N from i to j are now 0, ORing with M_shifted
    // will effectively "insert" M into that position without affecting other bits.
    return N_cleared | M_shifted;
}

} // namespace BitManipulation
```
---