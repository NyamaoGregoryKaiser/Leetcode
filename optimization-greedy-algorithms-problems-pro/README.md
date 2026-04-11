```markdown
# Greedy Algorithms Interview Project

This project serves as a comprehensive resource for understanding and practicing Greedy Algorithms, specifically tailored for coding interviews. It includes multiple classic greedy problems, optimal Java implementations, extensive test cases, detailed documentation, and performance benchmarking.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Project Structure](#project-structure)
4.  [Problems Implemented](#problems-implemented)
5.  [How to Build and Run](#how-to-build-and-run)
    *   [Running Tests](#running-tests)
    *   [Running Performance Benchmarks](#running-performance-benchmarks)
6.  [Documentation](#documentation)
7.  [Contributing](#contributing)
8.  [License](#license)

## Project Overview

Greedy algorithms are a paradigm that builds a solution step by step, making the locally optimal choice at each stage with the hope of finding a global optimum. This project demonstrates several scenarios where this approach is effective, along with providing insights into when it might fail and how to prove its correctness.

## Features

*   **Optimal Java Implementations:** Solutions for 5 common greedy problems.
*   **Detailed Explanations:** Each problem's solution includes comments for logic, time, and space complexity.
*   **Extensive Test Cases:** JUnit 5 tests cover base, average, edge, and large-scale scenarios.
*   **Comprehensive Documentation:** `docs/AlgorithmsExplanation.md` provides in-depth algorithm analysis, greedy choice proofs, ASCII diagrams, edge cases, and interview tips.
*   **Performance Benchmarking:** `docs/PerformanceBenchmarking.java` helps measure the efficiency of the implemented algorithms.
*   **Maven Project:** Easy to build and manage dependencies.

## Project Structure

```
greedy-algorithms-project/
├── pom.xml                     # Maven build file
├── README.md                   # Project description and instructions
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── greedy/
│   │                   ├── GreedyAlgorithms.java   # Main class with all algorithm implementations
│   │                   └── models/
│   │                       ├── Activity.java       # Helper model for Activity Selection / Interval problems
│   │                       ├── Item.java           # Helper model for Fractional Knapsack
│   │                       └── Job.java            # Helper model for Job Sequencing with Deadlines
│   ├── test/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── greedy/
│   │                   └── GreedyAlgorithmsTest.java # JUnit 5 test suite
├── docs/
│   ├── AlgorithmsExplanation.md    # Detailed algorithm explanations, diagrams, tips
│   └── PerformanceBenchmarking.java # Standalone performance testing utility
└── .gitignore                  # Standard Git ignore file
```

## Problems Implemented

The `GreedyAlgorithms.java` file contains implementations for the following problems:

1.  **Activity Selection Problem:** Maximize the number of non-overlapping activities.
2.  **Fractional Knapsack Problem:** Maximize the total value of items that can be put into a knapsack with a weight capacity, allowing fractions of items.
3.  **Coin Change Problem (Greedy Variant):** Find the minimum number of coins to make a given amount using a canonical set of denominations.
4.  **Minimum Number of Platforms Problem:** Given arrival and departure times for trains, find the minimum number of platforms required.
5.  **Job Sequencing with Deadlines Problem:** Maximize profit by scheduling jobs with deadlines and profits.

For detailed problem descriptions, greedy choice proofs, examples, and interview tips, please refer to `docs/AlgorithmsExplanation.md`.

## How to Build and Run

This project uses Apache Maven.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/greedy-algorithms-project.git
    cd greedy-algorithms-project
    ```
2.  **Build the project:**
    ```bash
    mvn clean install
    ```
    This command will compile the source code and run the tests.

### Running Tests

To run all JUnit 5 tests specifically:

```bash
mvn test
```

### Running Performance Benchmarks

The `PerformanceBenchmarking.java` file is a standalone utility in the `docs` directory. To run it, you'll need to compile and execute it separately, or you can integrate it into your build process (e.g., as an executable JAR or a separate Maven module for benchmarks).

**Recommended way to run from command line (after `mvn install` to ensure classes are available):**

```bash
# Compile the benchmarking code (if not already done by IDE or maven install)
# This assumes you have compiled the main project first, so the classes
# like GreedyAlgorithms are available on the classpath.
javac -cp "target/classes:target/test-classes:~/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.0/junit-jupiter-api-5.10.0.jar:~/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.0/junit-jupiter-engine-5.10.0.jar" docs/PerformanceBenchmarking.java -d target/benchmarks-classes

# Navigate to the project root directory
# Run the benchmark. Adjust classpath as necessary for your system.
# The `target/classes` part is crucial to include the main algorithms.
java -cp "target/classes:target/benchmarks-classes" PerformanceBenchmarking
```
*Note: The `~/.m2/repository/...` part might need to be adjusted based on your local Maven repository path if you encounter classpath issues.*
A simpler way if running from an IDE is to just execute `PerformanceBenchmarking.java` as a standard Java application.

## Documentation

The `docs/AlgorithmsExplanation.md` file is crucial for a deeper understanding:

*   **Introduction to Greedy Algorithms:** Core principles and when they apply.
*   **Problem-Specific Details:**
    *   Detailed problem statements.
    *   Intuition behind the greedy choice.
    *   Proof sketches for the greedy choice property and optimal substructure.
    *   Step-by-step algorithm descriptions.
    *   Illustrative examples.
    *   ASCII diagrams for visualization.
    *   Discussion of edge cases and common pitfalls.
    *   Interview tips, common variations, and follow-up questions.

## Contributing

Feel free to open issues or submit pull requests to improve this project. Suggestions for new problems, more efficient solutions, or enhanced documentation are welcome.

## License

This project is open-sourced under the MIT License. See the LICENSE file for details (not included in this specific output, but standard practice).
```