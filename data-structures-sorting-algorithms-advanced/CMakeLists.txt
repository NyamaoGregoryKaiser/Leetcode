```cmake
cmake_minimum_required(VERSION 3.10)
project(SortingInterviewProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Define source directories
set(SOURCE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/src")
set(TEST_DIR "${CMAKE_CURRENT_SOURCE_DIR}/tests")
set(BENCHMARK_DIR "${CMAKE_CURRENT_SOURCE_DIR}/benchmark")

# Helper functions for common includes
function(add_common_includes TARGET)
    target_include_directories(${TARGET} PUBLIC ${SOURCE_DIR})
endfunction()

# --- Core Sorting Algorithms Library ---
add_library(SortingAlgorithms STATIC
    ${SOURCE_DIR}/sort_implementations.cpp
)
add_common_includes(SortingAlgorithms)
target_compile_definitions(SortingAlgorithms PUBLIC "TESTING_MODE") # Enable test-specific features if any

# --- Main Algorithms Executable ---
add_executable(main_algorithms
    ${SOURCE_DIR}/main_algorithms.cpp
)
add_common_includes(main_algorithms)
target_link_libraries(main_algorithms SortingAlgorithms)

# --- Test Executables ---
# Common test setup
function(add_test_executable TEST_NAME SOURCE_FILE)
    add_executable(${TEST_NAME} ${TEST_DIR}/${SOURCE_FILE})
    add_common_includes(${TEST_NAME})
    target_link_libraries(${TEST_NAME} SortingAlgorithms)
endfunction()

add_test_executable(test_sort_implementations test_sort_implementations.cpp)
add_test_executable(test_main_algorithms test_main_algorithms.cpp)

# --- Benchmark Executable ---
add_executable(benchmark_runner
    ${BENCHMARK_DIR}/benchmark.cpp
)
add_common_includes(benchmark_runner)
target_link_libraries(benchmark_runner SortingAlgorithms)

# Optional: Add compiler warnings for better code quality
if (CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
    target_compile_options(SortingAlgorithms PUBLIC -Wall -Wextra -pedantic)
    target_compile_options(main_algorithms PUBLIC -Wall -Wextra -pedantic)
    target_compile_options(test_sort_implementations PUBLIC -Wall -Wextra -pedantic)
    target_compile_options(test_main_algorithms PUBLIC -Wall -Wextra -pedantic)
    target_compile_options(benchmark_runner PUBLIC -Wall -Wextra -pedantic)
endif()

# To build:
# mkdir build
# cd build
# cmake ..
# make
```