```cmake
cmake_minimum_required(VERSION 3.10)
project(BacktrackingProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Configure output directories
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")

# --- Source Files ---
# Core algorithms
set(BACKTRACKING_SOURCES
    src/NQueens.hpp
    src/SubsetsII.hpp
    src/PermutationsII.hpp
    src/CombinationSumIII.hpp
    src/WordSearch.hpp
)

# Utils
set(UTILITIES_SOURCES
    utils/helpers.hpp
)

# Add source directories to include paths
include_directories(src utils)

# --- Build Tests ---
add_executable(backtracking_tests tests/test_main.cpp)
target_sources(backtracking_tests PRIVATE ${BACKTRACKING_SOURCES} ${UTILITIES_SOURCES})
target_include_directories(backtracking_tests PRIVATE src utils)

# --- Build Benchmarks ---
add_executable(backtracking_benchmarks benchmarking/benchmark_main.cpp)
target_sources(backtracking_benchmarks PRIVATE ${BACKTRACKING_SOURCES} ${UTILITIES_SOURCES})
target_include_directories(backtracking_benchmarks PRIVATE src utils)

# Optional: Add any third-party libraries if needed
# For example, if using Google Test:
# find_package(GTest REQUIRED)
# target_link_libraries(backtracking_tests GTest::gtest GTest::gtest_main)
```