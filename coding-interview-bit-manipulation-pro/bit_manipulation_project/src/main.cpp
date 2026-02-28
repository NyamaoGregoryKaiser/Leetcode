```cpp
#include "bit_manipulation_solver.hpp"
#include <iostream>
#include <vector>
#include <iomanip> // For std::hex, std::setw, std::setfill
#include <algorithm> // For std::reverse (if needed, not directly used here but good to include)

// Helper function to print binary representation of a 32-bit unsigned integer
void printBinary(uint32_t n, const std::string& label = "") {
    if (!label.empty()) {
        std::cout << label << ": ";
    }
    std::string binaryString;
    for (int i = 31; i >= 0; --i) {
        binaryString += ((n >> i) & 1) ? '1' : '0';
        if (i % 8 == 0 && i != 0) { // Add space every 8 bits for readability
            binaryString += ' ';
        }
    }
    std::cout << binaryString << std::endl;
}

int main() {
    std::cout << "--- Bit Manipulation Solver Demonstrations ---" << std::endl;
    std::cout << std::endl;

    // --- Problem 1: Count Set Bits (Hamming Weight) ---
    std::cout << "1. Count Set Bits (Hamming Weight)" << std::endl;
    uint32_t num1 = 2863311530u; // Binary: 10101010101010101010101010101010 (all alternating bits)
    uint32_t num2 = 0b11111111111111111111111111111111u; // All 1s
    uint32_t num3 = 0; // All 0s
    uint32_t num4 = 0b10000000000000000000000000000000u; // MSB set
    uint32_t num5 = 0b00000000000000000000000000000001u; // LSB set

    std::cout << "Number: " << num1 << " (0x" << std::hex << num1 << std::dec << ")"<< std::endl;
    printBinary(num1, "Binary");
    std::cout << "  Brute Force: " << BitManipulationSolver::countSetBits_BruteForce(num1) << std::endl;
    std::cout << "  Kernighan:   " << BitManipulationSolver::countSetBits_Kernighan(num1) << std::endl;
    std::cout << "  Lookup Table: " << BitManipulationSolver::countSetBits_LookupTable(num1) << std::endl;
    std::cout << std::endl;

    std::cout << "Number: " << num2 << " (0x" << std::hex << num2 << std::dec << ")"<< std::endl;
    printBinary(num2, "Binary");
    std::cout << "  Brute Force: " << BitManipulationSolver::countSetBits_BruteForce(num2) << std::endl;
    std::cout << "  Kernighan:   " << BitManipulationSolver::countSetBits_Kernighan(num2) << std::endl;
    std::cout << "  Lookup Table: " << BitManipulationSolver::countSetBits_LookupTable(num2) << std::endl;
    std::cout << std::endl;

    std::cout << "Number: " << num3 << " (0x" << std::hex << num3 << std::dec << ")"<< std::endl;
    printBinary(num3, "Binary");
    std::cout << "  Brute Force: " << BitManipulationSolver::countSetBits_BruteForce(num3) << std::endl;
    std::cout << "  Kernighan:   " << BitManipulationSolver::countSetBits_Kernighan(num3) << std::endl;
    std::cout << "  Lookup Table: " << BitManipulationSolver::countSetBits_LookupTable(num3) << std::endl;
    std::cout << std::endl;

    // --- Problem 2: Check if a number is a power of two ---
    std::cout << "2. Check if a number is a Power of Two" << std::endl;
    uint32_t p_test1 = 16;  // 10000
    uint32_t p_test2 = 0;   // Not a power of two
    uint32_t p_test3 = 1;   // 1 is 2^0
    uint32_t p_test4 = 7;   // 111
    uint32_t p_test5 = 2048; // 2^11

    std::cout << p_test1 << " is power of two? " << (BitManipulationSolver::isPowerOfTwo(p_test1) ? "Yes" : "No") << std::endl;
    std::cout << p_test2 << " is power of two? " << (BitManipulationSolver::isPowerOfTwo(p_test2) ? "Yes" : "No") << std::endl;
    std::cout << p_test3 << " is power of two? " << (BitManipulationSolver::isPowerOfTwo(p_test3) ? "Yes" : "No") << std::endl;
    std::cout << p_test4 << " is power of two? " << (BitManipulationSolver::isPowerOfTwo(p_test4) ? "Yes" : "No") << std::endl;
    std::cout << p_test5 << " is power of two? " << (BitManipulationSolver::isPowerOfTwo(p_test5) ? "Yes" : "No") << std::endl;
    std::cout << std::endl;

    // --- Problem 3: Reverse Bits ---
    std::cout << "3. Reverse Bits" << std::endl;
    uint32_t r_test1 = 0b00000010100101000001111010011100u; // Example from problem statement
    uint32_t r_test2 = 0b11111111111111111111111111111111u; // All 1s
    uint32_t r_test3 = 0b00000000000000000000000000000000u; // All 0s
    uint32_t r_test4 = 0b00000000000000000000000000000001u; // LSB set
    uint32_t r_test5 = 0b10000000000000000000000000000000u; // MSB set

    std::cout << "Original: " << r_test1 << std::endl;
    printBinary(r_test1, "Binary (Orig)");
    uint32_t r_test1_rev = BitManipulationSolver::reverseBits(r_test1);
    std::cout << "Reversed: " << r_test1_rev << std::endl;
    printBinary(r_test1_rev, "Binary (Rev)");
    std::cout << std::endl;

    std::cout << "Original: " << r_test2 << std::endl;
    printBinary(r_test2, "Binary (Orig)");
    uint32_t r_test2_rev = BitManipulationSolver::reverseBits(r_test2);
    std::cout << "Reversed: " << r_test2_rev << std::endl;
    printBinary(r_test2_rev, "Binary (Rev)");
    std::cout << std::endl;

    std::cout << "Original: " << r_test3 << std::endl;
    printBinary(r_test3, "Binary (Orig)");
    uint32_t r_test3_rev = BitManipulationSolver::reverseBits(r_test3);
    std::cout << "Reversed: " << r_test3_rev << std::endl;
    printBinary(r_test3_rev, "Binary (Rev)");
    std::cout << std::endl;

    std::cout << "Original: " << r_test4 << std::endl;
    printBinary(r_test4, "Binary (Orig)");
    uint32_t r_test4_rev = BitManipulationSolver::reverseBits(r_test4);
    std::cout << "Reversed: " << r_test4_rev << std::endl;
    printBinary(r_test4_rev, "Binary (Rev)");
    std::cout << std::endl;

    // --- Problem 4: Single Number ---
    std::cout << "4. Single Number" << std::endl;
    std::vector<int> s_test1 = {2, 2, 1};
    std::vector<int> s_test2 = {4, 1, 2, 1, 2};
    std::vector<int> s_test3 = {1};
    std::vector<int> s_test4 = {7, 3, 5, 4, 5, 3, 7};

    std::cout << "Numbers: [2, 2, 1] -> Single: " << BitManipulationSolver::singleNumber(s_test1) << std::endl;
    std::cout << "Numbers: [4, 1, 2, 1, 2] -> Single: " << BitManipulationSolver::singleNumber(s_test2) << std::endl;
    std::cout << "Numbers: [1] -> Single: " << BitManipulationSolver::singleNumber(s_test3) << std::endl;
    std::cout << "Numbers: [7, 3, 5, 4, 5, 3, 7] -> Single: " << BitManipulationSolver::singleNumber(s_test4) << std::endl;
    std::cout << std::endl;

    // --- Problem 5: Insert M into N ---
    std::cout << "5. Insert M into N" << std::endl;
    uint32_t N_val, M_val;
    int i_pos, j_pos;
    uint32_t result;

    // Example 1
    N_val = 0b10000000000; // 1024
    M_val = 0b10011;       // 19
    i_pos = 2; j_pos = 6;
    std::cout << "N = " << N_val << " (" << std::hex << "0x" << N_val << std::dec << "), M = " << M_val << " (" << std::hex << "0x" << M_val << std::dec << "), i=" << i_pos << ", j=" << j_pos << std::endl;
    printBinary(N_val, "N Binary");
    printBinary(M_val, "M Binary");
    try {
        result = BitManipulationSolver::insertMIntoN(N_val, M_val, i_pos, j_pos);
        std::cout << "Result: " << result << " (" << std::hex << "0x" << result << std::dec << ")" << std::endl;
        printBinary(result, "Result Binary");
    } catch (const std::invalid_argument& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    std::cout << std::endl;

    // Example 2: Insert into all 1s
    N_val = ~0u; // All 1s
    M_val = 0b01010;       // 10
    i_pos = 8; j_pos = 12;
    std::cout << "N = " << N_val << " (All 1s), M = " << M_val << " (" << std::hex << "0x" << M_val << std::dec << "), i=" << i_pos << ", j=" << j_pos << std::endl;
    printBinary(N_val, "N Binary");
    printBinary(M_val, "M Binary");
    try {
        result = BitManipulationSolver::insertMIntoN(N_val, M_val, i_pos, j_pos);
        std::cout << "Result: " << result << " (" << std::hex << "0x" << result << std::dec << ")" << std::endl;
        printBinary(result, "Result Binary");
    } catch (const std::invalid_argument& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    std::cout << std::endl;
    
    // Example 3: Invalid i, j
    N_val = 123; M_val = 45; i_pos = 10; j_pos = 5;
    std::cout << "N = " << N_val << ", M = " << M_val << ", i=" << i_pos << ", j=" << j_pos << std::endl;
    try {
        result = BitManipulationSolver::insertMIntoN(N_val, M_val, i_pos, j_pos);
        std::cout << "Result: " << result << std::endl; // Should not reach here
    } catch (const std::invalid_argument& e) {
        std::cerr << "Caught expected error: " << e.what() << std::endl;
    }
    std::cout << std::endl;

    std::cout << "--- Demonstrations Complete ---" << std::endl;

    return 0;
}
```