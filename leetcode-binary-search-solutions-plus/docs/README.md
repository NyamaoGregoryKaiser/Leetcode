```markdown
# Binary Search Interview Project

This project serves as a comprehensive resource for understanding, implementing, testing, and benchmarking various Binary Search algorithms frequently encountered in coding interviews. It includes multiple problem patterns, optimal solutions, brute-force comparisons, performance analysis, and detailed documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Setup and Installation](#setup-and-installation)
3.  [Problems Covered](#problems-covered)
    *   [Problem 1: Standard Binary Search](#problem-1-standard-binary-search)
    *   [Problem 2: Find First and Last Occurrence](#problem-2-find-first-and-last-occurrence)
    *   [Problem 3: Search in Rotated Sorted Array](#problem-3-search-in-rotated-sorted-array)
    *   [Problem 4: Find Peak Element](#problem-4-find-peak-element)
    *   [Problem 5: Koko Eating Bananas (Binary Search on Answer)](#problem-5-koko-eating-bananas-binary-search-on-answer)
4.  [Running Tests](#running-tests)
5.  [Running Benchmarks](#running-benchmarks)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
binary-search-interview-project/
├── src/
│   ├── algorithms/
│   │   ├── binarySearchProblems.js    # Core Binary Search implementations (5 problems)
│   │   └── bruteForceSolutions.js     # Brute-force counterparts for comparison
│   ├── utils/
│   │   ├── arrayGenerator.js          # Utility to generate diverse test arrays
│   │   └── performanceMonitor.js      # Utility to measure function execution time
│   └── data-structures/
│       # (Placeholder for potential future complex data structures)
├── tests/
│   ├── binarySearchProblems.test.js   # Jest tests for correctness of algorithms
│   └── performance.test.js            # Performance benchmarks comparing algorithms
├── docs/
│   ├── README.md                      # This file
│   ├── ALGORITHM_EXPLANATION.md       # Detailed explanation of Binary Search, diagrams, edge cases
│   └── INTERVIEW_TIPS.md              # Advice for tackling Binary Search problems in interviews
├── .gitignore
├── package.json
├── babel.config.js
└── jest.config.js
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/binary-search-interview-project.git
    cd binary-search-interview-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Problems Covered

This project implements optimal (O(log N)) solutions for a variety of binary search problems.

### Problem 1: Standard Binary Search

*   **Description**: Given a sorted array of integers `nums` and an integer `target`, return the index of `target` if it is in the array, otherwise return -1.
*   **Implementations**:
    *   `standardBinarySearchIterative(nums, target)`
    *   `standardBinarySearchRecursive(nums, target)`
*   **Time Complexity**: O(log N)
*   **Space Complexity**: O(1) for iterative, O(log N) for recursive (due to call stack).

### Problem 2: Find First and Last Occurrence

*   **Description**: Given a sorted array `nums` with potentially duplicate elements and a `target` value, return an array of two integers `[first_occurrence_index, last_occurrence_index]`. If the target is not found, return `[-1, -1]`.
*   **Implementation**: `findFirstAndLastOccurrence(nums, target)`
*   **Time Complexity**: O(log N)
*   **Space Complexity**: O(1)

### Problem 3: Search in Rotated Sorted Array

*   **Description**: Given a sorted array `nums` that has been rotated at an unknown pivot, search for a `target` value. Return its index or -1 if not found.
*   **Implementation**: `searchInRotatedSortedArray(nums, target)`
*   **Time Complexity**: O(log N)
*   **Space Complexity**: O(1)

### Problem 4: Find Peak Element

*   **Description**: A peak element is an element strictly greater than its neighbors. Given an array `nums` where `nums[i] != nums[i+1]`, find *any* peak element and return its index. Assume `nums[-1] = nums[n] = -Infinity`.
*   **Implementation**: `findPeakElement(nums)`
*   **Time Complexity**: O(log N)
*   **Space Complexity**: O(1)

### Problem 5: Koko Eating Bananas (Binary Search on Answer)

*   **Description**: Koko wants to eat `piles` of bananas within `h` hours. Find the minimum integer eating speed `k` such that she can finish all bananas.
*   **Implementation**: `minEatingSpeed(piles, h)`
*   **Time Complexity**: O(N log M) where N is number of piles and M is the maximum pile size (range of `k`).
*   **Space Complexity**: O(1)

## Running Tests

To run the unit tests for correctness:

```bash
npm test
```

This will execute all tests in the `tests/` directory.

## Running Benchmarks

To run the performance benchmarks and compare binary search against brute-force solutions:

```bash
npm run benchmark
```

This command specifically runs `tests/performance.test.js` and outputs the execution times to the console. The performance tests are configured to run sequentially (`--runInBand`) to avoid interference and ensure accurate time measurements.

## Documentation

The `docs/` directory contains detailed explanations:

*   **`ALGORITHM_EXPLANATION.md`**: A deep dive into the Binary Search algorithm, its principles, variations, common pitfalls, and ASCII diagrams to illustrate the search process.
*   **`INTERVIEW_TIPS.md`**: Practical advice and strategies for approaching and acing Binary Search questions in coding interviews.

## Contributing

Feel free to open issues or submit pull requests to improve this project. Suggestions for new problems, optimizations, or documentation enhancements are welcome.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (not included in this specific output, but would be standard in a real project).
```