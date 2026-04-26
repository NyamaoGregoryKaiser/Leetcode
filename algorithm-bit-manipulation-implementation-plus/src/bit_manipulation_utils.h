```cpp
#ifndef BIT_MANIPULATION_UTILS_H
#define BIT_MANIPULATION_UTILS_H

#include <iostream>
#include <string>
#include <vector>
#include <algorithm> // For std::reverse

namespace BitManipulation
{

/**
 * @brief Prints the 32-bit binary representation of an unsigned 32-bit integer.
 *
 * @param n The unsigned 32-bit integer to print.
 */
void printBinary(uint32_t n);

/**
 * @brief Prints the 32-bit binary representation of a signed 32-bit integer.
 *        Note: For negative numbers, it will print the two's complement.
 *
 * @param n The signed 32-bit integer to print.
 */
void printBinary(int32_t n);

/**
 * @brief Simple assertion utility for testing.
 *
 * @param condition The boolean condition to check.
 * @param description A string describing the test case.
 * @param expected A string representation of the expected value.
 * @param actual A string representation of the actual value.
 * @return True if the condition is met, false otherwise.
 */
bool testAssertion(bool condition, const std::string& description, const std::string& expected = "", const std::string& actual = "");

} // namespace BitManipulation

#endif // BIT_MANIPULATION_UTILS_H

```