greedy_algorithms_project/
├── algorithms/
│   ├── __init__.py
│   ├── activity_selection.py         # Maximize non-overlapping activities
│   ├── fractional_knapsack.py        # Maximize value with item fractions
│   ├── coin_change_greedy.py         # Minimum coins for canonical systems
│   ├── job_sequencing.py             # Maximize profit with deadlines
│   └── huffman_coding.py             # Optimal prefix codes for data compression
│
├── tests/
│   ├── __init__.py
│   ├── test_activity_selection.py
│   ├── test_fractional_knapsack.py
│   ├── test_coin_change_greedy.py
│   ├── test_job_sequencing.py
│   └── test_huffman_coding.py
│
├── utils/
│   ├── __init__.py
│   ├── data_structures.py            # MinHeap implementation for Huffman Coding
│   └── performance_benchmarking.py   # Code to measure algorithm performance
│
├── docs/
│   ├── README.md                     # Project overview and instructions
│   ├── algorithm_explanation.md      # In-depth theory, proofs, and diagrams
│   └── interview_tips.md             # Strategies for tackling greedy problems
│
├── solutions_comparison/
│   ├── __init__.py
│   ├── brute_force_knapsack.py       # Exponential solution for 0/1 Knapsack
│   └── dp_coin_change.py             # Dynamic Programming for general Coin Change
│
└── main.py                           # Driver script to run examples and benchmarks