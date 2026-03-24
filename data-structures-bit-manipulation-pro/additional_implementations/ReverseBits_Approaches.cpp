#include "AdditionalBitManipulationSolutions.hpp"
#include <vector> // For lookup table
#include <cstdint> // For uint8_t

namespace AdditionalBitManipulation {

    // --- Problem 2: Reverse Bits ---

    // Approach 1: Standard Loop and Shift
    // This is already in main solutions, but included here for completeness of different approaches.
    // unsigned int reverseBits_Standard(unsigned int n) { ... } (refer to BitManipulationSolutions.cpp)

    // Approach 2: Byte-by-Byte Reversal using a precomputed lookup table for byte reversal.
    // This can be very fast if the lookup table is pre-filled.

    // Precomputed lookup table for 8-bit numbers' reversed versions
    // This will be initialized once when the program starts.
    std::vector<uint8_t> byte_reverse_lookup(256);

    // Helper to initialize the lookup table
    struct ByteReverseLookupInitializer {
        ByteReverseLookupInitializer() {
            for (int i = 0; i < 256; ++i) {
                uint8_t byte = i;
                uint8_t reversed_byte = 0;
                for (int k = 0; k < 8; ++k) {
                    reversed_byte <<= 1;
                    if ((byte & 1) == 1) {
                        reversed_byte |= 1;
                    }
                    byte >>= 1;
                }
                byte_reverse_lookup[i] = reversed_byte;
            }
            // std::cout << "Lookup table for byte reversal initialized." << std::endl; // Debug
        }
    };
    // Create a static instance to ensure initialization before main()
    static ByteReverseLookupInitializer _initializer;

    // Time Complexity: O(B/8) or O(C), where C is the number of bytes (e.g., 4 for a 32-bit int).
    // Space Complexity: O(2^8) or O(256) for the lookup table.
    unsigned int reverseBits_ByteByByte(unsigned int n) {
        unsigned int reversed_n = 0;

        // Process the least significant byte
        reversed_n |= byte_reverse_lookup[n & 0xFF];
        reversed_n <<= 8; // Shift to make space for the next byte

        // Process the second byte
        reversed_n |= byte_reverse_lookup[(n >> 8) & 0xFF];
        reversed_n <<= 8;

        // Process the third byte
        reversed_n |= byte_reverse_lookup[(n >> 16) & 0xFF];
        reversed_n <<= 8;

        // Process the most significant byte
        reversed_n |= byte_reverse_lookup[(n >> 24) & 0xFF];

        return reversed_n;
    }

} // namespace AdditionalBitManipulation

---