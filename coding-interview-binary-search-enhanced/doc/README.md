```markdown
# Binary Search Interview Project

This project is a comprehensive resource for mastering Binary Search, designed specifically for coding interview preparation. It covers various Binary Search problem patterns, provides optimal Java solutions, includes brute-force comparisons, extensive test cases, performance benchmarks, and detailed documentation.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Building the Project](#building-the-project)
    *   [Running Tests](#running-tests)
    *   [Running Performance Benchmarks](#running-performance-benchmarks)
3.  [Problem Statements and Solutions](#problem-statements-and-solutions)
    *   [P1: Standard Binary Search](#p1-standard-binary-search)
    *   [P2: Find First and Last Position of Element](#p2-find-first-and-last-position-of-element)
    *   [P3: Search in Rotated Sorted Array](#p3-search-in-rotated-sorted-array)
    *   [P4: Find Peak Element](#p4-find-peak-element)
    *   [P5: Sqrt(x)](#p5-sqrtx)
4.  [Documentation](#documentation)
    *   [Algorithm Explanation](#algorithm-explanation)
    *   [Interview Tips](#interview-tips)
    *   [Diagrams](#diagrams)
5.  [Contributing](#contributing)
6.  [License](#license)

## Project Structure

```
binary-search-interview-project/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── binarysearch/
│   │                   ├── BinarySearchAlgorithms.java        // Optimal Binary Search implementations
│   │                   ├── BinarySearchBruteForce.java       // Brute-force/linear search comparisons
│   │                   └── Utils.java                        // Helper utilities (array generation)
│   ├── test/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── binarysearch/
│   │                   └── BinarySearchTests.java            // JUnit 5 test cases
├── doc/
│   ├── README.md                                 // Main project description and setup
│   ├── ALGORITHM_EXPLANATION.md                  // Detailed explanation of Binary Search principles
│   ├── INTERVIEW_TIPS.md                         // Interview strategies and common variations
│   └── diagrams/
│       └── binary_search_diagram.txt             // ASCII art diagram for standard Binary Search
├── perf/
│   └── PerformanceBenchmark.java                 // Simple manual performance benchmarking
├── .gitignore
├── pom.xml                                       // Maven build file
```

## Getting Started

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Apache Maven 3.6.3 or higher

### Building the Project

Navigate to the root directory of the project (`binary-search-interview-project/`) in your terminal and run:

```bash
mvn clean install
```

This command will compile the source code, run tests, and package the project into a JAR file (though not strictly needed for running individual classes).

### Running Tests

To execute all JUnit 5 test cases:

```bash
mvn test
```

This will run `BinarySearchTests.java` and report the results.

### Running Performance Benchmarks

The performance benchmarks (`PerformanceBenchmark.java`) are excluded from the default `mvn test` command. To run them, you need to execute them directly.

First, ensure the project is built:
```bash
mvn clean install
```

Then, you can run the benchmark class using Maven's `exec` plugin:
```bash
mvn exec:java -Dexec.mainClass="com.example.binarysearch.PerformanceBenchmark"
```
Or, if you are in an IDE like IntelliJ or VS Code, you can simply run the `main` method in `PerformanceBenchmark.java`.

## Problem Statements and Solutions

The core binary search algorithms are implemented in `src/main/java/com/example/binarysearch/BinarySearchAlgorithms.java`.
Brute-force comparisons are in `src/main/java/com/example/binarysearch/BinarySearchBruteForce.java`.

### P1: Standard Binary Search
**Problem:** Find the index of a target value in a sorted array.
**Solution:** `BinarySearchAlgorithms.findTarget(int[] nums, int target)`
**Optimal Complexity:** Time O(log N), Space O(1)

### P2: Find First and Last Position of Element
**Problem:** Given a sorted array with potentially duplicate elements, find the starting and ending position of a given target value. If the target is not found, return `[-1, -1]`.
**Solution:** `BinarySearchAlgorithms.findFirstAndLastOccurrence(int[] nums, int target)`
**Optimal Complexity:** Time O(log N), Space O(1)

### P3: Search in Rotated Sorted Array
**Problem:** Given a sorted array that has been rotated at some pivot (e.g., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`), find the index of the target value. Assume no duplicate elements.
**Solution:** `BinarySearchAlgorithms.searchInRotatedSortedArray(int[] nums, int target)`
**Optimal Complexity:** Time O(log N), Space O(1)

### P4: Find Peak Element
**Problem:** A peak element is an element that is strictly greater than its neighbors. Find the index of any peak element in an array. You may imagine that `nums[-1] = nums[n] = -∞`.
**Solution:** `BinarySearchAlgorithms.findPeakElement(int[] nums)`
**Optimal Complexity:** Time O(log N), Space O(1)

### P5: Sqrt(x)
**Problem:** Compute and return the integer square root of `x`. The fractional part is truncated.
**Solution:** `BinarySearchAlgorithms.mySqrt(int x)`
**Optimal Complexity:** Time O(log X) where X is the input value, Space O(1)

## Documentation

### Algorithm Explanation
For a detailed explanation of Binary Search principles, its variations, and common pitfalls, refer to:
*   `doc/ALGORITHM_EXPLANATION.md`

### Interview Tips
For strategies on approaching binary search problems in an interview setting, common questions, and what to look out for, see:
*   `doc/INTERVIEW_TIPS.md`

### Diagrams
A visual representation of the basic binary search process is available in:
*   `doc/diagrams/binary_search_diagram.txt`

## Contributing

Feel free to fork this repository, add more problems, alternative solutions, or improve existing content. Pull requests are welcome!

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details (not included in this specific output, but would typically be in a real project).
```