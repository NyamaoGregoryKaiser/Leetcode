```markdown
# String Manipulation Project for Coding Interviews

This project provides a comprehensive resource for mastering string manipulation problems commonly encountered in coding interviews. It includes implementations of several key algorithms, extensive test cases, performance benchmarks, and detailed documentation.

## Project Structure

```
string_manipulation_project/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── stringmanipulation/
│   │               ├── algorithms/
│   │               │   ├── StringAlgorithms.java             <- Core algorithm implementations
│   │               │   └── StringAlgorithmUtils.java         <- Utility methods (e.g., for char arrays)
│   │               ├── benchmarks/
│   │               │   └── PerformanceBenchmarks.java        <- JMH benchmarks
│   │               └── StringManipulationApp.java            <- Main entry point for demonstration
│   └── test/
│       └── java/
│           └── com/
│               └── stringmanipulation/
│                   └── tests/
│                       └── StringAlgorithmsTest.java         <- JUnit 5 test cases
├── docs/
│   ├── README.md                                   <- This file: Project overview and setup instructions
│   ├── algorithms_explanation.md                   <- Detailed explanation of algorithms
│   ├── interview_tips.md                           <- Interview preparation tips and variations
│   └── diagrams.txt                                <- ASCII art diagrams for visualization
├── .gitignore
└── pom.xml                                         <- Maven project file
```

## Problems Implemented

1.  **Longest Palindromic Substring**
    *   Find the longest palindromic substring within a given string.
    *   **Approaches:** Brute Force (O(N^3)), Expand Around Center (O(N^2) optimal).

2.  **Group Anagrams**
    *   Given an array of strings, group anagrams together.
    *   **Approaches:** Character Count Array as Key (O(N*K) optimal), Sorting String as Key (O(N*K log K)).

3.  **Minimum Window Substring**
    *   Find the smallest substring in a source string `S` that contains all characters of a target string `T` (including duplicates).
    *   **Approach:** Sliding Window with Two Hash Maps (O(N+M) optimal).

4.  **String to Integer (atoi)**
    *   Implement the `atoi` function to convert a string to a 32-bit signed integer, handling whitespace, signs, non-digit characters, and overflow/underflow.
    *   **Approach:** Robust Parsing with Edge Case Handling and Overflow Checks (O(N) optimal).

## Getting Started

This project uses Apache Maven for build automation and dependency management.

### Prerequisites

*   Java Development Kit (JDK) 11 or newer
*   Apache Maven

### Setup and Build

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/string_manipulation_project.git
    cd string_manipulation_project
    ```
2.  **Compile the project:**
    ```bash
    mvn clean install
    ```
    This command will compile the Java code, run tests, and package the project.

## How to Run

### 1. Run the Main Application

To see a demonstration of all algorithms with predefined examples:

```bash
mvn exec:java -Dexec.mainClass="com.stringmanipulation.StringManipulationApp"
```

### 2. Run Tests

To execute all JUnit 5 test cases:

```bash
mvn test
```

### 3. Run Performance Benchmarks

The project uses [JMH (Java Microbenchmark Harness)](https://openjdk.org/projects/code-tools/jmh/) for robust performance testing.

1.  **Build the benchmark JAR (if not already done by `mvn install`):**
    ```bash
    mvn clean package
    ```
    This will create `target/benchmarks.jar`.

2.  **Run the benchmarks:**
    ```bash
    java -jar target/benchmarks.jar
    ```
    You can also target specific benchmarks or configure JMH runs:
    *   To run only `LongestPalindromicSubstring` benchmarks:
        ```bash
        java -jar target/benchmarks.jar LongestPalindromicSubstring
        ```
    *   For quicker (less accurate) results, you can reduce warmup and iteration counts:
        ```bash
        java -jar target/benchmarks.jar -f 1 -wi 3 -i 3 -t 1
        ```
        (1 fork, 3 warm-up iterations, 3 actual iterations, 1 thread)

## Documentation

The `docs/` directory contains detailed explanations for the project:

*   **`algorithms_explanation.md`**: Provides in-depth descriptions of each algorithm, including logic, pseudocode (where applicable), different approaches, and a thorough analysis of time and space complexity.
*   **`diagrams.txt`**: Contains ASCII art diagrams to visually explain key algorithmic concepts like "Expand Around Center" for palindromes and the "Sliding Window" technique.
*   **`interview_tips.md`**: Offers general advice for tackling string manipulation problems in interviews, common pitfalls, important questions to ask, and strategies for optimal solutions.

Feel free to explore these documents for a deeper understanding of the solutions and interview preparation.
```