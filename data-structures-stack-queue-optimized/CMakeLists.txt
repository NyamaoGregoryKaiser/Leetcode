```cmake
cmake_minimum_required(VERSION 3.10)
project(StackQueueInterviewProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON) # For VSCode and other IDEs

# Source files for the main library
set(STACK_QUEUE_SRC
    src/stack_queue_problems.cpp
    src/utils/custom_stack_queue.cpp
)

set(STACK_QUEUE_HDR
    src/stack_queue_problems.h
    src/utils/custom_stack_queue.h
)

add_library(StackQueueLib STATIC ${STACK_QUEUE_SRC} ${STACK_QUEUE_HDR})
target_include_directories(StackQueueLib PUBLIC src)

# Add executable for main demonstration
add_executable(stack_queue_demo src/main.cpp)
target_link_libraries(stack_queue_demo StackQueueLib)

# --- Google Test ---
enable_testing()
find_package(GTest REQUIRED)
include_directories(${GTEST_INCLUDE_DIRS})

add_executable(run_tests tests/test_problems.cpp)
target_link_libraries(run_tests StackQueueLib ${GTEST_LIBRARIES} pthread)
add_test(NAME StackQueueTests COMMAND run_tests)

# --- Google Benchmark ---
# Download and build Google Benchmark if not already present
# Or use fetch_content for a more robust solution in a real project
# For simplicity, assuming you have it installed or will compile it manually.
# You might need to adjust paths or `find_package` based on your system.
# On Ubuntu: `sudo apt install libbenchmark-dev`

find_package(benchmark CONFIG) # On some systems, it's just `find_package(GoogleBenchmark CONFIG)`

if (benchmark_FOUND)
    add_executable(run_benchmarks benchmarks/benchmark_problems.cpp)
    target_link_libraries(run_benchmarks StackQueueLib benchmark::benchmark benchmark::benchmark_main)
else()
    message(WARNING "Google Benchmark not found. Benchmarks will not be built. Install libbenchmark-dev or build it manually.")
endif()
```