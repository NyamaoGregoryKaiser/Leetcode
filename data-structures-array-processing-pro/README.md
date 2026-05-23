```markdown
# Array Manipulation Interview Project

This project provides a comprehensive set of problems, solutions, tests, and documentation related to array manipulation, designed to prepare for coding interviews.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
    *   [Rotate Array](#rotate-array)
    *   [Maximum Subarray Sum](#maximum-subarray-sum)
    *   [Trapping Rain Water](#trapping-rain-water)
    *   [Product of Array Except Self](#product-of-array-except-self)
3.  [Getting Started](#getting-started)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
4.  [Documentation](#documentation)
    *   [Algorithms Explanation (`docs/algorithms.md`)](#algorithms-explanation-docsalgorithmsmd)
    *   [Visual Diagrams (`docs/diagrams.md`)](#visual-diagrams-docsdiagramsmd)
    *   [Interview Tips & Variations (`docs/interviewTips.md`)](#interview-tips--variations-docsinterviewtipsmd)
5.  [Additional Implementations](#additional-implementations)
    *   [Brute Force vs. Optimized](#brute-force-vs-optimized)
    *   [Different Paradigms (e.g., Functional)](#different-paradigms-eg-functional)
    *   [Memory-Efficient Versions](#memory-efficient-versions)
6.  [Contributing](#contributing)
7.  [License](#license)

## Project Structure

```
array_manipulation_project/
├── src/                          # Main source code for optimal solutions
│   ├── problems/                 # Core algorithm implementations
│   │   ├── rotateArray.js
│   │   ├── maxSubarraySum.js
│   │   ├── trappingRainWater.js
│   │   └── productExceptSelf.js
│   └── utils/                    # Helper utilities (if any specific ones are needed)
│       └── arrayHelpers.js
├── tests/                        # Jest test files for each problem
│   ├── rotateArray.test.js
│   ├── maxSubarraySum.test.js
│   ├── trappingRainWater.test.js
│   └── productExceptSelf.test.js
├── bench/                        # Performance benchmarking scripts
│   └── benchmark.js
├── docs/                         # Comprehensive documentation
│   ├── algorithms.md             # Detailed algorithm explanations
│   ├── diagrams.md               # ASCII art for visual understanding
│   └── interviewTips.md          # Interview tips, edge cases, and problem variations
├── additional_implementations/   # Alternative implementations (brute force, functional, etc.)
│   ├── rotateArray_bruteForce.js
│   ├── maxSubarraySum_bruteForce.js
│   ├── trappingRainWater_bruteForce.js
│   ├── productExceptSelf_division.js
│   ├── rotateArray_functional.js
│   └── trappingRainWater_dp.js
├── README.md                     # This file
├── package.json                  # Project metadata and dependencies
```

## Problems Covered

### Rotate Array

**Problem Description:**
Given an array, rotate the array to the right by `k` steps, where `k` is non-negative.
The rotation should be performed in-place.

**Example:**
Input: `nums = [1,2,3,4,5,6,7], k = 3`
Output: `[5,6,7,1,2,3,4]`

Explanation:
1. `rotate 1 steps: [7,1,2,3,4,5,6]`
2. `rotate 2 steps: [6,7,1,2,3,4,5]`
3. `rotate 3 steps: [5,6,7,1,2,3,4]`

### Maximum Subarray Sum

**Problem Description:**
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

**Example:**
Input: `nums = [-2,1,-3,4,-1,2,1,-5,4]`
Output: `6`
Explanation: `[4,-1,2,1]` has the largest sum = `6`.

### Trapping Rain Water

**Problem Description:**
Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Example:**
Input: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
Output: `6`

### Product of Array Except Self

**Problem Description:**
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Example:**
Input: `nums = [1,2,3,4]`
Output: `[24,12,8,6]`
Explanation:
`answer[0] = 2 * 3 * 4 = 24`
`answer[1] = 1 * 3 * 4 = 12`
`answer[2] = 1 * 2 * 4 = 8`
`answer[3] = 1 * 2 * 3 = 6`

## Getting Started

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/array_manipulation_project.git
    cd array_manipulation_project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running Tests

To run all tests using Jest:

```bash
npm test
```

To run tests for a specific file:

```bash
npx jest tests/rotateArray.test.js
```

### Running Benchmarks

To run the performance benchmarks:

```bash
npm run benchmark
```

## Documentation

### Algorithms Explanation (`docs/algorithms.md`)
This document provides detailed explanations of the optimal algorithms used for each problem, breaking down the logic and reasoning.

### Visual Diagrams (`docs/diagrams.md`)
Includes ASCII art and step-by-step illustrations to help visualize the algorithms, especially for problems like "Rotate Array" and "Trapping Rain Water".

### Interview Tips & Variations (`docs/interviewTips.md`)
Offers advice on how to approach these problems in an interview setting, discusses common pitfalls, edge cases, and potential variations of the problems.

## Additional Implementations

The `additional_implementations/` directory contains alternative solutions for some problems, showcasing different approaches:

### Brute Force vs. Optimized
For many problems, a simpler, less efficient "brute force" solution is provided alongside the optimal one, highlighting the trade-offs in complexity.

### Different Paradigms (e.g., Functional)
Some problems might have solutions implemented using different programming paradigms (e.g., a more functional approach for array transformations).

### Memory-Efficient Versions
While optimal solutions often aim for space efficiency, this section might sometimes provide explicit examples or discussions around further memory optimization if relevant.

## Contributing

Feel free to open issues or submit pull requests for improvements, additional problems, or alternative solutions.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details (though not explicitly created in this output, it's standard practice).
```