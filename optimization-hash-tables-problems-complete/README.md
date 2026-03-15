# Hash Table Coding Interview Project

This project provides a comprehensive set of coding interview problems focused on Hash Tables. It includes detailed solutions with multiple approaches, thorough testing, performance benchmarking, and extensive documentation to help you master this fundamental data structure.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Problem Descriptions](#problem-descriptions)
4.  [Setup and Running Tests](#setup-and-running-tests)
5.  [Benchmarking Performance](#benchmarking-performance)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)

## Introduction

Hash tables are crucial data structures in computer science, offering average O(1) time complexity for insertions, deletions, and lookups. This project explores various applications of hash tables in common interview scenarios, ranging from basic lookups to complex data structure designs.

Each problem includes:
*   Optimal solutions using hash tables.
*   Alternative approaches (e.g., brute force, sorting-based) for comparison.
*   Detailed comments explaining logic.
*   Time and space complexity analysis.

## Project Structure

```
hash_table_project/
├── src/
│   ├── problems.py                   # Main problem implementations
│   ├── lfu_cache.py                  # LFU Cache specific implementation
│   ├── utils.py                      # Helper data structures (DoublyLinkedList for LFU)
│   └── __init__.py
├── tests/
│   ├── test_problems.py              # Unit tests for problems.py
│   ├── test_lfu_cache.py             # Unit tests for lfu_cache.py
│   └── __init__.py
├── docs/
│   ├── documentation.md              # Algorithm explanations, hash table concepts
│   ├── interview_tips.md             # Interview strategies, pitfalls, variations
│   └── diagrams.txt                  # ASCII art diagrams
├── README.md                         # Project overview, problem descriptions
├── benchmark.py                      # Performance benchmarking script
└── requirements.txt                  # Project dependencies
```

## Problem Descriptions

Here's a brief overview of the problems addressed in this project:

### 1. Two Sum (src/problems.py)
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
Example: `nums = [2, 7, 11, 15], target = 9` -> `[0, 1]`

### 2. Group Anagrams (src/problems.py)
Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
Example: `strs = ["eat", "tea", "tan", "ate", "nat", "bat"]` -> `[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]`

### 3. Longest Consecutive Sequence (src/problems.py)
Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.
Example: `nums = [100, 4, 200, 1, 3, 2]` -> `4` (The longest consecutive elements sequence is `[1, 2, 3, 4]`)

### 4. Subarray Sum Equals K (src/problems.py)
Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals `k`.
A subarray is a contiguous non-empty sequence of elements within an array.
Example: `nums = [1, 1, 1], k = 2` -> `2` (Subarrays: `[1, 1]` at index 0, `[1, 1]` at index 1)

### 5. LFU Cache (src/lfu_cache.py)
Design and implement a data structure for a Least Frequently Used (LFU) cache.
The LFU cache should support the following operations: `get` and `put`.
*   `get(key)`: Get the value of the key if the key exists in the cache. Otherwise, return -1.
*   `put(key, value)`: Update the value of the key if `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the least frequently used key. If there is a tie, evict the least recently used key.
Example:
```
LFUCache cache = new LFUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
```

## Setup and Running Tests

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/hash_table_project.git
    cd hash_table_project
    ```

2.  **Install dependencies (if any):**
    ```bash
    pip install -r requirements.txt
    ```
    *(Note: For this project, `requirements.txt` will likely be minimal as Python's built-in data structures are used.)*

3.  **Run unit tests:**
    To run all tests:
    ```bash
    python -m unittest discover tests
    ```
    To run tests for specific files:
    ```bash
    python -m unittest tests.test_problems
    python -m unittest tests.test_lfu_cache
    ```

## Benchmarking Performance

To run the performance comparison script:

```bash
python benchmark.py
```
This script will demonstrate the performance differences between various approaches (e.g., brute force vs. hash table) for selected problems.

## Documentation

The `docs/` directory contains detailed explanations:

*   **`documentation.md`**: Delves into the theory of hash tables, Python's `dict` implementation, collision resolution, and walks through the logic of complex algorithms like LFU Cache with explanations and ASCII diagrams.
*   **`interview_tips.md`**: Offers advice on how to approach hash table problems in an interview setting, common clarifying questions to ask, strategies for handling edge cases, and discussing time/space tradeoffs.
*   **`diagrams.txt`**: Contains ASCII art representations of hash table concepts and data structures used (e.g., LFU Cache's multi-level structure).

## Contributing

Feel free to open issues or submit pull requests to improve the solutions, add more problems, enhance documentation, or expand test cases.

---