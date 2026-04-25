```markdown
# Math Problems for Coding Interviews

This project provides a comprehensive set of solutions, tests, and documentation for common math-related problems often encountered in coding interviews. It aims to demonstrate various algorithmic approaches, analyze their complexity, and compare their performance.

## Project Structure

```
math-problems-interview/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── example/
│                   └── mathproblems/
│                       ├── FibonacciCalculator.java    # Implementations for Fibonacci sequence
│                       ├── GCDCalculator.java          # Implementations for GCD and LCM
│                       └── PrimeSieve.java             # Implementations for prime generation and primality test
├── src/
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── mathproblems/
│                       ├── FibonacciCalculatorTest.java
│                       ├── GCDCalculatorTest.java
│                       └── PrimeSieveTest.java
├── docs/
│   ├── AlgorithmExplanations.md    # Detailed explanations of algorithms, complexities, diagrams
│   └── InterviewTips.md            # General and problem-specific interview advice, variations
├── benchmarking/
│   └── MathProblemsBenchmarker.java # Code for performance comparison of different solutions
├── README.md                       # Project overview and instructions
└── pom.xml                         # Maven project configuration
```

## Problems Covered

### 1. Greatest Common Divisor (GCD) and Least Common Multiple (LCM)

**Problem Statement:**
Given two non-negative integers `a` and `b`, find their Greatest Common Divisor (GCD) and Least Common Multiple (LCM).

**Implementations:**
*   `gcdIterative(long a, long b)`: Euclidean Algorithm (iterative).
*   `gcdRecursive(long a, long b)`: Euclidean Algorithm (recursive).
*   `gcdBinary(long u, long v)`: Binary GCD (Stein's Algorithm).
*   `lcm(long a, long b)`: Calculates LCM using the formula `LCM(a, b) = |a * b| / GCD(a, b)`, optimized to prevent overflow.

**Key Concepts:** Euclidean Algorithm, Binary GCD, relationship between GCD and LCM.
**Complexity:** O(log(min(a, b))) for Euclidean and Binary GCD.

### 2. Prime Number Generation (Sieve of Eratosthenes) and Primality Test

**Problem Statement:**
1.  Generate all prime numbers up to a given integer `n`.
2.  Check if a given integer `num` is prime.

**Implementations:**
*   `sieveOfEratosthenes(int n)`: Generates a list of primes up to `n`.
*   `isPrimeTrialDivision(int num)`: Checks primality of a single number.

**Key Concepts:** Sieve of Eratosthenes, Trial Division, optimization for primality tests (e.g., checking up to sqrt(n), 6k ± 1 rule).
**Complexity:** O(n log log n) for Sieve, O(sqrt(n)) for trial division.

### 3. Fibonacci Sequence

**Problem Statement:**
Calculate the n-th Fibonacci number. The sequence starts F(0)=0, F(1)=1, F(n) = F(n-1) + F(n-2) for n > 1.

**Implementations:**
*   `fibonacciNaiveRecursive(int n)`: Brute-force recursive solution.
*   `fibonacciIterativeDP(int n)`: Iterative solution using dynamic programming (bottom-up).
*   `fibonacciMatrixExponentiation(int n)`: Highly optimized solution using matrix exponentiation and binary exponentiation.

**Key Concepts:** Recursion, Dynamic Programming, Memoization, Matrix Exponentiation, Binary Exponentiation. Handles large numbers using `BigInteger`.
**Complexity:** O(2^n) for naive recursive, O(n) for iterative DP, O(log n) for matrix exponentiation.

## How to Run

This project uses Maven.

### Prerequisites
*   Java Development Kit (JDK) 11 or higher
*   Apache Maven

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/math-problems-interview.git
cd math-problems-interview
```

### 2. Compile the project:
```bash
mvn clean install
```

### 3. Run Tests:
To execute all JUnit 5 tests:
```bash
mvn test
```

### 4. Run Benchmarks:
To execute the performance benchmarking code (this will output execution times for various algorithms):
```bash
mvn exec:java@run-benchmark
```
*Note: The benchmarking might take some time, especially for the larger Fibonacci calculations.*

### 5. Explore Documentation:
Refer to the `docs/` directory for detailed explanations:
*   `docs/AlgorithmExplanations.md`: Deep dive into each algorithm.
*   `docs/InterviewTips.md`: Interview strategies and common pitfalls.

---
**Author**: Your Name (or AI Assistant)
**Date**: October 26, 2023
```