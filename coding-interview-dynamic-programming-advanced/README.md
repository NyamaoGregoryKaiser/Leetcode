dp_interview_project/
├── algorithms/
│   ├── __init__.py
│   ├── fibonacci.py                    # Classic: Memoization, Tabulation, Space Optimization
│   ├── knapsack_01.py                  # 0/1 Knapsack: Decision problem
│   ├── longest_common_subsequence.py   # LCS: String DP
│   ├── word_break.py                   # Word Break: Boolean DP
│   └── min_cost_climbing_stairs.py     # Min Cost Path: Pathfinding DP
├── tests/
│   ├── __init__.py
│   ├── test_fibonacci.py
│   ├── test_knapsack_01.py
│   ├── test_longest_common_subsequence.py
│   ├── test_word_break.py
│   └── test_min_cost_climbing_stairs.py
├── docs/
│   ├── README.md                       # Project overview, problem descriptions
│   ├── dp_concepts.md                  # Detailed explanation of DP, paradigms, diagrams
│   ├── dp_patterns.md                  # Common DP patterns and variations
│   └── interview_tips.md               # Strategies, edge cases, gotchas
├── utils/
│   ├── __init__.py
│   └── decorators.py                   # Custom memoization and timing decorators
├── benchmarks/
│   └── benchmark_all.py                # Performance comparison between brute-force and DP
└── requirements.txt