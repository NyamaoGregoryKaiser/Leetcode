```markdown
# Array Manipulation Interview Project

This project provides a comprehensive set of problems focused on Array Manipulation, commonly encountered in coding interviews. It includes optimized solutions, alternative approaches, detailed documentation, performance benchmarks, and extensive test cases.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
3.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
    *   [Running Main Algorithms](#running-main-algorithms)
4.  [Documentation](#documentation)
5.  [Contributing](#contributing)
6.  [License](#license)

## Project Structure

```
array_manipulation_project/
├── src/
│   ├── main_algorithms.cpp               # Optimal solutions for all problems
│   ├── brute_force_solutions.cpp         # Brute-force/alternative solutions for comparison
│   ├── utils.h                           # Utility functions (print, generate random arrays)
│   ├── utils.cpp                         # Implementation of utility functions
│   └── benchmark.cpp                     # Performance benchmarking executable
├── tests/
│   ├── test_algorithms.cpp               # Unit tests using Catch2
│   └── Catch2_setup.cpp                  # Catch2 main definition
├── docs/
│   ├── README.md                         # This file
│   ├── algorithm_explanation.md          # In-depth explanation of algorithms, complexity
│   ├── diagrams.md                       # Visual aids (ASCII art) for complex algorithms
│   └── interview_tips.md                 # General and problem-specific interview advice
├── .gitignore                            # Git ignore file
└── CMakeLists.txt                        # CMake build configuration
```

## Problems Covered

This project covers the following fundamental Array Manipulation problems:

1.  **Maximum Subarray Sum (Kadane's Algorithm)**
    *   Find the contiguous subarray with the largest sum.
    *   Optimal: `O(N)` Time, `O(1)` Space.
    *   Brute Force: `O(N^2)` Time, `O(1)` Space.
2.  **Product of Array Except Self**
    *   Return an array where `answer[i]` is the product of all elements of `nums` except `nums[i]`, without using division.
    *   Optimal: `O(N)` Time, `O(1)` Space (output array not counted).
    *   Brute Force: `O(N^2)` Time, `O(N)` Space.
3.  **Trapping Rain Water**
    *   Given an elevation map, compute how much water it can trap.
    *   Optimal (Two Pointers): `O(N)` Time, `O(1)` Space.
    *   Optimal (Monotonic Stack): `O(N)` Time, `O(N)` Space.
    *   Optimal (Dynamic Programming): `O(N)` Time, `O(N)` Space.
    *   Brute Force: `O(N^2)` Time, `O(1)` Space.
4.  **Rotate Array**
    *   Rotate the array to the right by `k` steps.
    *   Optimal (Reversal): `O(N)` Time, `O(1)` Space.
    *   Alternative (Temporary Array): `O(N)` Time, `O(N)` Space.
    *   Naive (Repeated Single Rotation): `O(N*K)` Time, `O(1)` Space.
5.  **Merge Sorted Arrays**
    *   Merge two sorted arrays `nums1` and `nums2` into `nums1` in-place.
    *   Optimal (Two Pointers from End): `O(M+N)` Time, `O(1)` Space.
    *   Alternative (Auxiliary Array): `O(M+N)` Time, `O(M+N)` Space.
    *   Alternative (`std::sort`): `O((M+N) log (M+N))` Time, `O(1)` or `O(M+N)` Space.

## Getting Started

### Prerequisites

*   A C++17 compatible compiler (e.g., GCC 7+ or Clang 5+)
*   CMake (version 3.10 or higher)
*   Catch2 (will be fetched by CMake if not found locally, or you can install it system-wide)

### Building the Project

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/array_manipulation_project.git
    cd array_manipulation_project
    ```
2.  Create a build directory and navigate into it:
    ```bash
    mkdir build
    cd build
    ```
3.  Run CMake to configure the project:
    ```bash
    cmake ..
    ```
4.  Build the project:
    ```bash
    cmake --build .
    ```

### Running Tests

After building, you can run the unit tests using the `test_runner` executable.

```bash
cd build
./test_runner
```
The tests use [Catch2](https://github.com/catchorg/Catch2) and provide detailed output on passed and failed test cases, including comparisons between optimal and brute-force solutions.

### Running Benchmarks

The `benchmark_runner` executable will execute all defined benchmarks, comparing the performance of different algorithms for various input sizes.

```bash
cd build
./benchmark_runner
```
This will output the execution time for each algorithm, helping to visualize their time complexity differences in practice.

### Running Main Algorithms

The `main_runner` executable provides a basic entry point to manually test or demonstrate the core algorithms. You can modify `src/main_algorithms.cpp` or `src/main_runner.cpp` (if created) to add `main()` function to call individual functions.
Currently, this project uses `benchmark.cpp` and `test_algorithms.cpp` to call and demonstrate the algorithms. If you want a standalone `main_runner` example:

1.  **Modify `src/main_algorithms.cpp`**: Add a `main` function (temporarily or in a separate file like `src/main_app.cpp`):

    ```cpp
    // In src/main_app.cpp
    #include "main_algorithms.cpp" // or just include parts of .h files
    #include "utils.h"

    int main() {
        std::cout << "--- Main Algorithm Demonstrations ---" << std::endl;

        // Max Subarray Sum
        std::vector<int> nums_ms = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        std::cout << "Max Subarray Sum for ";
        Utils::printVector(nums_ms);
        std::cout << "Result: " << ArrayManipulation::MaxSubarraySum::kadanesAlgorithm(nums_ms) << std::endl;

        // Product Except Self
        std::vector<int> nums_pes = {1, 2, 3, 4};
        std::cout << "Product Except Self for ";
        Utils::printVector(nums_pes);
        Utils::printVector(ArrayManipulation::ProductExceptSelf::productExceptSelfOptimal(nums_pes), "Result: ");
        
        // ... add more demonstrations
        return 0;
    }
    ```
2.  **Adjust `CMakeLists.txt`**: Add `src/main_app.cpp` to `main_runner` executable.

    ```cmake
    # In CMakeLists.txt
    add_executable(main_runner src/main_app.cpp src/main_algorithms.cpp src/utils.cpp)
    target_link_libraries(main_runner)
    ```

## Documentation

The `docs/` directory contains detailed explanations for each problem:

*   **`algorithm_explanation.md`**: Provides a deep dive into each optimal algorithm, explaining the logic, approach, and why it's efficient. It also contrasts with alternative solutions.
*   **`diagrams.md`**: Offers ASCII art diagrams to visually explain complex concepts like Trapping Rain Water's two-pointer method or Product Except Self's prefix/suffix products.
*   **`interview_tips.md`**: Contains general tips for approaching array manipulation problems in interviews, common pitfalls, and variations for each specific problem.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, find bugs, or want to add more problems/solutions.

## License

This project is open-source and available under the [MIT License](LICENSE).
```