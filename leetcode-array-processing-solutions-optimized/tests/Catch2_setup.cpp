```cpp
// This file is typically used to define the main for Catch2 tests.
// It allows Catch2 to provide its own main() function.
#define CATCH_CONFIG_MAIN
#include <catch2/catch_session.hpp>
#include <catch2/catch_test_macros.hpp>

// Optionally, you can add global setup/teardown code here
// int main(int argc, char* argv[]) {
//     // global setup...

//     int result = Catch::Session().run(argc, argv);

//     // global teardown...

//     return result;
// }
```