cmake_minimum_required(VERSION 3.10)
project(TreeTraversalsProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Optional: Increase stack size for potentially deep recursive calls on skewed trees
# This is platform-dependent. For GCC/Clang on Linux:
# set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wl,--stack,268435456") # 256MB stack
# For MSVC on Windows:
# set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} /STACK:268435456")

# Include directories
include_directories(src problems)

# Source files for tree_utils
set(TREE_UTILS_SRCS
    src/tree_utils.cpp
)

# Source files for tree_traversals
set(TREE_TRAVERSALS_SRCS
    src/tree_traversals.cpp
)

# Source files for problem_solutions
set(PROBLEM_SOLUTIONS_SRCS
    problems/problem_solutions.cpp
)

# Executable for main demonstration
add_executable(main
    src/main.cpp
    ${TREE_UTILS_SRCS}
    ${TREE_TRAVERSALS_SRCS}
    ${PROBLEM_SOLUTIONS_SRCS}
)

# Executable for test suite
add_executable(test_suite
    tests/test_suite.cpp
    ${TREE_UTILS_SRCS}
    ${TREE_TRAVERSALS_SRCS}
    ${PROBLEM_SOLUTIONS_SRCS}
)

# Executable for benchmarks
add_executable(benchmark
    benchmarks/benchmark.cpp
    ${TREE_UTILS_SRCS}
    ${TREE_TRAVERSALS_SRCS}
    ${PROBLEM_SOLUTIONS_SRCS}
)