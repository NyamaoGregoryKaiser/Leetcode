#!/bin/bash

BIN_DIR="./bin"

echo "Running all demonstrations and tests..."
echo "========================================"

if [ ! -d "$BIN_DIR" ]; then
    echo "Error: Binary directory '$BIN_DIR' not found. Please run ./build.sh first."
    exit 1
fi

echo -e "\n--- Running Main Algorithms Demo ---"
"$BIN_DIR/main_algorithms_demo"
if [ $? -ne 0 ]; then echo "Main Algorithms Demo FAILED!"; exit 1; fi

echo -e "\n--- Running Brute Force vs Optimized Demo ---"
"$BIN_DIR/brute_force_vs_optimized_demo"
if [ $? -ne 0 ]; then echo "Brute Force Demo FAILED!"; exit 1; fi

echo -e "\n--- Running Unit Tests ---"
"$BIN_DIR/run_unit_tests"
if [ $? -ne 0 ]; then echo "Unit Tests FAILED!"; exit 1; fi

echo -e "\n--- Running Performance Benchmarks ---"
"$BIN_DIR/run_performance_benchmarks"
if [ $? -ne 0 ]; then echo "Performance Benchmarks FAILED!"; exit 1; fi

echo -e "\n========================================"
echo "All demos and tests completed successfully!"