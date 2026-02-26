```markdown
# Stack and Queue Interview Project

This project provides a comprehensive set of coding interview problems focused on Stack and Queue data structures. It includes detailed algorithm implementations, multiple approaches, thorough testing, performance benchmarking, and extensive documentation to prepare for technical interviews.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Features](#features)
3.  [Installation](#installation)
4.  [How to Run](#how-to-run)
    *   [Tests](#tests)
    *   [Benchmarks](#benchmarks)
5.  [Problems Covered](#problems-covered)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Structure

```
.
├── src/
│   ├── problems/             # Main algorithm implementations for each problem
│   │   ├── problem1_valid_parentheses.js
│   │   ├── problem2_implement_queue_using_stacks.js
│   │   ├── problem3_moving_average_from_data_stream.js
│   │   ├── problem4_largest_rectangle_in_histogram.js
│   │   └── problem5_min_stack.js
│   ├── utils/                # Custom Stack and Queue implementations
│   │   ├── stack.js
│   │   └── queue.js
│   └── index.js              # Entry point to export all solutions
├── test/                     # Test files for each problem
│   ├── test_problem1.js
│   ├── test_problem2.js
│   ├── test_problem3.js
│   ├── test_problem4.js
│   └── test_problem5.js
├── benchmark/                # Performance benchmarking scripts
│   └── benchmark.js
├── docs/                     # Comprehensive documentation
│   ├── algorithms.md         # Detailed algorithm explanations, complexity analysis
│   ├── diagrams.md           # ASCII art diagrams for complex logic
│   └── interview_tips.md     # Interview strategies, edge cases, variations
├── README.md                 # Project overview and instructions
└── package.json              # Project metadata and scripts
```

## Features

*   **5 Core Problems:** Covers a range of difficulty levels and applications of Stacks and Queues.
*   **Multiple Approaches:** Where applicable, includes brute-force, optimized, and alternative optimal solutions.
*   **Detailed Explanations:** Extensive comments within code and dedicated documentation for algorithms.
*   **Time/Space Complexity Analysis:** Provided for each solution.
*   **Comprehensive Testing:** Utilizes Node.js's built-in `node:test` module with a wide array of test cases (positive, negative, edge cases).
*   **Performance Benchmarking:** Scripts to measure and compare solution performance.
*   **Custom Data Structures:** Implements basic `Stack` and `Queue` classes from scratch.
*   **In-depth Documentation:** Dedicated markdown files for algorithm deep-dives, visual aids, and interview preparation tips.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/stack-queue-interview-project.git
    cd stack-queue-interview-project
    ```
2.  **Install dependencies:** (None beyond Node.js, as `node:test` is built-in)
    ```bash
    npm install
    ```

## How to Run

### Tests

To run all test suites:

```bash
npm test
```

This command will execute all `test_problemX.js` files in the `test/` directory.

### Benchmarks

To run the performance benchmarks:

```bash
npm run benchmark
```

This command will execute `benchmark/benchmark.js`, which compares the performance of different solutions and inputs.

## Problems Covered

1.  **Valid Parentheses**: Checks if a string containing '(', ')', '{', '}', '[', ']' is valid. (Stack)
2.  **Implement Queue using Stacks**: Implements a `Queue`'s `push`, `pop`, `peek`, and `empty` operations using two `Stack`s. (Stack & Queue)
3.  **Moving Average from Data Stream**: Calculates the moving average of the last `k` elements in a data stream. (Queue/Sliding Window)
4.  **Largest Rectangle in Histogram**: Finds the largest rectangle area in a histogram where each bar has a width of 1. (Monotonic Stack)
5.  **Min Stack**: Designs a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time. (Stack)

For detailed problem descriptions, explanations, and approaches, refer to `docs/algorithms.md`.

## Documentation

The `docs/` directory contains crucial information:

*   **`docs/algorithms.md`**: Detailed breakdown of each problem, including problem statement, intuition, algorithm steps, example, and complexity analysis.
*   **`docs/diagrams.md`**: Visual explanations using ASCII art for more complex data structure manipulations (e.g., Min Stack, Largest Rectangle).
*   **`docs/interview_tips.md`**: Advice for approaching Stack/Queue problems, common pitfalls, edge cases, and typical interview questions/variations.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements, new problems, or better solutions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```