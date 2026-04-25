```cmake
cmake_minimum_required(VERSION 3.14 FATAL_ERROR)

project(StackQueueProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON) # Required for shared libraries and some test setups

# Add source directory
add_subdirectory(src)

# Add tests directory (requires Google Test)
option(BUILD_TESTS "Build unit tests" ON)
if(BUILD_TESTS)
    include(FetchContent)
    FetchContent_Declare(
        googletest
        GIT_REPOSITORY https://github.com/google/googletest.git
        GIT_TAG        release-1.12.1 # Or a newer stable version
    )
    # For newer CMake, use FetchContent_MakeAvailable
    # For older CMake, FetchContent_Populate and add_subdirectory is typical
    FetchContent_MakeAvailable(googletest)
    add_subdirectory(tests)
endif()

# Add benchmarks directory (requires Google Benchmark)
option(BUILD_BENCHMARKS "Build performance benchmarks" ON)
if(BUILD_BENCHMARKS)
    include(FetchContent)
    FetchContent_Declare(
        googlebenchmark
        GIT_REPOSITORY https://github.com/google/benchmark.git
        GIT_TAG        v1.7.1 # Or a newer stable version
    )
    # For newer CMake, use FetchContent_MakeAvailable
    # For older CMake, FetchContent_Populate and add_subdirectory is typical
    FetchContent_MakeAvailable(googlebenchmark)
    add_subdirectory(bench)
endif()
```