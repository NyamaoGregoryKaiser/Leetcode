```cpp
#include <iostream>
#include <vector>
#include <string>
#include "bit_manipulation_optimized.h" // Includes all optimized functions
#include "bit_manipulation_bruteforce.h" // Includes all brute-force/alternative functions
#include "bit_manipulation_utils.h"      // Includes utility functions

// Forward declarations for functions defined in other files for main's direct access
// (Alternatively, could include .h files which declare these within BitManipulation namespace)
// For this structure, we include the full .h files and use the namespace.

int main()
{
    std::cout << "--- Bit Manipulation Project Demonstration ---" << std::endl;
    std::cout << "------------------------------------------" << std::endl << std::endl;

    // --- Problem 1: Count Set Bits ---
    std::cout << "Problem 1: Count Set Bits (Hamming Weight)" << std::endl;
    uint32_t num_csb = 0b10110100111010101010101010101010; // Example: 2966144554
    BitManipulation::printBinary(num_csb);
    std::cout << "Number: " << num_csb << std::endl;

    int count_kernighan = BitManipulation::countSetBits_Kernighan(num_csb);
    std::cout << "Optimized (Kernighan): " << count_kernighan << " set bits" << std::endl;

    int count_shift = BitManipulation::countSetBits_Shift(num_csb);
    std::cout << "Optimized (Shift): " << count_shift << " set bits" << std::endl;
    
    int count_brute = BitManipulation::countSetBits_Brute(num_csb);
    std::cout << "Brute Force: " << count_brute << " set bits" << std::endl;
    std::cout << std::endl;

    // --- Problem 2: Single Number ---
    std::cout << "Problem 2: Single Number" << std::endl;
    std::vector<int> nums = {4, 1, 2, 1, 2, 4, 3}; // Expected single: 3
    std::cout << "Array: [";
    for (size_t i = 0; i < nums.size(); ++i) {
        std::cout << nums[i] << (i == nums.size() - 1 ? "" : ", ");
    }
    std::cout << "]" << std::endl;

    int single_optimized = BitManipulation::singleNumber(nums);
    std::cout << "Optimized (XOR): " << single_optimized << std::endl;

    int single_brute = BitManipulation::singleNumber_Brute_HashMap(nums);
    std::cout << "Brute Force (HashMap): " << single_brute << std::endl;
    std::cout << std::endl;

    // --- Problem 3: Reverse Bits ---
    std::cout << "Problem 3: Reverse Bits" << std::endl;
    uint32_t num_rb = 0b00000010100101000001111010011100; // Example: 964176124
    std::cout << "Original Number: " << num_rb << std::endl;
    BitManipulation::printBinary(num_rb);

    uint32_t reversed_optimized = BitManipulation::reverseBits(num_rb);
    std::cout << "Reversed Optimized: " << reversed_optimized << std::endl;
    BitManipulation::printBinary(reversed_optimized);

    uint32_t reversed_brute = BitManipulation::reverseBits_Brute(num_rb);
    std::cout << "Reversed Brute Force: " << reversed_brute << std::endl;
    BitManipulation::printBinary(reversed_brute);
    std::cout << std::endl;

    // --- Problem 4: Check if a number is a Power of Two ---
    std::cout << "Problem 4: Check if Power of Two" << std::endl;
    int p2_test1 = 16;
    int p2_test2 = 15;
    int p2_test3 = 1;
    int p2_test4 = 0;
    int p2_test5 = -4;

    std::cout << p2_test1 << " is Power of Two (Optimized): " << (BitManipulation::isPowerOfTwo(p2_test1) ? "true" : "false") << std::endl;
    std::cout << p2_test1 << " is Power of Two (Brute Force): " << (BitManipulation::isPowerOfTwo_Brute(p2_test1) ? "true" : "false") << std::endl;
    BitManipulation::printBinary(p2_test1);

    std::cout << p2_test2 << " is Power of Two (Optimized): " << (BitManipulation::isPowerOfTwo(p2_test2) ? "true" : "false") << std::endl;
    std::cout << p2_test2 << " is Power of Two (Brute Force): " << (BitManipulation::isPowerOfTwo_Brute(p2_test2) ? "true" : "false") << std::endl;
    BitManipulation::printBinary(p2_test2);

    std::cout << p2_test3 << " is Power of Two (Optimized): " << (BitManipulation::isPowerOfTwo(p2_test3) ? "true" : "false") << std::endl;
    std::cout << p2_test3 << " is Power of Two (Brute Force): " << (BitManipulation::isPowerOfTwo_Brute(p2_test3) ? "true" : "false") << std::endl;
    BitManipulation::printBinary(p2_test3);
    
    std::cout << p2_test4 << " is Power of Two (Optimized): " << (BitManipulation::isPowerOfTwo(p2_test4) ? "true" : "false") << std::endl;
    std::cout << p2_test4 << " is Power of Two (Brute Force): " << (BitManipulation::isPowerOfTwo_Brute(p2_test4) ? "true" : "false") << std::endl;

    std::cout << p2_test5 << " is Power of Two (Optimized): " << (BitManipulation::isPowerOfTwo(p2_test5) ? "true" : "false") << std::endl;
    std::cout << p2_test5 << " is Power of Two (Brute Force): " << (BitManipulation::isPowerOfTwo_Brute(p2_test5) ? "true" : "false") << std::endl;
    BitManipulation::printBinary(p2_test5);
    std::cout << std::endl;

    // --- Problem 5: Check if a number is a Power of Four ---
    std::cout << "Problem 5: Check if Power of Four" << std::endl;
    int p4_test1 = 64;   // 4^3
    int p4_test2 = 8;    // Power of two, but not four
    int p4_test3 = 1;    // 4^0
    int p4_test4 = 0;
    int p4_test5 = 12;

    std::cout << p4_test1 << " is Power of Four (Optimized): " << (BitManipulation::isPowerOfFour(p4_test1) ? "true" : "false") << std::endl;
    std::cout << p4_test1 << " is Power of Four (Brute Force): " << (BitManipulation::isPowerOfFour_Brute(p4_test1) ? "true" : "false") << std::endl;
    BitManipulation::printBinary(p4_test1);

    std::cout << p4_test2 << " is Power of Four (Optimized): " << (BitManipulation::isPowerOfFour(p4_test2) ? "true" : "false") << std::endl;
    std::cout << p4_test2 << " is Power of Four (Brute Force): " << (BitManipulation::isPowerOfFour_Brute(p4_test2) ? "true" : "false") << std::endl;
    BitManipulation::printBinary(p4_test2);

    std::cout << p4_test3 << " is Power of Four (Optimized): " << (BitManipulation::isPowerOfFour(p4_test3) ? "true" : "false") << std::endl;
    std::cout << p4_test3 << " is Power of Four (Brute Force): " << (BitManipulation::isPowerOfFour_Brute(p4_test3) ? "true" : "false") << std::endl;
    BitManipulation::printBinary(p4_test3);

    std::cout << p4_test4 << " is Power of Four (Optimized): " << (BitManipulation::isPowerOfFour(p4_test4) ? "true" : "false") << std::endl;
    std::cout << p4_test4 << " is Power of Four (Brute Force): " << (BitManipulation::isPowerOfFour_Brute(p4_test4) ? "true" : "false") << std::endl;

    std::cout << p4_test5 << " is Power of Four (Optimized): " << (BitManipulation::isPowerOfFour(p4_test5) ? "true" : "false") << std::endl;
    std::cout << p4_test5 << " is Power of Four (Brute Force): " << (BitManipulation::isPowerOfFour_Brute(p4_test5) ? "true" : "false") << std::endl;
    BitManipulation::printBinary(p4_test5);
    std::cout << std::endl;


    std::cout << "--- Demonstration Complete ---" << std::endl;

    return 0;
}
```