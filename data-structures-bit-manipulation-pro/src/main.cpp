#include "BitManipulationProblems.h"
#include "../utils/CommonHelpers.h" // For printBinary
#include <iostream>
#include <vector>
#include <string>

// Helper function to print results neatly
void printResult(const std::string& description, const std::string& result) {
    std::cout << description << ": " << result << std::endl;
}

int main() {
    BitManipulation::Solution solver;

    std::cout << "--- Bit Manipulation Problems Demo ---" << std::endl << std::endl;

    // --- Problem 1: Count Set Bits (Hamming Weight) ---
    std::cout << "Problem 1: Count Set Bits (Hamming Weight)" << std::endl;
    uint32_t num1 = 11; // 0...01011
    uint32_t num2 = 255; // 0...11111111
    uint32_t num3 = 0xFFFFFFFF; // All ones
    uint32_t num4 = 0; // All zeros
    uint32_t num5 = 0x80000000; // MSB set

    std::cout << "Number: " << num1 << " (" << Utils::printBinary(num1) << ")" << std::endl;
    printResult("  Iterative", std::to_string(solver.countSetBitsIterative(num1)));
    printResult("  Kernighan", std::to_string(solver.countSetBitsKernighan(num1)));
    printResult("  Lookup Table", std::to_string(solver.countSetBitsLookupTable(num1)));
    printResult("  Built-in", std::to_string(solver.countSetBitsBuiltin(num1)));
    std::cout << std::endl;

    std::cout << "Number: " << num2 << " (" << Utils::printBinary(num2) << ")" << std::endl;
    printResult("  Kernighan", std::to_string(solver.countSetBitsKernighan(num2)));
    printResult("  Built-in", std::to_string(solver.countSetBitsBuiltin(num2)));
    std::cout << std::endl;

    std::cout << "Number: " << num3 << " (" << Utils::printBinary(num3) << ")" << std::endl;
    printResult("  Kernighan", std::to_string(solver.countSetBitsKernighan(num3)));
    std::cout << std::endl;

    std::cout << "Number: " << num4 << " (" << Utils::printBinary(num4) << ")" << std::endl;
    printResult("  Kernighan", std::to_string(solver.countSetBitsKernighan(num4)));
    std::cout << std::endl;

    std::cout << "Number: " << num5 << " (" << Utils::printBinary(num5) << ")" << std::endl;
    printResult("  Kernighan", std::to_string(solver.countSetBitsKernighan(num5)));
    std::cout << std::endl;

    // --- Problem 2: Check if Power of Two ---
    std::cout << "Problem 2: Check if Power of Two" << std::endl;
    int p2_num1 = 16;
    int p2_num2 = 3;
    int p2_num3 = 1;
    int p2_num4 = 0;
    int p2_num5 = -4;
    int p2_num6 = 1024;

    std::cout << "Number: " << p2_num1 << std::endl;
    printResult("  Iterative", solver.isPowerOfTwoIterative(p2_num1) ? "true" : "false");
    printResult("  Bitwise", solver.isPowerOfTwoBitwise(p2_num1) ? "true" : "false");
    std::cout << std::endl;

    std::cout << "Number: " << p2_num2 << std::endl;
    printResult("  Bitwise", solver.isPowerOfTwoBitwise(p2_num2) ? "true" : "false");
    std::cout << std::endl;

    std::cout << "Number: " << p2_num3 << std::endl;
    printResult("  Bitwise", solver.isPowerOfTwoBitwise(p2_num3) ? "true" : "false");
    std::cout << std::endl;

    std::cout << "Number: " << p2_num4 << std::endl;
    printResult("  Bitwise", solver.isPowerOfTwoBitwise(p2_num4) ? "true" : "false");
    std::cout << std::endl;

    std::cout << "Number: " << p2_num5 << std::endl;
    printResult("  Bitwise", solver.isPowerOfTwoBitwise(p2_num5) ? "true" : "false");
    std::cout << std::endl;

    std::cout << "Number: " << p2_num6 << std::endl;
    printResult("  Bitwise", solver.isPowerOfTwoBitwise(p2_num6) ? "true" : "false");
    std::cout << std::endl;


    // --- Problem 3: Single Number (Find Unique Element) ---
    std::cout << "Problem 3: Single Number (Find Unique Element)" << std::endl;
    std::vector<int> s_nums1 = {2, 2, 1};
    std::vector<int> s_nums2 = {4, 1, 2, 1, 2};
    std::vector<int> s_nums3 = {1};
    std::vector<int> s_nums4 = {7, 8, 7, 9, 8, 10, 9};

    std::cout << "Nums: [2, 2, 1]" << std::endl;
    printResult("  Single Number", std::to_string(solver.singleNumber(s_nums1)));
    std::cout << std::endl;

    std::cout << "Nums: [4, 1, 2, 1, 2]" << std::endl;
    printResult("  Single Number", std::to_string(solver.singleNumber(s_nums2)));
    std::cout << std::endl;

    std::cout << "Nums: [1]" << std::endl;
    printResult("  Single Number", std::to_string(solver.singleNumber(s_nums3)));
    std::cout << std::endl;

    std::cout << "Nums: [7, 8, 7, 9, 8, 10, 9]" << std::endl;
    printResult("  Single Number", std::to_string(solver.singleNumber(s_nums4)));
    std::cout << std::endl;

    // --- Problem 4: Reverse Bits ---
    std::cout << "Problem 4: Reverse Bits" << std::endl;
    uint32_t r_num1 = 43261596; // 00000010100101000001111010011100
    uint32_t r_num2 = 1;        // 0...0001
    uint32_t r_num3 = 0x80000000; // 1000...0000
    uint32_t r_num4 = 0;        // 0...0000

    std::cout << "Original: " << r_num1 << " (" << Utils::printBinary(r_num1) << ")" << std::endl;
    uint32_t reversed1 = solver.reverseBits(r_num1);
    std::cout << "Reversed: " << reversed1 << " (" << Utils::printBinary(reversed1) << ")" << std::endl;
    std::cout << std::endl;

    std::cout << "Original: " << r_num2 << " (" << Utils::printBinary(r_num2) << ")" << std::endl;
    uint32_t reversed2 = solver.reverseBits(r_num2);
    std::cout << "Reversed: " << reversed2 << " (" << Utils::printBinary(reversed2) << ")" << std::endl;
    std::cout << std::endl;

    std::cout << "Original: " << r_num3 << " (" << Utils::printBinary(r_num3) << ")" << std::endl;
    uint32_t reversed3 = solver.reverseBits(r_num3);
    std::cout << "Reversed: " << reversed3 << " (" << Utils::printBinary(reversed3) << ")" << std::endl;
    std::cout << std::endl;

    std::cout << "Original: " << r_num4 << " (" << Utils::printBinary(r_num4) << ")" << std::endl;
    uint32_t reversed4 = solver.reverseBits(r_num4);
    std::cout << "Reversed: " << reversed4 << " (" << Utils::printBinary(reversed4) << ")" << std::endl;
    std::cout << std::endl;


    // --- Problem 5: Insert M into N ---
    std::cout << "Problem 5: Insert M into N" << std::endl;
    uint32_t N1 = 0b10000000000; // 1024
    uint32_t M1 = 0b10011;       // 19
    int i1 = 2, j1 = 6;
    // Expected: 10001001100 (1092)

    uint32_t N2 = 0b11111111111; // All ones (2047)
    uint32_t M2 = 0b000;         // 0
    int i2 = 3, j2 = 5;
    // Expected: 11111000111 (2039)

    uint32_t N3 = 0b10101010; // 170
    uint32_t M3 = 0b11;       // 3
    int i3 = 0, j3 = 1;
    // Expected: 10101011 (171)

    uint32_t N4 = 0xFFFFFFFF; // All ones
    uint32_t M4 = 0;
    int i4 = 0, j4 = 31;
    // Expected: 0 (all cleared)

    std::cout << "N: " << N1 << " (" << Utils::printBinary(N1) << ")" << std::endl;
    std::cout << "M: " << M1 << " (" << Utils::printBinary(M1, j1 - i1 + 1) << "), i=" << i1 << ", j=" << j1 << std::endl;
    uint32_t inserted1 = solver.insertBits(N1, M1, i1, j1);
    std::cout << "Result: " << inserted1 << " (" << Utils::printBinary(inserted1) << ")" << std::endl;
    std::cout << std::endl;

    std::cout << "N: " << N2 << " (" << Utils::printBinary(N2) << ")" << std::endl;
    std::cout << "M: " << M2 << " (" << Utils::printBinary(M2, j2 - i2 + 1) << "), i=" << i2 << ", j=" << j2 << std::endl;
    uint32_t inserted2 = solver.insertBits(N2, M2, i2, j2);
    std::cout << "Result: " << inserted2 << " (" << Utils::printBinary(inserted2) << ")" << std::endl;
    std::cout << std::endl;

    std::cout << "N: " << N3 << " (" << Utils::printBinary(N3) << ")" << std::endl;
    std::cout << "M: " << M3 << " (" << Utils::printBinary(M3, j3 - i3 + 1) << "), i=" << i3 << ", j=" << j3 << std::endl;
    uint32_t inserted3 = solver.insertBits(N3, M3, i3, j3);
    std::cout << "Result: " << inserted3 << " (" << Utils::printBinary(inserted3) << ")" << std::endl;
    std::cout << std::endl;

    std::cout << "N: " << N4 << " (" << Utils::printBinary(N4) << ")" << std::endl;
    std::cout << "M: " << M4 << " (" << Utils::printBinary(M4, j4 - i4 + 1) << "), i=" << i4 << ", j=" << j4 << std::endl;
    uint32_t inserted4 = solver.insertBits(N4, M4, i4, j4);
    std::cout << "Result: " << inserted4 << " (" << Utils::printBinary(inserted4) << ")" << std::endl;
    std::cout << std::endl;

    return 0;
}
```
---