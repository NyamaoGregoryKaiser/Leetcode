```cmake
find_package(benchmark CONFIG REQUIRED)

# Add the benchmark library
target_link_libraries(benchmark::benchmark_main)

add_executable(string_benchmarks benchmark_suite.cpp)
target_link_libraries(string_benchmarks benchmark::benchmark_main string_algorithms)
```