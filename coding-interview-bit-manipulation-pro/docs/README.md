```markdown
# 💡 Bit Manipulation Coding Interview Project 💡

This project provides a comprehensive resource for mastering Bit Manipulation techniques for coding interviews. It includes multiple common problems, various algorithmic approaches (from brute-force to optimal bitwise solutions), detailed explanations, comprehensive tests, performance benchmarks, and interview preparation tips.

## 🚀 Project Goals

1.  **Understand Core Concepts:** Grasp fundamental bitwise operations (`AND`, `OR`, `XOR`, `NOT`, `Left Shift`, `Right Shift`).
2.  **Learn Problem-Solving Patterns:** Recognize common bit manipulation patterns and their applications.
3.  **Implement Optimal Solutions:** Develop efficient, memory-optimized solutions using bitwise operations.
4.  **Practice and Benchmark:** Test implementations rigorously and compare performance of different approaches.
5.  **Prepare for Interviews:** Gain confidence in discussing bit manipulation concepts, edge cases, and algorithmic choices.

## 📦 Project Structure

```
bit-manipulation-project/
├── src/
│   ├── algorithms/               # Main algorithm implementations
│   │   ├── bitManipulationProblems.ts # Core problems and solutions
│   │   └── types.ts                 # Type definitions
│   ├── utils/                    # Helper utilities
│   │   ├── benchmark.ts           # Benchmarking utility
│   │   ├── benchmarkRunner.ts     # Script to run benchmarks
│   │   └── bitUtils.ts            # General bit utility functions (toBinaryString, getBit, etc.)
│   └── index.ts                  # Main entry point for demonstration
├── tests/
│   ├── algorithms/
│   │   └── bitManipulationProblems.test.ts # Jest tests for algorithms
│   └── utils/
│       └── bitUtils.test.ts          # Jest tests for utility functions
├── docs/                         # Documentation files
│   ├── README.md                 # Project overview (this file)
│   ├── ALGORITHMS.md             # Detailed algorithm explanations, time/space complexity
│   ├── VISUAL_DIAGRAMS.md        # ASCII art diagrams for bitwise operations
│   └── INTERVIEW_TIPS.md         # Interview guidance, common pitfalls, and variations
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── jest.config.js                # Jest test runner configuration
└── .gitignore                    # Files to ignore in Git
```

## ✨ Features

*   **Multiple Problems:** Covers 5 common bit manipulation problems:
    *   Count Set Bits (Hamming Weight)
    *   Check if a Number is a Power of Two
    *   Reverse Bits
    *   Single Number (find unique element in array where others appear twice)
    *   Insert M into N (insert `M` into `N` between bits `i` and `j`)
*   **Optimal & Alternative Solutions:** Each problem offers:
    *   The most optimal bitwise solution.
    *   Often a brute-force or simpler conceptual approach for comparison.
    *   Sometimes a specialized approach (e.g., lookup table).
*   **Detailed Code Comments:** Explanations for every logical step and bitwise operation.
*   **Time/Space Complexity Analysis:** Provided for each solution.
*   **Comprehensive Tests:** Extensive Jest test suites with various edge cases and large inputs.
*   **Performance Benchmarking:** A dedicated utility to compare the real-world performance of different solutions.
*   **In-depth Documentation:** Separate markdown files explaining algorithms, providing visual aids, and offering interview advice.
*   **TypeScript:** Type-safe and modern JavaScript development.

## 🛠️ Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bit-manipulation-project.git
    cd bit-manipulation-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## 🚀 Usage

### Run Demos

To see the algorithms in action with example inputs:

```bash
npm run build
npm start
```

### Run Tests

To execute all unit tests:

```bash
npm test
```

### Run Benchmarks

To compare the performance of different solution approaches:

```bash
npm run benchmark
```

This will run the `benchmarkRunner.ts` script, which benchmarks various solutions for each problem and prints the results to the console, showing average execution times.

## 📚 Documentation

Dive deeper into the project's documentation:

*   **[ALGORITHMS.md](./ALGORITHMS.md)**: Explains the theoretical foundations of bit manipulation, properties of bitwise operators, and detailed logic behind each algorithm.
*   **[VISUAL_DIAGRAMS.md](./VISUAL_DIAGRAMS.md)**: Provides ASCII art diagrams to illustrate complex bitwise operations and patterns.
*   **[INTERVIEW_TIPS.md](./INTERVIEW_TIPS.md)**: Offers advice on how to approach bit manipulation questions in an interview, common pitfalls, and potential variations.

---
```