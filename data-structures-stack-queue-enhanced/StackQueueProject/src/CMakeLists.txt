```cmake
# Define a library for the main algorithms
add_library(stack_queue_algorithms src/main_algorithms.cpp)

# If helpers were more substantial, they would be added here too.
# For now, helpers.h is just an empty placeholder or might contain trivial stuff.
# target_include_directories(stack_queue_algorithms PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
```