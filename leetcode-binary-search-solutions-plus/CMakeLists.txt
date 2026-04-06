```cmake
# Top-level CMakeLists.txt for Binary Search Project

cmake_minimum_required(VERSION 3.10 FATAL_ERROR)
project(BinarySearchProject CXX)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_BUILD_TYPE Release CACHE STRING "Choose the type of build (Debug or Release)" FORCE)

# Add subdirectories for source, tests, and benchmarks
add_subdirectory(src)
add_subdirectory(tests)
add_subdirectory(benchmarks)

# Optional: Set common compiler flags
if (CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra -Wpedantic")
    if (CMAKE_BUILD_TYPE STREQUAL "Release")
        set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -O3 -DNDEBUG")
    endif()
endif()

# Optional: Install targets
# install(TARGETS BinarySearchAlgorithms EXPORT BinarySearchTargets
#         ARCHIVE DESTINATION lib
#         LIBRARY DESTINATION lib
#         RUNTIME DESTINATION bin)
# install(DIRECTORY docs DESTINATION share/BinarySearchProject)
```