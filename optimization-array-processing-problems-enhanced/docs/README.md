```markdown
# Array Manipulation Interview Project

This project is a comprehensive resource for mastering array manipulation problems frequently encountered in technical interviews. It includes a variety of problems, multiple algorithmic approaches (from brute-force to optimal), detailed explanations, time/space complexity analysis, extensive test cases, and performance benchmarks.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Problems Covered](#problems-covered)
3.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
    *   [Running Examples](#running-examples)
4.  [File Structure](#file-structure)
5.  [Documentation](#documentation)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Visual Diagrams](#visual-diagrams)
    *   [Interview Guide](#interview-guide)
6.  [Contributing](#contributing)
7.  [License](#license)

---

## Project Overview

The goal of this project is to provide a holistic learning and practice environment for array-based algorithmic problems. Each problem is presented with:
*   Clear problem statement and examples.
*   Multiple solution approaches, highlighting trade-offs.
*   Detailed JavaScript implementation with inline comments.
*   Rigorous time and space complexity analysis.
*   Associated test files covering common, edge, and large cases.
*   Performance benchmarks comparing different solution strategies.

## Problems Covered

Here's a list of the array manipulation problems implemented in this project:

| Problem ID | Problem Name               | Description                                                                                                                                                                                                                                                                                                                                    | Optimal Solution      | Time Complexity (Optimal) | Space Complexity (Optimal) |
| :--------- | :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- | :------------------------ | :------------------------- |
| **P1**     | **Rotate Array**           | Given an array, rotate the array to the right by `k` steps. This is a classic problem demonstrating various in-place vs. extra-space techniques.                                                                                                                                                                                             | Reversal Algorithm    | O(N)                      | O(1)                       |
| **P2**     | **Merge Intervals**        | Given an array of intervals `[start, end]`, merge all overlapping intervals and return a new array of non-overlapping intervals that cover all input intervals. Requires sorting and careful iteration.                                                                                                                                         | Sort and Merge        | O(N log N)                | O(N)                       |
| **P3**     | **Subarray Sum Equals K**  | Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals `k`. A great example of using prefix sums with a hash map.                                                                                                                                                             | Prefix Sums with Map  | O(N)                      | O(N)                       |
| **P4**     | **Trapping Rain Water**    | Given `n` non-negative integers representing an elevation map, compute how much water it can trap after raining. This is a challenging problem often solved with two pointers or a monotonic stack.                                                                                                                                             | Two Pointers          | O(N)                      | O(1)                       |
| **P5**     | **Find the Duplicate Number** | Given an array `nums` containing `n + 1` integers where each is in `[1, n]`, return the single repeated number. Constraint: solve without modifying the array and using O(1) extra space. This points to Floyd's Cycle Detection.                                                                                                            | Floyd's Cycle Detection | O(N)                      | O(1)                       |

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/array-manipulation-project.git
    cd array-manipulation-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running Tests

The project uses a custom lightweight test runner.
To run all test suites:

```bash
npm test
```

You can also run individual test files:

```bash
node tests/test_rotateArray.js
node tests/test_mergeIntervals.js
# etc.
```

### Running Benchmarks

Benchmarks compare the performance of different approaches for each problem.

To run all benchmarks:

```bash
npm run benchmark
```

You can also run individual benchmark files:

```bash
node benchmarks/benchmark_rotateArray.js
node benchmarks/benchmark_mergeIntervals.js
# etc.
```

### Running Examples

The `src/index.js` file contains example usages of the optimal solutions for each problem.
To see these examples in action:

```bash
npm start
```

---

## File Structure

```
array_manipulation_project/
├── src/
│   ├── problems/             # Contains the JavaScript implementations of the problems
│   │   ├── problem1_rotateArray.js
│   │   ├── problem2_mergeIntervals.js
│   │   ├── problem3_subarraySum.js
│   │   ├── problem4_trappingRainWater.js
│   │   └── problem5_findDuplicate.js
│   ├── utils/                # Helper utilities (e.g., array comparison)
│   │   └── arrayUtils.js
│   └── index.js              # Main entry point for examples and exports
├── tests/
│   ├── test_rotateArray.js   # Test files for each problem
│   ├── ...
│   └── testRunner.js         # Custom lightweight test runner
├── docs/
│   ├── README.md             # This comprehensive README
│   ├── algorithm_explanations.md # Detailed explanations of optimal solutions
│   ├── diagrams.md           # ASCII art diagrams for visualization
│   └── interview_guide.md    # Interview tips, common variations, and gotchas
├── benchmarks/
│   ├── benchmark_rotateArray.js # Performance measurement scripts
│   ├── ...
│   └── runAllBenchmarks.js   # Script to run all benchmarks
├── .gitignore
└── package.json
```

---

## Documentation

Comprehensive documentation is provided in the `docs/` directory to aid understanding and interview preparation.

### Algorithm Explanations
*   `docs/algorithm_explanations.md`: Dive deep into the logic and intuition behind the optimal solutions. Each problem's explanation covers the thought process, key concepts, and detailed steps.

### Visual Diagrams
*   `docs/diagrams.md`: Visual learners will appreciate ASCII art diagrams illustrating complex steps for certain algorithms, such as array reversal for rotation, interval merging, or cycle detection.

### Interview Guide
*   `docs/interview_guide.md`: This document offers valuable insights into tackling array manipulation problems in an interview setting. It covers:
    *   General strategies for array problems.
    *   Common follow-up questions for each problem.
    *   Related problems and variations.
    *   Key data structures and algorithms useful for arrays (e.g., two-pointers, sliding window, prefix sums, hash maps, sorting).
    *   Edge cases and common pitfalls to watch out for.

---

## Contributing

Feel free to open issues, submit pull requests, or suggest improvements!

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (not included in this response, but implied).
```