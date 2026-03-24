cmake_minimum_required(VERSION 3.10)
project(BitManipulationProject CXX)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Add include directories
include_directories(include)
include_directories(additional_implementations) # For additional implementations to access utils if needed

# --- Main Algorithms Library ---
add_library(BitManipulationSolutions STATIC
    src/BitManipulationSolutions.cpp
    include/BitManipulationSolutions.hpp
    include/bit_manipulation_utils.hpp
)

# --- Additional Implementations Library (can be linked by main if needed, or by tests/benchmarks directly) ---
add_library(AdditionalBitManipulationSolutions STATIC
    additional_implementations/CountSetBits_Approaches.cpp
    additional_implementations/ReverseBits_Approaches.cpp
)
target_link_libraries(AdditionalBitManipulationSolutions BitManipulationSolutions) # Link for utilities if needed

# --- Test Executable ---
add_executable(test_bit_manipulation tests/test_bit_manipulation.cpp)
target_link_libraries(test_bit_manipulation BitManipulationSolutions AdditionalBitManipulationSolutions)

# --- Benchmark Executable ---
add_executable(benchmark benchmarking/benchmark.cpp)
target_link_libraries(benchmark BitManipulationSolutions AdditionalBitManipulationSolutions)

# Optional: Add option for warnings
option(ENABLE_WARNINGS "Enable all warnings" ON)
if (ENABLE_WARNINGS)
    if (MSVC)
        target_compile_options(BitManipulationSolutions PRIVATE /W4)
        target_compile_options(AdditionalBitManipulationSolutions PRIVATE /W4)
        target_compile_options(test_bit_manipulation PRIVATE /W4)
        target_compile_options(benchmark PRIVATE /W4)
    else()
        target_compile_options(BitManipulationSolutions PRIVATE -Wall -Wextra -Wpedantic)
        target_compile_options(AdditionalBitManipulationSolutions PRIVATE -Wall -Wextra -Wpedantic)
        target_compile_options(test_bit_manipulation PRIVATE -Wall -Wextra -Wpedantic)
        target_compile_options(benchmark PRIVATE -Wall -Wextra -Wpedantic)
    endif()
endif()

---