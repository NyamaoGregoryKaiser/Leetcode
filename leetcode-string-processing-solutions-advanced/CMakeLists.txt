```cmake
cmake_minimum_required(VERSION 3.10)
project(StringManipulationInterview CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON) # For LSP integration

# Add the source directory
add_subdirectory(src)

# Add the tests directory (if Google Test is found)
# Google Test setup
find_package(GTest CONFIG REQUIRED)
if(GTest_FOUND)
    message(STATUS "Google Test found. Building tests.")
    add_subdirectory(tests)
else()
    message(WARNING "Google Test not found. Tests will not be built.")
endif()

# Google Benchmark setup
find_package(benchmark CONFIG REQUIRED)
if(benchmark_FOUND)
    message(STATUS "Google Benchmark found. Building benchmarks.")
    add_subdirectory(benchmarks)
else()
    message(WARNING "Google Benchmark not found. Benchmarks will not be built.")
endif()

```