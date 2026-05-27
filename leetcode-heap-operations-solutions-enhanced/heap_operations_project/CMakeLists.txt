```cmake
cmake_minimum_required(VERSION 3.10 FATAL_ERROR)
project(HeapOperationsProject LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON) # Required for shared libraries on some systems, good practice

# --- Source Files ---
# Main problem solutions and custom heap
set(HEAP_SOURCES
    src/main_heap_problems.cpp
    src/custom_heap.h
)

# --- Submodules for Dependencies ---
# Catch2 for testing
add_subdirectory(extern/Catch2)
# Google Benchmark for performance
add_subdirectory(extern/benchmark)

# --- Build Tests ---
add_executable(test_heap_problems tests/test_heap_problems.cpp ${HEAP_SOURCES})
target_link_libraries(test_heap_problems PRIVATE Catch2::Catch2WithMain)
target_include_directories(test_heap_problems PRIVATE src) # Allow test file to include custom_heap.h and main_heap_problems.cpp

# --- Build Benchmarks ---
add_executable(benchmark_heap_problems benchmarking/benchmark_heap_problems.cpp ${HEAP_SOURCES})
target_link_libraries(benchmark_heap_problems PRIVATE benchmark::benchmark benchmark::benchmark_main)
target_include_directories(benchmark_heap_problems PRIVATE src)
```