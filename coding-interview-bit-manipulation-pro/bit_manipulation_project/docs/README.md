```markdown
# Bit Manipulation Coding Interview Project

This project serves as a comprehensive resource for mastering Bit Manipulation techniques, a crucial topic for coding interviews. It includes multiple problems, various optimized solutions, detailed explanations, and performance benchmarks.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Problem Descriptions](#problem-descriptions)
3.  [Project Structure](#project-structure)
4.  [How to Compile and Run](#how-to-compile-and-run)
    *   [Prerequisites](#prerequisites)
    *   [Building the Main Executable](#building-the-main-executable)
    *   [Running the Main Executable](#running-the-main-executable)
    *   [Building and Running Tests](#building-and-running-tests)
5.  [Detailed Documentation](#detailed-documentation)
    *   [Algorithm Explanations](docs/ALGORITHM_EXPLANATION.md)
    *   [Interview Tips and Variations](docs/INTERVIEW_TIPS.md)

## Project Overview

The goal of this project is to provide a solid foundation for understanding and implementing bit manipulation algorithms. It covers a range of problems from simple bit counting to more complex insertions and pattern detection. Each problem is tackled with optimal and, where applicable, alternative solutions, along with their time and space complexity analysis.

## Problem Descriptions

Here's a brief overview of the problems addressed in this project. For detailed explanations, examples, and ASCII diagrams, please refer to [ALGORITHM_EXPLANATION.md](docs/ALGORITHM_EXPLANATION.md).

1.  **Count Set Bits (Hamming Weight)**
    *   **Problem:** Count the number of '1' bits in a 32-bit unsigned integer.
    *   **Approaches:** Brute-force (iterating through bits), Brian Kernighan's Algorithm, and Lookup Table method.

2.  **Check if a number is a Power of Two**
    *   **Problem:** Determine if a given positive integer is a power of two.
    *   **Approach:** Utilizes the unique bit pattern of powers of two (`n > 0 && (n & (n - 1)) == 0`).

3.  **Reverse Bits**
    *   **Problem:** Reverse the bits of a 32-bit unsigned integer.
    *   **Approach:** Iteratively builds the reversed number by shifting bits from the source to the destination.

4.  **Single Number**
    *   **Problem:** Given a non-empty array of integers, every element appears twice except for one. Find that single one.
    *   **Approach:** Leverages the properties of the XOR bitwise operator (`a ^ a = 0`, `a ^ 0 = a`).

5.  **Insert M into N**
    *   **Problem:** Insert the bits of number `M` into number `N` from bit position `j` down to bit position `i`.
    *   **Approach:** Involves creating appropriate masks to clear bits in `N` and then OR-ing with `M` shifted to the correct position.

## Project Structure

```
.
├── src/                            # Source code for the main algorithm implementations
│   ├── main.cpp                    # Main executable to demonstrate functionality
│   ├── bit_manipulation_solver.hpp # Header file for BitManipulationSolver class
│   └── bit_manipulation_solver.cpp # Implementation file for BitManipulationSolver methods
├── tests/                          # Test suite for verifying correctness and performance
│   ├── test_bit_manipulation.cpp   # Unit tests using Google Test for correctness
│   └── test_performance.cpp        # Performance benchmarks using Google Test and custom stopwatch
├── docs/                           # Documentation files
│   ├── README.md                   # This file
│   ├── ALGORITHM_EXPLANATION.md    # Detailed algorithm descriptions with diagrams
│   └── INTERVIEW_TIPS.md           # Tips for interviewers and candidates, variations
├── utils/                          # Utility files
│   └── stopwatch.hpp               # Simple C++11 stopwatch class for performance measurement
└── .gitignore                      # Git ignore file
```

## How to Compile and Run

### Prerequisites

*   A C++11 compatible compiler (e.g., g++).
*   CMake (optional, but recommended for larger projects and cross-platform builds).
*   Google Test library (for running unit and performance tests). If not installed globally, you might need to build it from source or use a package manager.
    *   **Ubuntu/Debian:** `sudo apt-get install libgtest-dev cmake`
    *   **Manual build (if above fails or for other OS):**
        ```bash
        cd /usr/src/gtest
        sudo cmake CMakeLists.txt
        sudo make
        sudo cp *.a /usr/lib
        ```

### Building the Main Executable

Navigate to the project root directory and compile `main.cpp` along with `bit_manipulation_solver.cpp`:

```bash
g++ -std=c++11 -O2 src/main.cpp src/bit_manipulation_solver.cpp -o bin/bit_manipulation_demo
```
*(You might need to create a `bin` directory: `mkdir -p bin`)*

### Running the Main Executable

```bash
./bin/bit_manipulation_demo
```

### Building and Running Tests

To build the tests, you'll need to link against the Google Test library.

```bash
# First, ensure you have a 'bin' directory for executables
mkdir -p bin

# Compile test_bit_manipulation.cpp (unit tests)
g++ -std=c++11 -O2 -Isrc -Iutils -I/usr/include/gtest -I/usr/include/gtest/include tests/test_bit_manipulation.cpp src/bit_manipulation_solver.cpp -L/usr/lib -lgtest -lgtest_main -pthread -o bin/run_unit_tests

# Compile test_performance.cpp (performance tests)
g++ -std=c++11 -O2 -Isrc -Iutils -I/usr/include/gtest -I/usr/include/gtest/include tests/test_performance.cpp src/bit_manipulation_solver.cpp -L/usr/lib -lgtest -lgtest_main -pthread -o bin/run_performance_tests

# Run unit tests
echo "--- Running Unit Tests ---"
./bin/run_unit_tests

# Run performance tests
echo -e "\n--- Running Performance Tests ---"
./bin/run_performance_tests
```
**Note:** The paths to Google Test headers (`-I/usr/include/gtest`) and libraries (`-L/usr/lib`) might vary depending on your system. Adjust `gtest` and `gtest_main` library names if needed (e.g., `libgtest.a`, `libgtest_main.a`). Some systems might use `-L/usr/local/lib`.

## Detailed Documentation

For a deeper dive into the algorithms, visual aids, edge cases, and interview preparation advice, refer to the following documents:

*   **[Algorithm Explanations](docs/ALGORITHM_EXPLANATION.md)**: Detailed breakdown of each problem, the logic behind the solutions, and ASCII diagrams illustrating bitwise operations.
*   **[Interview Tips and Variations](docs/INTERVIEW_TIPS.md)**: General tips for tackling bit manipulation problems, common pitfalls, and potential variations for each problem in an interview setting.
```