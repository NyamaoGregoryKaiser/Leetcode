```markdown
# ⛽ Greedy Algorithms Interview Project 🎒

This project provides a comprehensive set of resources for understanding, implementing, and practicing Greedy Algorithms, specifically tailored for coding interview preparation. It includes multiple common greedy problems, optimal JavaScript solutions, detailed explanations, extensive test cases, performance benchmarks, and comparative implementations.

## 🌟 Features

*   **5 Core Greedy Problems:**
    *   Activity Selection Problem
    *   Fractional Knapsack Problem
    *   Coin Change Problem (Greedy variant with caveats)
    *   Job Sequencing with Deadlines
    *   Gas Station Problem (Circular Tour)
*   **Optimal JavaScript Solutions:** Each problem comes with a well-commented, optimal greedy solution.
*   **Time & Space Complexity Analysis:** Detailed breakdown for each algorithm.
*   **Extensive Test Suites:** Thorough Jest test files covering basic, edge, and complex scenarios.
*   **Performance Benchmarking:** Script to measure the execution time of algorithms.
*   **In-depth Documentation:**
    *   `ALGORITHM_EXPLANATION.md`: General introduction to greedy algorithms, problem statements, greedy choice proofs (intuition), and step-by-step logic.
    *   `EDGE_CASES_AND_GOTCHAS.md`: Highlights tricky aspects and common pitfalls.
    *   `INTERVIEW_TIPS.md`: Advice for approaching greedy problems in interviews.
    *   `VISUAL_DIAGRAMS.md`: ASCII art to visually explain key concepts.
*   **Solution Comparisons:**
    *   Brute-force implementations for selected problems to highlight efficiency gains.
    *   Dynamic Programming solution for Coin Change to demonstrate when greedy fails.

## 🚀 Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (usually comes with Node.js) or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/greedy-algorithms-project.git
    cd greedy-algorithms-project
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

### Running Tests

To run the full test suite for all implemented algorithms:

```bash
npm test
# or yarn test
```

You can also run tests for a specific file, e.g.:

```bash
npx jest tests/activitySelection.test.js
```

### Running Benchmarks

To run performance benchmarks for some of the algorithms:

```bash
npm run benchmark
# or yarn benchmark
```

### Exploring the Code and Documentation

*   **Algorithms:** Check the `src/problems/` directory for algorithm implementations.
*   **Tests:** Explore `tests/` for how algorithms are tested.
*   **Documentation:** Dive into the `docs/` directory for comprehensive explanations.
*   **Comparisons:** See `solutions_comparison/` for alternative approaches.

## 📚 Project Structure

```
greedy-algorithms-project/
├── src/                                # Main source code for algorithms
│   ├── problems/                       # Individual algorithm implementations
│   │   ├── activitySelection.js
│   │   ├── coinChange.js
│   │   ├── fractionalKnapsack.js
│   │   ├── gasStationProblem.js
│   │   └── jobSequencing.js
│   └── utils/                          # Helper utilities (e.g., sorters)
│       └── sorters.js
├── tests/                              # Jest test files for each algorithm
│   ├── activitySelection.test.js
│   ├── coinChange.test.js
│   ├── fractionalKnapsack.test.js
│   ├── gasStationProblem.test.js
│   └── jobSequencing.test.js
├── docs/                               # Comprehensive project documentation
│   ├── README.md                       # (You are here!) Project overview
│   ├── ALGORITHM_EXPLANATION.md        # Detailed algorithm theory and logic
│   ├── EDGE_CASES_AND_GOTCHAS.md       # Common pitfalls and tricky scenarios
│   ├── INTERVIEW_TIPS.md               # Interview strategies
│   └── VISUAL_DIAGRAMS.md              # Visual explanations (ASCII art)
├── benchmarks/                         # Performance testing scripts
│   └── benchmark.js
├── solutions_comparison/               # Alternative/Brute-force solutions for comparison
│   ├── activitySelection_bruteForce.js
│   ├── coinChange_bruteForce.js
│   └── coinChange_optimizedDP.js
├── package.json                        # Project metadata and dependencies
└── .gitignore                          # Files/directories to ignore in Git
```

## 🌐 Problems Implemented

### 1. Activity Selection Problem
*   **Description:** Given a set of activities with start and finish times, select the maximum number of non-overlapping activities.
*   **Greedy Strategy:** Sort by finish times and pick the earliest finishing compatible activity.

### 2. Fractional Knapsack Problem
*   **Description:** Given items with weights and values, and a knapsack capacity, maximize total value by taking items (or fractions of items).
*   **Greedy Strategy:** Prioritize items with the highest value-to-weight ratio.

### 3. Coin Change Problem (Greedy Variant)
*   **Description:** Find the minimum number of coins to make a given amount.
*   **Greedy Strategy:** Always pick the largest possible coin.
*   **_Caveat:_** This strategy is optimal ONLY for "canonical" coin systems (like US currency). For general coin systems, Dynamic Programming is required (see `solutions_comparison/`).

### 4. Job Sequencing with Deadlines
*   **Description:** Given jobs with deadlines and profits, schedule a subset of jobs (each taking unit time) to maximize total profit, ensuring jobs meet deadlines.
*   **Greedy Strategy:** Sort jobs by profit in descending order. For each job, schedule it in the latest possible available time slot before or at its deadline.

### 5. Gas Station Problem (Circular Tour)
*   **Description:** Given gas amounts at stations and costs to travel between them on a circular route, find a starting station to complete a full tour.
*   **Greedy Strategy:** If the total gas is sufficient for the total cost, a solution exists. Iterate through stations, tracking current tank. If tank drops negative, reset and try the next station as the start.

---

Feel free to explore, contribute, and use this project to sharpen your greedy algorithm skills!

---
```