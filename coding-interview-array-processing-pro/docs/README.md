```markdown
# Array Manipulation Interview Project

This project serves as a comprehensive resource for mastering common array manipulation problems encountered in coding interviews. It provides a structured approach, offering multiple solutions, detailed explanations, robust testing, and performance benchmarking.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Installation](#installation)
4.  [Usage](#usage)
    *   [Running Algorithms](#running-algorithms)
    *   [Running Tests](#running-tests)
    *   [Running Performance Benchmarks](#running-performance-benchmarks)
5.  [Problems Covered](#problems-covered)
    *   [1. Maximum Sum of K-sized Subarray](#1-maximum-sum-of-k-sized-subarray)
    *   [2. Rotate Array](#2-rotate-array)
    *   [3. Product of Array Except Self](#3-product-of-array-except-self)
    *   [4. Merge Overlapping Intervals](#4-merge-overlapping-intervals)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Overview

The goal of this project is to provide a holistic learning and practice environment for array manipulation techniques. It goes beyond just providing solutions, aiming to equip users with the knowledge to understand *why* certain solutions are optimal, how to approach different problem types, and how to communicate their thought process effectively in an interview setting.

## Features

*   **Multiple Problems:** Covers 4 distinct and common array manipulation challenges.
*   **Multiple Approaches:** For each problem, showcases brute-force, optimized, and sometimes alternative solutions.
*   **Detailed Comments:** In-depth comments within the code explaining logic and rationale.
*   **Complexity Analysis:** Clear time and space complexity analysis for each solution.
*   **Comprehensive Testing:** Extensive test cases using Jest, covering happy paths, edge cases, and invalid inputs.
*   **Performance Benchmarking:** Scripts to compare the performance of different solutions.
*   **Detailed Documentation:** Dedicated files for algorithm explanations, visual diagrams, edge cases, and interview tips.
*   **Modular Structure:** Organized into `src`, `tests`, `docs`, and `scripts` directories for clarity.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/array-manipulation-project.git
    cd array-manipulation-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

### Running Algorithms

You can explore the implemented algorithms and their examples by running the main entry point:

```bash
npm start
```

This will execute `src/index.js`, which imports and demonstrates some of the functions.

### Running Tests

To run the unit tests for all algorithms:

```bash
npm test
# Or, to run all tests including performance benchmarks:
# npm run test:all
```

### Running Performance Benchmarks

To specifically run the performance comparison benchmarks (e.g., comparing different `rotateArray` implementations):

```bash
npm run test:performance
```

## Problems Covered

### 1. Maximum Sum of K-sized Subarray
Finds the maximum sum of any contiguous subarray of a given size `k`. Demonstrates the Sliding Window pattern.

### 2. Rotate Array
Rotates an array to the right by `k` steps. Explores multiple in-place modification techniques (brute force, using extra space, cyclic replacements, reversing parts).

### 3. Product of Array Except Self
Calculates an array where each element `output[i]` is the product of all elements in `nums` except `nums[i]`, without using division. Highlights prefix and suffix product strategies.

### 4. Merge Overlapping Intervals
Given a collection of intervals, merges all overlapping intervals. Involves sorting and careful interval manipulation.

## Documentation

The `docs/` directory contains detailed explanations for each aspect of the project:

*   **`docs/algorithm-explanations.md`**: Provides a deep dive into each problem's optimal solution, including step-by-step logic, examples, and ASCII art diagrams for visual understanding.
*   **`docs/interview-tips.md`**: Offers guidance on how to approach array problems in interviews, common pitfalls, crucial edge cases to consider, and potential follow-up questions.
*   **`docs/README.md` (this file)**: General project information, setup, and usage.

## Contributing

Feel free to fork this repository, add new problems, suggest alternative solutions, improve explanations, or enhance tests. Pull requests are welcome!

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (though not explicitly created here, assumed for open-source projects).
```