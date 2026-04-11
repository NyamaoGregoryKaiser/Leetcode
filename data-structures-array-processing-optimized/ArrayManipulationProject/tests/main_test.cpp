```cpp
#include "gtest/gtest.h"

// This file simply includes gtest and defines main for the test runner.
// All specific test cases are in test_array_manipulator.cpp.

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
```