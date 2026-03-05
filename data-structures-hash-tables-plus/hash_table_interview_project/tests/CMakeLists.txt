```cmake
add_executable(run_tests test_main_algorithms.cpp)
target_link_libraries(run_tests PRIVATE HashTableAlgorithms)

# Ensure tests run after building
add_test(NAME HashTableTests COMMAND run_tests)
```