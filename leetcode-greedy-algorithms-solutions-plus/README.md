# 🚀 Greedy Algorithms Interview Project

This project provides a comprehensive resource for understanding, implementing, and practicing Greedy Algorithms, particularly in the context of coding interviews. It includes implementations of classic greedy problems, detailed documentation, extensive test cases, and performance benchmarks.

## 🌟 Table of Contents

1.  [Project Overview](#-project-overview)
2.  [Features](#-features)
3.  [Problem Descriptions](#-problem-descriptions)
    *   [1. Activity Selection Problem](#1-activity-selection-problem)
    *   [2. Fractional Knapsack Problem](#2-fractional-knapsack-problem)
    *   [3. Job Sequencing with Deadlines](#3-job-sequencing-with-deadlines)
4.  [Setup and Installation](#-setup-and-installation)
5.  [Running Tests](#-running-tests)
6.  [Running Benchmarks](#-running-benchmarks)
7.  [Project Structure](#-project-structure)
8.  [Documentation](#-documentation)
9.  [Contributing](#-contributing)
10. [License](#-license)

## 🌟 Project Overview

Greedy algorithms are a powerful class of algorithms that make locally optimal choices at each step with the hope of finding a global optimum. This project aims to solidify your understanding of greedy strategies by providing hands-on experience with popular problems. Each problem comes with an optimal JavaScript solution, detailed comments, complexity analysis, and extensive supporting materials.

## ✨ Features

*   **Optimal JavaScript Implementations**: Solutions for 3 classic greedy problems.
*   **Detailed Comments**: Explanations for logic, time, and space complexity within the code.
*   **Extensive Test Suite**: Powered by Jest, ensuring correctness across various scenarios.
*   **Performance Benchmarking**: Tools to evaluate the efficiency of the algorithms.
*   **Comprehensive Documentation**: In-depth explanations, visual diagrams, edge cases, and interview tips.
*   **Helper Utilities**: Useful data structures like Disjoint Set Union (DSU).
*   **Brute Force vs. Optimized**: Discussion and demonstration of different approaches where applicable.

## 📋 Problem Descriptions

### 1. Activity Selection Problem

**Problem Statement:**
You are given a set of `n` activities, each with a start time `s[i]` and a finish time `f[i]`. You want to select the maximum number of non-overlapping activities that can be performed by a single person or machine. An activity `i` and activity `j` are non-overlapping if `s[i] >= f[j]` or `s[j] >= f[i]`.

**Input:**
An array of activity objects, where each object has `start` and `end` properties.
Example: `[{ start: 1, end: 4 }, { start: 3, end: 5 }, { start: 0, end: 6 }, { start: 5, end: 7 }, { start: 3, end: 9 }, { start: 5, end: 9 }, { start: 6, end: 10 }, { start: 8, end: 11 }, { start: 8, end: 12 }, { start: 2, end: 14 }, { start: 12, end: 16 }]`

**Output:**
An array of the selected activities (or their indices), representing the maximum set of non-overlapping activities.

**Greedy Choice:**
Always pick the activity that finishes earliest among the remaining compatible activities. Sorting by finish times is crucial here.

---

### 2. Fractional Knapsack Problem

**Problem Statement:**
Given weights and values of `n` items, put these items in a knapsack of a fixed capacity `W` to get the maximum total value. You can take fractions of items.

**Input:**
*   An array of item objects, where each object has `value` and `weight` properties.
*   An integer `capacity` representing the maximum weight the knapsack can hold.
Example: `items = [{ value: 60, weight: 10 }, { value: 100, weight: 20 }, { value: 120, weight: 30 }]`, `capacity = 50`

**Output:**
The maximum total value that can be obtained.

**Greedy Choice:**
Prioritize items with the highest value-to-weight ratio. Sort items by this ratio in descending order and fill the knapsack.

---

### 3. Job Sequencing with Deadlines

**Problem Statement:**
Given a set of `n` jobs, where each job `i` has a deadline `d[i]` and a profit `p[i]`. You can only perform one job at a time, and each job takes unit time. The goal is to find a sequence of jobs that maximizes the total profit, such that each job is completed by its deadline.

**Input:**
An array of job objects, where each object has `id` (string), `deadline` (integer), and `profit` (integer) properties.
Example: `jobs = [{ id: 'a', deadline: 2, profit: 100 }, { id: 'b', deadline: 1, profit: 19 }, { id: 'c', deadline: 2, profit: 27 }, { id: 'd', deadline: 1, profit: 25 }, { id: 'e', deadline: 3, profit: 15 }]`

**Output:**
An object containing `maxProfit` (the total maximum profit) and `jobSequence` (an array of job IDs representing the optimal sequence).

**Greedy Choice:**
Sort jobs by profit in descending order. For each job, schedule it in the latest possible available slot before or on its deadline. If no such slot is available, discard the job.

---

## 💻 Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/greedy-algorithms-project.git
    cd greedy-algorithms-project
    ```
2.  **Install dependencies:**
    This project uses `jest` for testing.
    ```bash
    npm install
    ```

## ✅ Running Tests

To run the full test suite for all greedy algorithms:

```bash
npm test
```

You can also run tests for specific files or watch for changes:

```bash
npx jest test/greedyAlgorithms.test.js
```

## ⏱️ Running Benchmarks

To evaluate the performance of the algorithms with large datasets:

```bash
npm run benchmark
```

The benchmark script will generate random data, run each algorithm multiple times, and report the average execution time.

## 📂 Project Structure

```
project-greedy-algorithms/
├── src/                          # Main source code for algorithms and utilities
│   ├── greedyAlgorithms.js       # Implementations of greedy algorithms
│   └── utils/                    # Helper utilities and data structures
│       └── dataStructures.js     # E.g., Disjoint Set Union for Job Sequencing
├── test/                         # Jest test files
│   └── greedyAlgorithms.test.js  # Tests for greedyAlgorithms.js
├── docs/                         # Comprehensive documentation
│   └── GreedyAlgorithms.md       # Detailed explanations, diagrams, tips
├── benchmark/                    # Performance benchmarking scripts
│   └── benchmark.js
├── .gitignore                    # Specifies intentionally untracked files
├── package.json                  # Project metadata and dependencies
└── README.md                     # This file
```

## 📖 Documentation

For in-depth explanations of greedy algorithms, justifications for greedy choices, step-by-step examples with ASCII art, time/space complexity analysis, edge cases, and interview tips, please refer to the `docs/GreedyAlgorithms.md` file.

## 🤝 Contributing

Contributions are welcome! If you find a bug, want to improve an explanation, or add another greedy algorithm, please feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (or just state MIT if you don't have a separate file).

---