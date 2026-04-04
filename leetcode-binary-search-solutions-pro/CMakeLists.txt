```cmake
cmake_minimum_required(VERSION 3.10)
project(BinarySearchProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Source files for main algorithms and utilities
set(SRC_FILES
    src/main_algorithms.cpp
    src/utils.cpp
)

# Executable for main algorithms and utilities
add_executable(binary_search_app ${SRC_FILES})
target_include_directories(binary_search_app PUBLIC src)

# Test executable
add_executable(test_runner tests/test_main_algorithms.cpp ${SRC_FILES})
target_include_directories(test_runner PUBLIC src tests)

# Benchmarking executable
add_executable(benchmark_runner benchmarking/benchmark_runner.cpp ${SRC_FILES})
target_include_directories(benchmark_runner PUBLIC src benchmarking)

# Additional implementations (could be built as separate executables or just compiled)
# For simplicity, we'll make them standalone executables.
add_executable(brute_force_optimized additional_implementations/brute_force_vs_optimized.cpp ${SRC_FILES})
target_include_directories(brute_force_optimized PUBLIC src)

add_executable(memory_versions additional_implementations/memory_efficient_versions.cpp ${SRC_FILES})
target_include_directories(memory_versions PUBLIC src)

# Optional: Install targets
install(TARGETS binary_search_app DESTINATION bin)
install(TARGETS test_runner DESTINATION bin)
install(TARGETS benchmark_runner DESTINATION bin)
install(TARGETS brute_force_optimized DESTINATION bin)
install(TARGETS memory_versions DESTINATION bin)
```