```bash
#!/bin/bash
echo "Building HeapOperationsProject..."

# Create build directory if it doesn't exist
mkdir -p build
cd build

# Compile heap_operations.o
g++ -std=c++17 -Wall -Wextra -c ../src/heap_operations.hpp -o heap_operations.o

# Compile main_algorithms.o
g++ -std=c++17 -Wall -Wextra -c ../src/main_algorithms.cpp -o main_algorithms.o

# Compile test_heap_operations
g++ -std=c++17 -Wall -Wextra ../test/test_heap_operations.cpp heap_operations.o -o test_heap_operations

# Compile test_main_algorithms
g++ -std=c++17 -Wall -Wextra ../test/test_main_algorithms.cpp main_algorithms.o heap_operations.o -o test_main_algorithms

# Compile benchmark_algorithms
g++ -std=c++17 -Wall -Wextra ../benchmark/benchmark_algorithms.cpp main_algorithms.o heap_operations.o ../utils/data_generator.hpp -o benchmark_algorithms

echo "Build complete."
cd ..
```