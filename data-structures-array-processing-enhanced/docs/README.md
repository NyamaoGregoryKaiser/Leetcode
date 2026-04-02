```markdown
# Array Manipulation Interview Project

This project provides a comprehensive set of solutions, tests, benchmarks, and documentation for several common array manipulation problems frequently encountered in coding interviews. It aims to offer a deep understanding of optimal algorithms, their complexities, and alternative approaches.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Problem Descriptions](#problem-descriptions)
3.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
    *   [Building the Project](#building-the-project)
4.  [Project Structure](#project-structure)
5.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Interview Tips](#interview-tips)
6.  [Contributing](#contributing)
7.  [License](#license)

## Project Overview

The core of this project lies in implementing efficient algorithms for array manipulation. For each problem, an optimal solution (often with O(1) or O(N) space complexity) is provided, along with detailed explanations, time/space complexity analysis, and extensive test cases. Additionally, less optimized or brute-force solutions are included for comparison and to highlight the importance of algorithmic efficiency. Performance benchmarks demonstrate the real-world impact of choosing an optimal algorithm.

The problems covered are:

1.  **Rotate Array**
2.  **Product of Array Except Self**
3.  **Merge Intervals**
4.  **Trapping Rain Water**

## Problem Descriptions

Here's a brief overview of the problems addressed in this project:

### 1. Rotate Array

*   **Problem:** Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.
*   **Example:**
    ```
    Input: nums = [1,2,3,4,5,6,7], k = 3
    Output: [5,6,7,1,2,3,4]
    Explanation:
    rotate 1 steps to the right: [7,1,2,3,4,5,6]
    rotate 2 steps to the right: [6,7,1,2,3,4,5]
    rotate 3 steps to the right: [5,6,7,1,2,3,4]
    ```
*   **Constraints:**
    *   `1 <= nums.length <= 10^5`
    *   `-2^31 <= nums[i] <= 2^31 - 1`
    *   `0 <= k <= 10^5`
*   **Key Techniques:** In-place rotation, modular arithmetic, reversal algorithm.

### 2. Product of Array Except Self

*   **Problem:** Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
*   **Constraint:** You must write an algorithm that runs in `O(N)` time and without using the division operation.
*   **Example:**
    ```
    Input: nums = [1,2,3,4]
    Output: [24,12,8,6]
    ```
*   **Constraints:**
    *   `2 <= nums.length <= 10^5`
    *   `-30 <= nums[i] <= 30`
    *   The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
*   **Key Techniques:** Prefix products, suffix products, two-pass algorithm.

### 3. Merge Intervals

*   **Problem:** Given an array of `intervals` where `intervals[i] = [start, end]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
*   **Example:**
    ```
    Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
    Output: [[1,6],[8,10],[15,18]]
    Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
    ```
*   **Constraints:**
    *   `1 <= intervals.length <= 10^4`
    *   `intervals[i].length == 2`
    *   `0 <= start <= end <= 10^4`
*   **Key Techniques:** Sorting, greedy approach, interval management.

### 4. Trapping Rain Water

*   **Problem:** Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
*   **Example:**
    ```
    Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
    Output: 6
    Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
    ```
*   **Constraints:**
    *   `n == height.length`
    *   `1 <= n <= 2 * 10^4`
    *   `0 <= height[i] <= 10^5`
*   **Key Techniques:** Two pointers, dynamic programming, stack-based approach, finding left/right maximums.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/array-manipulation-project.git
    cd array-manipulation-project
    ```
    *(Note: Replace `https://github.com/your-username/array-manipulation-project.git` with the actual repository URL if you host this)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running Tests

This project uses `jest` for testing.

*   **Run all tests:**
    ```bash
    npm test
    ```
*   **Run tests in watch mode (for development):**
    ```bash
    npm test:watch
    ```

### Running Benchmarks

Benchmarks are implemented as Jest tests specifically located in `tests/performance`.

*   **Run performance benchmarks:**
    ```bash
    npm run benchmark
    ```
    This command runs the `benchmark.test.ts` file, which will output performance comparisons to your console.

### Building the Project

To compile the TypeScript code into JavaScript:

```bash
npm run build
```
This will generate JavaScript files and type declarations in the `dist` directory.

## Project Structure

```
array-manipulation-project/
├── src/
│   ├── algorithms/
│   │   ├── array-manipulation.ts         # Optimal algorithm implementations
│   │   └── brute-force-solutions.ts    # Brute-force alternatives
│   ├── utils/
│   │   └── array-helpers.ts            # Small helper utilities
│   └── index.ts                        # Main entry point (for exports)
├── tests/
│   ├── algorithms/
│   │   ├── array-manipulation.test.ts  # Tests for optimized solutions
│   │   └── brute-force-solutions.test.ts # Tests for brute-force solutions
│   └── performance/
│       └── benchmark.test.ts           # Performance benchmarking tests
├── docs/
│   ├── README.md                     # Project overview, setup, problem descriptions
│   ├── algorithm_explanations.md     # In-depth algorithm details, ASCII diagrams, edge cases
│   └── interview_tips.md             # Interview strategies, variations, follow-ups
├── package.json                      # Project metadata and scripts
├── tsconfig.json                     # TypeScript compiler configuration
└── .eslintrc.json                    # ESLint configuration
```

## Documentation

Beyond the in-code comments, dedicated documentation files are provided in the `docs/` directory to elaborate on algorithms, interview strategies, and common pitfalls.

### Algorithm Explanations

Refer to `docs/algorithm_explanations.md` for detailed breakdowns of each algorithm, including visual (ASCII art) diagrams, step-by-step logic, and discussion of edge cases.

### Interview Tips

Refer to `docs/interview_tips.md` for guidance on how to approach these types of problems in an interview setting, common follow-up questions, and related problem variations.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, bug fixes, or additional problems/solutions.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (if applicable, otherwise default to MIT if not provided).
```