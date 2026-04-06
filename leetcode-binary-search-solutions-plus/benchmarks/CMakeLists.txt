```cmake
# CMakeLists.txt for benchmarks

cmake_minimum_required(VERSION 3.10 FATAL_ERROR)
project(binary_search_benchmarks CXX)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Fetch Google Benchmark
include(FetchContent)
FetchContent_Declare(
  benchmark
  URL https://github.com/google/benchmark/archive/v1.7.0.zip
)
FetchContent_MakeAvailable(benchmark)

# Add benchmark executable
add_executable(binary_search_benchmarks benchmark_algorithms.cpp ../src/algorithms.cpp ../src/helpers.cpp)

# Link with Google Benchmark libraries
target_link_libraries(binary_search_benchmarks PRIVATE benchmark::benchmark_main)

# Add include directories for our source files
target_include_directories(binary_search_benchmarks PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/../src)
```