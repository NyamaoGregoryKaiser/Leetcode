```cmake
add_library(HashTableAlgorithms
    main_algorithms.cpp
    utils.cpp
    utils.h
)

target_include_directories(HashTableAlgorithms PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
```