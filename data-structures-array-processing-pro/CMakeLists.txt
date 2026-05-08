cmake_minimum_required(VERSION 3.10)

project(ArrayManipulationProject CXX)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Add source directories
include_directories(src)

# --- Library Target (optional, for reusable functions) ---
# This project is simple enough that we'll link directly, but for larger projects,
# creating a library target for array_manipulation would be good practice.

# --- Executable for Tests ---
add_executable(array_manipulation_tests tests/test_array_manipulation.cpp src/array_manipulation.cpp src/utils.hpp)
target_link_libraries(array_manipulation_tests) # No external libraries needed for this simple test setup

# --- Executable for Benchmarks ---
add_executable(array_manipulation_benchmarks benchmarks/benchmark.cpp src/array_manipulation.cpp src/utils.hpp)
target_link_libraries(array_manipulation_benchmarks) # No external libraries needed

# Optional: Add a target for a simple main.cpp if you want to run examples
# add_executable(array_manipulation_app main.cpp src/array_manipulation.cpp src/utils.hpp)
# target_link_libraries(array_manipulation_app)

# To enable running specific examples or main, you could uncomment the above,
# or simply modify the test/benchmark main functions for quick runs.