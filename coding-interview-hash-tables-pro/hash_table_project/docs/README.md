# Hash Table Coding Interview Project

This project is a comprehensive resource for preparing for coding interviews on Hash Tables. It includes multiple common problems, optimal and alternative solutions, detailed explanations, a custom Hash Map implementation, extensive test cases, and performance benchmarks.

## Table of Contents
1.  [Project Structure](#project-structure)
2.  [Problem Descriptions](#problem-descriptions)
3.  [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running Tests](#running-tests)
    -   [Running Benchmarks](#running-benchmarks)
    -   [Running Individual Algorithms](#running-individual-algorithms)
4.  [Documentation](#documentation)
    -   [Hash Table Concepts](#hash-table-concepts)
    -   [Interview Guide](#interview-guide)

---

## 1. Project Structure

```
hash_table_project/
├── algorithms/
│   ├── problem_1_two_sum.py
│   ├── problem_2_group_anagrams.py
│   ├── problem_3_longest_consecutive_sequence.py
│   └── problem_4_design_hashmap.py
├── tests/
│   ├── test_two_sum.py
│   ├── test_group_anagrams.py
│   ├── test_longest_consecutive_sequence.py
│   └── test_design_hashmap.py
├── utils/
│   └── custom_hash_map.py         # Custom Hash Map implementation
├── docs/
│   ├── README.md                  # This file
│   ├── hash_table_concepts.md     # In-depth explanation of Hash Table principles
│   └── interview_guide.md         # Tips and strategies for Hash Table interviews
├── benchmarks/
│   └── benchmark_all_problems.py  # Performance benchmarking scripts
└── requirements.txt               # Project dependencies
```

## 2. Problem Descriptions

Each problem file (`algorithms/*.py`) contains a detailed problem description, multiple solutions (including brute force and optimized hash table approaches), time/space complexity analysis, and illustrative comments.

### Problem 1: Two Sum
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
-   **Key Concepts:** Basic hash map usage for O(1) lookups to find complements.
-   **Approaches:** Brute Force (O(n^2)), Hash Map (O(n)).

### Problem 2: Group Anagrams
Given an array of strings `strs`, group the anagrams together.
-   **Key Concepts:** Using a canonical representation (sorted string or character count tuple) as a hash map key.
-   **Approaches:** Sorted String Key (O(N * K log K)), Character Count Tuple Key (O(N * K)), Brute Force (O(N^2 * K log K)).

### Problem 3: Longest Consecutive Sequence
Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.
-   **Key Concepts:** Using a hash set for efficient O(1) membership testing to find sequence starts and extend sequences.
-   **Approaches:** Sorting (O(N log N)), Hash Set (O(N)).

### Problem 4: Design HashMap
Implement a HashMap without using any built-in hash table libraries.
-   **Key Concepts:** Understanding internal workings: hash function, collision resolution (chaining), load factor, dynamic resizing.
-   **Implementation:** `utils/custom_hash_map.py` provides a chaining-based hash map. `algorithms/problem_4_design_hashmap.py` then wraps and utilizes this custom implementation.

## 3. Getting Started

### Prerequisites
-   Python 3.8+

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/hash_table_project.git
    cd hash_table_project
    ```
2.  Create and activate a virtual environment (recommended):
    ```bash
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    ```
3.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Running Tests
All tests are written using `pytest`.
From the project root directory, run:
```bash
pytest tests/
```
To see detailed output, including print statements from algorithms:
```bash
pytest tests/ -s
```

### Running Benchmarks
The `benchmarks/benchmark_all_problems.py` script compares the performance of different approaches for each problem.
From the project root directory, run:
```bash
python benchmarks/benchmark_all_problems.py
```

### Running Individual Algorithms
Each problem file in `algorithms/` contains an `if __name__ == "__main__":` block with example usage. You can run them directly:
```bash
python algorithms/problem_1_two_sum.py
python algorithms/problem_2_group_anagrams.py
# etc.
```
You can also run the custom hash map example:
```bash
python utils/custom_hash_map.py
```

## 4. Documentation

### Hash Table Concepts
For an in-depth understanding of Hash Tables, including their structure, hash functions, collision resolution strategies (chaining, open addressing), load factor, and resizing, refer to:
[docs/hash_table_concepts.md](docs/hash_table_concepts.md)

### Interview Guide
To excel in hash table-related coding interviews, read through the tips, common pitfalls, and variations discussed in:
[docs/interview_guide.md](docs/interview_guide.md)

---
Feel free to explore the code, run the tests, and consult the documentation. Good luck with your interview preparation!