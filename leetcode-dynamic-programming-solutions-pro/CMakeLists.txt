cmake_minimum_required(VERSION 3.14 FATAL_ERROR)
project(DP_Interview_Project CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# --- Add Google Test ---
# For a real project, you might use FetchContent to download Google Test.
# For simplicity, we assume Google Test is already installed or available via a path.
# If Google Test is not found, you can manually specify its root directory:
# set(GTest_DIR "/path/to/googletest/install/lib/cmake/GTest")
find_package(GTest REQUIRED)
include_directories(${GTEST_INCLUDE_DIRS})

# --- Add Google Benchmark ---
# Similar to GTest, assume Google Benchmark is installed or available.
find_package(benchmark REQUIRED)
include_directories(${BENCHMARK_INCLUDE_DIRS})

# --- Source Files ---
# Main DP solutions
add_library(dp_solutions src/main_dp_problems.cpp src/helpers.hpp)
target_include_directories(dp_solutions PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src)

# Brute force solutions
add_library(brute_force_solutions src/brute_force_solutions.cpp src/helpers.hpp)
target_include_directories(brute_force_solutions PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src)

# Space optimized solutions
add_library(optimized_space_solutions src/optimized_space.cpp src/helpers.hpp)
target_include_directories(optimized_space_solutions PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src)

# --- Tests ---
add_executable(dp_tests tests/test_dp_problems.cpp tests/test_data.hpp)
target_link_libraries(dp_tests PRIVATE dp_solutions brute_force_solutions optimized_space_solutions GTest::gtest_main)
target_include_directories(dp_tests PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src ${CMAKE_CURRENT_SOURCE_DIR}/tests)

# --- Benchmarks ---
add_executable(dp_benchmarks benchmarking/benchmark.cpp)
target_link_libraries(dp_benchmarks PRIVATE dp_solutions brute_force_solutions optimized_space_solutions benchmark::benchmark_main)
target_include_directories(dp_benchmarks PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src)

# Optional: Add a main executable to demonstrate usage if needed
# add_executable(main_app src/main_app.cpp)
# target_link_libraries(main_app PRIVATE dp_solutions)

message(STATUS "Build instructions:")
message(STATUS "1. Create a build directory: mkdir build && cd build")
message(STATUS "2. Configure CMake: cmake ..")
message(STATUS "3. Build: cmake --build .")
message(STATUS "4. Run tests: ./dp_tests")
message(STATUS "5. Run benchmarks: ./dp_benchmarks")