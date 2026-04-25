```cmake
# Define the benchmark executable
add_executable(StackQueueBenchmarks benchmark_main_algorithms.cpp)

# Link the benchmark executable with Google Benchmark and the project's algorithms library
target_link_libraries(StackQueueBenchmarks
    benchmark::benchmark_main # Links against Google Benchmark's main entry point
    stack_queue_algorithms
)

# Set properties for the benchmark executable
target_include_directories(StackQueueBenchmarks PRIVATE ${CMAKE_SOURCE_DIR}/src)
```