```markdown
# Bit Manipulation Coding Interview Project

This project is a comprehensive guide and implementation for common bit manipulation problems frequently encountered in coding interviews. It provides optimized solutions, alternative approaches, detailed explanations, and performance benchmarks.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
    *   [1. Count Set Bits (Hamming Weight)](#1-count-set-bits-hamming-weight)
    *   [2. Single Number](#2-single-number)
    *   [3. Reverse Bits](#3-reverse-bits)
    *   [4. Check if a number is a Power of Two](#4-check-if-a-number-is-a-power-of-two)
    *   [5. Check if a number is a Power of Four](#5-check-if-a-number-is-a-power-of-four)
3.  [How to Compile and Run](#how-to-compile-and-run)
4.  [Documentation Details](#documentation-details)
5.  [Contributing](#contributing)

---

## Project Structure

```
bit_manipulation_project/
├── src/
│   ├── bit_manipulation_optimized.cpp       // Main optimized solutions
│   ├── bit_manipulation_bruteforce.cpp      // Brute-force/alternative solutions for comparison
│   ├── bit_manipulation_utils.h             // Helper utilities (e.g., print binary, test assertions)
│   ├── bit_manipulation_utils.cpp           // Implementation for utilities
│   └── main.cpp                             // Entry point to demonstrate usage
├── tests/
│   └── test_bit_manipulation.cpp            // Extensive unit tests
├── benchmarking/
│   └── benchmark.cpp                        // Performance comparison between approaches
├── docs/
│   ├── README.md                            // Project overview, problem descriptions, how to run (THIS FILE)
│   ├── algorithms.md                        // Detailed algorithm explanations, logic, complexity
│   ├── diagrams.txt                         // ASCII art visual aids
│   └── interview_tips.md                    // Edge cases, gotchas, interview variations, tips
└── .gitignore                               // Standard git ignore
```

## Problems Covered

### 1. Count Set Bits (Hamming Weight)

**Description:** Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Example:**
Input: `n = 00000000000000000000000000001011` (decimal 11)
Output: `3` (since 11 has 3 set bits)

**Solutions:**
*   `countSetBits_Kernighan` (Optimized): Brian Kernighan's algorithm.
*   `countSetBits_Shift` (Optimized): Iterative shifting and checking LSB.
*   `countSetBits_Brute` (Brute Force): Repeated division and modulus.

### 2. Single Number

**Description:** Given a non-empty array of integers, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example:**
Input: `nums = [4, 1, 2, 1, 2]`
Output: `4`

**Solutions:**
*   `singleNumber` (Optimized): Using the XOR bitwise property.
*   `singleNumber_Brute_HashMap` (Brute Force): Using a hash map for frequency counting.

### 3. Reverse Bits

**Description:** Reverse the bits of a given unsigned 32-bit integer.

**Example:**
Input: `n = 00000010100101000001111010011100` (decimal 964176124)
Output: `00111001011110000010100101000000` (decimal 1887399424)

**Solutions:**
*   `reverseBits` (Optimized): Iterative shifting and building the reversed number.
*   `reverseBits_Brute` (Brute Force): Arithmetic operations for shifting/modulus.

### 4. Check if a number is a Power of Two

**Description:** Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`. An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.

**Example:**
Input: `n = 16`
Output: `true` (since `16 = 2^4`)

**Solutions:**
*   `isPowerOfTwo` (Optimized): Using the `n > 0 && (n & (n - 1)) == 0` property.
*   `isPowerOfTwo_Brute` (Brute Force): Repeated division by 2.

### 5. Check if a number is a Power of Four

**Description:** Given an integer `n`, return `true` if it is a power of four. Otherwise, return `false`. An integer `n` is a power of four, if there exists an integer `x` such that `n == 4^x`.

**Example:**
Input: `n = 64`
Output: `true` (since `64 = 4^3`)

**Solutions:**
*   `isPowerOfFour` (Optimized): Combining power of two check with a bitmask `(n & 0x55555555) != 0`.
*   `isPowerOfFour_Brute` (Brute Force): Repeated division by 4.

---

## How to Compile and Run

This project uses standard C++ features and can be compiled with `g++` (or Clang++).

**1. Navigate to the project root:**

```bash
cd bit_manipulation_project
```

**2. Compile the `main` demonstration:**

```bash
g++ -std=c++17 -O2 src/*.cpp -o bin/bit_demo
```
*(You might need to create a `bin` directory first: `mkdir bin`)*

**3. Run the demonstration:**

```bash
./bin/bit_demo
```

**4. Compile and Run Tests:**

```bash
g++ -std=c++17 -O2 tests/test_bit_manipulation.cpp src/*.cpp -o bin/test_runner
./bin/test_runner
```

**5. Compile and Run Benchmarks:**

```bash
g++ -std=c++17 -O2 benchmarking/benchmark.cpp src/*.cpp -o bin/benchmark_runner
./bin/benchmark_runner
```
*(Note: Use `-O2` or `-O3` for benchmarks to get realistic performance numbers, as compiler optimizations can heavily impact bit manipulation code.)*

---

## Documentation Details

*   **`docs/algorithms.md`**: Provides in-depth explanations of the logic behind each optimized solution, including step-by-step walkthroughs and formal time/space complexity analysis.
*   **`docs/diagrams.txt`**: Contains ASCII art diagrams to visually explain complex bitwise operations, such as Brian Kernighan's algorithm or the power of two check.
*   **`docs/interview_tips.md`**: Offers guidance on how to approach bit manipulation problems in interviews, common pitfalls, edge cases to consider, and variations of the problems presented.

---

## Contributing

Feel free to open issues or pull requests if you have suggestions for improvements, find bugs, or want to add more problems/solutions.
```