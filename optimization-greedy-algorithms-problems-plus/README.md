# Greedy Algorithms Interview Project

This project serves as a comprehensive resource for understanding, implementing, and practicing Greedy Algorithms, specifically tailored for coding interview preparation. It includes implementations of several classic greedy problems, extensive test cases, performance benchmarks, and detailed documentation.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Algorithms Implemented](#algorithms-implemented)
    *   [1. Activity Selection Problem](#1-activity-selection-problem)
    *   [2. Fractional Knapsack Problem](#2-fractional-knapsack-problem)
    *   [3. Coin Change Problem (Greedy Variant)](#3-coin-change-problem-greedy-variant)
    *   [4. Job Sequencing with Deadlines](#4-job-sequencing-with-deadlines)
3.  [Getting Started](#getting-started)
    *   [Installation](#installation)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
4.  [Documentation](#documentation)
5.  [Contributing](#contributing)
6.  [License](#license)

## Project Overview

The goal of this project is to provide a solid foundation for mastering greedy algorithms. Each problem comes with:
*   Optimal TypeScript implementation.
*   Detailed comments explaining the logic.
*   Time and space complexity analysis.
*   Multiple approaches (where applicable, e.g., brute force vs. optimized discussed).
*   Extensive unit tests using Jest.
*   Performance benchmarking utilities.
*   Comprehensive documentation including algorithm explanations, visual diagrams, edge cases, and interview tips.

## Algorithms Implemented

Below are the greedy algorithms implemented in `src/algorithms/`:

### 1. Activity Selection Problem

Given a set of activities, each with a start and finish time, the goal is to select the maximum number of non-overlapping activities that can be performed by a single person or machine.

**Greedy Choice:** Always select the activity that finishes earliest among the remaining compatible activities.

**File:** `src/algorithms/activity-selection.ts`
**Test File:** `tests/activity-selection.test.ts`

### 2. Fractional Knapsack Problem

Given a set of items, each with a weight and a value, and a knapsack with a maximum capacity, the goal is to determine the items to include in the knapsack so that the total value is maximized. Items can be broken down (fractions of items can be taken).

**Greedy Choice:** Sort items by their value-to-weight ratio in descending order. Take items in this order, taking fractions if necessary, until the knapsack capacity is reached.

**File:** `src/algorithms/fractional-knapsack.ts`
**Test File:** `tests/fractional-knapsack.test.ts`

### 3. Coin Change Problem (Greedy Variant)

Given a set of coin denominations and an amount, find the minimum number of coins required to make up that amount. This specific implementation focuses on the greedy approach, which works for standard coin systems (like US currency) but might not for arbitrary denominations.

**Greedy Choice:** Always choose the largest denomination coin that is less than or equal to the remaining amount.

**File:** `src/algorithms/coin-change.ts`
**Test File:** `tests/coin-change.test.ts`

### 4. Job Sequencing with Deadlines

Given a set of jobs, each with a deadline and an associated profit, where each job takes one unit of time to complete. The goal is to find a sequence of jobs that maximizes the total profit, ensuring that each job is completed by its deadline.

**Greedy Choice:** Sort jobs by profit in descending order. For each job, schedule it in the latest possible free slot before its deadline.

**File:** `src/algorithms/job-sequencing.ts`
**Test File:** `tests/job-sequencing.test.ts`

## Getting Started

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/greedy-algorithms-project.git
    cd greedy-algorithms-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install `typescript`, `ts-node`, `jest`, and other development dependencies.

### Running Tests

To execute all unit tests for the implemented algorithms:

```bash
npm test
```

You can also run tests for a specific file, e.g.:
```bash
npx jest tests/activity-selection.test.ts
```

### Running Benchmarks

To evaluate the performance of the algorithms:

```bash
npm run benchmark
```
This will execute the `benchmarking/benchmark.ts` script, which measures the execution time for various input sizes.

## Documentation

The `docs/` directory contains detailed explanations and guides:

*   **`greedy-algorithms-explained.md`**: A comprehensive document explaining what greedy algorithms are, when they apply, how to prove their correctness, and their limitations. It also provides high-level overviews for each implemented problem.
*   **`interview-guide.md`**: Offers practical tips for tackling greedy algorithm problems in interviews, common pitfalls, how to discuss complexity, and strategies for asking clarifying questions.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions, find bugs, or want to add more problems/features.

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details (not included in this example but generally good practice).

---