```markdown
# Hash Table Interview Project

This project serves as a comprehensive resource for understanding and mastering Hash Tables, a fundamental data structure in computer science, particularly crucial for coding interviews. It includes a custom Hash Table implementation, solutions to classic problems, extensive testing, performance benchmarking, and detailed documentation.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Installation and Setup](#installation-and-setup)
4.  [Running Tests](#running-tests)
5.  [Running Benchmarks](#running-benchmarks)
6.  [Problem Descriptions](#problem-descriptions)
7.  [Documentation](#documentation)
8.  [Project Structure](#project-structure)
9.  [Contributing](#contributing)
10. [License](#license)

## Project Overview

Hash Tables (also known as Hash Maps, Dictionaries, or Associative Arrays) are powerful data structures that store key-value pairs, providing average O(1) time complexity for insertion, deletion, and retrieval operations. This project covers:

*   **Core Implementation:** A custom TypeScript `HashTable` class demonstrating separate chaining for collision resolution, dynamic resizing, and configurable hash/equality functions.
*   **Classic Problems:** Optimal Hash Table-based solutions for common interview questions.
*   **Comparison:** Brute-force solutions for selected problems to highlight performance gains.
*   **Testing:** Thorough unit tests using Jest for both the custom `HashTable` and problem solutions, covering various edge cases.
*   **Performance Analysis:** Benchmarking scripts to empirically compare the efficiency of different algorithms.
*   **Documentation:** Detailed explanations, ASCII diagrams, complexity analysis, and interview tips.

## Features

*   **Custom `HashTable` Class (`src/main.ts`):**
    *   Generic key-value storage (`K`, `V`).
    *   Separate chaining using `SinglyLinkedList` (`src/utils.ts`) for collision resolution.
    *   Dynamic resizing to maintain an optimal load factor.
    *   Configurable hash and equality functions for flexible key types.
    *   Methods: `set`, `get`, `delete`, `has`, `keys`, `values`, `entries`, `size`.
*   **Interview Problems (`src/main.ts`):**
    *   **Two Sum:** Find two numbers that add up to a target.
    *   **Longest Consecutive Sequence:** Find the length of the longest consecutive sequence of elements.
    *   **Group Anagrams:** Group strings that are anagrams of each other.
    *   **Contains Duplicate:** Check if an array contains any duplicate values.
*   **Brute-Force Implementations (`implementations/brute-force-problems.ts`):**
    *   Provides less optimized, quadratic-time solutions for `Two Sum` and `Group Anagrams` for direct comparison.
*   **Testing (`tests/`):**
    *   Comprehensive Jest test suites for the `HashTable` class and each problem solution.
    *   Covers normal cases, edge cases (empty input, single element, duplicates, negative numbers), and scale.
*   **Benchmarking (`perf/benchmark.ts`):**
    *   Compares the runtime performance of optimized (Hash Table) solutions against brute-force alternatives.
    *   Uses `process.hrtime.bigint` for high-resolution timing.
*   **Documentation (`docs/`):**
    *   **`README.md` (this file):** Project overview and setup.
    *   **`algorithms.md`:** In-depth explanation of each algorithm, complexity analysis, and ASCII diagrams.
    *   **`interview-tips.md`:** Advice on how to approach Hash Table problems in interviews, common pitfalls, and follow-up questions.

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/hash-table-interview-project.git
    cd hash-table-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install TypeScript, Jest, and their respective type definitions.

3.  **Build the project:**
    ```bash
    npm run build
    ```
    This compiles the TypeScript code into JavaScript in the `dist/` directory.

## Running Tests

To execute all test suites:

```bash
npm test
```

To run tests in watch mode (reruns tests on file changes):

```bash
npm test:watch
```

## Running Benchmarks

To run the performance comparison benchmarks (e.g., for `Two Sum` brute-force vs. optimized):

```bash
npm run benchmark
```

The benchmark script will output runtime comparisons for various input sizes.

## Problem Descriptions

### Problem 1: Two Sum

**Description:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example:**
`nums = [2, 7, 11, 15], target = 9`
Output: `[0, 1]` (because `nums[0] + nums[1] == 9`)

**Solution Approach (Optimal):** Utilizes a hash map (JavaScript `Map`) to store numbers and their indices. For each number, it checks if its `complement` (target - current number) has been seen before.

### Problem 2: Longest Consecutive Sequence

**Description:** Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(N) time.

**Example:**
`nums = [100, 4, 200, 1, 3, 2]`
Output: `4` (The longest consecutive sequence is `[1, 2, 3, 4]`)

**Solution Approach (Optimal):** Uses a hash set (JavaScript `Set`) to efficiently check for the presence of numbers. It iterates through the numbers, and for each number, if it's the *start* of a sequence (i.e., `num - 1` is not in the set), it counts upwards to find the length of that sequence.

### Problem 3: Group Anagrams

**Description:** Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example:**
`strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`
Output: `[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]` (Order can vary)

**Solution Approach (Optimal):** Employs a hash map (JavaScript `Map`) where the key is a "canonical" representation of an anagram (e.g., a sorted version of the string, like "aet" for "eat", "tea", "ate"), and the value is a list of original strings that produce that key.

### Problem 4: Contains Duplicate

**Description:** Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

**Example:**
`nums = [1, 2, 3, 1]`
Output: `true`

**Solution Approach (Optimal):** Uses a hash set (JavaScript `Set`) to store encountered numbers. As it iterates through the array, if a number is already in the set, a duplicate is found. Otherwise, the number is added to the set.

## Documentation

Dive deeper into the technical details and interview strategies:

*   **`docs/algorithms.md`**: Explains the logic, time/space complexity, and alternative approaches for each problem, including ASCII diagrams where helpful for visualization.
*   **`docs/interview-tips.md`**: Offers advice on how to discuss your solutions, handle edge cases, and answer follow-up questions during a coding interview.

## Project Structure

```
hash-table-interview-project/
├── src/
│   ├── types.ts                    # Type definitions for custom Hash Table and problems
│   ├── utils.ts                    # Helper utilities: SinglyLinkedList, custom hash functions
│   └── main.ts                     # Main algorithms: Custom HashTable class, problem solutions
├── tests/
│   ├── basic-hash-table.test.ts    # Tests for the custom HashTable implementation
│   ├── problem1-two-sum.test.ts    # Tests for the Two Sum problem
│   ├── problem2-longest-consecutive-sequence.test.ts # Tests for Longest Consecutive Sequence
│   ├── problem3-group-anagrams.test.ts # Tests for Group Anagrams
│   └── problem4-contains-duplicate.test.ts # Tests for Contains Duplicate
├── implementations/
│   └── brute-force-problems.ts     # Brute-force solutions for comparison
├── perf/
│   └── benchmark.ts                # Performance benchmarking script
├── docs/
│   ├── README.md                   # Project overview, setup, and problem descriptions
│   ├── algorithms.md               # Detailed algorithm explanations, complexities, ASCII diagrams
│   └── interview-tips.md           # Interview strategy, common pitfalls, and variations
├── package.json
└── tsconfig.json
```

## Contributing

Feel free to fork this repository, add more problems, alternative solutions, or improve existing implementations and documentation. Pull requests are welcome!

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (not included in this response, but typically present in a full repo).
```