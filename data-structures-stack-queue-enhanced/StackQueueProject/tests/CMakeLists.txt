```cmake
# Define the test executable
add_executable(StackQueueTests test_main_algorithms.cpp)

# Link the test executable with Google Test and the project's algorithms library
target_link_libraries(StackQueueTests
    GTest::gtest_main  # Links against Google Test's main entry point
    stack_queue_algorithms
)

# Set properties for the test executable
# You might want to add include directories if test_main_algorithms.cpp needs headers directly
# For now, it should get what it needs via stack_queue_algorithms's dependencies.
target_include_directories(StackQueueTests PRIVATE ${CMAKE_SOURCE_DIR}/src)
```