```cpp
#include "utils.h"

namespace TestFramework {

// Define the global vector for test results
std::vector<TestCaseResult> test_results;

void run_all_tests() {
    int passed_count = 0;
    int failed_count = 0;

    std::cout << "--- Running All Tests ---\n";

    for (const auto& result : test_results) {
        if (result.passed) {
            std::cout << "[PASS] " << result.test_name << "\n";
            passed_count++;
        } else {
            std::cout << "[FAIL] " << result.test_name << ": " << result.message << "\n";
            failed_count++;
        }
    }

    std::cout << "\n--- Test Summary ---\n";
    std::cout << "Total Tests: " << test_results.size() << "\n";
    std::cout << "Passed: " << passed_count << "\n";
    std::cout << "Failed: " << failed_count << "\n";

    if (failed_count > 0) {
        std::cerr << "!!! Some tests FAILED !!!\n";
        // Optionally exit with a non-zero code to indicate failure in CI/CD
        // exit(1);
    } else {
        std::cout << "All tests PASSED!\n";
    }
}

} // namespace TestFramework
```