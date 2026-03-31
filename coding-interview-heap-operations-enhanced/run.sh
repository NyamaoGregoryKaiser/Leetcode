```bash
#!/bin/bash
echo "Running HeapOperationsProject..."

# Navigate to build directory
cd build || { echo "Error: 'build' directory not found. Please run build.sh first."; exit 1; }

echo "--- Running Heap Operations Tests ---"
if [ -f test_heap_operations ]; then
    ./test_heap_operations
else
    echo "test_heap_operations executable not found. Please build the project first."
fi

echo -e "\n--- Running Main Algorithms Tests ---"
if [ -f test_main_algorithms ]; then
    ./test_main_algorithms
else
    echo "test_main_algorithms executable not found. Please build the project first."
fi

echo -e "\n--- Running Performance Benchmarks ---"
if [ -f benchmark_algorithms ]; then
    ./benchmark_algorithms
else
    echo "benchmark_algorithms executable not found. Please build the project first."
fi

cd ..
echo -e "\nRun complete."
```