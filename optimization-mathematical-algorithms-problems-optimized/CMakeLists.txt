```cmake
cmake_minimum_required(VERSION 3.10)
project(MathProblemsProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Add common include directories
include_directories(src)

# Define source files for the problems library
set(PROBLEMS_SRC
    src/problems.cpp
    src/utilities.h # utilities.h is a header, not a source file to compile directly into a library.
                     # It's included by problems.cpp, so it doesn't need to be explicitly listed here for compilation.
                     # But we do need to ensure its path is known via include_directories.
)

# Create a library for problem implementations
add_library(math_problems STATIC src/problems.cpp src/utilities.h)
target_include_directories(math_problems PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src)

# Add the main demonstration executable
add_executable(math_problems_demo src/main.cpp)
target_link_libraries(math_problems_demo math_problems)

# Add the unit tests executable
add_executable(math_problems_tests tests/test_problems.cpp)
target_link_libraries(math_problems_tests math_problems)

# Add the benchmarking executable
add_executable(math_problems_benchmark tests/benchmark.cpp)
target_link_libraries(math_problems_benchmark math_problems)

# Optional: Add compiler flags for better warnings/errors
if (CMAKE_BUILD_TYPE MATCHES "Debug")
    add_compile_options(-Wall -Wextra -Wpedantic -g)
else()
    add_compile_options(-O3 -DNDEBUG)
endif()

# Set output directories
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
```