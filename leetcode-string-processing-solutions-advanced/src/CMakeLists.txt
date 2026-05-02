```cmake
add_library(string_algorithms
    helpers.cpp
    algorithms.cpp
)

add_executable(string_app main.cpp)
target_link_libraries(string_app string_algorithms)
```