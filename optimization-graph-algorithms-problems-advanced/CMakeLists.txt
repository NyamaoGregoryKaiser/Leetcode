```cmake
cmake_minimum_required(VERSION 3.10)
project(GraphAlgorithmsProject CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_BUILD_TYPE Debug) # Can be Release for optimized builds

# Source files for the core library (Graph data structure)
add_library(graph_lib STATIC
    src/graph.cpp
    src/graph.h
)

# --- Problem 1: Traversals (BFS/DFS) ---
add_executable(traversals_main src/problem1_traversals.cpp)
target_link_libraries(traversals_main graph_lib)

# --- Problem 2: Shortest Path (Dijkstra) ---
add_executable(shortest_path_main src/problem2_shortest_path.cpp)
target_link_libraries(shortest_path_main graph_lib)

# --- Problem 3: Minimum Spanning Tree (Kruskal's) ---
add_executable(mst_main src/problem3_mst.cpp)
target_link_libraries(mst_main graph_lib)

# --- Problem 4: Topological Sort (Kahn's/DFS) ---
add_executable(topological_sort_main src/problem4_topological_sort.cpp)
target_link_libraries(topological_sort_main graph_lib)

# --- Test Executables ---
add_executable(run_tests_traversals tests/test_traversals.cpp)
target_link_libraries(run_tests_traversals graph_lib)

add_executable(run_tests_shortest_path tests/test_shortest_path.cpp)
target_link_libraries(run_tests_shortest_path graph_lib)

add_executable(run_tests_mst tests/test_mst.cpp)
target_link_libraries(run_tests_mst graph_lib)

add_executable(run_tests_topological_sort tests/test_topological_sort.cpp)
target_link_libraries(run_tests_topological_sort graph_lib)

# --- Benchmark Executable ---
add_executable(run_benchmarks benchmarks/benchmark_main.cpp)
target_link_libraries(run_benchmarks graph_lib)

# Optionally, add a custom target to run all tests
add_custom_target(run_all_tests
    COMMAND $<TARGET_FILE:run_tests_traversals>
    COMMAND $<TARGET_FILE:run_tests_shortest_path>
    COMMAND $<TARGET_FILE:run_tests_mst>
    COMMAND $<TARGET_FILE:run_tests_topological_sort>
    COMMENT "Running all graph algorithm tests"
)

# Alias for convenience to run tests
add_custom_target(test ALL COMMAND ${CMAKE_COMMAND} --build . --target run_all_tests)
```