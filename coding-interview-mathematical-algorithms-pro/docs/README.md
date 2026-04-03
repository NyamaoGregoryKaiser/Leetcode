# Math Problems Coding Interview Project

This project is designed to be a comprehensive resource for practicing and understanding common mathematical algorithms frequently encountered in coding interviews. It provides multiple implementations for various problems, ranging from brute-force to optimized solutions, along with detailed explanations, complexity analysis, extensive tests, and performance benchmarks.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
    *   Fibonacci Numbers
    *   Greatest Common Divisor (GCD) & Least Common Multiple (LCM)
    *   Power Function (x^n)
    *   Integer Square Root
    *   Primality Test & Prime Factorization
    *   Sieve of Eratosthenes
3.  [Features](#features)
4.  [Setup and Running](#setup-and-running)
    *   Prerequisites
    *   Building the Project
    *   Running Main Examples
    *   Running Tests
    *   Running Benchmarks
5.  [Documentation](#documentation)
6.  [Contributing](#contributing)
7.  [License](#license)

## Project Structure

The project follows a standard Maven/Gradle-like structure for Java applications:

```
math-problems-interview/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── mathproblems/
│   │                   ├── algorithms/         // Core algorithm implementations
│   │                   │   ├── MathAlgorithms.java
│   │                   │   └── PrimeNumberAlgorithms.java
│   │                   ├── utils/              // Helper utilities
│   │                   │   └── MathUtils.java
│   │                   └── Main.java           // Entry point for demonstrations
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── mathproblems/
│                       ├── MathAlgorithmsTest.java
│                       └── PrimeNumberAlgorithmsTest.java
├── docs/                               // Project documentation
│   ├── README.md                       // This file
│   ├── algorithms_explanation.md       // Detailed explanations of algorithms
│   └── interview_tips.md               // Interview strategies, edge cases, variations
├── scripts/                            // Helper scripts
│   └── benchmark.sh                    // Performance benchmarking script
├── build.gradle                        // Gradle build configuration
└── .gitignore                          // Git ignore file
```

## Problems Covered

### Fibonacci Numbers
*   **Description**: Calculate the Nth Fibonacci number.
*   **Approaches**:
    *   Recursive (Brute Force)
    *   Recursive with Memoization (Top-Down Dynamic Programming)
    *   Iterative (Bottom-Up Dynamic Programming)
    *   Space-Optimized Iterative

### Greatest Common Divisor (GCD) & Least Common Multiple (LCM)
*   **Description**: Find the GCD and LCM of two numbers.
*   **Approaches**:
    *   Euclidean Algorithm (Iterative)
    *   Euclidean Algorithm (Recursive)
    *   LCM calculation using GCD

### Power Function (x^n)
*   **Description**: Calculate x raised to the power of n (x^n).
*   **Approaches**:
    *   Brute Force (Iterative multiplication)
    *   Optimized Binary Exponentiation (Divide and Conquer, Recursive)
    *   Optimized Binary Exponentiation (Iterative)

### Integer Square Root
*   **Description**: Compute the integer part of the square root of a non-negative integer.
*   **Approaches**:
    *   Binary Search
    *   Newton's Method (Iterative approximation)

### Primality Test & Prime Factorization
*   **Description**: Determine if a number is prime and find its prime factors.
*   **Approaches**:
    *   `isPrime`: Naive Trial Division, Optimized Trial Division.
    *   `primeFactorization`: Trial Division.

### Sieve of Eratosthenes
*   **Description**: Generate all prime numbers up to a given limit.
*   **Approaches**:
    *   Boolean array-based Sieve.
    *   Storing primes in a list.

## Features

*   **Multiple Solutions**: For each problem, various algorithmic approaches are provided (e.g., recursive, iterative, dynamic programming, space-optimized).
*   **Detailed Comments**: In-line comments explain the logic, steps, and edge cases for each method.
*   **Time and Space Complexity Analysis**: Provided for all solutions within the code comments and in the `algorithms_explanation.md`.
*   **Comprehensive Test Cases**: JUnit 5 tests cover typical inputs, edge cases (zero, negative, one, large numbers), and performance considerations.
*   **Performance Benchmarking**: A shell script to measure the execution time of different algorithmic approaches.
*   **Thorough Documentation**:
    *   `README.md`: Project overview, setup, and problem descriptions.
    *   `algorithms_explanation.md`: In-depth explanations of algorithms with ASCII diagrams.
    *   `interview_tips.md`: Guidance on approaching interview questions, common pitfalls, and variations.
*   **Clean Code Structure**: Organized into `algorithms`, `utils`, `main`, and `test` packages.

## Setup and Running

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Gradle (if not using `./gradlew`)

### Building the Project

Navigate to the project root directory (`math-problems-interview/`) and build using Gradle:

```bash
./gradlew build
```

This will compile the source code and run the tests.

### Running Main Examples

The `Main.java` file demonstrates how to use the implemented algorithms.

```bash
./gradlew run
```

Or, if you prefer to compile and run manually:

```bash
./gradlew compileJava
java -cp build/classes/java/main com.example.mathproblems.Main
```

### Running Tests

All unit tests are written using JUnit 5.

```bash
./gradlew test
```

This command will execute all tests in `src/test/java/`.

### Running Benchmarks

A simple benchmarking script is provided to compare the performance of different implementations.

```bash
./scripts/benchmark.sh
```

**Note**: The benchmarking script is basic and provides a general idea. For more rigorous profiling, consider using specialized Java profiling tools.

## Documentation

*   `docs/README.md`: You are here!
*   `docs/algorithms_explanation.md`: Provides a deeper dive into the mathematical concepts and algorithmic strategies used, including pseudo-code insights and ASCII diagrams where appropriate.
*   `docs/interview_tips.md`: Offers advice on how to present solutions in an interview, what questions to expect, and how to handle follow-up scenarios.

## Contributing

Feel free to fork this repository, add new problems, suggest improvements, or fix bugs. Pull requests are welcome!

## License

This project is open-sourced under the MIT License. See the LICENSE file for more details (not explicitly created, but assumed for this template).

---