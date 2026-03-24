#include "AdditionalBitManipulationSolutions.hpp" // Header for this file
#include <vector> // For lookup table
#include <numeric> // For std::accumulate

namespace AdditionalBitManipulation {

    // Precomputed lookup table for 8-bit numbers
    // This will be initialized once when the program starts.
    std::vector<int> byte_popcount_lookup(256);

    // Helper to initialize the lookup table
    // Not thread-safe if called from multiple threads simultaneously
    // before main starts, but fine for typical single-threaded init.
    struct LookupTableInitializer {
        LookupTableInitializer() {
            for (int i = 0; i < 256; ++i) {
                int count = 0;
                unsigned char temp = i;
                while (temp > 0) {
                    temp &= (temp - 1); // Brian Kernighan for each byte
                    count++;
                }
                byte_popcount_lookup[i] = count;
            }
            // std::cout << "Lookup table for popcount initialized." << std::endl; // Debug
        }
    };
    // Create a static instance to ensure initialization before main()
    static LookupTableInitializer _initializer;


    // --- Problem 1: Count Set Bits (Hamming Weight) ---

    // Approach 1: Brute Force / Naive Loop
    // Time Complexity: O(B), where B is the number of bits (e.g., 32).
    // Space Complexity: O(1).
    int countSetBits_BruteForce(unsigned int n) {
        int count = 0;
        // Loop 32 times for a 32-bit unsigned int.
        // In each iteration, check the current rightmost bit.
        // Then shift the number to the right to expose the next bit.
        for (int i = 0; i < 32; ++i) {
            // If the LSB is 1, increment count.
            if ((n & 1) == 1) {
                count++;
            }
            n >>= 1; // Shift right by 1 to process the next bit
        }
        return count;
    }

    // Approach 2: Brian Kernighan's Algorithm (optimal general-purpose)
    // This is already in main solutions, but included here for completeness of different approaches.
    // Time Complexity: O(k), where k is the number of set bits. In the worst case, k = B (all bits set), so O(B).
    // Space Complexity: O(1).
    // int countSetBits_BrianKernighan(unsigned int n) { ... } (refer to BitManipulationSolutions.cpp)

    // Approach 3: Lookup Table (for byte-sized chunks)
    // Time Complexity: O(B/8) or O(C), where C is the number of bytes (e.g., 4 for a 32-bit int).
    // Space Complexity: O(2^8) or O(256) for the lookup table.
    int countSetBits_LookupTable(unsigned int n) {
        // Break the 32-bit integer into four 8-bit bytes
        // and sum their precomputed set bit counts.
        int count = 0;
        count += byte_popcount_lookup[n & 0xFF];        // Least significant byte
        count += byte_popcount_lookup[(n >> 8) & 0xFF];
        count += byte_popcount_lookup[(n >> 16) & 0xFF];
        count += byte_popcount_lookup[(n >> 24) & 0xFF]; // Most significant byte
        return count;
    }

} // namespace AdditionalBitManipulation

---