dp_interview_project/
├── src/
│   ├── main_dp_problems.cpp        # Optimal DP solutions (memoization/tabulation)
│   ├── brute_force_solutions.cpp   # Brute-force/naive recursive solutions for comparison
│   ├── optimized_space.cpp         # Space-optimized DP solutions for select problems
│   └── helpers.hpp                 # Utility functions (e.g., printing vectors/matrices)
├── tests/
│   ├── test_dp_problems.cpp        # Unit tests using Google Test
│   └── test_data.hpp               # Definitions of test cases
├── docs/
│   ├── README.md                   # Project overview, build instructions, problem descriptions
│   ├── ALGORITHM_EXPLANATION.md    # Detailed DP concepts, recurrence relations, state transitions
│   ├── INTERVIEW_TIPS.md           # General DP interview strategies, common pitfalls, variations
│   └── visual_diagrams.txt         # ASCII art diagrams for DP table filling, recursion trees
├── benchmarking/
│   └── benchmark.cpp               # Performance benchmarks using Google Benchmark
├── .gitignore                      # Git ignore file
└── CMakeLists.txt                  # CMake build configuration