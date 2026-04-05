cmake_minimum_required(VERSION 3.10)
project(BacktrackingInterviewProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Source files
set(SRC_DIR src)
set(TESTS_DIR tests)
set(BENCHMARKS_DIR benchmarks)

# Main algorithm implementations
set(BACKTRACKING_SOURCES
    ${SRC_DIR}/n_queens.cpp
    ${SRC_DIR}/sudoku_solver.cpp
    ${SRC_DIR}/permutations.cpp
    ${SRC_DIR}/subsets.cpp
    ${SRC_DIR}/optimized_solutions.cpp
    ${SRC_DIR}/utils.cpp
)

# Headers
target_include_directories(BacktrackingInterviewProject PUBLIC ${SRC_DIR})

# Add an executable for tests
add_executable(run_tests ${TESTS_DIR}/test_main.cpp ${BACKTRACKING_SOURCES})

# Add an executable for benchmarks
add_executable(run_benchmarks ${BENCHMARKS_DIR}/benchmark_main.cpp ${BACKTRACKING_SOURCES})

# Optional: Add a main executable if you want to run specific demos
# add_executable(backtracking_demo main.cpp ${BACKTRACKING_SOURCES})