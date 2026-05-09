# Greedy Algorithms Interview Project

This project is designed as a comprehensive resource for understanding and implementing classic Greedy Algorithms, particularly in the context of coding interviews. It provides optimized Java solutions for several common greedy problems, along with extensive tests, performance benchmarking, detailed documentation, and alternative approaches for comparison.

## Project Structure

```
GreedyAlgorithmsProject
├── src
│   ├── main
│   │   └── java
│   │       └── com
│   │           └── greedyalgorithms
│   │               └── project
│   │                   ├── alternative             // Alternative solutions (e.g., brute force, DP)
│   │                   │   ├── ActivitySelectionBruteForce.java
│   │                   │   └── CoinChangeDP.java
│   │                   ├── utils                   // Helper data structures
│   │                   │   ├── Activity.java
│   │                   │   ├── Item.java
│   │                   │   └── Job.java
│   │                   └── GreedyAlgorithms.java   // Main greedy algorithm implementations
│   └── test
│       └── java
│           └── com
│               └── greedyalgorithms
│                   └── project
│                       └── GreedyAlgorithmsTest.java // JUnit 5 test cases
├── benchmarking
│   └── PerformanceBenchmark.java                   // Performance measurement scripts
└── docs                                            // Documentation
    ├── AlgorithmExplanation.md                     // Detailed algorithm explanations, diagrams, proofs
    ├── InterviewTips.md                            // Interview strategies and common pitfalls
    └── README.md                                   // This file
```

## Problems Covered

This project implements optimal greedy solutions for the following problems:

1.  **Activity Selection Problem**: Maximizing the number of non-overlapping activities.
2.  **Fractional Knapsack Problem**: Maximizing value by taking fractions of items.
3.  **Coin Change Problem (Greedy Variant)**: Finding minimum coins for specific currency systems (highlights limitations of greedy).
4.  **Job Sequencing with Deadlines**: Maximizing profit by scheduling jobs with deadlines.
5.  **Minimum Platforms Required**: Determining the minimum number of platforms needed for train arrivals/departures.

For a detailed explanation of each problem, including problem statements, greedy choice justifications, algorithms, complexity analysis, and variations, please refer to `docs/AlgorithmExplanation.md`.

## Setup and Running

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Maven (for building and managing dependencies)

### Building the Project

Navigate to the root directory of the project (`GreedyAlgorithmsProject`) in your terminal and run:

```bash
mvn clean install
```

This will compile the source code and run the tests.

### Running Tests

To run all unit tests:

```bash
mvn test
```

### Running Main Algorithms

You can execute the `main` method in `GreedyAlgorithms.java` to see basic examples of each algorithm in action.

```bash
mvn exec:java -Dexec.mainClass="com.greedyalgorithms.project.GreedyAlgorithms"
```

### Running Benchmarks

The `benchmarking/PerformanceBenchmark.java` file contains simple timing code. To run it:

```bash
javac benchmarking/PerformanceBenchmark.java src/main/java/com/greedyalgorithms/project/*.java src/main/java/com/greedyalgorithms/project/utils/*.java src/main/java/com/greedyalgorithms/project/alternative/*.java
java benchmarking/PerformanceBenchmark
```
*Note: This is a simplified way to run benchmarks without a build tool like Maven for this specific file. For a more robust benchmarking, consider using tools like JMH (Java Microbenchmark Harness).*

## Documentation

*   **`docs/AlgorithmExplanation.md`**: Dive deep into each algorithm. Learn the problem, understand why the greedy choice is optimal (with proof sketches), see step-by-step logic, and analyze time/space complexity. Includes ASCII diagrams for visual understanding.
*   **`docs/InterviewTips.md`**: Get practical advice on how to approach greedy problems in an interview setting, what to look out for, how to explain your reasoning, and common follow-up questions.

## Contributing

Feel free to fork this project, add more greedy problems, improve existing solutions, or enhance documentation.

---
## License

This project is open-source and available under the MIT License.