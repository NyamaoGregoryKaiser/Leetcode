```cpp
#include "utils.h"
#include <algorithm> // For std::reverse
#include <limits>    // For numeric_limits

/**
 * @brief Converts an unsigned 32-bit integer to its binary string representation.
 *        Adds spaces every 4 bits for readability.
 * @param n The unsigned 32-bit integer.
 * @param bits The total number of bits to represent (default 32).
 * @return A string representing the binary form of the number.
 */
std::string toBinaryString(uint32_t n, int bits) {
    if (bits <= 0 || bits > 32) {
        bits = 32; // Default to 32 bits if invalid
    }

    std::string binaryString;
    for (int i = bits - 1; i >= 0; --i) {
        binaryString += ((n >> i) & 1) ? '1' : '0';
        if (i > 0 && i % 4 == 0) { // Add space every 4 bits
            binaryString += ' ';
        }
    }
    return binaryString;
}

/**
 * @brief Converts a signed integer to its binary string representation.
 *        Adds spaces every 4 bits for readability.
 *        Handles negative numbers using two's complement representation correctly.
 * @param n The signed integer.
 * @param bits The total number of bits to represent (default 32).
 * @return A string representing the binary form of the number.
 */
std::string toBinaryString(int n, int bits) {
    if (bits <= 0 || bits > std::numeric_limits<int>::digits + 1) { // digits+1 for sign bit
        bits = std::numeric_limits<int>::digits + 1; // Default to int's total bits
    }

    std::string binaryString;
    // For signed integers, cast to unsigned to handle bitwise operations correctly,
    // especially for negative numbers where right shift behavior can be implementation-defined (arithmetic vs logical)
    // or for getting the proper two's complement representation.
    uint32_t unsigned_n = static_cast<uint32_t>(n);

    for (int i = bits - 1; i >= 0; --i) {
        binaryString += ((unsigned_n >> i) & 1) ? '1' : '0';
        if (i > 0 && i % 4 == 0) { // Add space every 4 bits
            binaryString += ' ';
        }
    }
    return binaryString;
}

```