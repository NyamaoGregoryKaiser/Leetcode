# Bit Manipulation Coding Interview Project

This project serves as a comprehensive resource for mastering bit manipulation techniques crucial for coding interviews. It provides multiple problems, optimal solutions, alternative approaches, detailed explanations, testing infrastructure, performance benchmarks, and extensive documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
3.  [How to Compile and Run](#how-to-compile-and-run)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
4.  [Detailed Documentation](#detailed-documentation)
5.  [Contributing](#contributing)
6.  [License](#license)

## Project Structure

*   `README.md`: This file.
*   `CMakeLists.txt`: CMake build configuration.
*   `src/`: Contains the main implementation of bit manipulation algorithms.
    *   `BitManipulationSolutions.cpp`: Core algorithm implementations.
*   `include/`: Header files for the project.
    *   `BitManipulationSolutions.hpp`: Declarations for core algorithms.
    *   `bit_manipulation_utils.hpp`: Utility functions (e.g., printing binary representations).
*   `tests/`: Unit tests for all implemented algorithms.
    *   `test_bit_manipulation.cpp`: Contains extensive test cases.
*   `benchmarking/`: Code for comparing the performance of different algorithm approaches.
    *   `benchmark.cpp`: Performance measurement routines.
*   `additional_implementations/`: Demonstrates brute-force, alternative, or memory-efficient solutions for selected problems.
    *   `CountSetBits_Approaches.cpp`: Various methods for counting set bits (brute-force, Brian Kernighan, lookup table).
    *   `ReverseBits_Approaches.cpp`: Different strategies for reversing bits.
*   `docs/`: Comprehensive documentation.
    *   `algorithms.md`: Detailed explanations of algorithms, logic, and complexity.
    *   `visualizations.md`: ASCII art diagrams illustrating bitwise operations.
    *   `interview_tips.md`: Edge cases, gotchas, common bit manipulation tricks, and interview variations.

## Problems Covered

This project tackles the following common bit manipulation problems:

1.  **Count Set Bits (Hamming Weight)**
    *   Determine the number of '1' bits in an unsigned integer.
    *   Solutions: Loop and check LSB, Brian Kernighan's Algorithm, Lookup Table (in `additional_implementations`).
2.  **Reverse Bits**
    *   Reverse the bits of a 32-bit unsigned integer.
    *   Solutions: Standard shift-and-add loop, Byte-by-byte reversal (in `additional_implementations`).
3.  **Single Number**
    *   Find the unique element in an array where every other element appears exactly twice.
    *   Solutions: XOR (optimal), Hash Map (for comparison).
4.  **Check if a Number is a Power of 2**
    *   Determine if a given positive integer is a power of 2.
    *   Solutions: Bitwise AND with `n-1`, Loop and divide.
5.  **Insert M into N (Bit Insertion)**
    *   Given two 32-bit numbers, `N` and `M`, and two bit positions, `i` and `j`, insert `M` into `N` such that `M` starts at bit `i` and ends at bit `j`.
    *   Solutions: Create a mask, clear bits in `N`, then OR with `M` shifted.

## How to Compile and Run

### Prerequisites

*   A C++11 (or newer) compatible compiler (e.g., GCC, Clang, MSVC).
*   CMake (version 3.10 or higher).

### Building the Project

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/BitManipulationProject.git
    cd BitManipulationProject
    ```
2.  Create a build directory and navigate into it:
    ```bash
    mkdir build
    cd build
    ```
3.  Configure CMake and build the project:
    ```bash
    cmake ..
    make
    ```
    This will generate executables for `test_bit_manipulation` and `benchmark`.

### Running Tests

After building, you can run the unit tests:

```bash
./tests/test_bit_manipulation
```

You should see output indicating which tests passed or failed.

### Running Benchmarks

To evaluate the performance of different algorithm approaches:

```bash
./benchmarking/benchmark
```

This will output timing results for various implementations.

## Detailed Documentation

The `docs/` directory contains comprehensive documentation:

*   [`algorithms.md`](docs/algorithms.md): Explains the logic, time/space complexity, and rationale behind each algorithm.
*   [`visualizations.md`](docs/visualizations.md): Uses ASCII art to visually demonstrate how bitwise operations work.
*   [`interview_tips.md`](docs/interview_tips.md): Provides insights into common bit manipulation tricks, edge cases, potential pitfalls, and variations you might encounter in an interview.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, bug fixes, or new problems/solutions to add.

## License

This project is open-sourced under the MIT License. See the LICENSE file (not provided in this example, but would typically be present in a real project) for more details.

---