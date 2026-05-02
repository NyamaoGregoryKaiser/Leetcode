```cmake
find_package(GTest CONFIG REQUIRED)

# Add the GTest library
target_link_libraries(GTest::gtest_main)

add_executable(string_tests test_suite.cpp)
target_link_libraries(string_tests GTest::gtest_main string_algorithms)

# Add a custom test target
add_test(NAME run_string_tests COMMAND string_tests)
```