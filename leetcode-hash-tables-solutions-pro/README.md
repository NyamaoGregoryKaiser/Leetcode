```markdown
# 📚 Hash Tables Interview Project

Welcome to the Hash Tables Interview Project! This repository is a comprehensive resource designed to help you master Hash Table concepts for technical interviews. It includes multiple problems, optimal solutions, brute-force comparisons, extensive test cases, performance benchmarks, and detailed documentation.

## 🌟 Features

*   **Multiple Problems:** Covers classic and advanced Hash Table problems (Two Sum, Longest Consecutive Sequence, LRU Cache, Group Anagrams).
*   **Optimal Solutions:** Each problem is solved using Hash Tables for optimal time/space complexity.
*   **Multiple Approaches:** Includes brute-force solutions for comparison where applicable.
*   **Detailed Explanations:** In-code comments, complexity analysis, and dedicated documentation (`docs/algorithms.md`).
*   **Extensive Tests:** Jest test files with a variety of test cases, including edge cases.
*   **Performance Benchmarking:** A script to compare the performance of different approaches.
*   **Supporting Utilities:** Custom data structures (e.g., Doubly Linked List for LRU Cache).
*   **Interview Tips:** A dedicated document with common pitfalls, variations, and advice (`docs/interviewTips.md`).
*   **Visual Aids:** ASCII art diagrams to illustrate core concepts (`docs/diagrams.md`).

## 🚀 Getting Started

### Prerequisites

*   Node.js (v14 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/hash-tables-interview-project.git
    cd hash-tables-interview-project
    ```
    *(Note: Replace `https://github.com/your-username/hash-tables-interview-project.git` with the actual repository URL if you fork it.)*

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Project

1.  **Compile TypeScript:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will compile all TypeScript files in `src/` to JavaScript files in the `dist/` directory.

2.  **Run Tests:**
    To execute all unit tests using Jest:
    ```bash
    npm test
    # or
    yarn test
    ```
    For continuous testing during development:
    ```bash
    npm test -- --watchAll
    # or
    yarn test --watchAll
    ```

3.  **Run Benchmarks:**
    To execute the performance comparison script:
    ```bash
    npm run benchmark
    # or
    yarn benchmark
    ```

## 📂 Project Structure Overview

*   `src/problems/`: Contains the TypeScript implementations for each problem.
    *   `twoSum.ts`: Optimal Hash Map solution for Two Sum.
    *   `twoSumBruteForce.ts`: Brute-force solution for Two Sum (for comparison).
    *   `longestConsecutiveSequence.ts`: Optimal Hash Set solution.
    *   `lruCache.ts`: Optimal LRU Cache implementation using a Hash Map and Doubly Linked List.
    *   `groupAnagrams.ts`: Optimal Hash Map solution for grouping anagrams.
*   `src/utils/`: Helper utilities and custom data structures.
    *   `dataStructures/doublyLinkedList.ts`: Custom Doubly Linked List implementation used by LRU Cache.
    *   `types.ts`: TypeScript type definitions.
*   `tests/`: Jest test files for each problem.
*   `benchmarking/`: Script for performance comparison.
*   `docs/`: Comprehensive documentation.
    *   `algorithms.md`: Detailed explanations of each algorithm, complexity analysis, and multiple approaches.
    *   `diagrams.md`: ASCII art diagrams to visualize data structures and algorithm flow.
    *   `interviewTips.md`: Insights into Hash Table interview questions, common pitfalls, and variations.
*   `README.md`: This file.
*   `package.json`: Project dependencies and scripts.
*   `tsconfig.json`: TypeScript configuration.

## 🎯 Problems Covered

### 1. Two Sum

*   **Description:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
*   **Approaches:** Brute-force (O(N^2)) and Hash Map (O(N)).

### 2. Longest Consecutive Sequence

*   **Description:** Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.
*   **Approaches:** Sorting (O(N log N)) and Hash Set (O(N)).

### 3. LRU Cache

*   **Description:** Design and implement a Least Recently Used (LRU) cache. It should support `get` and `put` operations with O(1) time complexity.
*   **Approaches:** Hash Map combined with a Doubly Linked List.

### 4. Group Anagrams

*   **Description:** Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.
*   **Approaches:** Hash Map using sorted string as key.

## 📝 Documentation Details

Refer to the `docs/` directory for in-depth explanations:

*   **`docs/algorithms.md`**: Provides problem statements, detailed explanations of different algorithmic approaches (including brute-force and optimal Hash Table solutions), and thorough time/space complexity analysis for each.
*   **`docs/diagrams.md`**: Contains ASCII art diagrams illustrating the core logic of Hash Tables for specific problems, such as how the map stores complements in Two Sum, how the set optimizes Longest Consecutive Sequence, and the interplay between the Hash Map and Doubly Linked List in LRU Cache.
*   **`docs/interviewTips.md`**: Offers valuable advice for tackling Hash Table questions in interviews, covers common edge cases, potential gotchas, and discusses common variations of these problems.

---

Feel free to explore, learn, and contribute! If you have any suggestions or find issues, please open an issue or submit a pull request.
```