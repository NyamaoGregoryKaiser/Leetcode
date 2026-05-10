# Greedy Algorithms Project

This project provides a comprehensive study and implementation guide for various classic Greedy Algorithms, designed to be a valuable resource for coding interview preparation. It includes:

-   **Multiple Problems**: Implementations of 5 different greedy problems with optimal solutions.
-   **Detailed Explanations**: In-depth comments within code and dedicated documentation explaining algorithms, complexity, and greedy properties.
-   **Comprehensive Testing**: JUnit test suites with extensive test cases for each problem.
-   **Helper Utilities**: Custom data structures and a performance benchmarking tool.
-   **Documentation**: Markdown files covering problem descriptions, algorithm explanations, interview tips, and visual diagrams.

## Table of Contents

1.  [Project Structure](#project-structure)
2.  [Problems Covered](#problems-covered)
3.  [How to Build and Run](#how-to-build-and-run)
    *   [Prerequisites](#prerequisites)
    *   [Build](#build)
    *   [Run Examples](#run-examples)
    *   [Run Tests](#run-tests)
4.  [Documentation Guide](#documentation-guide)
5.  [Contributing](#contributing)
6.  [License](#license)

## Problems Covered

The project implements the following greedy algorithms:

1.  **Activity Selection Problem**: Maximizing the number of non-overlapping activities.
2.  **Coin Change Problem**: Finding the minimum number of coins for a given amount (under canonical coin systems).
3.  **Fractional Knapsack Problem**: Maximizing value by taking fractions of items.
4.  **Job Sequencing with Deadlines**: Maximizing profit by scheduling jobs within their deadlines.
5.  **Minimize Cash Flow**: Settling debts among a group of people with minimum transactions.

Each problem's solution in `src/main/java/com/greedy/problems/` comes with:
*   Optimal greedy algorithm implementation.
*   Detailed comments explaining logic and steps.
*   Time and Space Complexity analysis.
*   Consideration of alternative approaches (e.g., dynamic programming) in comments or related documentation.

## How to Build and Run

### Prerequisites

*   Java Development Kit (JDK) 11 or higher
*   Apache Maven 3.6.0 or higher

### Build

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/greedy-algorithms-project.git
    cd greedy-algorithms-project
    ```
2.  **Build the project using Maven:**
    This command compiles the source code, runs tests, and packages the application.
    ```bash
    mvn clean install
    ```
    If you want to skip tests during build:
    ```bash
    mvn clean install -DskipTests
    ```

### Run Examples

The `Main.java` file demonstrates how to use each implemented greedy algorithm with sample data.

To run the examples after building:
```bash
java -jar target/greedy-algorithms-project-1.0-SNAPSHOT-jar-with-dependencies.jar
```

You can also run directly from Maven without building a JAR:
```bash
mvn exec:java -Dexec.mainClass="com.greedy.Main"
```

### Run Tests

To execute all JUnit tests:
```bash
mvn test
```

## Documentation Guide

Explore the `docs/` directory for in-depth understanding:

*   `docs/README.md`: Provides a concise description for each problem.
*   `docs/ALGORITHM_EXPLANATIONS.md`: Delves into the theory behind greedy algorithms, including properties (greedy choice, optimal substructure) and how they apply to specific problems.
*   `docs/INTERVIEW_TIPS.md`: Offers advice on identifying greedy problems, common pitfalls, and strategies for interviews.
*   `docs/diagrams/activity_selection_diagram.txt`: A visual aid to understand the Activity Selection Problem.

## Contributing

Feel free to fork the repository, open issues, or submit pull requests with improvements, additional problems, or better explanations.

## License

This project is open-sourced under the MIT License. See the LICENSE file for details (though not included in this output, it's standard practice).