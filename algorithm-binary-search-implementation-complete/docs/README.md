# Binary Search Interview Project

This project is a comprehensive resource for mastering Binary Search algorithms, tailored for coding interview preparation. It includes implementations of various Binary Search problems, brute-force comparisons, extensive test cases, performance benchmarks, and detailed documentation with visual aids and interview tips.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Problem Statements](#problem-statements)
4.  [Project Structure](#project-structure)
5.  [Setup and Run](#setup-and-run)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
6.  [Documentation Links](#documentation-links)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Overview

Binary Search is a fundamental algorithm often encountered in technical interviews. It's crucial not only to know the basic implementation but also to understand its variations, edge cases, and how to apply it to non-obvious problems. This project aims to provide a holistic learning experience, covering both theoretical understanding and practical implementation skills.

## Features

*   **Multiple Binary Search Problems:** Implementations for 5 distinct problems showcasing different Binary Search patterns.
*   **Optimal Solutions:** Each problem solved with an optimal `O(log N)` time complexity iterative Binary Search.
*   **Alternative Approaches:** Recursive Binary Search for the standard find problem.
*   **Brute Force Comparisons:** Corresponding brute-force (`O(N)`) solutions to highlight efficiency gains.
*   **Detailed Comments:** In-code explanations for logic, edge cases, and complexity analysis.
*   **Extensive Test Cases:** JUnit 5 tests covering a wide range of scenarios (empty arrays, single elements, duplicates, boundary conditions, elements not found, etc.).
*   **Performance Benchmarking:** JMH (Java Microbenchmark Harness) integration to compare the performance of optimized vs. brute-force solutions.
*   **Comprehensive Documentation:**
    *   `ALGORITHM_EXPLANATION.md`: In-depth explanations of Binary Search, its core principles, and step-by-step logic for each problem, including ASCII art diagrams.
    *   `INTERVIEW_TIPS.md`: Guidance on approaching Binary Search problems in interviews, common pitfalls, and strategies for success.
*   **Helper Utilities:** A utility class to generate various types of arrays for testing and benchmarking.

## Problem Statements

The `BinarySearchProblems.java` file contains solutions for the following problems:

1.  **Standard Binary Search (`find`):** Given a sorted array and a target value, find the index of the target.
2.  **Find First/Last Occurrence (`findFirst`, `findLast`):** Given a sorted array with duplicates and a target value, find the index of its first and last occurrence.
3.  **Search in Rotated Sorted Array (`searchInRotatedSortedArray`):** Given a sorted array that has been rotated at some pivot unknown to you, and a target value, find the index of the target.
4.  **Find Peak Element (`findPeakElement`):** A peak element is an element that is greater than its neighbors. Given an input array `nums`, where `nums[i] != nums[i+1]`, find a peak element and return its index.
5.  **Sqrt(x) (`mySqrt`):** Compute and return the square root of `x`. Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.

For detailed explanations of these problems and their Binary Search solutions, refer to `docs/ALGORITHM_EXPLANATION.md`.

## Project Structure

```
.
├── src/
│   └── main/java/
│       └── com/
│           └── binarysearch/
│               ├── algorithms/
│               │   ├── BinarySearchProblems.java
│               │   └── BruteForceSolutions.java
│               └── utils/
│                   └── ArrayGenerator.java
├── test/
│   └── java/
│       └── com/
│           └── binarysearch/
│               └── BinarySearchTest.java
├── docs/
│   ├── README.md
│   ├── ALGORITHM_EXPLANATION.md
│   └── INTERVIEW_TIPS.md
└── performance/
    └── BinarySearchBenchmark.java
```

## Setup and Run

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Maven (for building and dependency management)

### Building the Project

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/binary-search-interview-project.git
    cd binary-search-interview-project
    ```
2.  Compile the project using Maven:
    ```bash
    mvn clean install
    ```
    This command will download dependencies, compile the source code, and package it.

### Running Tests

To execute all JUnit 5 tests:

```bash
mvn test
```

You should see output indicating that all tests have passed.

### Running Benchmarks

Benchmarks use JMH and require a separate execution.

1.  First, ensure the project is built (as above). The `mvn clean install` command will produce a JAR file in the `target/benchmarks.jar` directory.
2.  Run the benchmarks from the command line:
    ```bash
    java -jar target/benchmarks.jar
    ```
    This will execute all JMH benchmarks defined in `performance/BinarySearchBenchmark.java`. The output will show performance metrics (e.g., operations per second, average time) for each benchmarked method.

    *Note: JMH benchmarks can take some time to warm up and run, as they perform multiple iterations to get accurate measurements.*

## Documentation Links

*   **Algorithm Explanation:** [docs/ALGORITHM_EXPLANATION.md](docs/ALGORITHM_EXPLANATION.md)
*   **Interview Tips:** [docs/INTERVIEW_TIPS.md](docs/INTERVIEW_TIPS.md)

## Contributing

Feel free to open issues or submit pull requests to improve this project.

## License

This project is open-sourced under the MIT License. See the [LICENSE](LICENSE) file for more details (not explicitly created in this response, but would typically be present).