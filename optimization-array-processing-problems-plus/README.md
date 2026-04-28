# Array Manipulation Interview Project

This project is a comprehensive resource for mastering array manipulation problems commonly encountered in coding interviews. It includes multiple problems with optimal and alternative solutions, detailed explanations, extensive test cases, performance benchmarks, and documentation on algorithms and interview strategies.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Installation and Setup](#installation-and-setup)
3.  [Problems Covered](#problems-covered)
    *   [1. Rotate Array](#1-rotate-array)
    *   [2. Product of Array Except Self](#2-product-of-array-except-self)
    *   [3. Maximum Subarray Sum (Kadane's Algorithm)](#3-maximum-subarray-sum-kadanes-algorithm)
    *   [4. Merge Overlapping Intervals](#4-merge-overlapping-intervals)
4.  [Running Tests](#running-tests)
5.  [Running Benchmarks](#running-benchmarks)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
array-manipulation-interview-project/
├── src/                      # Main algorithm implementations
│   ├── rotateArray.js
│   ├── productExceptSelf.js
│   ├── maxSubarraySum.js
│   └── mergeIntervals.js
├── tests/                    # Test files for each problem
│   ├── rotateArray.test.js
│   ├── productExceptSelf.test.js
│   ├── maxSubarraySum.test.js
│   └── mergeIntervals.test.js
├── utils/                    # Helper utilities
│   └── arrayUtils.js
├── benchmarks/               # Performance benchmarking scripts
│   └── performanceBenchmark.js
├── docs/                     # Detailed documentation
│   ├── algorithms_explanation.md
│   └── interview_tips.md
└── README.md                 # Project overview and instructions
```

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/array-manipulation-interview-project.git
    cd array-manipulation-interview-project
    ```
2.  **Install dependencies (Jest for testing):**
    ```bash
    npm install
    # or
    yarn install
    ```
    *Note: The test files are written using Jest syntax, assuming it's installed as a dev dependency.*

## Problems Covered

### 1. Rotate Array

**Problem Description:**
Given an array, rotate the array to the right by `k` steps, where `k` is non-negative.
You should use an in-place algorithm.

**Examples:**
*   Input: `nums = [1,2,3,4,5,6,7], k = 3`
    Output: `[5,6,7,1,2,3,4]`
    Explanation:
    rotate 1 steps to the right: `[7,1,2,3,4,5,6]`
    rotate 2 steps to the right: `[6,7,1,2,3,4,5]`
    rotate 3 steps to the right: `[5,6,7,1,2,3,4]`
*   Input: `nums = [-1,-100,3,99], k = 2`
    Output: `[3,99,-1,-100]`
    Explanation:
    rotate 1 steps to the right: `[99,-1,-100,3]`
    rotate 2 steps to the right: `[3,99,-1,-100]`

**Implementations:**
*   `rotateArrayByReverse(nums, k)`: Optimal in-place solution using three reverses.
*   `rotateArrayBySplice(nums, k)`: In-place using `splice` and `unshift` (less efficient due to array re-indexing).
*   `rotateArrayByTempArray(nums, k)`: Using a temporary array (O(N) space).

### 2. Product of Array Except Self

**Problem Description:**
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Examples:**
*   Input: `nums = [1,2,3,4]`
    Output: `[24,12,8,6]`
*   Input: `nums = [-1,1,0,-3,3]`
    Output: `[0,0,9,0,0]`

**Implementations:**
*   `productExceptSelfOptimal(nums)`: Optimal `O(N)` time and `O(1)` auxiliary space (output array doesn't count) using prefix and suffix products.
*   `productExceptSelfBruteForce(nums)`: Brute force `O(N^2)` time.

### 3. Maximum Subarray Sum (Kadane's Algorithm)

**Problem Description:**
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

**Examples:**
*   Input: `nums = [-2,1,-3,4,-1,2,1,-5,4]`
    Output: `6`
    Explanation: `[4,-1,2,1]` has the largest sum = `6`.
*   Input: `nums = [1]`
    Output: `1`
*   Input: `nums = [5,4,-1,7,8]`
    Output: `23`

**Implementations:**
*   `maxSubarraySumKadane(nums)`: Optimal solution using Kadane's algorithm (`O(N)` time).
*   `maxSubarraySumBruteForce(nums)`: Brute force solution (`O(N^2)` time).

### 4. Merge Overlapping Intervals

**Problem Description:**
Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Examples:**
*   Input: `intervals = [[1,3],[2,6],[8,10],[15,18]]`
    Output: `[[1,6],[8,10],[15,18]]`
    Explanation: Since intervals `[1,3]` and `[2,6]` overlap, merge them into `[1,6]`.
*   Input: `intervals = [[1,4],[4,5]]`
    Output: `[[1,5]]`
    Explanation: Intervals `[1,4]` and `[4,5]` are considered overlapping.

**Implementations:**
*   `mergeIntervals(intervals)`: Optimal solution using sorting and a single pass (`O(N log N)` time due to sorting).

## Running Tests

To run all tests:

```bash
npm test
# or
yarn test
```

To run a specific test file (e.g., for `rotateArray`):

```bash
npm test tests/rotateArray.test.js
```

## Running Benchmarks

To run the performance benchmarks comparing different approaches for selected problems:

```bash
node benchmarks/performanceBenchmark.js
```

This will output the execution times for different algorithms on large datasets.

## Documentation

The `docs/` directory contains detailed explanations:

*   **`docs/algorithms_explanation.md`**: Provides in-depth walkthroughs of the optimal algorithms, step-by-step examples, visual diagrams (ASCII art), and comparison of different approaches for each problem.
*   **`docs/interview_tips.md`**: Offers general advice for array manipulation interviews, common patterns, how to handle edge cases, and variations of standard problems.

## Contributing

Feel free to open issues or submit pull requests to improve the project. Suggestions for new problems, alternative solutions, or documentation enhancements are welcome.

## License

This project is open-source and available under the MIT License. See the `LICENSE` file for more details (not provided in this response for brevity, but a good practice to include).