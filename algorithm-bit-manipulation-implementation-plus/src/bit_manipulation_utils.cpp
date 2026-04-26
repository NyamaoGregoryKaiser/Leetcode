```cpp
#include "bit_manipulation_utils.h"

namespace BitManipulation
{

void printBinary(uint32_t n)
{
    std::string binaryString;
    for (int i = 31; i >= 0; --i)
    {
        binaryString += ((n >> i) & 1) ? '1' : '0';
        if (i % 8 == 0 && i != 0) // Add spaces for readability every 8 bits
        {
            binaryString += ' ';
        }
    }
    std::cout << "Binary: " << binaryString << std::endl;
}

void printBinary(int32_t n)
{
    // For signed integers, cast to unsigned for bitwise operations to avoid
    // implementation-defined behavior for negative numbers with right shift.
    // The print logic for two's complement will naturally apply.
    printBinary(static_cast<uint32_t>(n));
}

bool testAssertion(bool condition, const std::string& description, const std::string& expected, const std::string& actual)
{
    if (condition)
    {
        std::cout << "[PASS] " << description << std::endl;
        return true;
    }
    else
    {
        std::cerr << "[FAIL] " << description;
        if (!expected.empty() || !actual.empty()) {
            std::cerr << " Expected: " << expected << ", Got: " << actual;
        }
        std::cerr << std::endl;
        return false;
    }
}

} // namespace BitManipulation
```