```cmake
# CMakeLists.txt for tests

cmake_minimum_required(VERSION 3.10 FATAL_ERROR)
project(binary_search_tests CXX)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Fetch GoogleTest
include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/release-1.12.1.zip
)
# For Windows MSVC, need to disable multi-threaded DLL for Release build
# if using static runtime library (MTd/MT for debug/release).
# Default is MD/MDd, so this might not be strictly needed for all setups.
if (MSVC)
    FetchContent_MakeAvailable(googletest)
else()
    FetchContent_MakeAvailable(googletest)
endif()

# Add test executable
add_executable(binary_search_tests test_algorithms.cpp ../src/algorithms.cpp ../src/helpers.cpp)

# Link with GoogleTest libraries
target_link_libraries(binary_search_tests PRIVATE GTest::gtest_main GTest::gtest)

# Add include directories for our source files
target_include_directories(binary_search_tests PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/../src)

# Discover tests using CTest
include(GoogleTest)
gtest_discover_tests(binary_search_tests)
```