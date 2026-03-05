```cmake
cmake_minimum_required(VERSION 3.10)
project(HashTableInterviewProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Add source directory
add_subdirectory(src)

# Add tests directory
add_subdirectory(tests)

# Add benchmarks directory
add_subdirectory(benchmarks)

# Optional: Install targets
# install(TARGETS HashTableAlgorithms DESTINATION bin)
```