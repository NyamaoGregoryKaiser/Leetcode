cmake_minimum_required(VERSION 3.10)
project(HeapOperationsProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# --- Fetch Google Test (for unit tests) ---
include(FetchContent)
FetchContent_Declare(
    googletest
    URL https://github.com/google/googletest/archive/release-1.11.0.zip
)
FetchContent_MakeAvailable(googletest)

# --- Fetch Google Benchmark (for performance benchmarks) ---
FetchContent_Declare(
    googlebenchmark
    URL https://github.com/google/benchmark/archive/v1.6.1.zip
)
FetchContent_MakeAvailable(googlebenchmark)

# --- Source Files ---
set(HEAP_PROBLEMS_SRCS
    src/heap_problems.cpp
)
set(HEAP_PROBLEMS_HEADERS
    src/heap_problems.h
    utils/min_heap.h
    utils/max_heap.h
)

# --- Add include directories ---
include_directories(
    "${CMAKE_CURRENT_SOURCE_DIR}"
    "${CMAKE_CURRENT_SOURCE_DIR}/src"
    "${CMAKE_CURRENT_SOURCE_DIR}/utils"
)

# --- Build the main library (optional, but good practice) ---
# This creates a library target for the problem solutions
add_library(heap_problems STATIC ${HEAP_PROBLEMS_SRCS} ${HEAP_PROBLEMS_HEADERS})
target_compile_features(heap_problems PUBLIC cxx_std_17)

# --- Build Unit Tests ---
add_executable(heap_tests tests/test_heap_problems.cpp)
target_link_libraries(heap_tests PRIVATE heap_problems GTest::gtest_main GTest::gtest)
target_compile_features(heap_tests PUBLIC cxx_std_17)

# --- Build Benchmarks ---
add_executable(heap_benchmarks benchmarks/benchmark_heap.cpp)
target_link_libraries(heap_benchmarks PRIVATE heap_problems benchmark::benchmark benchmark::benchmark_main)
target_compile_features(heap_benchmarks PUBLIC cxx_std_17)

# --- Install Targets (Optional) ---
# install(TARGETS heap_problems DESTINATION lib)
# install(TARGETS heap_tests DESTINATION bin)
# install(TARGETS heap_benchmarks DESTINATION bin)
# install(FILES ${HEAP_PROBLEMS_HEADERS} DESTINATION include)