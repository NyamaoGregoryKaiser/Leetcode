```markdown
# Math Problems Interview Project

## Overview

This project is a comprehensive collection of solutions and resources for common mathematical problems encountered in coding interviews. It aims to provide optimal algorithm implementations, demonstrate brute-force alternatives, include extensive test cases, offer performance benchmarks, and detailed documentation.

The goal is to serve as a robust study guide and a practical example of a well-structured coding project for interview preparation.

## Project Structure

```
math-problems-interview/
├── src/
│   ├── problems.js                 # Optimal algorithm implementations
│   ├── bruteForceProblems.js       # Brute force/naive implementations
│   └── utils.js                    # Helper utilities
├── tests/
│   ├── problems.test.js            # Test suite for optimal solutions
│   └── bruteForceProblems.test.js  # Test suite for brute force solutions
├── benchmarks/
│   └── benchmark.js                # Performance benchmarking script
├── docs/
│   ├── README.md                   # Project README with problem descriptions (this file)
│   ├── algorithm_explanations.md   # Detailed algorithm explanations, complexity, edge cases
│   └── diagrams.txt                # ASCII art diagrams
├── package.json                    # npm configuration
└── .gitignore                      # Git ignore file
```

## Problems Covered

This project includes optimal and brute-force solutions for the following mathematical problems:

1.  **Greatest Common Divisor (GCD) & Least Common Multiple (LCM)**
    *   **Optimal:** Euclidean Algorithm for GCD, then derived LCM.
    *   **Brute Force:** Iterative search for GCD.
2.  **Sieve of Eratosthenes**
    *   **Optimal:** Standard Sieve implementation to find all primes up to N.
    *   **Brute Force:** Iterating and checking primality using trial division for each number.
3.  **Power Function (x^n)**
    *   **Optimal:** Binary Exponentiation (Exponentiation by Squaring).
    *   **Brute Force:** Naive iterative multiplication.
4.  **Nth Fibonacci Number**
    *   **Optimal:** Iterative Dynamic Programming (O(N) time, O(1) space).
    *   **Brute Force:** Naive recursive implementation (exponential time).
5.  **Combinations (N choose K)**
    *   **Optimal:** Iterative calculation minimizing intermediate overflow.
    *   **Brute Force:** Direct factorial calculation (prone to overflow).

For detailed explanations of each problem, including approach, complexity, and edge cases, please refer to [`docs/algorithm_explanations.md`](./algorithm_explanations.md).

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/math-problems-interview.git
    cd math-problems-interview
    ```
    *(Note: Replace `https://github.com/your-username/math-problems-interview.git` with your actual repository URL if you host this project).*

2.  **Install dependencies:**
    This project uses `jest` for testing, `benchmark.js` for performance comparison, and `chalk` for colored console output in benchmarks.
    ```bash
    npm install
    ```

## How to Run

### Run Tests

To execute the test suites for both optimal and brute-force solutions:

```bash
npm test
```

This will run all `.test.js` files in the `tests/` directory and display the results.

### Run Benchmarks

To compare the performance of optimal algorithms against their brute-force counterparts:

```bash
npm run benchmark
```

This will execute the `benchmarks/benchmark.js` script, which uses `benchmark.js` to provide detailed performance statistics for each problem.

## Documentation

*   **Algorithm Explanations**: For in-depth understanding of each problem's statement, optimal and brute-force approaches, time/space complexity, edge cases, and interview tips, see [`docs/algorithm_explanations.md`](./algorithm_explanations.md).
*   **Visual Diagrams**: ASCII art diagrams illustrating key algorithms are available in [`docs/diagrams.txt`](./diagrams.txt).

---

Feel free to explore, learn, and contribute!
```