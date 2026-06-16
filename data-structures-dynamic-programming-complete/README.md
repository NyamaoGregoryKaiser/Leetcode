```markdown
# Dynamic Programming Interview Project

This project is a comprehensive resource designed to prepare you for Dynamic Programming (DP) questions in coding interviews. It features multiple classic DP problems, each solved using various approaches (brute force, memoization, tabulation, space-optimized), along with detailed explanations, complexity analysis, extensive tests, and benchmarking.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Features](#features)
3.  [Getting Started](#getting-started)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Examples & Benchmarks](#running-examples--benchmarks)
4.  [Problems Covered](#problems-covered)
    *   [Longest Common Subsequence (LCS)](#longest-common-subsequence-lcs)
    *   [0/1 Knapsack Problem](#01-knapsack-problem)
    *   [Coin Change (Minimum Coins)](#coin-change-minimum-coins)
    *   [Edit Distance (Levenshtein Distance)](#edit-distance-levenshtein-distance)
5.  [Documentation](#documentation)
    *   [Algorithms Explanation](#algorithms-explanation)
    *   [Visual Diagrams](#visual-diagrams)
    *   [Interview Tips](#interview-tips)
6.  [Contributing](#contributing)
7.  [License](#license)

## Project Structure

```
dp-interview-project/
├── src/
│   ├── problems/                   # Contains implementations for all DP problems
│   │   ├── longestCommonSubsequence.ts
│   │   ├── knapsack01.ts
│   │   ├── coinChangeMin.ts
│   │   ├── editDistance.ts
│   │   └── index.ts                # Exports all problem solutions
│   ├── utils/                      # Helper utilities
│   │   └── performance.ts          # Utility for benchmarking code execution
│   └── index.ts                    # Main entry point to run examples and benchmarks
├── tests/                          # Jest test files for all implementations
│   ├── longestCommonSubsequence.test.ts
│   ├── knapsack01.test.ts
│   ├── coinChangeMin.test.ts
│   ├── editDistance.test.ts
│   └── performance.test.ts         # Tests the benchmarking utility
├── docs/                           # Comprehensive documentation
│   ├── algorithms-explanation.md   # Detailed explanation of DP concepts and problems
│   ├── diagrams.txt                # ASCII art diagrams for DP tables
│   └── interview-tips.md           # Tips for DP interviews, common patterns, variations
├── README.md                       # Project overview (this file)
├── package.json                    # Project dependencies and scripts
└── tsconfig.json                   # TypeScript configuration
```

## Features

*   **Multiple Approaches:** Each problem includes brute-force recursion, memoization (top-down DP), tabulation (bottom-up DP), and space-optimized tabulation (where applicable).
*   **Detailed Comments:** Extensive inline comments explain the logic, states, base cases, and transitions.
*   **Complexity Analysis:** Time and space complexity are provided for each solution.
*   **Comprehensive Test Suite:** Jest tests cover various scenarios, including edge cases and typical inputs.
*   **Performance Benchmarking:** A utility to compare the execution time of different solutions for the same problem.
*   **Rich Documentation:** Dedicated markdown files explain DP concepts, problem breakdowns, visual diagrams, and interview strategies.
*   **TypeScript:** All code is written in TypeScript, providing type safety and better readability.

## Getting Started

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dp-interview-project.git
    cd dp-interview-project
    ```
    (If you are downloading this project directly, create the `dp-interview-project` folder and save the files inside it.)
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
    This will install TypeScript, Jest, ts-node, and other development dependencies.

### Running Tests

To run all test suites:
```bash
npm test
# or
yarn test
```
To run tests in watch mode:
```bash
npm test -- --watch
# or
yarn test -- --watch
```

### Running Examples & Benchmarks

To execute the example usage and performance benchmarks defined in `src/index.ts`:
```bash
npm start
# or
yarn start
```
This will demonstrate how each DP problem can be solved with different approaches and will output performance metrics.

## Problems Covered

### Longest Common Subsequence (LCS)
Find the length of the longest subsequence common to two sequences.
*   `src/problems/longestCommonSubsequence.ts`
*   `tests/longestCommonSubsequence.test.ts`

### 0/1 Knapsack Problem
Given weights and values of N items, put some items in a knapsack of capacity W to get the maximum total value. Each item can only be picked once.
*   `src/problems/knapsack01.ts`
*   `tests/knapsack01.test.ts`

### Coin Change (Minimum Coins)
Given a set of coin denominations and a target amount, find the minimum number of coins needed to make up that amount.
*   `src/problems/coinChangeMin.ts`
*   `tests/coinChangeMin.test.ts`

### Edit Distance (Levenshtein Distance)
Find the minimum number of operations (insert, delete, replace) required to transform one string into another.
*   `src/problems/editDistance.ts`
*   `tests/editDistance.test.ts`

## Documentation

The `docs/` directory contains rich explanations to deepen your understanding:

### Algorithms Explanation
`docs/algorithms-explanation.md` provides a deep dive into:
*   What Dynamic Programming is.
*   Key characteristics (overlapping subproblems, optimal substructure).
*   Steps to identify and solve DP problems.
*   Detailed breakdown of each problem's recurrence relation, state definition, and base cases.

### Visual Diagrams
`docs/diagrams.txt` contains ASCII art diagrams to visually represent:
*   DP table structures.
*   State transitions.
*   How memoization and tabulation build up solutions.

### Interview Tips
`docs/interview-tips.md` offers practical advice for DP interviews:
*   Common DP patterns.
*   Strategies for approaching new DP problems.
*   Tips for explaining your thought process.
*   Discussing edge cases and time/space complexity.
*   Variations of classic problems.

## Contributing

Contributions are welcome! If you find a bug, have a suggestion for improvement, or want to add another classic DP problem, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (not included in this output, but usually part of a full project).
```