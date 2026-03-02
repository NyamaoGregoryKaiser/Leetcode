dp-interview-project/
├── src/
│   ├── algorithms/
│   │   ├── coinChange.ts             # Problem 3: Coin Change (Unbounded Knapsack)
│   │   ├── fibonacci.ts                # Problem 1: Fibonacci Numbers (Intro to DP)
│   │   ├── knapsack01.ts               # Problem 5: 0/1 Knapsack Problem
│   │   ├── longestCommonSubsequence.ts # Problem 4: Longest Common Subsequence
│   │   ├── uniquePaths.ts              # Problem 2: Unique Paths (2D DP)
│   │   └── index.ts                    # Exports all algorithms
│   ├── utils/
│   │   └── memoizationCache.ts         # Generic memoization helper
│   └── types.ts                        # Common types
├── tests/
│   ├── coinChange.test.ts
│   ├── fibonacci.test.ts
│   ├── knapsack01.test.ts
│   ├── longestCommonSubsequence.test.ts
│   ├── performance.test.ts             # Benchmarking for various algorithms
│   └── uniquePaths.test.ts
├── docs/
│   ├── ALGORITHMS.md                   # Detailed algorithm explanations, diagrams, complexity
│   ├── INTERVIEW_TIPS.md               # General DP and interview advice
│   └── README.md                       # Project overview, setup, problems list
├── .gitignore
├── package.json
├── tsconfig.json