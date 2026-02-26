#!/bin/bash

# Create a bin directory if it doesn't exist
mkdir -p bin

# Compile main application
echo "Compiling main application..."
g++ -std=c++17 -Wall -Isrc/include -Iutils src/main.cpp src/problems/*.cpp utils/*.cpp -o bin/main_app -lm
if [ $? -eq 0 ]; then
    echo "Main application compiled successfully."
else
    echo "Error compiling main application."
    exit 1
fi

# Compile test application
echo "Compiling test application..."
g++ -std=c++17 -Wall -Isrc/include -Iutils -Itests/include tests/test_main.cpp src/problems/*.cpp utils/*.cpp -o bin/test_app -lm
if [ $? -eq 0 ]; then
    echo "Test application compiled successfully."
else
    echo "Error compiling test application."
    exit 1
fi

# Compile benchmark application
echo "Compiling benchmark application..."
g++ -std=c++17 -Wall -Isrc/include -Iutils benchmarks/benchmark_main.cpp src/problems/*.cpp utils/*.cpp -o bin/benchmark_app -lm
if [ $? -eq 0 ]; then
    echo "Benchmark application compiled successfully."
else
    echo "Error compiling benchmark application."
    exit 1
fi

echo "All executables are in the 'bin/' directory."
echo "To run main app: ./bin/main_app"
echo "To run tests: ./bin/test_app"
echo "To run benchmarks: ./bin/benchmark_app"

---