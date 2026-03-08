# Sorting Algorithms Interview Project

This project is a comprehensive resource for mastering sorting algorithms and related problems often encountered in coding interviews. It provides multiple implementations, detailed explanations, extensive test cases, and performance benchmarks.

## Project Structure

*   `src/`: Contains the core JavaScript code.
    *   `algorithms/`: Implementations of various sorting algorithms.
    *   `problems/`: Solutions to common interview problems that leverage sorting.
    *   `utils/`: Helper utilities like array manipulation and comparison functions.
*   `tests/`: Unit tests for all algorithms and problem solutions.
*   `docs/`: Detailed documentation, explanations, visual aids, and interview tips.
*   `benchmarks/`: Code for performance benchmarking of sorting algorithms.

## Features

*   **Multiple Sorting Algorithms**: Implementations of Bubble Sort, Merge Sort, Quick Sort, Heap Sort, and Counting Sort.
*   **Problem-Solving**: Solutions to "Kth Smallest Element", "Merge Overlapping Intervals", "Sort Colors (Dutch National Flag)", and "Find All Duplicates".
*   **Optimal & Multiple Approaches**: For problems, often includes brute-force and optimized solutions.
*   **Detailed Comments**: In-code explanations for logic, time/space complexity.
*   **Extensive Tests**: Robust test suites cover various scenarios including edge cases.
*   **Performance Benchmarking**: Tools to compare the speed of different algorithms.
*   **Comprehensive Documentation**:
    *   Algorithm explanations with ASCII diagrams.
    *   Discussion of edge cases, stability, and gotchas.
    *   Interview tips, common variations, and follow-up questions.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sorting-algorithms-project.git
    cd sorting-algorithms-project
    ```
2.  **Install dependencies (if any, though this project mostly uses native JS):**
    ```bash
    npm install
    ```

## How to Run

### Run Tests

To execute all unit tests:

```bash
npm test
```

The test runner will output the results for each test file.

### Run Benchmarks

To run the performance benchmarks for various sorting algorithms:

```bash
npm benchmark
```

This will compare the execution time of different algorithms on randomly generated arrays of increasing sizes.

## Documentation

Explore the `docs/` directory for in-depth information:

*   `docs/README.md`: Introduction to the documentation.
*   `docs/algorithms-explained.md`: Detailed explanations of each sorting algorithm.
*   `docs/visual-diagrams.md`: ASCII diagrams to visualize sorting processes.
*   `docs/edge-cases-gotchas.md`: Common pitfalls and important considerations.
*   `docs/interview-tips.md`: Advice for tackling sorting-related interview questions.

---
**Note**: This project uses a very basic `console.assert`-based test runner and benchmark tool for simplicity and to avoid external dependencies. For more advanced testing, frameworks like Jest or Mocha would be recommended.
---