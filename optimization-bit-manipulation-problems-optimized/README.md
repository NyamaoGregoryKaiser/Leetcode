# Bit Manipulation Interview Project

This project is a comprehensive guide and practice platform for Bit Manipulation algorithms, specifically tailored for coding interview preparation. It covers several common bit manipulation problems, offering multiple solution approaches, detailed explanations, complexity analysis, extensive test cases, and performance benchmarks.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
3.  [Project Structure](#project-structure)
4.  [Problems Covered](#problems-covered)
5.  [Running Tests](#running-tests)
6.  [Running Benchmarks](#running-benchmarks)
7.  [Documentation](#documentation)
    *   [Detailed Problem Descriptions](#detailed-problem-descriptions)
    *   [Algorithm Explanations](#algorithm-explanations)
    *   [Interview Tips & Variations](#interview-tips--variations)
8.  [Contributing](#contributing)
9.  [License](#license)

## Project Overview

Bit manipulation is a crucial skill in competitive programming and technical interviews, often leading to highly optimized and memory-efficient solutions. This project aims to solidify your understanding and practical application of bitwise operations.

Each problem includes:
*   Multiple solution approaches (brute-force, optimized, different bitwise techniques).
*   Detailed comments explaining the logic.
*   Time and Space Complexity analysis.
*   TypeScript implementations.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
*   Node.js (LTS version recommended)
*   npm (comes with Node.js) or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bit-manipulation-interview.git
    cd bit-manipulation-interview
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

## Project Structure

```
bit-manipulation-interview/
├── src/                      # Source code for algorithms and utilities
│   ├── problems/             # Main algorithm implementations for each problem
│   │   ├── countSetBits.ts
│   │   ├── singleNumber.ts
│   │   ├── isPowerOfTwo.ts
│   │   └── reverseBits.ts
│   ├── utils/                # Helper utilities (e.g., binary string conversion)
│   │   └── bitUtils.ts
│   └── index.ts              # Entry point for exporting modules
├── tests/                    # Jest test files
│   ├── problems/             # Unit tests for each problem
│   │   ├── countSetBits.test.ts
│   │   ├── singleNumber.test.ts
│   │   ├── isPowerOfTwo.test.ts
│   │   └── reverseBits.test.ts
│   └── performance.test.ts   # Performance test suite
├── docs/                     # Comprehensive documentation
│   ├── README.md             # Detailed problem descriptions
│   ├── ALGORITHM_EXPLANATION.md # In-depth algorithm explanations with diagrams
│   └── INTERVIEW_TIPS.md     # Interview strategies, edge cases, and variations
├── benchmarking/             # Scripts for performance benchmarking
│   └── benchmark.ts
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project overview (this file)
```

## Problems Covered

This project covers the following fundamental bit manipulation problems:

1.  **Count Set Bits (Hamming Weight):** Counting the number of '1' bits in a 32-bit unsigned integer.
    *   Approaches: Iterative, Brian Kernighan's Algorithm, Lookup Table.
2.  **Single Number:** Finding the one element in an array that appears only once, while all other elements appear twice.
    *   Approaches: Hash Map, XOR Property.
3.  **Power of Two:** Determining if a given integer is a power of two.
    *   Approaches: Iterative Division, Logarithm, Bitwise Check.
4.  **Reverse Bits:** Reversing the bits of a given 32-bit unsigned integer.
    *   Approaches: Iterative Shift, Divide and Conquer.

Detailed descriptions of each problem can be found in `docs/README.md`.

## Running Tests

Tests are implemented using [Jest](https://jestjs.io/).

To run all tests:
```bash
npm test
# OR
yarn test
```

To run a specific test file (e.g., `countSetBits.test.ts`):
```bash
npm test tests/problems/countSetBits.test.ts
# OR
yarn test tests/problems/countSetBits.test.ts
```

## Running Benchmarks

Performance benchmarks compare the execution time of different algorithms for the same problem.

To run the benchmarking script:
```bash
npm run benchmark
# OR
yarn benchmark
```

The `benchmarking/benchmark.ts` script will execute and print the results to the console.

## Documentation

### Detailed Problem Descriptions
*   **File:** `docs/README.md`
*   **Content:** Provides comprehensive descriptions for each problem, including examples, constraints, and initial thought processes.

### Algorithm Explanations
*   **File:** `docs/ALGORITHM_EXPLANATION.md`
*   **Content:** Offers in-depth explanations of the algorithms, underlying bit manipulation principles, step-by-step logic, and visual ASCII diagrams where appropriate. This document is crucial for understanding *why* certain bitwise tricks work.

### Interview Tips & Variations
*   **File:** `docs/INTERVIEW_TIPS.md`
*   **Content:** Contains valuable advice for approaching bit manipulation problems in an interview setting, common variations of the problems, edge cases to consider, and general strategies.

## Contributing

Contributions are welcome! If you have suggestions for new problems, alternative solutions, improved documentation, or bug fixes, please open an issue or submit a pull request.

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details (not included in this specific response but typically present in a real project).

---