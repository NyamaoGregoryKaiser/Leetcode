#!/bin/bash

# Directory for compiled binaries
BIN_DIR="./bin"
mkdir -p "$BIN_DIR"

# Common compiler flags
CXX="g++"
CXXFLAGS="-std=c++17 -Wall -Wextra -O2 -pthread" # -pthread for chrono in some systems if needed

echo "--- Compiling Main Algorithms Demo ---"
$CXX $CXXFLAGS src/main_algorithms.cpp -o "$BIN_DIR/main_algorithms_demo"

echo "--- Compiling Brute Force vs Optimized Demo ---"
# Compile main_algorithms.cpp and brute_force_vs_optimized.cpp together
# as brute_force_vs_optimized.cpp uses functions from main_algorithms.cpp
$CXX $CXXFLAGS src/main_algorithms.cpp src/brute_force_vs_optimized.cpp -o "$BIN_DIR/brute_force_vs_optimized_demo"

echo "--- Compiling Unit Tests ---"
# Compile unit tests. It includes main_algorithms.cpp directly.
$CXX $CXXFLAGS test/test_main_algorithms.cpp -o "$BIN_DIR/run_unit_tests"

echo "--- Compiling Performance Benchmarks ---"
# Compile performance benchmarks. It includes main_algorithms.cpp and brute_force_vs_optimized.cpp directly.
$CXX $CXXFLAGS test/test_performance.cpp -o "$BIN_DIR/run_performance_benchmarks"

if [ $? -eq 0 ]; then
    echo "--- All compilations successful! ---"
else
    echo "--- Compilation failed! ---"
    exit 1
fi