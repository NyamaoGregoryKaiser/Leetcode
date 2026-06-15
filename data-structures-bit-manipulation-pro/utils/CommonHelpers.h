#ifndef COMMON_HELPERS_H
#define COMMON_HELPERS_H

#include <string>
#include <cstdint> // For uint32_t
#include <algorithm> // For std::reverse

namespace Utils {

/**
 * @brief Converts an unsigned 32-bit integer to its binary string representation.
 *        Pads with leading zeros to always be 32 bits long.
 * @param n The unsigned 32-bit integer.
 * @return A string representing the binary form of n.
 */
inline std::string printBinary(uint32_t n, int num_bits = 32) {
    if (n == 0) {
        return std::string(num_bits, '0');
    }

    std::string binaryString;
    int count = 0;
    while (n > 0 || count < num_bits) {
        binaryString += ((n & 1) ? '1' : '0');
        n >>= 1;
        count++;
    }
    // Pad with leading zeros if the number of bits is less than num_bits
    while (binaryString.length() < num_bits) {
        binaryString += '0';
    }
    std::reverse(binaryString.begin(), binaryString.end());
    return binaryString;
}

} // namespace Utils

#endif // COMMON_HELPERS_H
```
---