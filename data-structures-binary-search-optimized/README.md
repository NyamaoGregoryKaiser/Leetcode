```markdown
# Binary Search Interview Project

This project serves as a comprehensive resource for understanding, implementing, and practicing Binary Search algorithms, specifically tailored for coding interview preparation. It includes various binary search problems, optimal solutions, brute-force comparisons, extensive test cases, performance benchmarks, and detailed documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [How to Use](#how-to-use)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Benchmarks](#running-benchmarks)
3.  [Problems Covered](#problems-covered)
    *   [Core Binary Search](#core-binary-search)
    *   [Advanced Binary Search Problems](#advanced-binary-search-problems)
4.  [Documentation](#documentation)
5.  [Contributing](#contributing)
6.  [License](#license)

## Project Structure

```
binary-search-interview-project/
├── src/
│   ├── main/java/com/example/binarysearch/
│   │   ├── core/                           # Standard Binary Search (Iterative & Recursive)
│   │   ├── problems/                      # Advanced Binary Search problems and Brute-force solutions
│   │   └── utility/                       # Helper methods (e.g., Array generation)
│   ├── test/java/com/example/binarysearch/ # JUnit 5 test cases for all implementations
├── docs/                                  # Detailed explanations, diagrams, interview tips
│   ├── AlgorithmExplanation.md
│   ├── EdgeCasesAndGotchas.md
│   ├── InterviewTips.md
│   └── VisualDiagrams.txt
├── benchmark/                             # Performance benchmarking with JMH
│   └── BinarySearchBenchmark.java
├── .gitignore
└── pom.xml                                # Maven build file
```

## How to Use

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Apache Maven 3.6 or higher

### Building the Project

Navigate to the root directory of the project (where `pom.xml` is located) in your terminal and run:

```bash
mvn clean install
```
This command will compile the source code, run the tests, and package the project.

### Running Tests

All unit tests are written using JUnit 5. To run all tests, use Maven:

```bash
mvn test
```

### Running Benchmarks

Performance benchmarks are implemented using [JMH (Java Microbenchmark Harness)](https://openjdk.org/projects/code-tools/jmh/).
After building the project (`mvn clean install`), an executable JAR for benchmarks will be created in the `target/` directory (e.g., `target/benchmarks.jar`).

To run the benchmarks, execute the following command from the project root:

```bash
java -jar target/benchmarks.jar
```
You can also specify specific benchmarks or options:
```bash
# Run only a specific benchmark
java -jar target/benchmarks.jar "BinarySearchBenchmark.measureIterativeSearch"

# List all available benchmarks
java -jar target/benchmarks.jar -l
```

## Problems Covered

This project covers a range of binary search problems, from fundamental implementations to more advanced variations. Each problem has an optimal binary search solution and, where applicable, a brute-force comparison.

### Core Binary Search

*   **Standard Binary Search (Iterative)**: `com.example.binarysearch.core.BinarySearchIterative`
*   **Standard Binary Search (Recursive)**: `com.example.binarysearch.core.BinarySearchRecursive`

### Advanced Binary Search Problems

Located in `com.example.binarysearch.problems.BinarySearchAdvancedProblems`:

1.  **Find First Occurrence (Lower Bound)**: Find the index of the first occurrence of a target in a sorted array.
    *   Brute Force: `com.example.binarysearch.problems.BruteForceSolutions.findFirstOccurrenceBruteForce`
2.  **Find Last Occurrence (Upper Bound)**: Find the index of the last occurrence of a target in a sorted array.
    *   Brute Force: `com.example.binarysearch.problems.BruteForceSolutions.findLastOccurrenceBruteForce`
3.  **Search in Rotated Sorted Array**: Search for a target in a sorted array that has been rotated at an unknown pivot.
    *   Brute Force: `com.example.binarysearch.problems.BruteForceSolutions.searchInRotatedSortedArrayBruteForce`
4.  **Find Minimum in Rotated Sorted Array**: Find the minimum element in a rotated sorted array (no duplicates).
    *   Brute Force: `com.example.binarysearch.problems.BruteForceSolutions.findMinInRotatedSortedArrayBruteForce`
5.  **Find Square Root (Integer)**: Compute the integer part of the square root of a non-negative integer.
    *   Brute Force: `com.example.binarysearch.problems.BruteForceSolutions.mySqrtBruteForce`
6.  **Find Peak Element**: Find an element that is strictly greater than its neighbors in an array.
    *   Brute Force: `com.example.binarysearch.problems.BruteForceSolutions.findPeakElementBruteForce`

## Documentation

The `docs/` directory contains comprehensive explanations and resources:

*   **`AlgorithmExplanation.md`**: Detailed breakdown of how binary search works, its prerequisites, and its fundamental principles.
*   **`EdgeCasesAndGotchas.md`**: Discusses common pitfalls, off-by-one errors, `mid` calculation overflows, and other critical considerations.
*   **`InterviewTips.md`**: Provides advice on approaching binary search problems in an interview setting, common follow-up questions, and how to articulate your thought process.
*   **`VisualDiagrams.txt`**: ASCII art diagrams to visually explain the binary search process for various scenarios.

## Contributing

Feel free to fork this repository, add more problems, alternative solutions, or improve documentation. Pull requests are welcome!

## License

This project is licensed under the MIT License - see the LICENSE file for details (not included here, but typically you'd add one).
```