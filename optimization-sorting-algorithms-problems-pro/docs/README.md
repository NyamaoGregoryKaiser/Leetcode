```markdown
# Sorting Algorithms Interview Project

This is a comprehensive project designed to cover various aspects of sorting algorithms, suitable for coding interview preparation. It includes implementations of core sorting algorithms, specific interview problems, extensive tests, performance benchmarks, and detailed documentation.

## Project Structure

```
sorting-algorithms-project/
├── algorithms/
│   ├── basicSorts.js         # Implementations of Bubble, Selection, Insertion Sort
│   ├── advancedSorts.js      # Implementations of Merge, Quick, Heap, Counting, Radix Sort
│   └── sortingProblems.js    # Solutions to specific interview problems
├── utils/
│   ├── arrayGenerator.js     # Utilities to generate various types of arrays
│   └── sorterUtils.js        # Common utilities like swap, isSorted, getComparator, partition
├── tests/
│   ├── testCases.js          # Defines extensive test cases for all algorithms and problems
│   └── testRunner.js         # Executes all tests and reports results
├── benchmarks/
│   └── benchmarkRunner.js    # Measures and reports performance of algorithms
├── docs/
│   ├── README.md             # This file
│   ├── algorithms_explanation.md # Detailed explanations of sorting algorithms with ASCII diagrams
│   └── interview_tips.md     # Common interview questions, tips, and variations
├── .gitignore
└── package.json
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sorting-algorithms-project.git
    cd sorting-algorithms-project
    ```
2.  **Install dependencies:**
    This project uses `chalk`, `colors`, and `cli-table` for enhanced terminal output in tests and benchmarks.
    ```bash
    npm install
    ```

## How to Run

### 1. Run Tests

To execute all unit tests for sorting algorithms and problem solutions:

```bash
npm test
# or
node tests/testRunner.js
```

The `testRunner.js` will output results for each algorithm and problem, indicating success or failure and providing details for failed cases.

### 2. Run Benchmarks

To measure the performance of different sorting algorithms and problem solutions across various array sizes and types:

```bash
npm benchmark
# or
node benchmarks/benchmarkRunner.js
```

The `benchmarkRunner.js` will print tables showing the average execution time (in milliseconds) for each algorithm/solution, allowing you to observe their time complexities in practice.

## Algorithms Implemented

### Basic Sorts (`algorithms/basicSorts.js`)
*   **Bubble Sort**: O(N^2) average, O(N) best, O(1) space. Stable, in-place.
*   **Selection Sort**: O(N^2) always, O(1) space. Unstable, in-place.
*   **Insertion Sort**: O(N^2) average, O(N) best, O(1) space. Stable, in-place.

### Advanced Sorts (`algorithms/advancedSorts.js`)
*   **Merge Sort**: O(N log N) always, O(N) space. Stable, not in-place (typically).
*   **Quick Sort**: O(N log N) average, O(N^2) worst, O(log N) space (average). Unstable, in-place (with careful partitioning).
*   **Heap Sort**: O(N log N) always, O(1) space. Unstable, in-place.
*   **Counting Sort**: O(N + K) always, O(N + K) space (K is range). Stable, not in-place. (Assumes non-negative integers).
*   **Radix Sort**: O(N * k) always, O(N + B) space (k is digits, B is base). Stable, not in-place. (Assumes non-negative integers).

## Specific Interview Problems (`algorithms/sortingProblems.js`)

1.  **Kth Largest Element in an Array**
    *   **Brute Force**: Sort and pick. (O(N log N) time, O(N) space)
    *   **Optimized (QuickSelect)**: Partition-based selection. (O(N) average time, O(N^2) worst, O(log N) average space)
    *   **Optimized (Min-Heap)**: Maintain a min-heap of size K. (O(N log K) time, O(K) space)

2.  **Merge Overlapping Intervals**
    *   **Optimal**: Sort by start time, then iterate and merge. (O(N log N) time, O(N) space)

3.  **Wiggle Sort II** (`nums[0] < nums[1] > nums[2] < nums[3]...`)
    *   **Optimized (Sort and Distribute)**: Sort the array, then interleave elements from two halves (smaller and larger) into the target pattern. (O(N log N) time, O(N) space)

4.  **Sort Colors (Dutch National Flag Problem)** (`0, 1, 2`)
    *   **Two-Pass Counting Sort**: Count 0s, 1s, 2s, then overwrite the array. (O(N) time, O(1) space)
    *   **One-Pass (Dutch National Flag Algorithm)**: Uses three pointers (`low`, `mid`, `high`) to partition in-place. (O(N) time, O(1) space)

5.  **Find the Smallest K Numbers**
    *   **Brute Force**: Sort and slice. (O(N log N) time, O(N) space)
    *   **Optimized (Max-Heap)**: Maintain a max-heap of size K. (O(N log K) time, O(K) space)
    *   **Optimized (QuickSelect)**: Find the Kth smallest element, then return all elements up to its position. (O(N) average time, O(N^2) worst, O(N) space worst case due to array slicing)

## Documentation

The `docs/` directory contains:

*   **`algorithms_explanation.md`**: Detailed explanations of how each sorting algorithm works, including their mechanics, advantages, disadvantages, and visual representations using ASCII art where beneficial (e.g., for Merge Sort or Quick Sort partitioning).
*   **`interview_tips.md`**: Guidance for approaching sorting-related interview questions, discussing time/space trade-offs, handling edge cases (empty array, single element, duplicates, already sorted), common variations, and general advice for communicating your thought process.

This project aims to provide a robust and educational resource for mastering sorting algorithms for technical interviews.
```