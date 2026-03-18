```cpp
#ifndef BIT_MANIPULATION_H
#define BIT_MANIPULATION_H

#include <cstdint> // For uint32_t
#include <vector>
#include <string>

// Problem 1: Count Set Bits (Hamming Weight)
namespace CountSetBits {
    // Approach 1: Simple iteration (right shift and check LSB)
    int countSetBits_iterative(uint32_t n);

    // Approach 2: Brian Kernighan's Algorithm (n & (n-1))
    int countSetBits_brianKernighan(uint32_t n);

    // Approach 3: Precomputed Lookup Table (for bytes)
    void initializeLookupTable();
    int countSetBits_lookupTable(uint32_t n);
} // namespace CountSetBits

// Problem 2: Single Number III (Find two unique numbers)
namespace SingleNumberIII {
    // Approach 1: XOR properties
    std::vector<int> findTwoUniqueNumbers(std::vector<int>& nums);
} // namespace SingleNumberIII

// Problem 3: Power of Two
namespace PowerOfTwo {
    // Approach 1: Loop and divide
    bool isPowerOfTwo_loop(int n);

    // Approach 2: Bit manipulation (n > 0 && (n & (n - 1)) == 0)
    bool isPowerOfTwo_bitManipulation(int n);
} // namespace PowerOfTwo

// Problem 4: Reverse Bits
namespace ReverseBits {
    // Approach 1: Iterative shifting
    uint32_t reverseBits_iterative(uint32_t n);
} // namespace ReverseBits

// Problem 5: Insert M into N (Update Bits)
namespace UpdateBits {
    // Approach 1: Clear bits, then set bits
    int updateBits(int n, int m, int i, int j);
} // namespace UpdateBits

#endif // BIT_MANIPULATION_H
```