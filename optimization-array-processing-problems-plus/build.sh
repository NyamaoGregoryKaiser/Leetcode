```bash
#!/bin/bash

# Define directories
SRC_DIR="./src"
TESTS_DIR="./tests"
BENCHMARKS_DIR="./benchmarks"
BIN_DIR="./bin"
DOCS_DIR="./docs"

# Compiler and flags
CXX="g++"
CXXFLAGS="-std=c++11 -Wall -Wextra -g -O2 -I$SRC_DIR" # -g for debugging, -O2 for optimization

# Create bin directory if it doesn't exist
mkdir -p "$BIN_DIR"

# Function to compile main program
compile_main() {
    echo "Compiling main program..."
    $CXX $CXXFLAGS -o "$BIN_DIR/main" "$SRC_DIR/main.cpp" "$SRC_DIR/array_manipulator.cpp" -L"$BIN_DIR"
    if [ $? -eq 0 ]; then
        echo "Main program compiled successfully to $BIN_DIR/main"
    else
        echo "Main program compilation FAILED!"
        exit 1
    fi
}

# Function to compile tests
compile_tests() {
    echo "Compiling tests..."
    $CXX $CXXFLAGS -o "$BIN_DIR/tests" "$TESTS_DIR/test_array_manipulator.cpp" "$SRC_DIR/array_manipulator.cpp" -L"$BIN_DIR"
    if [ $? -eq 0 ]; then
        echo "Tests compiled successfully to $BIN_DIR/tests"
    else
        echo "Tests compilation FAILED!"
        exit 1
    fi
}

# Function to compile benchmarks
compile_benchmarks() {
    echo "Compiling benchmarks..."
    $CXX $CXXFLAGS -o "$BIN_DIR/benchmarks" "$BENCHMARKS_DIR/benchmark_runner.cpp" "$SRC_DIR/array_manipulator.cpp" -L"$BIN_DIR"
    if [ $? -eq 0 ]; then
        echo "Benchmarks compiled successfully to $BIN_DIR/benchmarks"
    else
        echo "Benchmarks compilation FAILED!"
        exit 1
    fi
}

# Clean function
clean() {
    echo "Cleaning up..."
    rm -f "$BIN_DIR/main" "$BIN_DIR/tests" "$BIN_DIR/benchmarks"
    rmdir "$BIN_DIR" 2>/dev/null || true # Remove dir only if empty
    echo "Clean complete."
}

# Main script logic
case "$1" in
    build)
        compile_main
        compile_tests
        compile_benchmarks
        ;;
    run_main)
        if [ ! -f "$BIN_DIR/main" ]; then
            echo "Main executable not found. Building first..."
            compile_main
        fi
        echo "Running main program..."
        "$BIN_DIR/main"
        ;;
    run_tests)
        if [ ! -f "$BIN_DIR/tests" ]; then
            echo "Test executable not found. Building first..."
            compile_tests
        fi
        echo "Running tests..."
        "$BIN_DIR/tests"
        ;;
    run_benchmarks)
        if [ ! -f "$BIN_DIR/benchmarks" ]; then
            echo "Benchmark executable not found. Building first..."
            compile_benchmarks
        fi
        echo "Running benchmarks..."
        "$BIN_DIR/benchmarks"
        ;;
    clean)
        clean
        ;;
    *)
        echo "Usage: $0 {build|run_main|run_tests|run_benchmarks|clean}"
        exit 1
        ;;
esac

exit 0
```