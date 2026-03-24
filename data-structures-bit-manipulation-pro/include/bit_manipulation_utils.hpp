#ifndef BIT_MANIPULATION_UTILS_HPP
#define BIT_MANIPULATION_UTILS_HPP

#include <iostream>
#include <string>
#include <algorithm> // For std::reverse

namespace BitUtils {

/**
 * @brief Prints the binary representation of an unsigned integer.
 * @param n The unsigned integer to print.
 * @param bits The number of bits to display (e.g., 32 for unsigned int).
 */
void printBinary(unsigned int n, int bits = 32) {
    std::string binaryString;
    if (n == 0) {
        binaryString = "0";
        for (int i = 0; i < bits - 1; ++i) binaryString = "0" + binaryString;
    } else {
        for (int i = 0; i < bits; ++i) {
            binaryString += ((n >> (bits - 1 - i)) & 1) ? '1' : '0';
        }
    }
    std::cout << binaryString;
}

/**
 * @brief Prints the binary representation of a signed integer.
 * @param n The signed integer to print.
 * @param bits The number of bits to display (e.g., 32 for int).
 */
void printBinary(int n, int bits = 32) {
    // For signed integers, cast to unsigned to handle two's complement correctly
    printBinary(static_cast<unsigned int>(n), bits);
}

/**
 * @brief Simple assertion function for testing.
 * @param condition The condition to check.
 * @param testName A string describing the test.
 */
void assertCondition(bool condition, const std::string& testName) {
    if (condition) {
        std::cout << "[PASS] " << testName << std::endl;
    } else {
        std::cerr << "[FAIL] " << testName << std::endl;
        // Optionally, throw an exception or exit to stop on first failure
        // exit(EXIT_FAILURE);
    }
}

} // namespace BitUtils

#endif // BIT_MANIPULATION_UTILS_HPP

---