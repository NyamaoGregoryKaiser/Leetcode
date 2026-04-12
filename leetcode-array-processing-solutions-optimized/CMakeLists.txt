```cmake
cmake_minimum_required(VERSION 3.10)
project(ArrayManipulationInterview CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Add source directories
include_directories(src)

# --- Add executable for main algorithms (optional, can be merged into benchmark or tests) ---
add_executable(main_runner src/main_algorithms.cpp src/utils.cpp)
target_link_libraries(main_runner) # No special libraries needed for basic execution

# --- Add executable for benchmarking ---
add_executable(benchmark_runner src/benchmark.cpp src/main_algorithms.cpp src/brute_force_solutions.cpp src/utils.cpp)
target_link_libraries(benchmark_runner)

# --- Add executable for tests using Catch2 ---
# Find Catch2
find_package(Catch2 REQUIRED CONFIG)

add_executable(test_runner tests/test_algorithms.cpp tests/Catch2_setup.cpp src/main_algorithms.cpp src/brute_force_solutions.cpp src/utils.cpp)
target_link_libraries(test_runner PRIVATE Catch2::Catch2WithMain) # Link Catch2 library with main

# --- Add brute force executable (optional, for direct comparison/testing) ---
add_executable(brute_force_runner src/brute_force_solutions.cpp src/utils.cpp)
target_link_libraries(brute_force_runner)

# Optional: Add install targets if needed
# install(TARGETS main_runner benchmark_runner test_runner brute_force_runner DESTINATION bin)
```