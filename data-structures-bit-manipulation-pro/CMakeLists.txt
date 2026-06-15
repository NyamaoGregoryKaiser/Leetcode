cmake_minimum_required(VERSION 3.10 FATAL_ERROR)

project(BitManipulationInterviewProject LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# --- Fetch Catch2 for testing ---
include(FetchContent)
FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2.git
  GIT_TAG        v2.13.7 # Or a more recent v2.x tag
  OVERRIDE_FIND_PACKAGE
)
FetchContent_MakeAvailable(Catch2)

# --- Fetch Google Benchmark for benchmarking ---
FetchContent_Declare(
  GoogleBenchmark
  GIT_REPOSITORY https://github.com/google/benchmark.git
  GIT_TAG        v1.6.1 # Or a more recent tag
)
FetchContent_MakeAvailable(GoogleBenchmark)

# --- Define Source and Header directories ---
set(PROJECT_SRC_DIR "${CMAKE_CURRENT_SOURCE_DIR}/src")
set(PROJECT_TEST_DIR "${CMAKE_CURRENT_SOURCE_DIR}/test")
set(PROJECT_BENCHMARKING_DIR "${CMAKE_CURRENT_SOURCE_DIR}/benchmarking")
set(PROJECT_UTILS_DIR "${CMAKE_CURRENT_SOURCE_DIR}/utils")

# --- Include directories for the entire project ---
include_directories(
    ${PROJECT_SRC_DIR}
    ${PROJECT_UTILS_DIR}
)

# --- Utility Library ---
add_library(BitManipulation_Utils STATIC
    ${PROJECT_UTILS_DIR}/CommonHelpers.h
)
target_include_directories(BitManipulation_Utils PUBLIC ${PROJECT_UTILS_DIR})

# --- Core Algorithm Library ---
add_library(BitManipulation_Core STATIC
    ${PROJECT_SRC_DIR}/BitManipulationProblems.cpp
    ${PROJECT_SRC_DIR}/BitManipulationProblems.h
)
target_link_libraries(BitManipulation_Core PRIVATE BitManipulation_Utils)
target_include_directories(BitManipulation_Core PUBLIC ${PROJECT_SRC_DIR})


# --- Main Executable (Demo) ---
add_executable(BitManipulation_Demo ${PROJECT_SRC_DIR}/main.cpp)
target_link_libraries(BitManipulation_Demo PRIVATE BitManipulation_Core BitManipulation_Utils)

# --- Test Executable ---
add_executable(BitManipulation_Tests
    ${PROJECT_TEST_DIR}/Catch2_setup.cpp
    ${PROJECT_TEST_DIR}/TestBitManipulation.cpp
)
target_link_libraries(BitManipulation_Tests PRIVATE BitManipulation_Core Catch2::Catch2)

# --- Benchmark Executable ---
add_executable(BitManipulation_Benchmarks ${PROJECT_BENCHMARKING_DIR}/BenchmarkBitManipulation.cpp)
target_link_libraries(BitManipulation_Benchmarks PRIVATE BitManipulation_Core benchmark::benchmark benchmark::benchmark_main)

# Add a custom target to run all tests
add_test(NAME RunAllTests COMMAND BitManipulation_Tests)

# Optionally install the header and library (for a larger project)
# install(TARGETS BitManipulation_Core
#         DESTINATION lib)
# install(FILES ${PROJECT_SRC_DIR}/BitManipulationProblems.h
#         DESTINATION include)
```
---