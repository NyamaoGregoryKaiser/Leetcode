greedy-algorithms-project/
├── src/
│   ├── problems/
│   │   ├── activitySelection.js        # Optimal solution for Activity Selection
│   │   ├── fractionalKnapsack.js       # Optimal solution for Fractional Knapsack
│   │   ├── coinChange.js             # Greedy solution for Coin Change (with caveats)
│   │   ├── jobSequencing.js            # Optimal solution for Job Sequencing with Deadlines
│   │   └── gasStationProblem.js        # Optimal solution for Gas Station Problem
│   └── utils/
│       └── sorters.js                  # Helper for custom sorting
├── tests/
│   ├── activitySelection.test.js
│   ├── fractionalKnapsack.test.js
│   ├── coinChange.test.js
│   ├── jobSequencing.test.js
│   └── gasStationProblem.test.js
├── docs/
│   ├── README.md                       # Project overview, setup, usage
│   ├── ALGORITHM_EXPLANATION.md        # Deep dive into greedy concepts and problem solutions
│   ├── INTERVIEW_TIPS.md               # Strategies for interview success
│   ├── VISUAL_DIAGRAMS.md              # ASCII art diagrams for clarity
│   └── EDGE_CASES_AND_GOTCHAS.md       # Common pitfalls and tricky scenarios
├── benchmarks/
│   └── benchmark.js                    # Performance testing script
├── solutions_comparison/
│   ├── activitySelection_bruteForce.js # Brute-force for Activity Selection
│   ├── coinChange_bruteForce.js      # Brute-force for Coin Change
│   └── coinChange_optimizedDP.js     # Dynamic Programming for general Coin Change
├── package.json
└── .gitignore